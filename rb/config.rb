# Radiorecord SDK configuration

module RadiorecordConfig
  def self.make_config
    {
      "main" => {
        "name" => "Radiorecord",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://www.radiorecord.ru",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "chart" => {},
        },
      },
      "entity" => {
        "chart" => {
          "fields" => [
            {
              "active" => true,
              "name" => "artist",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "duration",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "id",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 2,
            },
            {
              "active" => true,
              "name" => "image",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 3,
            },
            {
              "active" => true,
              "name" => "position",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 4,
            },
            {
              "active" => true,
              "name" => "title",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 5,
            },
          ],
          "name" => "chart",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/chart/club",
                  "parts" => [
                    "api",
                    "chart",
                    "club",
                  ],
                  "select" => {
                    "$action" => "club",
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.result`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    RadiorecordFeatures.make_feature(name)
  end
end
