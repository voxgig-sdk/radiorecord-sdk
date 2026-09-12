"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Radiorecord',
        slug: "radiorecord",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
        },
    };
    options = {
        base: "https://www.radiorecord.ru",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            chart: {},
        }
    };
    entity = {
        "chart": {
            "fields": [
                {
                    "name": "artist",
                    "short": "Artist name",
                    "type": "`$STRING`"
                },
                {
                    "name": "duration",
                    "short": "Track duration in seconds",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "id",
                    "short": "Track ID",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "image",
                    "short": "Track cover image URL",
                    "type": "`$STRING`"
                },
                {
                    "name": "position",
                    "short": "Chart position",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "title",
                    "short": "Track title",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
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
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "chart"
                                },
                                {
                                    "lit": "club"
                                }
                            ],
                            "select": {
                                "$action": "club"
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.result`"
                            },
                            "parts": [
                                "api",
                                "chart",
                                "club"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map