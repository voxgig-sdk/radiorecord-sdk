package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/radiorecord-sdk/go"
	"github.com/voxgig-sdk/radiorecord-sdk/go/core"

	vs "github.com/voxgig-sdk/radiorecord-sdk/go/utility/struct"
)

func TestChartEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Chart(nil)
		if ent == nil {
			t.Fatal("expected non-nil ChartEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := chartBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "chart." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set RADIORECORD_TEST_CHART_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		chartRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.chart", setup.data)))
		var chartRef01Data map[string]any
		if len(chartRef01DataRaw) > 0 {
			chartRef01Data = core.ToMapAny(chartRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = chartRef01Data

		// LIST
		chartRef01Ent := client.Chart(nil)
		chartRef01Match := map[string]any{}

		chartRef01ListResult, err := chartRef01Ent.List(chartRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, chartRef01ListOk := chartRef01ListResult.([]any)
		if !chartRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", chartRef01ListResult)
		}

	})
}

func chartBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "chart", "ChartTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read chart test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse chart test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"chart01", "chart02", "chart03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("RADIORECORD_TEST_CHART_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"RADIORECORD_TEST_CHART_ENTID": idmap,
		"RADIORECORD_TEST_LIVE":      "FALSE",
		"RADIORECORD_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["RADIORECORD_TEST_CHART_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["RADIORECORD_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewRadiorecordSDK(core.ToMapAny(mergedOpts))
	}

	live := env["RADIORECORD_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["RADIORECORD_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
