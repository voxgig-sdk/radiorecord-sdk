<?php
declare(strict_types=1);

// Typed models for the Radiorecord SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Chart entity data model. */
class Chart
{
    public ?string $artist = null;
    public ?int $duration = null;
    public ?int $id = null;
    public ?string $image = null;
    public ?int $position = null;
    public ?string $title = null;
}

/** Match filter for Chart#list (any subset of Chart fields). */
class ChartListMatch
{
    public ?string $artist = null;
    public ?int $duration = null;
    public ?int $id = null;
    public ?string $image = null;
    public ?int $position = null;
    public ?string $title = null;
}

