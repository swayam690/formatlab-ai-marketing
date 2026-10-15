from __future__ import annotations

from dataclasses import dataclass
from enum import StrEnum

from .media import FFprobeAnalyzer
from .models import EditPlan, MediaAnalysis, ReferenceProfile
from .planner import EditPlanner
from .render import FFmpegCommandBuilder, FFmpegExecutor


class JobState(StrEnum):
    CREATED = "created"
    PLANNED = "planned"
    RENDERED = "rendered"
    VERIFIED = "verified"


@dataclass
class EditingJob:
    source_path: str
    output_path: str
    profile: ReferenceProfile
    state: JobState = JobState.CREATED
    plan: EditPlan | None = None
    analysis: MediaAnalysis | None = None


class EditingPipeline:
    def __init__(
        self,
        planner: EditPlanner | None = None,
        renderer: FFmpegCommandBuilder | None = None,
        analyzer: FFprobeAnalyzer | None = None,
        executor: FFmpegExecutor | None = None,
    ) -> None:
        self.planner = planner or EditPlanner()
        self.renderer = renderer or FFmpegCommandBuilder()
        self.analyzer = analyzer or FFprobeAnalyzer()
        self.executor = executor or FFmpegExecutor()

    def analyze(self, job: EditingJob) -> MediaAnalysis:
        job.analysis = self.analyzer.analyze(job.source_path)
        return job.analysis

    def plan(self, job: EditingJob, analysis: MediaAnalysis) -> EditPlan:
        job.analysis = analysis
        job.plan = self.planner.create_plan(analysis, job.profile)
        job.state = JobState.PLANNED
        return job.plan

    def render_command(self, job: EditingJob) -> list[str]:
        if job.state is not JobState.PLANNED or job.plan is None or job.analysis is None:
            raise RuntimeError("job must be planned before rendering")
        return self.renderer.build(job.source_path, job.output_path, job.plan, job.analysis)

    def render(self, job: EditingJob) -> None:
        self.executor.run(self.render_command(job))
        job.state = JobState.RENDERED

    def verify(self, job: EditingJob, tolerance: float = 0.1) -> MediaAnalysis:
        if job.state is not JobState.RENDERED or job.plan is None:
            raise RuntimeError("job must be rendered before verification")
        output = self.analyzer.analyze(job.output_path)
        if abs(output.duration - job.plan.output_duration) > tolerance:
            raise RuntimeError("rendered duration does not match the edit plan")
        job.state = JobState.VERIFIED
        return output
