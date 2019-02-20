import React from 'react';
import { Alert, AppRegistry, Button, StyleSheet, Text, View } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { Linking } from 'react-native';

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
      </View>
    );``
  }
}