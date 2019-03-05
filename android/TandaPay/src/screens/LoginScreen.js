import React from 'react';
import {StyleSheet, View, TextInput, Text, TouchableOpacity, KeyboardAvoidingView} from 'react-native';

export default class LoginScreen extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      email: '',
      pasword: '',
      memberID: ''
    }
  }

  _onPressSubmit() {
      console.log(this.state.email);
      console.log(this.state.password);

      fetch('http://10.21.39.108:5000/api/users/login', 
      {
        method: 'POST',
        headers: {'Accept': 'application/json','Content-Type': 'application/json'},
        body: JSON.stringify({email: this.state.email, password: this.state.password})
      })
      .then(response => {
        return response.json();
      }).then(response => {
        console.log('resp: ', response);
        if (response['password'] == 'Password incorrect'){
          console.log('Wrong login info!');
        }
        else{
          // fetch('http://10.21.39.108:5000/api/users/getUserByEmail', 
          // {
          //   method: 'POST',
          //   headers: {'Accept': 'application/json','Content-Type': 'application/json'},
          //   body: JSON.stringify({email: this.state.email})
          // })
          // .then(response2 => {
          //   return response2.json();
          // }).then(response2 => {
          //   console.log("HERE");
          //   console.log(response2['isInTanda']);
          // }).catch((error) => {
          //   console.log(error)
          // })
          // this.setState({memberID: request['invited']['user']});
          this.props.navigation.navigate('Status', {data: this.state.email});
        }
      }).catch((error) => {
        console.log(error)
      })

      // fetch('http://10.21.39.108:5000/api/tanda/addMember', 
      // {
      //   method: 'POST',
      //   headers: {'Accept': 'application/json','Content-Type': 'application/json'},
      //   body: JSON.stringify({email: this.state.email, newMemberID: this.state.memberID})
      // })
      // .then(response => 
      //   return response.json();
      // }).then(response => {
      //   this.props.navigation.navigate('Status');
      // }).catch((error) => {
      //   console.log(error)
      // })
  }

  render() {
    return (
      <View style={style.container}>
        <KeyboardAvoidingView style={style.inputContainer} behavior="padding" >
              <Text style={style.tandaLogo}>
                Login
              </Text>
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
              <TouchableOpacity style = {style.buttonContainer}
                onPress={() => this._onPressSubmit()}>
                <Text style = {style.buttonText}>
                    LOGIN
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style = {style.buttonContainer}
                onPress={() => this.props.navigation.navigate('Register')}>
                <Text style = {style.buttonText}>
                    REGISTER
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
    },
    tandaLogo:{
      textAlign: 'center',
      color:'#FFF',
      fontWeight: 'bold',
      fontSize: 40,
      justifyContent: 'center',
      padding: 30
    }
  });