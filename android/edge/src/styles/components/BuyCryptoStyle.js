// @flow

import { StyleSheet } from 'react-native'

import { scale } from '../../lib/scaling.js'
import THEME from '../../theme/variables/airbitz'

export const styles = {
  multipleCallToActionWrap: {
    padding: scale(15)
  },
  buyMultipleCryptoContainer: {
    height: scale(180),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(15)
  },
  buyMultipleCryptoBox: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: THEME.COLORS.WHITE,
    padding: scale(15),
    marginTop: scale(15)
  },
  buyMultipleCryptoContentWrap: {
    flexDirection: 'row'
  },
  buyMultipleCryptoBoxImage: {
    width: scale(32),
    height: scale(32),
    marginHorizontal: scale(4)
  },
  buyMultipleCryptoBoxText: {
    marginTop: scale(10),
    fontSize: scale(17),
    color: THEME.COLORS.GRAY_1
  }
}

export const buyMultipleCryptoStyle = StyleSheet.create(styles)
