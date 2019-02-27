import React from 'react';
import { Alert, AppRegistry, Button, StyleSheet, Text, View } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { Linking } from 'react-native';
import TrustWallet, { MessagePayload, TransactionPayload } from 'react-native-trust-sdk';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigBlue: {
    color: '#5f9ea0',
    fontWeight: 'bold',
    fontSize: 70,
  },
  bigGrey: {
    color: '#A9A9A9',
    fontSize: 20,
  },
  buttonContainer: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
});

export default class startScreen extends React.Component {

  _onPressWallet() {
    url = 'https://links.trustwalletapp.com/a/key_live_lfvIpVeI9TFWxPCqwU8rZnogFqhnzs4D?&event=openURL&url=https://google.com';
    Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        console.log("Can't handle url: " + url);
      } else {
        return Linking.openURL(url);
      }
    })
    .catch((err) => console.error('An error occurred', err));
  }

  _onSendPayment() {

    ToAddress = 'bc1qrd3pa8lg7xvclp3mypvm486nggyelpxrk8dr7g';
    wallet2Address = '0x3408a7c8B4104B2ee03F70a15d705256fDF97605';
    amount = '1000000000000000';
    link = '';
    wallet = new TrustWallet('');
    payload = new TransactionPayload(wallet2Address, amount, 'test payment');
    
    wallet.signTransaction(payload)
    .then((result) => {
      console.log('Transaction Signed', result);
    })
    .catch((error) => {
      console.log('Error', error);
    });
  }

  _onSignMessage() {
    const wallet = new TrustWallet('https://links.trustwalletapp.com/DaJr7vcVBU');
    const payload = new MessagePayload('hello trust');
    wallet.signMessage(payload)
        .then((result) => {
          console.log('Message Signed', result);
        }).catch((error) => {
          console.log('Error', error);
        });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.bigBlue}>TandaPay</Text>
        <View style={styles.buttonContainer}>         
          <Button
             onPress={() => this._onPressWallet()}
            title="Wallet"
          />
        </View>
        <View style={styles.buttonContainer}>         
          <Button
             onPress={() => this._onSendPayment()}
            title="Send Payment"
          />
        </View>
        <View style={styles.buttonContainer}>         
          <Button
             onPress={() => this._onSignMessage()}
            title="Sign Message"
          />
        </View>
      </View>

    );``
  }
}