import React from 'react';
import {View, KeyboardAvoidingView, StyleSheet} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import RegistrationForm from './RegistrationForm';


export default class RegisterScreen extends React.Component {
    render() {
      return (
        <View style={style.container}>
         <KeyboardAvoidingView style={style.inputContainer} behavior="padding" >
            <RegistrationForm />
            
          </KeyboardAvoidingView>
        </View>
      );
    }
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
    }
  });