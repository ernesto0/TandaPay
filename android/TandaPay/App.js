import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import StartScreen from './src/screens/StartScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import StatusScreen from './src/screens/StatusScreen';
import LoginForm from './src/screens/LoginForm';


const RootStack = createStackNavigator(
  {
    Start: StartScreen,
    Login: LoginScreen,
    Register: RegisterScreen, 
    Status: StatusScreen
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


