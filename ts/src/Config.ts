
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


  main = {
    name: 'Radiorecord',
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
          "type": "`$STRING`"
        },
        {
          "name": "duration",
          "type": "`$INTEGER`"
        },
        {
          "name": "id",
          "type": "`$INTEGER`"
        },
        {
          "name": "image",
          "type": "`$STRING`"
        },
        {
          "name": "position",
          "type": "`$INTEGER`"
        },
        {
          "name": "title",
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

