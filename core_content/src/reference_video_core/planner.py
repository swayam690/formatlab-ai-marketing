from __future__ import annotations

from .models import EditPlan, MediaAnalysis, PlannedClip, ReferenceProfile, VideoSegment
from .rules import resolve_rule


class EditPlanner:
    def create_plan(self, analysis: MediaAnalysis, profile: ReferenceProfile) -> EditPlan:
        segments = analysis.segments or (VideoSegment(0, analysis.duration),)
        cut_decision = resolve_rule(
            "cut_duration",
            profile=profile,
            analysis=analysis,
            default=profile.cut_duration or analysis.duration,
        )
        speed_decision = resolve_rule("speed", profile=profile, analysis=analysis, default=profile.speed)
        cut_duration = float(cut_decision.value)
        speed = float(speed_decision.value)
        if cut_duration <= 0 or speed <= 0:
            raise ValueError("resolved cut duration and speed must be positive")

        clips: list[PlannedClip] = []
        cursor = 0.0
        for segment in segments:
            source_start = segment.start
            while source_start < segment.end:
                source_duration = min(segment.end - source_start, cut_duration * speed)
                source_end = source_start + source_duration
                output_duration = source_duration / speed
                clips.append(PlannedClip(source_start, source_end, cursor, cursor + output_duration, speed, segment.labels))
                cursor += output_duration
                source_start = source_end
                if profile.target_duration and cursor >= profile.target_duration:
                    break
            if profile.target_duration and cursor >= profile.target_duration:
                break

        if profile.target_duration and clips:
            target = profile.target_duration
            last = clips[-1]
            if cursor > target:
                clips[-1] = PlannedClip(last.source_start, last.source_start + (target - last.output_start) * speed, last.output_start, target, speed, last.labels)
                cursor = target
        return EditPlan(tuple(clips), cursor, profile.transition, (cut_decision.reason, speed_decision.reason))
