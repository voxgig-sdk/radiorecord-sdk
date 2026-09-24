
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { RadiorecordSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = RadiorecordSDK.test()
    equal(testsdk instanceof RadiorecordSDK, true,
      'RadiorecordSDK.test() must return a client synchronously')
  })

})
