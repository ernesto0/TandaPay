// @flow

import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import * as UTILS from '../../../../util/utils'
import type { Dispatch, State } from '../../../ReduxTypes'
import * as SETTINGS_SELECTORS from '../../../Settings/selectors'
import { dismissTransactionAlert } from './actions.js'
import TransactionAlert from './TransactionAlert.ui'

const mapStateToProps = (state: State) => {
  const edgeTransaction = state.ui.transactionAlert.edgeTransaction
  const displayAlert = state.ui.transactionAlert.displayAlert
  const loginStatus = state.ui.settings.loginStatus
  if (!displayAlert || !edgeTransaction || !loginStatus) {
    return {
      displayAlert: false
    }
  }

  const { nativeAmount, currencyCode } = edgeTransaction
  const displayDenomination = SETTINGS_SELECTORS.getDisplayDenomination(state, currencyCode || 'ETH')
  // $FlowFixMe
  const { symbol: displaySymbol, name: displayName, multiplier: displayMultiplier } = displayDenomination
  const displayAmount = UTILS.convertNativeToDisplay(displayMultiplier)(nativeAmount)
  const viewTransaction = () => Actions.transactionDetails({ edgeTransaction })

  return {
    displayAlert,
    displayName,
    displayAmount,
    displaySymbol,
    viewTransaction
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => ({
  dismissAlert: () => dispatch(dismissTransactionAlert())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionAlert)
