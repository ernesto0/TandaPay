// @flow
import { showModal } from 'edge-components'
import type { EdgeMetadata, EdgeSpendTarget, EdgeTransaction } from 'edge-core-js'
import { Actions } from 'react-native-router-flux'
import { Bridgeable } from 'yaob'

import { selectWallet } from '../../../../actions/WalletActions'
// import { store } from '../../../../app.js'
import { createCustomWalletListModal } from '../../../../components/modals/CustomWalletListModal'
import { SEND_CONFIRMATION } from '../../../../constants/SceneKeys.js'
import type { GuiMakeSpendInfo } from '../../../../reducers/scenes/SendConfirmationReducer.js'
import * as CORE_SELECTORS from '../../../Core/selectors.js'
import * as UI_SELECTORS from '../../../UI/selectors.js'

type EdgeReceiveAddress = {
  publicAddress?: string,
  segwitAddress?: string,
  legacyAddress?: string
}
type EdgeRequestSpendOptions = {
  // Specify the currencyCode to spend to this URI. Required for spending tokens
  currencyCode?: string,

  // This overrides any parameters specified in a URI such as label or message
  metadata?: EdgeMetadata,
  networkFeeOption?: 'low' | 'standard' | 'high',

  // If true, do not allow the user to change the amount to spend
  lockInputs?: boolean,

  // Do not broadcast transaction
  signOnly?: boolean,

  // Additional identifier such as a payment ID for Monero or destination tag for Ripple/XRP
  // This overrides any parameters specified in a URI
  uniqueIdentifier?: string
}

type EdgeGetReceiveAddressOptions = {
  // Metadata to tag these addresses with for when funds arrive at the address
  metadata?: EdgeMetadata
}

class EdgeProvider extends Bridgeable {
  _plugin: any
  _state: any
  _dispatch: Function

  constructor (plugin: any, state: any, dispatch: Function) {
    super()
    this._plugin = plugin
    this._state = state
    this._dispatch = dispatch
  }
  // Set the currency wallet to interact with. This will show a wallet selector modal
  // for the user to pick a wallet within their list of wallets that match `currencyCodes`
  // Returns the currencyCode chosen by the user (store: Store)
  async chooseCurrencyWallet (currencyCodes: Array<string> = []): Promise<string> {
    const wallets = CORE_SELECTORS.getWallets(this._state)
    const walletsToUse = []
    for (const key in wallets) {
      const wallet = wallets[key]
      if (currencyCodes.length === 0) {
        walletsToUse.push(wallet)
      } else if (currencyCodes.includes(wallet.currencyInfo.currencyCode)) {
        walletsToUse.push(wallet)
      }
    }
    //
    const props = {
      wallets: walletsToUse
    }
    const modal = createCustomWalletListModal(props)
    const selectedWallet = await showModal(modal, { style: { margin: 0 } })
    const code = selectedWallet.currencyInfo.currencyCode
    this._dispatch(selectWallet(selectedWallet.id, code))
    return Promise.resolve(code)
  }
  // Get an address from the user's wallet
  getReceiveAddress (options: EdgeGetReceiveAddressOptions): EdgeReceiveAddress {
    const wallet = UI_SELECTORS.getSelectedWallet(this._state)
    if (options.metadata) {
      wallet.receiveAddress.metadata = options.metadata
    }
    return Promise.resolve(wallet.receiveAddress)
  }
  // Write data to user's account. This data is encrypted and persisted in their Edge
  // account and transferred between devices
  async writeData (data: { [key: string]: string }) {
    const account = CORE_SELECTORS.getAccount(this._state)
    const folder = account.pluginData
    await Promise.all(Object.keys(data).map(key => folder.setItem(this._plugin, key, data[key])))
    return { success: true }
  }
  // Read data back from the user's account. This can only access data written by this same plugin
  // 'keys' is an array of strings with keys to lookup.
  // Returns an object with a map of key value pairs from the keys passed in
  async readData (keys: Array<string>): Object {
    const account = CORE_SELECTORS.getAccount(this._state)
    const folder = account.pluginData
    const returnObj = {}
    for (let i = 0; i < keys.length; i++) {
      try {
        const value = (await folder.getItem('pluginId', keys[i])) || undefined
        returnObj[keys[i]] = value
      } catch (error) {
        returnObj[keys[i]] = undefined
      }
    }
    return Promise.resolve(returnObj)
  }

