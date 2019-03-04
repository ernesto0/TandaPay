import React from 'react';
// import {View, KeyboardAvoidingView, StyleSheet } from 'react-native';
import {StyleSheet, View, TextInput, Text, TouchableOpacity, KeyboardAvoidingView} from 'react-native';

export default class LoginScreen extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      username: '',
      pasword: ''
    }
  }

  _onPressSubmit() {
      console.log(this.state.username);
      console.log(this.state.password);
      
      this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <View style={style.container}>
        <KeyboardAvoidingView style={style.inputContainer} behavior="padding" >
              <TextInput 
                placeholder="username or email"
                placeholderTextColor="#fff" 
                style={style.input} 
                onChangeText={(text) => this.setState({username:text})}
              />
              <TextInput 
                placeholder="password"
                placeholderTextColor="#fff" 
                style={style.input} 
                secureTextEntry={true}
                onChangeText={(text) => this.setState({password:text})}
              />
              <TouchableOpacity style = {style.buttonContainer}
                onPress={() => this._onPressSubmit()}>
                <Text style = {style.buttonText}>
                    LOGIN
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style = {style.buttonContainer}
                onPress={() => this.props.navigation.navigate('Register')}>
                <Text style = {style.buttonText}>
                    Register
                </Text>
              </TouchableOpacity>
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
      alignItems: 'stretch',
    },
    container2: {
      padding:20
    },
    input:{
      height: 40,
      marginBottom: 20,
      color: '#2d3436',
      paddingHorizontal: 10,
      fontWeight: '700',
      borderBottomColor: '#fdcb6e', // Add this to specify bottom border color
      borderBottomWidth: 2     // Add this to specify bottom border thickness
    },
    buttonContainer:{
        backgroundColor: '#fdcb6e',
        paddingVertical: 10,
    },
    buttonText:{
        textAlign: 'center',
        color:'#FFF',
    }
  });
