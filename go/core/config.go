package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Radiorecord",
			"slug": "radiorecord",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://www.radiorecord.ru",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"chart": map[string]any{},
			},
		},
		"entity": map[string]any{
			"chart": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "artist",
						"short": "Artist name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "duration",
						"short": "Track duration in seconds",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"short": "Track ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "image",
						"short": "Track cover image URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "position",
						"short": "Chart position",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "title",
						"short": "Track title",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "chart",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/chart/club",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "chart",
									},
									map[string]any{
										"lit": "club",
									},
								},
								"select": map[string]any{
									"$action": "club",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.result`",
								},
								"parts": []any{
									"api",
									"chart",
									"club",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
