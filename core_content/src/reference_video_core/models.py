from __future__ import annotations

from dataclasses import dataclass, field
from enum import StrEnum
from typing import Any


class RuleMode(StrEnum):
    FIXED = "fixed"
    RELATIVE = "relative"
    SEMANTIC = "semantic"


@dataclass(frozen=True)
class VideoSegment:
    start: float
    end: float
    score: float = 1.0
    labels: tuple[str, ...] = ()

    def __post_init__(self) -> None:
        if self.start < 0 or self.end <= self.start:
            raise ValueError("segment must have a non-negative start before its end")

    @property
    def duration(self) -> float:
        return self.end - self.start


@dataclass(frozen=True)
class MediaAnalysis:
    duration: float
    fps: float = 30.0
    has_audio: bool = True
    segments: tuple[VideoSegment, ...] = ()
    metadata: dict[str, Any] = field(default_factory=dict)

    def __post_init__(self) -> None:
        if self.duration <= 0 or self.fps <= 0:
            raise ValueError("duration and fps must be positive")


@dataclass(frozen=True)
class ReferenceProfile:
    name: str
    target_duration: float | None = None
    cut_duration: float | None = None
    transition: str = "cut"
    speed: float = 1.0
    rules: dict[str, Any] = field(default_factory=dict)

    def __post_init__(self) -> None:
        if self.target_duration is not None and self.target_duration <= 0:
            raise ValueError("target_duration must be positive")
        if self.cut_duration is not None and self.cut_duration <= 0:
            raise ValueError("cut_duration must be positive")
        if self.speed <= 0:
            raise ValueError("speed must be positive")


@dataclass(frozen=True)
class PlannedClip:
    source_start: float
    source_end: float
    output_start: float
    output_end: float
    speed: float = 1.0
    labels: tuple[str, ...] = ()

    @property
    def source_duration(self) -> float:
        return self.source_end - self.source_start

    @property
    def output_duration(self) -> float:
        return self.output_end - self.output_start


@dataclass(frozen=True)
class EditPlan:
    clips: tuple[PlannedClip, ...]
    output_duration: float
    transition: str = "cut"
    diagnostics: tuple[str, ...] = ()

    def __post_init__(self) -> None:
        if self.output_duration < 0:
            raise ValueError("output_duration cannot be negative")
