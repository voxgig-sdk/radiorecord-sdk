<?php
declare(strict_types=1);

// Radiorecord SDK configuration

class RadiorecordConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Radiorecord",
                "slug" => "radiorecord",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://www.radiorecord.ru",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "chart" => [],
                ],
            ],
            "entity" => [
        'chart' => [
          'fields' => [
            [
              'name' => 'artist',
              'short' => 'Artist name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'duration',
              'short' => 'Track duration in seconds',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'id',
              'short' => 'Track ID',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'image',
              'short' => 'Track cover image URL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'position',
              'short' => 'Chart position',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'title',
              'short' => 'Track title',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'chart',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/chart/club',
                  'parts' => [
                    'api',
                    'chart',
                    'club',
                  ],
                  'select' => [
                    '$action' => 'club',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.result`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return RadiorecordFeatures::make_feature($name);
    }
}
