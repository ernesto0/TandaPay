import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, KeyboardAvoidingView, TextInput, ScrollView} from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { connect } from 'react-redux';
import {setTanda} from '../actions/tandaAction';
import {removeTanda} from '../actions/tandaAction';
import {NavigationActions} from 'react-navigation';

function mapDispatchToProps(dispatch){
    return{
      setTanda: tanda => dispatch(setTanda(tanda)),
      removetanda: tanda => dispatch(removeTanda(tanda))
    };
  }

const mapStateToProps = state => {
    return {
      auth: state.auth,
      tanda: state.tanda
    };
  };

 class LoadScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
 
        return (
            <View>
                <Text>home</Text>
            </View>
        )
    }
}

Load = connect(mapStateToProps, mapDispatchToProps)(LoadScreen);
export default Load;


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