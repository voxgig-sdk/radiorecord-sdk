
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { RadiorecordSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await RadiorecordSDK.test()
    equal(null !== testsdk, true)
  })

})
