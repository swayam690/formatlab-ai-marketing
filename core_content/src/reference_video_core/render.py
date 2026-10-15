from __future__ import annotations

import subprocess

from .models import EditPlan, MediaAnalysis


class RenderError(RuntimeError):
    pass


class FFmpegCommandBuilder:
    def build(self, input_path: str, output_path: str, plan: EditPlan, analysis: MediaAnalysis) -> list[str]:
        if not plan.clips:
            raise ValueError("cannot render an empty edit plan")
        args = ["ffmpeg", "-y", "-i", input_path, "-filter_complex"]
        filters: list[str] = []
        streams: list[str] = []
        for index, clip in enumerate(plan.clips):
            filters.append(
                f"[0:v]trim=start={clip.source_start:.3f}:end={clip.source_end:.3f},setpts=PTS-STARTPTS"
                f",setpts=PTS/{clip.speed:.6f}[v{index}]"
            )
            streams.append(f"[v{index}]")
            if analysis.has_audio:
                tempo_filters = ",".join(f"atempo={factor:.6f}" for factor in self._tempo_factors(clip.speed))
                filters.append(
                    f"[0:a]atrim=start={clip.source_start:.3f}:end={clip.source_end:.3f},asetpts=PTS-STARTPTS"
                    f",{tempo_filters}[a{index}]"
                )
                streams.append(f"[a{index}]")
        concat_inputs = "".join(streams)
        audio_streams = 1 if analysis.has_audio else 0
        output_labels = "[vout][aout]" if analysis.has_audio else "[vout]"
        filters.append(f"{concat_inputs}concat=n={len(plan.clips)}:v=1:a={audio_streams}{output_labels}")
        args.extend([";".join(filters), "-map", "[vout]"])
        if analysis.has_audio:
            args.extend(["-map", "[aout]"])
        args.extend(["-movflags", "+faststart", output_path])
        return args

    @staticmethod
    def _tempo_factors(speed: float) -> tuple[float, ...]:
        factors: list[float] = []
        remaining = speed
        while remaining > 2:
            factors.append(2.0)
            remaining /= 2
        while remaining < 0.5:
            factors.append(0.5)
            remaining /= 0.5
        factors.append(remaining)
        return tuple(factors)


class FFmpegExecutor:
    def run(self, command: list[str]) -> None:
        result = subprocess.run(command, check=False, capture_output=True, text=True)
        if result.returncode:
            raise RenderError(result.stderr.strip() or "ffmpeg rendering failed")
