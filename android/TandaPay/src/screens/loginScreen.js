import React from 'react';
import { Text, View } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
export default class logInScreen extends React.Component {
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