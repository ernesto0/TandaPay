import React from 'react';
// import {View, KeyboardAvoidingView, StyleSheet} from 'react-native';
import {StyleSheet, View, TextInput, Text, TouchableOpacity, KeyboardAvoidingView} from 'react-native'; 
import {createStackNavigator, createAppContainer} from 'react-navigation';
import RegistrationForm from './RegistrationForm';


export default class RegisterScreen extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      password2: ''
    }


  }

  _onPressSubmit() {
    console.log(this.state.username);
    console.log(this.state.password);
    
    this.props.navigation.navigate('Login');
}

    render() {
      return (
        <View style={style.container}>
         <KeyboardAvoidingView style={style.inputContainer} behavior="padding" >
         <View style = {style.rowContainer}>
                    <View>
                    <TextInput 
                        placeholder="first name"
                        placeholderTextColor="#fff" 
                        style={style.rowInput} 
                        onChangeText={(text) => this.setState({firstName:text})}
                        />
                    </View>
                
                    <View>
                    <TextInput 
                        placeholder="last name"
                        placeholderTextColor="#fff" 
                        style={style.rowInput}
                        onChangeText={(text) => this.setState({lastName:text})}
                        />     
                    </View> 

             </View>           
                <TextInput 
                    placeholder="user name"
                    placeholderTextColor="#fff" 
                    style={style.input} 
                    onChangeText={(text) => this.setState({userName:text})}
                    />
                <TextInput 
                    placeholder="email"
                    placeholderTextColor="#fff" 
                    style={style.input} 
                    onChangeText={(text) => this.setState({email:text})}
                    />
                <TextInput 
                    placeholder="password"
                    placeholderTextColor="#fff" 
                    style={style.input} 
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({password:text})}
                    />
                <TextInput 
                    placeholder="verify password"
                    placeholderTextColor="#fff" 
                    style={style.input} 
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({password2:text})}
                    />

                  <TouchableOpacity style = {style.buttonContainer}
                    onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style = {style.buttonText}>
                        NEXT
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
    },
    container2: {
      padding:20
  },
  rowInput:{
      height: 40,
      //backgroundColor: 'rgba(255,255,255,0.7)',
      marginBottom: 20,
      color: '#FFF',
      paddingHorizontal: 10,
      fontWeight: '700',
      width: 150,
      marginRight: 30,
      borderBottomColor: '#fdcb6e', // Add this to specify bottom border color
      borderBottomWidth: 2     // Add this to specify bottom border thickness
  },
  input:{
      height: 40,
      //backgroundColor: 'rgba(255,255,255,0.7)',
      marginBottom: 20,
      color: '#FFF',
      paddingHorizontal: 10,
      fontWeight: '700',
      alignItems: 'stretch',
      borderBottomColor: '#fdcb6e', // Add this to specify bottom border color
      borderBottomWidth: 2     // Add this to specify bottom border thickness
  },
  rowContainer:{
      flexDirection:'row',
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