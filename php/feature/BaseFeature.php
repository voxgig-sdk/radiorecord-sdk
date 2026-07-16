<?php
declare(strict_types=1);

// Radiorecord SDK base feature

class RadiorecordBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(RadiorecordContext $ctx, array $options): void {}
    public function PostConstruct(RadiorecordContext $ctx): void {}
    public function PostConstructEntity(RadiorecordContext $ctx): void {}
    public function SetData(RadiorecordContext $ctx): void {}
    public function GetData(RadiorecordContext $ctx): void {}
    public function GetMatch(RadiorecordContext $ctx): void {}
    public function SetMatch(RadiorecordContext $ctx): void {}
    public function PrePoint(RadiorecordContext $ctx): void {}
    public function PreSpec(RadiorecordContext $ctx): void {}
    public function PreRequest(RadiorecordContext $ctx): void {}
    public function PreResponse(RadiorecordContext $ctx): void {}
    public function PreResult(RadiorecordContext $ctx): void {}
    public function PreDone(RadiorecordContext $ctx): void {}
    public function PreUnexpected(RadiorecordContext $ctx): void {}
}
