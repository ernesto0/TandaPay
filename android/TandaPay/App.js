import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import StartScreen from './src/screens/StartScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';



<<<<<<< HEAD

const style ={

}

=======
>>>>>>> 627935675de97962f6840bb4a2e404c6ee9a804a
const RootStack = createStackNavigator(
  {
    Start: StartScreen,
    Login: LoginScreen,
    Register: RegisterScreen, 
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


