from __future__ import annotations

import json
import os
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any

from .media import SceneDetector
from .models import MediaAnalysis, ReferenceProfile


class GeminiAnalysisError(RuntimeError):
    pass


@dataclass(frozen=True)
class CompatibilityReport:
    score: int
    is_compatible: bool
    reference_content_type: str
    source_content_type: str
    guidance: tuple[str, ...]
    mismatches: tuple[str, ...] = ()
    analyzed_by: str = "baseline"


@dataclass(frozen=True)
class AutomaticEditRequest:
    profile: ReferenceProfile
    compatibility: CompatibilityReport
    selection_brief: str


class GeminiReferenceAnalyzer:
    model = os.environ.get("GEMINI_MODEL", "gemini-3.8-flash")

    def create_edit_request(
        self,
        reference_path: str,
        source_path: str,
        reference: MediaAnalysis,
        source: MediaAnalysis,
    ) -> AutomaticEditRequest:
        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            return self._baseline(reference, source)
        try:
            from google import genai
            from google.genai import types
        except ImportError as error:
            raise GeminiAnalysisError("Install the AI extra with: pip install -e '.[ai]'") from error

        client = genai.Client(api_key=api_key)
        try:
            reference_file = client.files.upload(file=reference_path)
            source_file = client.files.upload(file=source_path)
            reference_file = self._wait_until_ready(client, reference_file)
            source_file = self._wait_until_ready(client, source_file)
            model_errors: list[str] = []
            for model in self._models():
                try:
                    response = client.models.generate_content(
                        model=model,
                        contents=[reference_file, source_file, self._prompt(reference, source)],
                        config=types.GenerateContentConfig(
                            response_mime_type="application/json",
                            response_schema=self._schema(),
                        ),
                    )
                    return self._from_payload(json.loads(response.text), reference, model)
                except Exception as error:
                    if not self._is_transient(error):
                        raise GeminiAnalysisError(str(error)) from error
                    model_errors.append(f"{model}: {error}")
            raise GeminiAnalysisError("All configured Gemini models are temporarily unavailable. " + " | ".join(model_errors))
        except (TypeError, ValueError, KeyError, json.JSONDecodeError) as error:
            raise GeminiAnalysisError("Gemini returned an invalid automatic-edit blueprint") from error

        raise GeminiAnalysisError("Gemini did not return an edit blueprint.")

    def _models(self) -> tuple[str, ...]:
        configured = os.environ.get("GEMINI_FALLBACK_MODELS")
        if configured:
            return tuple(model.strip() for model in configured.split(",") if model.strip())
        return (self.model, "gemini-3.5-flash", "gemini-3.5-flash-lite")

    @staticmethod
    def _is_transient(error: Exception) -> bool:
        message = str(error).lower()
        return "503" in message or "unavailable" in message or "high demand" in message

    @staticmethod
    def _wait_until_ready(client: Any, file: Any) -> Any:
        deadline = time.monotonic() + 300
        state = getattr(getattr(file, "state", None), "name", None)
        while state not in {None, "ACTIVE", "FAILED"}:
            if time.monotonic() >= deadline:
                raise GeminiAnalysisError("Gemini video processing exceeded the five-minute limit")
            time.sleep(2)
            file = client.files.get(name=file.name)
            state = getattr(getattr(file, "state", None), "name", None)
        if state == "FAILED":
            raise GeminiAnalysisError("Gemini could not process one of the videos")
        return file

    @staticmethod
    def _prompt(reference: MediaAnalysis, source: MediaAnalysis) -> str:
        return f"""You are an expert short-form video editor. Compare the first video (reference) with the second (source).
The reference is {reference.duration:.1f}s with {len(reference.segments)} detected scenes. The source is {source.duration:.1f}s with {len(source.segments)} detected scenes.
Return only the requested JSON. Decide if the source content can truthfully reproduce the reference's editing language. A product/car/b-roll source is not a compatible substitute for a talking-head reference unless the reference can reasonably be recreated without a presenter. Recommend what the creator should film or provide when incompatible. Do not recommend music or sound effects."""

    @staticmethod
    def _schema() -> dict[str, Any]:
        return {
            "type": "object",
            "properties": {
                "compatibility_score": {"type": "integer"},
                "is_compatible": {"type": "boolean"},
                "reference_content_type": {"type": "string"},
                "source_content_type": {"type": "string"},
                "guidance": {"type": "array", "items": {"type": "string"}},
                "mismatches": {"type": "array", "items": {"type": "string"}},
                "target_duration": {"type": "number"},
                "cut_duration": {"type": "number"},
                "speed": {"type": "number"},
                "selection_brief": {"type": "string"},
            },
            "required": [
                "compatibility_score", "is_compatible", "reference_content_type", "source_content_type",
                "guidance", "mismatches", "target_duration", "cut_duration", "speed", "selection_brief",
            ],
        }

    @staticmethod
    def _from_payload(payload: dict[str, Any], reference: MediaAnalysis, model: str) -> AutomaticEditRequest:
        score = max(0, min(100, int(payload["compatibility_score"])))
        target = max(0.1, float(payload["target_duration"]))
        profile = ReferenceProfile(
            "gemini-reference-profile",
            target_duration=min(target, reference.duration),
            cut_duration=max(0.1, float(payload["cut_duration"])),
            speed=max(0.1, float(payload["speed"])),
        )
        compatibility = CompatibilityReport(
            score,
            bool(payload["is_compatible"]),
            str(payload["reference_content_type"]),
            str(payload["source_content_type"]),
            tuple(str(item) for item in payload["guidance"]),
            tuple(str(item) for item in payload["mismatches"]),
            f"gemini ({model})",
        )
        return AutomaticEditRequest(profile, compatibility, str(payload["selection_brief"]))

    @staticmethod
    def _baseline(reference: MediaAnalysis, source: MediaAnalysis, note: str | None = None) -> AutomaticEditRequest:
        reference_aspect = _aspect_label(reference)
        source_aspect = _aspect_label(source)
        aspect_match = reference_aspect == source_aspect
        cut_duration = reference.duration / max(len(reference.segments), 1)
        profile = ReferenceProfile(
            "baseline-reference-profile",
            target_duration=reference.duration,
            cut_duration=max(0.1, cut_duration),
        )
        guidance = [
            "Add GEMINI_API_KEY to classify the subject and assess content compatibility.",
            f"Provide enough source footage for the {reference.duration:.1f}-second reference runtime.",
        ]
        if note:
            guidance.insert(0, note)
        if not aspect_match:
            guidance.append(f"Film or crop the source in {reference_aspect} format to match the reference framing.")
        return AutomaticEditRequest(
            profile,
            CompatibilityReport(
                65 if aspect_match else 40,
                True,
                "Not classified without Gemini",
                "Not classified without Gemini",
                tuple(guidance),
                (() if aspect_match else ("Source and reference aspect ratios differ.",)),
                "baseline" if note is None else "baseline (Gemini unavailable)",
            ),
            "Preserve chronological order and cut only at detected visual scene boundaries.",
        )


def _aspect_label(analysis: MediaAnalysis) -> str:
    width = analysis.metadata.get("width") or 1
    height = analysis.metadata.get("height") or 1
    if height > width * 1.1:
        return "vertical"
    if width > height * 1.1:
        return "landscape"
    return "square"


class AutomaticEditingService:
    def __init__(self, detector: SceneDetector | None = None, reference_analyzer: GeminiReferenceAnalyzer | None = None) -> None:
        self.detector = detector or SceneDetector()
        self.reference_analyzer = reference_analyzer or GeminiReferenceAnalyzer()

    def prepare(self, reference_path: str, source_path: str) -> tuple[MediaAnalysis, MediaAnalysis, AutomaticEditRequest]:
        reference = self.detector.analyze(reference_path)
        source = self.detector.analyze(source_path)
        return reference, source, self.reference_analyzer.create_edit_request(reference_path, source_path, reference, source)
