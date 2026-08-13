# Radiorecord SDK configuration


def make_config():
    return {
        "main": {
            "name": "Radiorecord",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://www.radiorecord.ru",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "chart": {},
            },
        },
        "entity": {
      "chart": {
        "fields": [
          {
            "active": True,
            "name": "artist",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "duration",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "id",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "image",
            "req": False,
            "type": "`$STRING`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "position",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "title",
            "req": False,
            "type": "`$STRING`",
            "index$": 5,
          },
        ],
        "name": "chart",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/api/chart/club",
                "parts": [
                  "api",
                  "chart",
                  "club",
                ],
                "select": {
                  "$action": "club",
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.result`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
