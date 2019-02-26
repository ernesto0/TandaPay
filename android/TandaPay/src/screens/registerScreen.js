import React from 'react';
import { Text, View } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { COLOR, ThemeContext, getTheme } from 'react-native-material-ui';


export default class registerScreen extends React.Component {
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