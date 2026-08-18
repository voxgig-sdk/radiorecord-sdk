# Radiorecord SDK configuration

module RadiorecordConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
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
              "name" => "artist",
              "type" => "`$STRING`",
            },
            {
              "name" => "duration",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "id",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "image",
              "type" => "`$STRING`",
            },
            {
              "name" => "position",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "title",
              "type" => "`$STRING`",
            },
          ],
          "name" => "chart",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
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
                },
              ],
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
