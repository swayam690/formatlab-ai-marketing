from __future__ import annotations

from dataclasses import dataclass
from typing import Any

from .models import MediaAnalysis, ReferenceProfile, RuleMode


@dataclass(frozen=True)
class RuleDecision:
    mode: RuleMode
    value: Any
    reason: str


def resolve_rule(
    name: str,
    *,
    profile: ReferenceProfile,
    analysis: MediaAnalysis,
    default: Any,
) -> RuleDecision:
    raw = profile.rules.get(name)
    if raw is None:
        return RuleDecision(RuleMode.RELATIVE, default, f"{name}: default")

    if isinstance(raw, dict):
        mode = RuleMode(raw.get("mode", RuleMode.RELATIVE))
        value = raw.get("value", default)
    else:
        mode = RuleMode.RELATIVE
        value = raw

    if mode is RuleMode.FIXED:
        return RuleDecision(mode, value, f"{name}: fixed")
    if mode is RuleMode.SEMANTIC:
        labels = {label for segment in analysis.segments for label in segment.labels}
        if isinstance(value, dict):
            selected = next((value[label] for label in labels if label in value), value.get("default", default))
        else:
            selected = value
        return RuleDecision(mode, selected, f"{name}: semantic labels={sorted(labels)}")

    if name == "cut_duration" and profile.target_duration:
        segment_count = max(len(analysis.segments), 1)
        value = profile.target_duration / segment_count
    return RuleDecision(mode, value, f"{name}: relative")
