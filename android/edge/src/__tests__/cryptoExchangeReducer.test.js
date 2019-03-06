// @flow

/* globals test expect */

import { cryptoExchange } from '../reducers/CryptoExchangeReducer.js'

const dummyAction = { type: 'DUMMY_ACTION_PLEASE_IGNORE' }

test('initialState', () => {
  const actual = cryptoExchange(undefined, dummyAction)

  expect(actual).toMatchSnapshot()
})
