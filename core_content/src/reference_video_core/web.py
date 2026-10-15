from __future__ import annotations

import os
from pathlib import Path
from threading import Thread
from uuid import uuid4

from flask import Flask, Response, redirect, render_template, request, send_file
from werkzeug.utils import secure_filename

from .automatic import AutomaticEditingService
from .models import ReferenceProfile
from .pipeline import EditingJob, EditingPipeline


class EditJob:
    def __init__(self, output_path: Path) -> None:
        self.output_path = output_path
        self.status = "queued"
        self.report = None
        self.plan = None
        self.error: str | None = None


def create_app(
    pipeline_factory: type[EditingPipeline] = EditingPipeline,
    automatic_service: AutomaticEditingService | None = None,
    workdir: Path | None = None,
    run_jobs_async: bool = True,
) -> Flask:
    app = Flask(__name__)
    app.config["MAX_CONTENT_LENGTH"] = 2 * 1024 * 1024 * 1024
    app.config["WORKDIR"] = workdir or Path(os.environ.get("REFERENCE_VIDEO_WORKDIR", "/tmp/reference-video-core"))
    app.config["OUTPUTS"] = {}
    automatic_service = automatic_service or AutomaticEditingService()

    @app.get("/")
    def index() -> str:
        return render_template("index.html")

    @app.post("/render")
    def render_video() -> Response:
        upload = request.files.get("video")
        if upload is None or not upload.filename:
            return render_template("index.html", error="Choose a video file first."), 400
        try:
            target_duration = _positive_float(request.form.get("target_duration"), "Target duration")
            speed = _positive_float(request.form.get("speed", "1"), "Speed")
        except ValueError as error:
            return render_template("index.html", error=str(error)), 400

        job_id = uuid4().hex
        job_dir = Path(app.config["WORKDIR"]) / job_id
        job_dir.mkdir(parents=True, exist_ok=False)
        filename = secure_filename(upload.filename) or "source.mp4"
        source_path = job_dir / filename
        output_path = job_dir / "edited.mp4"
        upload.save(source_path)

        profile = ReferenceProfile("web-profile", target_duration=target_duration, speed=speed)
        job = EditingJob(str(source_path), str(output_path), profile)
        pipeline = pipeline_factory()
        try:
            analysis = pipeline.analyze(job)
            pipeline.plan(job, analysis)
            pipeline.render(job)
            pipeline.verify(job)
        except Exception as error:
            return render_template("index.html", error=f"Render failed: {error}"), 500
        return send_file(output_path, as_attachment=True, download_name="edited.mp4", mimetype="video/mp4")

    def run_automatic_job(job: EditJob, reference_path: Path, source_path: Path) -> None:
        try:
            job.status = "analyzing the reference and source footage"
            _, source_analysis, edit_request = automatic_service.prepare(str(reference_path), str(source_path))
            job.report = edit_request.compatibility
            if not edit_request.compatibility.is_compatible:
                job.status = "needs different source footage"
                return
            job.status = "building the edit plan"
            editing_job = EditingJob(str(source_path), str(job.output_path), edit_request.profile)
            pipeline = pipeline_factory()
            pipeline.plan(editing_job, source_analysis)
            job.plan = editing_job.plan
            job.status = "rendering the video"
            pipeline.render(editing_job)
            job.status = "verifying the output"
            pipeline.verify(editing_job)
            job.status = "complete"
        except Exception as error:
            job.error = str(error)
            job.status = "failed"

    @app.post("/automatic-edit")
    def automatic_edit() -> Response | tuple[str, int]:
        source_upload = request.files.get("source_video")
        reference_upload = request.files.get("reference_video")
        if source_upload is None or not source_upload.filename or reference_upload is None or not reference_upload.filename:
            return render_template("index.html", error="Upload both your source footage and a reference video."), 400

        job_id = uuid4().hex
        job_dir = Path(app.config["WORKDIR"]) / job_id
        job_dir.mkdir(parents=True, exist_ok=False)
        source_path = job_dir / (secure_filename(source_upload.filename) or "source.mp4")
        reference_path = job_dir / (secure_filename(reference_upload.filename) or "reference.mp4")
        output_path = job_dir / "edited.mp4"
        source_upload.save(source_path)
        reference_upload.save(reference_path)

        job = EditJob(output_path)
        app.config["OUTPUTS"][job_id] = job
        if run_jobs_async:
            Thread(target=run_automatic_job, args=(job, reference_path, source_path), daemon=True).start()
        else:
            run_automatic_job(job, reference_path, source_path)
        return redirect(f"/jobs/{job_id}", code=303)

    @app.get("/jobs/<job_id>")
    def job_result(job_id: str) -> str | tuple[str, int]:
        job = app.config["OUTPUTS"].get(job_id)
        if job is None:
            return render_template("index.html", error="That edit job no longer exists."), 404
        return render_template("result.html", job=job, job_id=job_id)

    @app.get("/jobs/<job_id>/download")
    def download(job_id: str) -> Response:
        job = app.config["OUTPUTS"].get(job_id)
        if job is None or job.status != "complete" or not job.output_path.is_file():
            return Response("Rendered file was not found.", status=404)
        return send_file(job.output_path, as_attachment=True, download_name="edited.mp4", mimetype="video/mp4")

    return app


def _positive_float(value: str | None, label: str) -> float | None:
    if value is None or not value.strip():
        return None
    try:
        number = float(value)
    except ValueError as error:
        raise ValueError(f"{label} must be a number.") from error
    if number <= 0:
        raise ValueError(f"{label} must be greater than zero.")
    return number


def main() -> None:
    create_app().run(host="127.0.0.1", port=8000, debug=False)


if __name__ == "__main__":
    main()
