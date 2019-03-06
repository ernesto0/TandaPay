// @flow

import { createInputModal, showModal } from 'edge-components'
import { type EdgeMetadata } from 'edge-core-js'
import React from 'react'
import { BackHandler, FlatList, Image, Platform, Text, TouchableWithoutFeedback, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { WebView } from 'react-native-webview'
import { connect } from 'react-redux'
import parse from 'url-parse'
import { Bridge } from 'yaob'

import ENV from '../../../env.json'
import { sendConfirmationUpdateTx } from '../../actions/SendConfirmationActions'
import { selectWallet } from '../../actions/WalletActions'
import { PLUGIN_SPEND, SPEND } from '../../constants/indexConstants'
import { javascript } from '../../lib/bridge/injectThisInWebView.js'
import s from '../../locales/strings.js'
import * as CORE_SELECTORS from '../../modules/Core/selectors.js'
import { openABAlert } from '../../modules/UI/components/ABAlert/action'
import T from '../../modules/UI/components/FormattedText/index'
import Gradient from '../../modules/UI/components/Gradient/Gradient.ui'
import BackButton from '../../modules/UI/components/Header/Component/BackButton.ui'
import SafeAreaView from '../../modules/UI/components/SafeAreaView/index'
import { PluginBridge, pop as pluginPop } from '../../modules/UI/scenes/Plugins/api'
import { EdgeProvider } from '../../modules/UI/scenes/Plugins/bridgeApi'
import { buySellPlugins, spendPlugins } from '../../modules/UI/scenes/Plugins/plugins'
import * as UI_SELECTORS from '../../modules/UI/selectors.js'
import type { GuiMakeSpendInfo } from '../../reducers/scenes/SendConfirmationReducer.js'
import styles from '../../styles/scenes/PluginsStyle.js'
import { THEME, colors } from '../../theme/variables/airbitz.js'

const BACK = s.strings.title_back

type PluginListProps = {
  developerModeOn: boolean
}

type PluginListState = {
  data: Array<Object>
}

class PluginList extends React.Component<PluginListProps, PluginListState> {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
  }

  _onPress = plugin => {
    if (Actions.currentScene === SPEND) {
      Actions[PLUGIN_SPEND]({ plugin: plugin })
      return
    }
    if (plugin.pluginId === 'custom') {
      const yesButton = {
        title: s.strings.load_plugin
      }
      const noButton = {
        title: s.strings.string_cancel_cap
      }
      const input = {
        label: s.strings.plugin_url,
        autoCorrect: false,
        returnKeyType: 'go',
        initialValue: '',
        autoFocus: true
      }
      const modal = createInputModal({
        icon: (
          <IonIcon
            name="md-globe"
            size={42}
            color={colors.primary}
            style={[
              {
                backgroundColor: THEME.COLORS.TRANSPARENT,
                zIndex: 1015,
                elevation: 1015
              }
            ]}
          />
        ),
        title: s.strings.load_plugin,
        input,
        yesButton,
        noButton
      })
      showModal(modal).then(response => {
        if (response) {
          plugin.sourceFile = { uri: response }
        }
        Actions.plugin({ plugin: plugin })
      })
      return
    }
    Actions.plugin({ plugin: plugin })
  }

  _renderPlugin = ({ item }) => (
    <TouchableWithoutFeedback onPress={() => this._onPress(item)}>
      <View style={styles.pluginRow}>
        <View style={styles.pluginBox}>
          <View style={styles.pluginLeft}>
            <View style={styles.logoWrap}>
              <View style={[styles.logo]}>{item.imageUrl && <Image style={{ height: '100%' }} source={{ uri: item.imageUrl }} />}</View>
            </View>
            <View style={styles.textBoxWrap}>
              <Text style={styles.titleBox}>{item.name}</Text>
              <Text style={styles.subtitleBox}>{item.subtitle}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )

  render () {
    return (
      <SafeAreaView>
        <Gradient style={styles.gradient} />
        <View style={styles.container}>
          <FlatList data={this.state.data} renderItem={this._renderPlugin} keyExtractor={item => item.name} />
        </View>
      </SafeAreaView>
    )
  }
}

class PluginBuySellComponent extends PluginList {
  componentDidMount () {
    console.log('pl: ', this.props.developerModeOn)
    this.setState({
      data: buySellPlugins(this.props.developerModeOn)
    })
  }
}

class PluginSpendComponent extends PluginList {
  componentDidMount () {
    this.setState({
      data: spendPlugins(this.props.developerModeOn)
    })
  }
}

const listMapStateToProps = state => {
  const developerModeOn = state.ui.settings.developerModeOn
  return {
    developerModeOn
  }
}

const listMapDispatchToProps = dispatch => ({})

const PluginBuySell = connect(
  listMapStateToProps,
  listMapDispatchToProps
)(PluginBuySellComponent)

