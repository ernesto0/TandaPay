// @flow

import { scale } from '../../lib/scaling.js'
import THEME from '../../theme/variables/airbitz'
import * as Styles from '../indexStyles.js'
// import {Image} from 'react-native'

const OtpSettingsScreenStyles = {
  container: {
    backgroundColor: THEME.COLORS.WHITE,
    height: '100%',
    width: '100%'
  },
  gradient: {
    height: THEME.HEADER
  },
  body: {
    padding: scale(18)
  },
  hero: {
    container: {
      width: '100%',
      height: scale(120),
      alignItems: 'center',
      backgroundColor: THEME.COLORS.TRANSPARENT
    },
    icon: {},
    shim: {
      height: scale(10)
    },
    imageSize: scale(50),
    bodyText: {
      width: '100%',
      textAlign: 'center',
      fontSize: scale(21),
      color: THEME.COLORS.GRAY_1
    }
  },
  shim: {
    height: scale(10)
  },
  middle: {
    width: '100%',
    minHeight: scale(200)
  },
  middleText: {
    width: '100%',
    fontSize: scale(18),
    textAlign: 'center',
    fontFamily: THEME.FONTS.DEFAULT,
    color: THEME.COLORS.GRAY_2
  },
  keyText: {
    width: '100%',
    fontSize: scale(18),
    textAlign: 'center',
    fontFamily: THEME.FONTS.DEFAULT,
    color: THEME.COLORS.GRAY_1
  },
  buttonContainer: {
    width: '100%',
    height: scale(THEME.BUTTONS.HEIGHT)
  },
  keyBox: Styles.ExpandableBoxStyle,
  showConfirmationModal: Styles.TwoButtonModalStyle,
  icon: {
    color: THEME.COLORS.WHITE
  },
  iconSize: scale(36)
}

export { OtpSettingsScreenStyles }
