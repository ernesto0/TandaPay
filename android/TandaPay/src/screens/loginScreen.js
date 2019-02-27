import React from 'react';
import {View, KeyboardAvoidingView, StyleSheet } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import LoginForm from './LoginForm';

export default class logInScreen extends React.Component {
    render() {
      return (
        <View style={style.container}>
          <KeyboardAvoidingView style={style.inputContainer} behavior="padding" >
            <LoginForm />
            
          </KeyboardAvoidingView>
        </View>
      );
    }
<<<<<<< HEAD
}
=======
  }
  
  const style = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#00cec9',
    },
    inputContainer:{
      flex: 3,
      justifyContent:'center',
      alignItems: 'stretch',
    }
  });
>>>>>>> 627935675de97962f6840bb4a2e404c6ee9a804a