const PluginSpend = connect(
  listMapStateToProps,
  listMapDispatchToProps
)(PluginSpendComponent)

type PluginProps = {
  plugin: any,
  navigation: any,
  showAlert: Function,
  account: any,
  guiWallet: any,
  coreWallet: any,
  coreWallets: any,
  wallets: any,
  walletName: any,
  walletId: any,
  currentState: any,
  thisDispatch: Function,
  selectWallet(string, string): void,
  sendConfirmationUpdateTx(GuiMakeSpendInfo): void
}

type PluginState = {
  showWalletList: any
}

export function renderPluginBackButton (label: string = BACK) {
  return <BackButton withArrow onPress={pluginPop} label={label} />
}

class PluginView extends React.Component<PluginProps, PluginState> {
  bridge: any
  plugin: any
  updateBridge: Function
  webview: any
  successUrl: ?string
  openingSendConfirmation: boolean
  yaobBridge: Bridge
  constructor (props) {
    super(props)
    this.state = {
      showWalletList: false
    }
    this.webview = null
    this.plugin = this.props.plugin
    this.plugin.environment.apiKey = ENV.PLUGIN_API_KEYS ? ENV.PLUGIN_API_KEYS[this.plugin.name] : 'edgeWallet' // latter is dummy code
    this.updateBridge(this.props)
  }

  updateBridge (props) {
    this.bridge = new PluginBridge({
      plugin: props.plugin,
      account: props.account,
      coreWallets: props.coreWallets,
      wallets: props.wallets,
      walletName: props.walletName,
      walletId: props.walletId,
      navigationState: this.props.navigation.state,
      folder: props.account.pluginData,
      pluginId: this.plugin.pluginId,
      toggleWalletList: this.toggleWalletList,
      chooseWallet: this.chooseWallet,
      showAlert: this.props.showAlert,
      back: this._webviewBack,
      renderTitle: this._renderTitle,
      edgeCallBack: this.edgeCallBack
    })
  }

  chooseWallet = (walletId: string, currencyCode: string) => {
    this.props.selectWallet(walletId, currencyCode)
  }
  toggleWalletList = () => {
    this.setState({ showWalletList: !this.state.showWalletList })
  }

  handleBack = () => {
    pluginPop()
    return true
  }

  componentDidUpdate () {
    this.bridge.context.coreWallets = this.props.coreWallets
    this.bridge.context.wallets = this.props.wallets
    this.bridge.context.walletName = this.props.walletName
    this.bridge.context.walletId = this.props.coreWallet.id
    this.bridge.context.wallet = this.props.coreWallet
  }

