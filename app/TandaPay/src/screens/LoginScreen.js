import React from 'react';
import {StyleSheet, View, TextInput, Text, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
// import decode from '../../../../decodeJwt';
import decode from '../../decode';
import { connect } from 'react-redux';
import {setUser} from '../actions/authActions';
import {setTanda} from '../actions/tandaAction';


function mapDispatchToProps(dispatch){
  return{
    setUser: user => dispatch(setUser(user)),
    setTanda: tanda => dispatch(setTanda(tanda))
    
  };
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    tanda: state.tanda
  };
};

class LoginScreen extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      email: '',
      pasword: '',
      memberID: '',
      isInTanda: '',
      name: '',
      memberOfTanda: '',
      jwt: ''
    }
  }

  _onPressSubmit() {

      console.log(this.state.email);
      console.log(this.state.password);

      fetch('http://172.31.99.155:5000/api/users/login', 
      {
        method: 'POST',
        headers: {'Accept': 'application/json','Content-Type': 'application/json'},
        body: JSON.stringify({email: this.state.email, password: this.state.password})
      })
      .then(response => {

        return response.json();

      }).then(response => {
        console.log('resp: ', response);

        if (response['password'] != 'Password incorrect'){
          let s = [];
          s = response['token'].replace('Bearer', '');
          let usr = decode(s);
          this.props.setUser(usr);
          console.log(s);
          this.setState({name: usr['name']});
          this.setState({memberID: usr['id']});
          this.setState({isInTanda: usr['isInTanda']});
          this.setState({email: usr['email']});
          this.setState({jwt: response['token']});

          console.log(this.state.memberID);

          console.log("^^^^^^^^^^^^" + this.props.auth.user);

          if(this.state.isInTanda){
            this.setState({memberOfTanda: usr['memberOfTanda']});
            this.props.navigation.navigate('Subgroup', {data: this.state.memberOfTanda});
          }
          
          fetch('http://172.31.99.155:5000/api/tanda/addMember', 
          {
            method: 'POST',
            headers: {'Accept': 'application/json','Content-Type': 'application/json', 
              'Authorization': this.state.jwt},
            body: JSON.stringify({email: this.state.email, newMemberID: this.state.memberID})
          })
          .then(response => {
            return response.json();
          }).then(response => {
            this.props.setTanda(response);
            this.setState({memberOfTanda: response['_id']});
            this.props.navigation.navigate('Subgroup', {data: this.state.memberOfTanda});
          }).catch((error) => {
            console.log(error)
          })

        }
        else{
          Alert.alert('Incorrect login information!');
        }

      }).catch((error) => {
        console.log(error)
      })
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

  const Login = connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
  export default Login;

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