import React from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';

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

const styles = StyleSheet.create({
  tandaLogo: {
    color: '#5f9ea0',
    fontWeight: 'bold',
    fontSize: 70,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

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
    }
  }
  
  _onPressSubmit() {
    const value = this._form.getValue();
    console.log('value: ', value);
    
    this.props.navigation.navigate('Register')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.tandaLogo}>TandaPay</Text>
        <Form 
          ref={c => this._form = c}
          type={Tanda} 
          options={options}
        />
        <Button
          title="Submit Code"
          onPress={() => this._onPressSubmit()}
          />
      </View>
    );
  }
}