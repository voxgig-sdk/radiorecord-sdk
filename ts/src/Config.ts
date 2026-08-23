
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Radiorecord',
        slug: "radiorecord",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://www.radiorecord.ru",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      chart: {
      },

    }
  }


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
                "club"
              ],
              "select": {
                "$action": "club"
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.result`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

