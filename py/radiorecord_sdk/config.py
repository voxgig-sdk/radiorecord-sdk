# Radiorecord SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Radiorecord",
            "slug": "radiorecord",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
            "name": "artist",
            "short": "Artist name",
            "type": "`$STRING`",
          },
          {
            "name": "duration",
            "short": "Track duration in seconds",
            "type": "`$INTEGER`",
          },
          {
            "name": "id",
            "short": "Track ID",
            "type": "`$INTEGER`",
          },
          {
            "name": "image",
            "short": "Track cover image URL",
            "type": "`$STRING`",
          },
          {
            "name": "position",
            "short": "Chart position",
            "type": "`$INTEGER`",
          },
          {
            "name": "title",
            "short": "Track title",
            "type": "`$STRING`",
          },
        ],
        "name": "chart",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
