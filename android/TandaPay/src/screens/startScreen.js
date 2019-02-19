import React from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';

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
    // only for dev purposes - delete later!
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
            onPress={() => this._onPressSubmit()}
            title="Submit Code"
          />
      </View>
    );
  }
}