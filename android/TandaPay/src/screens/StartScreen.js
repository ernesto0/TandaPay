import React from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
// import { Container, Header, Content, Button, Text, Label, Input } from 'native-base';
import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tandaLogo: {
    color: '#5f9ea0',
    fontWeight: 'bold',
    fontSize: 70,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default class StartScreen extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      code: ''
    }
  }
  
  _onPressSubmit() {
    this.props.navigation.navigate('Register')
    console.log(this.state.code);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.tandaLogo}>TandaPay</Text>
        <TextInput
          placeholder="Enter code here."
          onChangeText={(text) => this.setState({code:text})}
        />
        <Button
          title="Submit Code"
          onPress={() => this._onPressSubmit()}
          />
      </View>
    );
  }
}