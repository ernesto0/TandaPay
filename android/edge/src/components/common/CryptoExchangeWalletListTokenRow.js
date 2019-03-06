// @flow
import React, { Component } from 'react'
import { Text, TouchableHighlight, View } from 'react-native'

import FormattedText from '../../modules/UI/components/FormattedText/index'
import { CryptoExchangeWalletListRowStyle as styles } from '../../styles/indexStyles'

type Props = {
  currencyCode: string,
  parentId: string,
  fiatSymbol: string,
  fiatBalance: string,
  cryptoBalance: string,
  onPress({ id: string, currencyCode: string }): void
}
type LocalState = {}

class CryptoExchangeWalletListTokenRow extends Component<Props, LocalState> {
  onPress = () => {
    this.props.onPress({
      id: this.props.parentId,
      currencyCode: this.props.currencyCode
    })
  }
  render () {
    return (
      <TouchableHighlight style={styles.touchable} underlayColor={styles.underlayColor} onPress={this.onPress}>
        <View style={styles.containerToken}>
          <View style={styles.containerLeft} />
          <View style={styles.containerCenter}>
            <FormattedText>{this.props.currencyCode}</FormattedText>
          </View>
          <View style={styles.containerRight}>
            <View style={styles.holderView}>
              <Text style={styles.balanceTextStyle}>{this.props.cryptoBalance}</Text>
              <Text style={styles.balanceTextStyle}>
                {this.props.fiatSymbol} {this.props.fiatBalance}
              </Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

export { CryptoExchangeWalletListTokenRow }
