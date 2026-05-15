<?php
declare(strict_types=1);

// Radiorecord SDK utility: prepare_body

class RadiorecordPrepareBody
{
    public static function call(RadiorecordContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
