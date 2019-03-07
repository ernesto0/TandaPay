import React from 'react';
import {createStackNavigator, createAppContainer, createDrawerNavigator} from 'react-navigation';
import StartScreen from './src/screens/StartScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import StatusScreen from './src/screens/StatusScreen';
import SubgroupScreen from './src/screens/SubgroupScreen'
import HomeScreen from './src/screens/HomeScreen';
import { StyleSheet, Text, View, Button } from 'react-native';

class MyDrawer extends React.Component {

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 50 }}>
        
        <Button 
          onPress={() => {
            console.log('Changing screens to Status');
            this.props.navigation.navigate("Status");
          }}
          title="Status"
        />

          <Button 
          onPress={() => {
            console.log('Changing screens to Pay');
            //this.props.navigation.navigate("Status");
          }}
          title="Pay"
        />

          <Button 
          onPress={() => {
            console.log('Changing screens to chat');
            //this.props.navigation.navigate("Status");
          }}
          title="Chat"
        />  

            <Button 
          onPress={() => {
            console.log('Changing screens to settings');
            //this.props.navigation.navigate("Status");
          }}
          title="Settings"
        />

      </View>

    );
  }
}
const HomeWithDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeScreen,
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
    Status: StatusScreen,
    Home: HomeWithDrawerNavigator,
    Subgroup: SubgroupScreen
  },
  {
    initialRouteName: 'Start',
  }
);

const RootDrawerNavigator = createDrawerNavigator({
  Homepage: {
    screen: RootStack,
  }
},
  {
    contentComponent: MyDrawer
  }
);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const AppContainer = createAppContainer(RootStack);
