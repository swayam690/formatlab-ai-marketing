import pytest

from reference_video_core.models import MediaAnalysis, ReferenceProfile, VideoSegment
from reference_video_core.pipeline import EditingJob, EditingPipeline, JobState


def test_plan_transfers_target_duration_and_semantic_speed() -> None:
    analysis = MediaAnalysis(20, segments=(VideoSegment(0, 8, labels=("action",)), VideoSegment(8, 20, labels=("dialogue",))))
    profile = ReferenceProfile("short-form", target_duration=6, speed=1, rules={"speed": {"mode": "semantic", "value": {"action": 1.5, "default": 1}}})
    job = EditingJob("input.mp4", "output.mp4", profile)

    plan = EditingPipeline().plan(job, analysis)

    assert job.state is JobState.PLANNED
    assert plan.output_duration == pytest.approx(6)
    assert plan.clips[0].speed == pytest.approx(1.5)


def test_render_command_requires_plan() -> None:
    profile = ReferenceProfile("default")
    job = EditingJob("input.mp4", "output.mp4", profile)

    with pytest.raises(RuntimeError):
        EditingPipeline().render_command(job)


def test_render_command_is_deterministic() -> None:
    analysis = MediaAnalysis(10, segments=(VideoSegment(1, 4),))
    job = EditingJob("input.mp4", "output.mp4", ReferenceProfile("reference", cut_duration=2))
    pipeline = EditingPipeline()
    pipeline.plan(job, analysis)

    command = pipeline.render_command(job)

    assert command[0] == "ffmpeg"
    assert "[vout]" in command
    assert command[-1] == "output.mp4"


def test_render_command_handles_video_without_audio() -> None:
    analysis = MediaAnalysis(10, has_audio=False, segments=(VideoSegment(0, 2),))
    job = EditingJob("input.mp4", "output.mp4", ReferenceProfile("silent"))
    pipeline = EditingPipeline()
    pipeline.plan(job, analysis)

    command = pipeline.render_command(job)

    assert "[aout]" not in command


def test_render_and_verify_use_pipeline_dependencies() -> None:
    analysis = MediaAnalysis(2, segments=(VideoSegment(0, 2),))

    class Analyzer:
        def analyze(self, path: str) -> MediaAnalysis:
            return analysis

    class Executor:
        def __init__(self) -> None:
            self.command: list[str] | None = None

        def run(self, command: list[str]) -> None:
            self.command = command

    executor = Executor()
    job = EditingJob("input.mp4", "output.mp4", ReferenceProfile("reference"))
    pipeline = EditingPipeline(analyzer=Analyzer(), executor=executor)
    pipeline.plan(job, analysis)
    pipeline.render(job)
    output = pipeline.verify(job)

    assert executor.command is not None
    assert output is analysis
    assert job.state is JobState.VERIFIED
