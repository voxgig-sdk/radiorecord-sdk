-- Radiorecord SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Radiorecord",
      slug = "radiorecord",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://www.radiorecord.ru",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["chart"] = {},
      },
    },
    entity = {
      ["chart"] = {
        ["fields"] = {
          {
            ["name"] = "artist",
            ["short"] = "Artist name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "duration",
            ["short"] = "Track duration in seconds",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "id",
            ["short"] = "Track ID",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "image",
            ["short"] = "Track cover image URL",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "position",
            ["short"] = "Chart position",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "title",
            ["short"] = "Track title",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "chart",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/chart/club",
                ["parts"] = {
                  "api",
                  "chart",
                  "club",
                },
                ["select"] = {
                  ["$action"] = "club",
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.result`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