  componentDidMount () {
    this.bridge.componentDidMount()
    BackHandler.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBack)
  }

  _renderWebView = () => {
    return this.plugin.sourceFile
  }

  _webviewBack = () => {
    this.webview.injectJavaScript('window.history.back()')
  }
  _webviewOpenUrl = (url: string) => {
    this.webview.injectJavaScript("window.open('" + url + "', '_self')")
  }

  _renderTitle = title => {
    Actions.refresh({
      renderTitle: (
        <View style={styles.titleWrapper}>
          <T style={styles.titleStyle}>{title}</T>
        </View>
      )
    })
  }

  _pluginReturn = data => {
    this.webview.injectJavaScript(`window.PLUGIN_RETURN('${JSON.stringify(data)}')`)
  }

  _nextMessage = datastr => {
    this.webview.injectJavaScript(`window.PLUGIN_NEXT('${datastr}')`)
  }

  _onMessage = event => {
    if (!this.webview) {
      return
    }
    let data = null
    try {
      data = JSON.parse(event.nativeEvent.data)
    } catch (e) {
      console.log(e)
      return
    }
    const { cbid, func } = data
    if (!cbid && !func) {
      this.yaobBridge.handleMessage(data)
      return
    }
    this._nextMessage(cbid)
    if (this.bridge[func]) {
      this.bridge[func](data)
        .then(res => {
          this._pluginReturn({ cbid, func, err: null, res })
        })
        .catch(err => {
          this._pluginReturn({ cbid, func, err, res: null })
        })
    } else if (func === 'edgeCallBack') {
      // this is if we are taking what used to be a callback url. There is no promise to return.
      this.edgeCallBack(data)
    } else {
      this._pluginReturn({ cbid, func, err: 'invalid function' })
    }
  }

  _setWebview = webview => {
    this.webview = webview
  }
  // This is the preferred method for calling back . it does not return any promise like other bridge calls.
  edgeCallBack = data => {
    switch (data['edge-callback']) {
      case 'paymentUri':
        if (this.openingSendConfirmation) {
          return
        }
        this.openingSendConfirmation = true
        this.props.coreWallet.parseUri(data['edge-uri']).then(result => {
          if (typeof result.currencyCode === 'string' && typeof result.nativeAmount === 'string' && typeof result.publicAddress === 'string') {
            let metadata: ?EdgeMetadata = {
              name: data['edge-source'] || (result.metadata ? result.metadata.name : undefined),
              category: result.metadata ? result.metadata.category : undefined,
              notes: result.metadata ? result.metadata.notes : undefined
            }
            if (metadata && !metadata.name && !metadata.category && !metadata.notes) {
              metadata = undefined
            }
            const info: GuiMakeSpendInfo = {
              currencyCode: result.currencyCode,
              nativeAmount: result.nativeAmount,
              publicAddress: result.publicAddress,
              metadata,
              onBack: () => {
                this.openingSendConfirmation = false
              }
            }
            this.successUrl = data['x-success']
            this.bridge
              .makeSpendRequest(info)
              .then(tr => {
                this.openingSendConfirmation = false
                Actions.pop()
                if (this.successUrl) {
                  this._webviewOpenUrl(this.successUrl)
                }
              })
              .catch(e => {
                console.log(e)
              })
          }
        })
        break
    }
  }

  _onNavigationStateChange = navState => {
    if (navState.loading) {
      return
    }
    const parsedUrl = parse(navState.url, {}, true)

    // TODO: if no partners are using this we should delete
    if (parsedUrl.protocol === 'edge:' && parsedUrl.hostname === 'x-callback-url') {
      switch (parsedUrl.pathname) {
        case '/paymentUri':
          if (this.openingSendConfirmation) {
            return
          }

          this.openingSendConfirmation = true
          this.props.coreWallet.parseUri(parsedUrl.query.uri).then(result => {
            const info: GuiMakeSpendInfo = {
              currencyCode: result.currencyCode,
              nativeAmount: result.nativeAmount,
              publicAddress: result.publicAddress
            }
            this.successUrl = parsedUrl.query['x-success'] ? parsedUrl.query['x-success'] : null
            this.bridge
              .makeSpendRequest(info)
              .then(tr => {
                this.openingSendConfirmation = false
                Actions.pop()
                if (this.successUrl) {
                  this._webviewOpenUrl(this.successUrl)
                }
              })
              .catch(e => {
                console.log(e)
              })
          })
          break
        default:
          console.log('nothing yet')
      }

      return
    }
    if (parsedUrl.protocol === 'edge-ret:') {
      Actions.pop()
      return
    }
    if (parsedUrl.origin === this.successUrl) {
      this.bridge.navStackClear()
      return
    }

    if (!navState.canGoForward) {
      this.bridge.navStackPush(navState.url)
    } else if (!navState.canGoBack) {
      this.bridge.navStackClear()
    }
  }

  webviewLoaded = () => {
    this.yaobBridge = new Bridge({
      sendMessage: message => this.webview.injectJavaScript(`window.bridge.handleMessage(${JSON.stringify(message)})`)
    })
    const edgeProvider = new EdgeProvider(this.props.plugin, this.props.currentState, this.props.thisDispatch)
    this.yaobBridge.sendRoot(edgeProvider)
  }
  render () {
    const contentScaling = Platform.OS !== 'ios'
    return (
      <SafeAreaView>
        <Gradient style={styles.gradient} />
        <WebView
          allowFileAccess
          allowUniversalAccessFromFileURLs
          onMessage={this._onMessage}
          onLoadEnd={this.webviewLoaded}
          javaScriptEnabled={true}
          injectedJavaScript={javascript}
          onNavigationStateChange={this._onNavigationStateChange}
          originWhitelist={['file://', 'https://', 'http://', 'edge://']}
          ref={this._setWebview}
          scalesPageToFit={contentScaling}
          source={this._renderWebView()}
          userAgent={
            'Mozilla/5.0 (Linux; Android 6.0.1; SM-G532G Build/MMB29T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.83 Mobile Safari/537.36'
          }
          setWebContentsDebuggingEnabled={true}
        />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  const account = CORE_SELECTORS.getAccount(state)
  const guiWallet = UI_SELECTORS.getSelectedWallet(state)
  const coreWallet = CORE_SELECTORS.getWallet(state, guiWallet.id)
  const coreWallets = state.core.wallets.byId
  const wallets = state.ui.wallets.byId
  const walletName = coreWallet.name
  const walletId = coreWallet.id
  const currentState = state
  return {
    account,
    guiWallet,
    coreWallet,
    coreWallets,
    wallets,
    walletName,
    walletId,
    currentState
  }
}

const mapDispatchToProps = dispatch => ({
  showAlert: alertSyntax => dispatch(openABAlert('OPEN_AB_ALERT', alertSyntax)),
  selectWallet: (walletId: string, currencyCode: string) => dispatch(selectWallet(walletId, currencyCode)),
  sendConfirmationUpdateTx: (info: GuiMakeSpendInfo) => dispatch(sendConfirmationUpdateTx(info)),
  thisDispatch: dispatch
})

const PluginViewConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(PluginView)
export { PluginViewConnect, PluginBuySell, PluginSpend }
