// @flow

/* globals test expect */

import { initialState as SendConfirmationInitialState } from '../modules/UI/scenes/SendConfirmation/selectors.js'
import { request } from '../reducers/scenes/RequestReducer.js'
import { scenes as scenesReducer } from '../reducers/scenes/ScenesReducer.js'

const dummyAction = { type: 'DUMMY_ACTION_PLEASE_IGNORE' }

test('initialState', () => {
  const expected = {
    ABAlert: {
      syntax: {
        buttons: [],
        message: '',
        title: ''
      },
      view: false
    },
    controlPanel: {
      selectedUser: null,
      usersView: false
    },
    createWallet: {
      isCreatingWallet: false,
      walletAccountActivationPaymentInfo: {
        paymentAddress: '',
        amount: '',
        currencyCode: '',
        exchangeAmount: '',
        expireTime: 0
      },
      isCheckingHandleAvailability: false,
      handleAvailableStatus: '',
      handleActivationInfo: {
        supportedCurrencies: {},
        activationCost: ''
      },
      walletAccountActivationQuoteError: ''
    },
    dimensions: {
      keyboardHeight: 0
    },
    editToken: {
      deleteCustomTokenProcessing: false,
      deleteTokenModalVisible: false,
      editCustomTokenProcessing: false
    },
    exchangeRate: {
      exchangeRates: {}
    },
    helpModal: false,
    request: request(undefined, dummyAction),
    requestType: {
      useLegacyAddress: false,
      uniqueLegacyAddress: false
    },
    scan: {
      scanEnabled: false,
      torchEnabled: false,
      privateKeyModal: {
        error: null,
        isSweeping: false,
        secondaryModal: {
          isActive: false
        }
      },
      parsedUri: null
    },
    sendConfirmation: SendConfirmationInitialState,
    changeMiningFee: {
      isCustomFeeVisible: false
    },
    transactionAlert: {
      edgeTransaction: null,
      displayAlert: false
    },
    transactionDetails: {
      subcategories: []
    },
    transactionList: {
      searchVisible: false,
      transactions: [],
      transactionIdMap: {},
      currentCurrencyCode: '',
      currentEndIndex: 0,
      numTransactions: 0,
      currentWalletId: ''
    },
    walletList: {
      viewXPubWalletModalVisible: false,
      xPubSyntax: '',
      walletArchivesVisible: false,
      walletId: ''
    },
    walletListModal: {
      walletListModalVisible: false
    },
    walletTransferList: {
      walletListModalVisible: false,
      walletTransferList: []
    },
    currentScene: '',
    passwordReminderModal: {
      status: null
    },
    passwordRecoveryReminderModal: {
      isVisible: false
    },
    uniqueIdentifierModal: {
      isActive: false,
      uniqueIdentifier: undefined
    }
  }
  const actual = scenesReducer(undefined, dummyAction)

  expect(actual).toEqual(expected)
})
