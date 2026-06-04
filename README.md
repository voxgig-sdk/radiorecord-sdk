# Radiorecord SDK

Charts and tracks from Radio Record, a Russian electronic and dance music broadcaster

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Radiorecord API

[Radio Record](https://www.radiorecord.ru) is a Russian music broadcaster running since 1997, streaming 100+ channels of electronic and dance music (house, trance, techno, EDM, trap and more). This SDK wraps a small public surface exposed by `www.radiorecord.ru` that returns chart data used on the site.

What you get from the API:

- Superchart track listings (artist, title and related metadata as published on the site)
- Data feeding the site's own chart pages (e.g. Superchart, Club chart, NEW)

Operational notes:

- No authentication is documented for the public chart endpoints.
- CORS is reported as disabled, so calls from browsers will typically need a server-side proxy.
- The API is unofficial in the sense that Radio Record does not publish formal developer documentation; behaviour may change without notice.

## Try it

**TypeScript**
```bash
npm install radiorecord
```

**Python**
```bash
pip install radiorecord-sdk
```

**PHP**
```bash
composer require voxgig/radiorecord-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/radiorecord-sdk/go
```

**Ruby**
```bash
gem install radiorecord-sdk
```

**Lua**
```bash
luarocks install radiorecord-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { RadiorecordSDK } from 'radiorecord'

const client = new RadiorecordSDK({})

// List all charts
const charts = await client.Chart().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o radiorecord-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "radiorecord": {
      "command": "/abs/path/to/radiorecord-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Chart** | A Radio Record chart such as the Superchart, served from paths like `/api/superchart`, containing the ordered list of tracks currently featured on the site. | `/api/chart/club` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from radiorecord_sdk import RadiorecordSDK

client = RadiorecordSDK({})

# List all charts
charts, err = client.Chart(None).list(None, None)
```

### PHP

```php
<?php
require_once 'radiorecord_sdk.php';

$client = new RadiorecordSDK([]);

// List all charts
[$charts, $err] = $client->Chart(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/radiorecord-sdk/go"

client := sdk.NewRadiorecordSDK(map[string]any{})

// List all charts
charts, err := client.Chart(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "Radiorecord_sdk"

client = RadiorecordSDK.new({})

# List all charts
charts, err = client.Chart(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("radiorecord_sdk")

local client = sdk.new({})

-- List all charts
local charts, err = client:Chart(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = RadiorecordSDK.test()
const result = await client.Chart().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = RadiorecordSDK.test(None, None)
result, err = client.Chart(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = RadiorecordSDK::test(null, null);
[$result, $err] = $client->Chart(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Chart(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = RadiorecordSDK.test(nil, nil)
result, err = client.Chart(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Chart(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Radiorecord API

- Upstream: [https://www.radiorecord.ru](https://www.radiorecord.ru)
- API docs: [https://freepublicapis.com/radiorecord-api](https://freepublicapis.com/radiorecord-api)

---

Generated from the Radiorecord API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
