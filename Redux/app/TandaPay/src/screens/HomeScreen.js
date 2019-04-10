import React from 'react';
import { StyleSheet, View, TextInput, Button, Text, ListView, TouchableOpacity } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
//import {DrawerNavigator} from'react-navigation';
import {DrawerNavigator,DrawerItems} from 'react-navigation';
import LoginScreen from './LoginScreen';



export default class HomeScreen extends React.Component {

  constructor(props){
    super(props);
 
 }
 

  render() {
    return (
      <View style={style.container}>
        <Text style={style.tandaLogo}>HomeScreen</Text>
        <TouchableOpacity
              onPress={() => {
                console.log('Status');
                this.props.navigation.navigate("Status");
              }}
              style={style.buttonContainer}
          > 
            <Text style={style.buttonText}>View Status</Text>
          </TouchableOpacity>


		    <TouchableOpacity 
            onPress={() => {
              console.log('Joining a subgroup');
              this.props.navigation.navigate("Subgroup");
            }}
            title="Join a subgroup"
            style={style.buttonContainer}
        >
        <Text style={style.buttonText}>Join a subgroup</Text> 
        </TouchableOpacity>


		    <TouchableOpacity 
              onPress={() => {
                console.log('going to Pay Page');
                this.props.navigation.navigate("Pay");
              }}
              style={style.buttonContainer}
        >
        <Text style={style.buttonText}>Pay secretary</Text> 
        </TouchableOpacity>

        <TouchableOpacity
              onPress={() => {
                console.log('Joining a subgroup');
                this.props.navigation.navigate("SubgroupInfo");
              }}
              title="SubgroupInfo"
              style={style.buttonContainer}
        >
        <Text style={style.buttonText}>Pay secretary</Text> 
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