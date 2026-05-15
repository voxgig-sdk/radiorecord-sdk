<?php
declare(strict_types=1);

// Radiorecord SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class RadiorecordMakeContext
{
    public static function call(array $ctxmap, ?RadiorecordContext $basectx): RadiorecordContext
    {
        return new RadiorecordContext($ctxmap, $basectx);
    }
}
