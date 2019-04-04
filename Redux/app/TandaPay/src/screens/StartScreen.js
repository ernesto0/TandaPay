import React from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity,Linking,Button,Image } from 'react-native';

import t from 'tcomb-form-native';

const Form = t.form.Form;

const Tanda = t.struct({
  email: t.String,
  code: t.String
});

const formStyles = {
    ...Form.stylesheet,
    formGroup: {
      normal: {
        marginBottom: 10,
        color: '#FFF'
      },
    },
    controlLabel: {
      normal: {
        color: '#FFF',
        fontSize: 18,
        marginBottom: 7,
        fontWeight: '600'
      },
      // the style applied when a validation error occours
      error: {
        color: 'red',
        fontSize: 18,
        marginBottom: 7,
        fontWeight: '600'
      }
    }
  }

const options = {
    fields: {
      email: {
        error: '',
      },
      code: {
        error: ''
      }
    },
    stylesheet: formStyles,
  };

export default class StartScreen extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      value: {
        email: '',
        code: ''
      },
      isLoaded: false,
      resp: ''   
    }
  }
  
  handleEmail = (text) => {
    this.setState({ email: text })
 }
  handleCode = (text) => {
    this.setState({ code: text })
 }


  _onPressSubmit(email, code) {
   
    console.log(this.state.email);
    console.log(this.state.code);

    console.log("*************");

    fetch('http://10.122.167.191:5000/api/tanda/checkCode', 
    {
      method: 'POST',
      headers: {'Accept': 'application/json','Content-Type': 'application/json'},
      body: JSON.stringify({email: this.state.email, code: this.state.code})
    })
    .then(response => {
      return response.json();
    }).then(response => {
      console.log('resp: ', response);
      if (response != null){
        this.props.navigation.navigate('Home')
      }
      else{
        console.log('Wrong email or code!')
        Alert.alert('Wrong email or code!');
      }
    }).catch((error) => {
      console.log(error)
    })
    
  }

  render() {
    return (
      <View style={style.container}>
        <Image
          style={{width: '100%', height: 300, resizeMode : 'contain' }}
          source = {require('../../assets/tanda2v3.png')}
        />
        <TextInput 
                placeholder="email"
                placeholderTextColor="#fff" 
                style={style.input} 
                onChangeText={this.handleEmail}
              />
              <TextInput 
                placeholder="code"
                placeholderTextColor="#fff" 
                style={style.input}  
                secureTextEntry={true}
                onChangeText={this.handleCode}
              />
        <TouchableOpacity
          style = {style.buttonContainer}
          onPress={() => this._onPressSubmit()}
          >
          <Text style = {style.buttonText}>
            SUBMIT CODE
          </Text>
        </TouchableOpacity>
        
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
    color: '#FFF',
    paddingHorizontal: 10,
    fontWeight: '700',
    borderBottomColor: '#fdcb6e', // Add this to specify bottom border color
    borderBottomWidth: 2     // Add this to specify bottom border thickness
  },
  buttonContainer:{
      backgroundColor: '#fdcb6e',
      paddingVertical: 10,
      marginBottom:10
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
