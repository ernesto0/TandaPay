import React from 'react';
import { Alert, AppRegistry, Button, StyleSheet, Text, View } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00cec9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigBlue: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 70,
  },
  bigGrey: {
    color: '#A9A9A9',
    fontSize: 20,
  },
  buttonContainer: {
    margin: 10,
    color: '#A9A9A9',
    alignItems: 'stretch',
    justifyContent: 'center'
  },
});

export default class startScreen extends React.Component {

  _onPressCreateAccount() {
    Alert.alert('BRING UP CREATE ACCOUNT PAGE')
  }

  _onPressLogIn() {
    Alert.alert('BRING UP LOG IN')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.bigBlue}>TandaPay</Text>
        <View style={styles.buttonContainer}>         
          <Button
             onPress={() => this.props.navigation.navigate('Register')}
             title="Create Account"
          />
        </View>
        <View style={styles.buttonContainer}>         
          <Button
            onPress={() => this.props.navigation.navigate('Login')}
            style={styles.buttonContainer}
            title="Log In"
          />
        </View>
      </View>
    );
  }
}