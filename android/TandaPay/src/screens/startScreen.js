import React from 'react';
import { Alert, AppRegistry, Button, StyleSheet, Text, View, TextInput } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigBlue: {
    color: '#5f9ea0',
    fontWeight: 'bold',
    fontSize: 70,
  },
  bigGrey: {
    color: '#A9A9A9',
    fontSize: 20,
  },
  buttonContainer: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
});

export default class startScreen extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      console: ''
    }
  }
  
  _onPressSubmit() {
    this.props.navigation.navigate('Login')
    console.log(this.state.code);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.bigBlue}>TandaPay</Text>
        <TextInput
          placeholder="Enter code here."
          onChangeText={(text) => this.setState({code:text})}
        />
        <Button
            onPress={() => this._onPressSubmit()}
            title="Submit Code"
          />
      </View>
    );
  }
}