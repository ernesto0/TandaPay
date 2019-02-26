import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { COLOR, ThemeContext, getTheme } from 'react-native-material-ui';
import startScreen from './src/screens/startScreen';
import loginScreen from './src/screens/loginScreen';
import registerScreen from './src/screens/registerScreen';



const RootStack = createStackNavigator(
  {
    Start: startScreen,
    Login: loginScreen,
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


