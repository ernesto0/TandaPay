import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

import t from 'tcomb-form-native';

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
    
    this.props.navigation.navigate('Login')
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