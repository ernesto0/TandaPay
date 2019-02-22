import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Container, Header, Content, Button, Text, Label, Input } from 'native-base';
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

export default class startScreen extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      loading: true,
      code: ''
    }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
    this.setState({ loading: false });
  }
  
  _onPressSubmit() {
    this.setState({code:text})
    this.props.navigation.navigate('Login')
    // only for dev purposes - delete laater!
    console.log(this.state.code);
  }

  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    return (
      <Container style={styles.container}>
        {/* <Header></Header> */}
        <Content >
          <Label style={styles.tandaLogo} >TandaPay</Label>
          <Input 
          bordered
          placeholder ='Enter code here.'
          >
          </Input>
          <Button 
            block
            onPress={() => this._onPressSubmit()}
            >
            <Text>Submit</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}