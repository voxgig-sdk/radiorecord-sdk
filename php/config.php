<?php
declare(strict_types=1);

// Radiorecord SDK configuration

class RadiorecordConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Radiorecord",
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
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'duration',
              'req' => false,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 1,
            ],
            [
              'name' => 'id',
              'req' => false,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 2,
            ],
            [
              'name' => 'image',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 3,
            ],
            [
              'name' => 'position',
              'req' => false,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 4,
            ],
            [
              'name' => 'title',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 5,
            ],
          ],
          'name' => 'chart',
          'op' => [
            'list' => [
              'name' => 'list',
              'points' => [
                [
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
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'args' => [],
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'list',
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
