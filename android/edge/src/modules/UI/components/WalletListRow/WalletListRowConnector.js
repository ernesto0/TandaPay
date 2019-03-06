// @flow
import { connect } from 'react-redux'

import type { Dispatch, State } from '../../../ReduxTypes'
import { getDisplayDenomination, getExchangeDenomination } from '../../../Settings/selectors.js'
import { calculateWalletFiatBalance } from '../../selectors.js'
import { WalletListRowComponent } from './WalletListRow.ui.js'
import type { WalletListRowDispatchProps, WalletListRowOwnProps, WalletListRowStateProps } from './WalletListRow.ui.js'

const mapStateToProps = (state: State, ownProps: WalletListRowOwnProps): WalletListRowStateProps => {
  const displayDenomination = getDisplayDenomination(state, ownProps.wallet.currencyCode)
  const exchangeDenomination = getExchangeDenomination(state, ownProps.wallet.currencyCode)
  const settings = state.ui.settings
  const fiatBalance = calculateWalletFiatBalance(ownProps.wallet, state)
  return {
    displayDenomination,
    exchangeDenomination,
    fiatBalance,
    settings
  }
}
const mapDispatchToProps = (dispatch: Dispatch): WalletListRowDispatchProps => {
  return {}
}

export const WalletListRowConnector = connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletListRowComponent)
