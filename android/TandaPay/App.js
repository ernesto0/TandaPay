import React from 'react';
import { Alert, AppRegistry, Button, StyleSheet, Text, View } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

class startScreen extends React.Component {

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
             onPress={() => this.props.navigation.navigate('Login')}
            title="Create Account"
          />
        </View>
        <View style={styles.buttonContainer}>         
          <Button
            onPress={() => this.props.navigation.navigate('Login')}
            title="Log In"
          />
        </View>
      </View>
    );
  }
}

class logInScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Welcome to the Log In Screen</Text>
        <Text>Username: </Text>
        <Text>Password:</Text>
      </View>
    );
  }
}

class registerScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Welcome to the Register Screen</Text>
        <Text>Email: </Text>
        <Text>First Name:</Text>
        <Text>Last Name:</Text>
        <Text>Username: </Text>
        <Text>Password:</Text>
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Start: startScreen,
    Login: logInScreen,
    Register: registerScreen, 
  },
  {
    initialRouteName: 'Start',
  }
);


export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const AppContainer = createAppContainer(RootStack);

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
