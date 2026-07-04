# Typed models for the Radiorecord SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Chart:
    artist: Optional[str] = None
    duration: Optional[int] = None
    id: Optional[int] = None
    image: Optional[str] = None
    position: Optional[int] = None
    title: Optional[str] = None


@dataclass
class ChartListMatch:
    artist: Optional[str] = None
    duration: Optional[int] = None
    id: Optional[int] = None
    image: Optional[str] = None
    position: Optional[int] = None
    title: Optional[str] = None

