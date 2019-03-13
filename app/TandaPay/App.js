import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import StartScreen from './src/screens/StartScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import StatusScreen from './src/screens/StatusScreen';
import SubgroupScreen from './src/screens/SubgroupScreen'
import {Provider } from 'react-redux';
import reducers from './src/reducers/index';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

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

const Navigation = createAppContainer(RootStack);

let store = createStore(reducers, applyMiddleware(thunk, logger));

export default class App extends React.Component {
  render() {
    return(
      <Provider store = {store}>
        <Navigation />
      </Provider>
    );
  
  }
}

