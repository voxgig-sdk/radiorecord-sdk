<?php
declare(strict_types=1);

// Radiorecord SDK utility: feature_add

class RadiorecordFeatureAdd
{
    public static function call(RadiorecordContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
