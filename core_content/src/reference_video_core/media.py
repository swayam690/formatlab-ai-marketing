from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path

from .models import MediaAnalysis, VideoSegment


class MediaProbeError(RuntimeError):
    pass


class FFprobeAnalyzer:
    def analyze(self, path: str) -> MediaAnalysis:
        source = Path(path)
        if not source.is_file():
            raise FileNotFoundError(f"source video does not exist: {source}")
        result = subprocess.run(
            [
                "ffprobe",
                "-v",
                "error",
                "-show_entries",
                "format=duration:stream=codec_type,r_frame_rate,width,height",
                "-of",
                "json",
                str(source),
            ],
            check=False,
            capture_output=True,
            text=True,
        )
        if result.returncode:
            raise MediaProbeError(result.stderr.strip() or "ffprobe could not read the source video")
        try:
            payload = json.loads(result.stdout)
            duration = float(payload["format"]["duration"])
            video = next(stream for stream in payload["streams"] if stream["codec_type"] == "video")
        except (KeyError, StopIteration, TypeError, ValueError, json.JSONDecodeError) as error:
            raise MediaProbeError("source video has incomplete media metadata") from error
        frame_rate = video.get("r_frame_rate", "30/1")
        numerator, denominator = frame_rate.split("/", maxsplit=1)
        fps = float(numerator) / float(denominator)
        has_audio = any(stream["codec_type"] == "audio" for stream in payload["streams"])
        metadata = {"width": video.get("width"), "height": video.get("height")}
        return MediaAnalysis(duration, fps, has_audio, (VideoSegment(0, duration),), metadata)


class SceneDetector:
    def __init__(self, probe: FFprobeAnalyzer | None = None, threshold: float = 0.35) -> None:
        self.probe = probe or FFprobeAnalyzer()
        self.threshold = threshold

    def analyze(self, path: str) -> MediaAnalysis:
        base = self.probe.analyze(path)
        result = subprocess.run(
            [
                "ffmpeg",
                "-hide_banner",
                "-i",
                path,
                "-vf",
                f"select='gt(scene,{self.threshold})',showinfo",
                "-an",
                "-f",
                "null",
                "-",
            ],
            check=False,
            capture_output=True,
            text=True,
        )
        if result.returncode:
            return base
        cuts = [float(value) for value in re.findall(r"pts_time:([0-9.]+)", result.stderr)]
        boundaries = [0.0, *sorted({cut for cut in cuts if 0 < cut < base.duration}), base.duration]
        segments = tuple(
            VideoSegment(start, end)
            for start, end in zip(boundaries, boundaries[1:])
            if end - start >= 0.1
        )
        return MediaAnalysis(base.duration, base.fps, base.has_audio, segments or base.segments, base.metadata)
