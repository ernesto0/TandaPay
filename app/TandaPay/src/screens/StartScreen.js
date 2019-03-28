import React from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity } from 'react-native';

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
        marginBottom: 10
      },
    },
    controlLabel: {
      normal: {
        color: 'blue',
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
        error: ''
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
  
  _onPressSubmit() {
    const value = this._form.getValue();
    this.setState({ isLoaded: true })
    console.log('value: ', value);
    console.log("*************");

    fetch('http://10.122.167.191:5000/api/tanda/checkCode', 
    {
      method: 'POST',
      headers: {'Accept': 'application/json','Content-Type': 'application/json'},
      body: JSON.stringify(value)
    })
    .then(response => {
      return response.json();
    }).then(response => {
      console.log('resp: ', response);
      if (response != null){
        this.props.navigation.navigate('Login')
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
        <Text style={style.tandaLogo}>TandaPay</Text>
        <Form 
          ref={c => this._form = c}
          type={Tanda} 
          options={options}
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
