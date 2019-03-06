// @flow

import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { TextField } from 'react-native-material-textfield'

import { THEME } from '../../../../../theme/variables/airbitz.js'

const DEFAULTS = {
  tintColor: THEME.COLORS.SECONDARY,
  baseColor: THEME.COLORS.SECONDARY
}

export type Props = {
  activeLineWidth?: number,
  affixTextStyle?: StyleSheet.Styles,
  animationDuration?: number,
  baseColor?: string,
  characterRestriction?: Array<string>,
  containerStyle?: StyleSheet.Styles,
  disabled?: boolean,
  disabledLineType?: string,
  disabledLineWidth?: number,
  editable?: boolean,
  error?: string,
  errorColor?: string,
  fontSize?: number,
  inputContainerPadding?: number,
  inputContainerStyle?: StyleSheet.Styles,
  label?: string,
  labelFontSize?: number,
  labelHeight?: number,
  labelPadding?: number,
  labelTextStyle?: StyleSheet.Styles,
  lineWidth?: number,
  multiline?: boolean,
  onBlur?: Function,
  onChangeText?: Function,
  onFocus?: Function,
  prefix?: string,
  renderAccessory?: boolean,
  secureTextEntry?: boolean,
  suffix?: string,
  textColor?: string,
  tintColor?: string,
  title?: string,
  titleFontSize?: number,
  titleTextStyle?: StyleSheet.Styles,
  value?: string
}
export class TextInput extends Component<Props> {
  render () {
    const props = { ...DEFAULTS, ...this.props }
    return <TextField {...props} />
  }
}
