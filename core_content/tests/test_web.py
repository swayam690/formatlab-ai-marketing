from __future__ import annotations

from io import BytesIO
from pathlib import Path

from reference_video_core.models import MediaAnalysis, ReferenceProfile, VideoSegment
from reference_video_core.pipeline import EditingJob
from reference_video_core.web import create_app
from reference_video_core.automatic import AutomaticEditRequest, CompatibilityReport


def test_ui_renders_uploaded_video_with_injected_pipeline(tmp_path: Path) -> None:
    class Pipeline:
        def analyze(self, job: EditingJob) -> MediaAnalysis:
            return MediaAnalysis(1, segments=(VideoSegment(0, 1),))

        def plan(self, job: EditingJob, analysis: MediaAnalysis) -> None:
            job.profile = ReferenceProfile("test")

        def render(self, job: EditingJob) -> None:
            Path(job.output_path).write_bytes(b"video")

        def verify(self, job: EditingJob) -> MediaAnalysis:
            return MediaAnalysis(1, segments=(VideoSegment(0, 1),))

    app = create_app(pipeline_factory=Pipeline, workdir=tmp_path)
    response = app.test_client().post(
        "/render",
        data={"video": (BytesIO(b"input"), "source.mp4"), "target_duration": "1", "speed": "1"},
        content_type="multipart/form-data",
    )

    assert response.status_code == 200
    assert response.data == b"video"
    assert response.headers["Content-Disposition"] == "attachment; filename=edited.mp4"


def test_automatic_ui_returns_compatibility_report_and_download(tmp_path: Path) -> None:
    analysis = MediaAnalysis(1, segments=(VideoSegment(0, 1),))

    class AutomaticService:
        def prepare(self, reference_path: str, source_path: str):
            request = AutomaticEditRequest(
                ReferenceProfile("reference", target_duration=1),
                CompatibilityReport(90, True, "talking head", "talking head", ("Use a clear talking-head take.",), analyzed_by="gemini"),
                "Keep the strongest spoken moments.",
            )
            return analysis, analysis, request

    class Pipeline:
        def plan(self, job: EditingJob, source: MediaAnalysis) -> None:
            from reference_video_core.models import EditPlan, PlannedClip

            job.plan = EditPlan((PlannedClip(0, 1, 0, 1),), 1)

        def render(self, job: EditingJob) -> None:
            Path(job.output_path).write_bytes(b"video")

        def verify(self, job: EditingJob) -> MediaAnalysis:
            return analysis

    app = create_app(pipeline_factory=Pipeline, automatic_service=AutomaticService(), workdir=tmp_path, run_jobs_async=False)
    response = app.test_client().post(
        "/automatic-edit",
        data={"source_video": (BytesIO(b"source"), "source.mp4"), "reference_video": (BytesIO(b"reference"), "reference.mp4")},
        content_type="multipart/form-data",
    )

    assert response.status_code == 303
    result = app.test_client().get(response.headers["Location"])
    assert b"90/100" in result.data
    assert b"talking head" in result.data
    download_url = result.data.decode().split('/jobs/')[1].split('/download')[0]
    download = app.test_client().get(f"/jobs/{download_url}/download")
    assert download.data == b"video"
