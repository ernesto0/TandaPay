import React from 'react';
import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import StartScreen from './src/screens/StartScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import StatusScreen from './src/screens/StatusScreen';
import HomeScreen from './src/screens/HomeScreen';
import { StyleSheet, Text, View, Button } from 'react-native';


class MyDrawer extends React.Component {

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 50 }}>
        
        <Button 
          onPress={() => {
            console.log('Changing screens');
            this.props.navigation.navigate("Start");
          }}
          title="Login"
        />
      </View>

    );
  }
}

const StatusWithDrawerNavigator = createDrawerNavigator({
  Status: {
    screen: StatusScreen,
  }
},
  {
    contentComponent: MyDrawer
  }
);


const RootStack = createStackNavigator(
  {
    Start: StartScreen,
    Login: LoginScreen,
    Register: RegisterScreen,
    Status: StatusWithDrawerNavigator,
    Home:HomeScreen
  },
  {
    initialRouteName: 'Start',
  }
);



const RootDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: RootStack,
  }
},
  {
    contentComponent: MyDrawer
  }
);



const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}