  // Request that the user spend to an address or multiple addresses
  async requestSpend (spendTargets: Array<EdgeSpendTarget>, options?: EdgeRequestSpendOptions) {
    const info: GuiMakeSpendInfo = {
      spendTargets
    }
    if (options && options.currencyCode) {
      info.currencyCode = options.currencyCode
    }
    if (options && options.customNetworkFee) {
      info.customNetworkFee = options.customNetworkFee
    }
    if (options && options.metadata) {
      info.metadata = options.metadata
    }
    if (options && options.lockInputs) {
      info.lockInputs = options.lockInputs
    }
    if (options && options.uniqueIdentifier) {
      info.uniqueIdentifier = options.uniqueIdentifier
    }
    try {
      const transaction = await this.makeSpendRequest(info)
      Actions.pop()
      return Promise.resolve(transaction)
    } catch (e) {
      return Promise.reject(e)
    }
  }
  // Request that the user spend to a URI
  async requestSpendUri (uri: string, options?: EdgeRequestSpendOptions) {
    const guiWallet = UI_SELECTORS.getSelectedWallet(this._state)
    const coreWallet = CORE_SELECTORS.getWallet(this._state, guiWallet.id)
    const result = await coreWallet.parseUri(uri) /* .then(result => async () => { */
    const info: GuiMakeSpendInfo = {
      currencyCode: result.currencyCode,
      nativeAmount: result.nativeAmount,
      publicAddress: result.publicAddress
    }
    if (options && options.currencyCode) {
      info.currencyCode = options.currencyCode
    }
    if (options && options.customNetworkFee) {
      info.customNetworkFee = options.customNetworkFee
    }
    if (options && options.metadata) {
      info.metadata = options.metadata
    }
    if (options && options.lockInputs) {
      info.lockInputs = options.lockInputs
    }
    if (options && options.uniqueIdentifier) {
      info.uniqueIdentifier = options.uniqueIdentifier
    }
    try {
      const transaction = await this.makeSpendRequest(info)
      Actions.pop()
      return Promise.resolve(transaction)
    } catch (e) {
      return Promise.reject(e)
    }
  }
  // Sign a message using a public address from the current wallet
  /* signMessage (options: EdgeSignMessageOptions): EdgeSignedMessage {
    console.log('a1: signMessage', options)
    // this is about bit id signatures.
    const obj = {
      publicKey: 'string',
      // Hex encoded signature
      signedMessage: 'string'
    }
    return Promise.resolve(obj)
  } */
  // from the older stuff
  async makeSpendRequest (guiMakeSpendInfo: GuiMakeSpendInfo): Promise<EdgeTransaction> {
    const edgeTransaction = await this._spend(guiMakeSpendInfo)
    return edgeTransaction
  }
  _spend (guiMakeSpendInfo: GuiMakeSpendInfo, lockInputs: boolean = true, signOnly: boolean = false): Promise<EdgeTransaction> {
    return new Promise((resolve, reject) => {
      if (signOnly) {
        reject(new Error('not implemented'))
      }
      guiMakeSpendInfo.onDone = (error: Error | null, edgeTransaction?: EdgeTransaction) => {
        error ? reject(error) : resolve(edgeTransaction)
      }
      guiMakeSpendInfo.lockInputs = true
      Actions[SEND_CONFIRMATION]({ guiMakeSpendInfo })
    })
  }
}
export { EdgeProvider }
