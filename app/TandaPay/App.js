import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import StartScreen from './src/screens/StartScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import StatusScreen from './src/screens/StatusScreen';
import SubgroupScreen from './src/screens/SubgroupScreen'
import {Provider } from 'react-redux';
import store from './store';

const RootStack = createStackNavigator(
  {
    Start: StartScreen,
    Login: LoginScreen,
    Register: RegisterScreen, 
    Status: StatusScreen,
    Subgroup: SubgroupScreen
  },
  {
    initialRouteName: 'Start',
  }
);

export default class App extends React.Component {
  render() {
    <Provider store = {store}>
     return <AppContainer />;
     </Provider>
  }
}

const AppContainer = createAppContainer(RootStack);
