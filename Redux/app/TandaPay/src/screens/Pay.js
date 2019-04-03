import React from 'react';
import { StyleSheet, View, TextInput, Button, Text, ListView, TouchableOpacity,Linking } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
//import {DrawerNavigator} from'react-navigation';
import {DrawerNavigator,DrawerItems} from 'react-navigation';
import LoginScreen from './LoginScreen';

const styles = StyleSheet.create(
  {
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
    tandaLogo: {
        color: '#5f9ea0',
        fontWeight: 'bold',
        fontSize: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    RegularText: {
      color: '#333738',
      fontWeight: 'bold',
      fontSize: 30,
      alignItems: 'center',
      justifyContent: 'center'
  }
  }
);



export default class Pay extends React.Component {

  constructor(props){
    super(props);
 
 }
 

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.tandaLogo}>Pay</Text>
        <Text style={styles.RegularText}>Your Secretary Address is:</Text>
        <Text style={styles.RegularText}>0x52E68c9c2E784Dd3303aE6f55E4A2764D998d4Db</Text>
        <Button
        onPress={ ()=> Linking.openURL('https://links.trustwalletapp.com/a/key_live_lfvIpVeI9TFWxPCqwU8rZnogFqhnzs4D?&event=openURL&url=https://tandahelp.weebly.com')}//https://links.trustwalletapp.com/a/key_live_lfvIpVeI9TFWxPCqwU8rZnogFqhnzs4D?&event=openURL&url=https://google.com
        title="Pay"
        color="#841584"
        accessibilityLabel="Accesses Trust Wallet"
        />
      </View>
    );
  }
  
}