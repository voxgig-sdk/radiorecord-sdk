<?php
declare(strict_types=1);

// Radiorecord SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class RadiorecordFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new RadiorecordBaseFeature();
            case "test":
                return new RadiorecordTestFeature();
            default:
                return new RadiorecordBaseFeature();
        }
    }
}
