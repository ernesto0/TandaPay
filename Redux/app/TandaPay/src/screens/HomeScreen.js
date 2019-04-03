import React from 'react';
import { StyleSheet, View, TextInput, Button, Text, ListView, TouchableOpacity } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
//import {DrawerNavigator} from'react-navigation';
import {DrawerNavigator,DrawerItems} from 'react-navigation';
import LoginScreen from './LoginScreen';

const styles = StyleSheet.create(
  {
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
    tandaLogo: {
        color: '#5f9ea0',
        fontWeight: 'bold',
        fontSize: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }
  }
);



export default class HomeScreen extends React.Component {

  constructor(props){
    super(props);
 
 }
 

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.tandaLogo}>HomeScreen</Text>
		<Button 
          onPress={() => {
            console.log('Status');
            this.props.navigation.navigate("Status");
          }}
          title="View Status"
        />
		<Button 
          onPress={() => {
            console.log('Joining a subgroup');
            this.props.navigation.navigate("Subgroup");
          }}
          title="Join a subgroup"
        />
		<Button 
          onPress={() => {
            console.log('going to Pay Page');
            this.props.navigation.navigate("Pay");
          }}
          title="Pay secretary"
        />
        <Button 
          onPress={() => {
            console.log('Joining a subgroup');
            this.props.navigation.navigate("SubgroupInfo");
          }}
          title="SubgroupInfo"
        />
      </View>
    );
  }
  
}