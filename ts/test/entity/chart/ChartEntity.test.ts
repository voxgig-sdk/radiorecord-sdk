

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { RadiorecordSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('ChartEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when RADIORECORD_TEST_LIVE=TRUE.
  afterEach(liveDelay('RADIORECORD_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = RadiorecordSDK.test()
    const ent = testsdk.Chart()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.RADIORECORD_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'chart.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"chart","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /api/chart/club","json":"{\"operationId\":\"getClubChart\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"result\":{\"items\":{\"properties\":{\"artist\":{\"description\":\"Artist name\",\"type\":\"string\"},\"duration\":{\"description\":\"Track duration in seconds\",\"type\":\"integer\"},\"id\":{\"description\":\"Track ID\",\"type\":\"integer\"},\"image\":{\"description\":\"Track cover image URL\",\"type\":\"string\"},\"position\":{\"description\":\"Chart position\",\"type\":\"integer\"},\"title\":{\"description\":\"Track title\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successfully retrieved club chart\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/chart/club","segments":[{"lit":"api"},{"lit":"chart"},{"lit":"club"}],"select":{"$action":"club"},"transform":{"req":"`reqdata`","res":"`body.result`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"chart","name__orig":"chart","Name":"Chart","name_":"chart","name-":"chart","NAME":"CHART","index$":0}, {"active":true,"entity":"chart","key$":"BasicChartFlow","kind":"basic","name":"BasicChartFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"chart_ref01"}}],"index$":0}]}, 'Chart')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let chart_ref01_data = Object.values(setup.data.existing.chart)[0] as any

    // LIST
    const chart_ref01_ent = client.Chart()
    const chart_ref01_match: any = {}

    const chart_ref01_list = (await chart_ref01_ent.list(chart_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/chart/ChartTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = RadiorecordSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['chart01','chart02','chart03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'RADIORECORD_TEST_CHART_ENTID': idmap,
    'RADIORECORD_TEST_LIVE': 'FALSE',
    'RADIORECORD_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['RADIORECORD_TEST_CHART_ENTID']

  const live = 'TRUE' === env.RADIORECORD_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['RADIORECORD_TEST_CHART_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new RadiorecordSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.RADIORECORD_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
