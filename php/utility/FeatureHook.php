<?php
declare(strict_types=1);

// Radiorecord SDK utility: feature_hook

class RadiorecordFeatureHook
{
    public static function call(RadiorecordContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
