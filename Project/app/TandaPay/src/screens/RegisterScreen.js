import React from 'react';
import {StyleSheet, View, TextInput, Text, TouchableOpacity, KeyboardAvoidingView} from 'react-native';

export default class RegisterScreen extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }

  _onPressSubmit() {

    fetch('http://10.21.69.14:5000/api/users/register', 
      {
        method: 'POST',
        headers: {'Accept': 'application/json','Content-Type': 'application/json'},
        body: JSON.stringify({name: this.state.name, email: this.state.email, password: this.state.password})
      })
      .then(response => {
        return response.json();
      }).then(response => {
        console.log('resp: ', response);
        this.props.navigation.navigate('Charter');
      }).catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <View style={style.container}>
        <KeyboardAvoidingView style={style.inputContainer} behavior="padding" >
        <Text style={style.tandaLogo}>
                Register
          </Text>
          <TextInput 
                  placeholder="name"
                  placeholderTextColor="#fff" 
                  style={style.input} 
                  onChangeText={(text) => this.setState({name:text})}
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
          <TouchableOpacity style = {style.buttonContainer}
            onPress={() => this._onPressSubmit()}>
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
    },
    tandaLogo:{
      textAlign: 'center',
      color:'#FFF',
      fontWeight: 'bold',
      fontSize: 40,
      justifyContent: 'center',
      padding: 30,
    }
  });
