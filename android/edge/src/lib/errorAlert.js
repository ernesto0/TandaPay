// @flow

import type { Action, Store } from '../modules/ReduxTypes.js'
import { displayErrorAlertStore } from '../modules/UI/components/ErrorAlert/actions.js'

let showingError = false

export default (store: Store) => (next: Function) => (action: Action) => {
  let out
  try {
    out = next(action)
  } catch (error) {
    console.log(error)
    if (!showingError) {
      showingError = true
      store.dispatch(displayErrorAlertStore(error.message))
      showingError = false
    } else {
      console.error('Infinite redux error cycle detected')
    }
  }

  if (out && out.then && typeof out.then === 'function') {
    out.catch(error => {
      console.log(error)
      store.dispatch(displayErrorAlertStore(error.message))
    })
  }

  return out
}
