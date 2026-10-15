from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class AudioAsset:
    asset_id: str
    path: str
    kind: str
    tags: tuple[str, ...]
    duration: float
    license_note: str


class AudioLibrary:
    def __init__(self) -> None:
        self._assets: dict[str, AudioAsset] = {}

    def add(self, asset: AudioAsset) -> None:
        if asset.kind not in {"music", "sound_effect"}:
            raise ValueError("audio asset kind must be music or sound_effect")
        self._assets[asset.asset_id] = asset

    def search(self, tags: set[str], kind: str | None = None) -> tuple[AudioAsset, ...]:
        return tuple(
            asset for asset in self._assets.values()
            if (kind is None or asset.kind == kind) and tags.intersection(asset.tags)
        )
