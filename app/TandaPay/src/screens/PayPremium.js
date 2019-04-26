import React from 'react';
import { StyleSheet, View, TextInput, Button, Text, ListView, TouchableOpacity,Linking, Clipboard, Image} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
//import {DrawerNavigator} from'react-navigation';
import {DrawerNavigator,DrawerItems} from 'react-navigation';
import LoginScreen from './LoginScreen';
import CountDown from 'react-native-countdown-component';


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
    backgroundColor: 'rgba(0,0,0,0)',
      paddingVertical: 10,
      marginBottom:10,
      marginTop:10
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
  },
  RegularText: {
    color: '#333738',
    fontWeight: 'bold',
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center'
}
});


export default class PayScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      text: '0x52E68c9c2E784Dd3303aE6f55E4A2764D998d4Db', //set the text value here to make it dynamic in the future
      clipboardContent: null,
    };
 }
 writeToClipboard = async () => {
  //To copy the text to clipboard
  await Clipboard.setString(this.state.text);
  //alert('Copied to Clipboard!');
};

  render() {
    return (
      <View style={style.container}>
        <Text style={style.tandaLogo}>Pay</Text>
        <Text style={style.RegularText}>Your Smart Contract Address is:</Text>
        <Text style={style.RegularText}>0x52E68c9c2E784Dd3303aE6f55E4A2764D998d4Db</Text>
        <TouchableOpacity
        onPress={()=> {
          this.writeToClipboard()
          Linking.openURL('https://links.trustwalletapp.com/a/key_live_lfvIpVeI9TFWxPCqwU8rZnogFqhnzs4D?&event=openURL&url=https://tandahelp.weebly.com')
        }}//https://links.trustwalletapp.com/a/key_live_lfvIpVeI9TFWxPCqwU8rZnogFqhnzs4D?&event=openURL&url=https://google.com
          style = {style.buttonContainer}
          accessibilityLabel="Accesses Trust Wallet"
          //Linking.openURL('https://links.trustwalletapp.com/a/key_live_lfvIpVeI9TFWxPCqwU8rZnogFqhnzs4D?&event=openURL&url=https://tandahelp.weebly.com')}
        >
        <Image
          style={{width: '100%', height: 100, resizeMode : 'contain' }}
          source = {require('../../assets/icons/baseline_attach_money_white_48dp.png')}
        />
        <Text style = {style.buttonText}>Pay</Text>
        </TouchableOpacity>

        <CountDown
        size={30}
        until={100}// time
        onFinish={()=>alert("Payment period ended")}
        digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#1CC625'}}
        digitTxtStyle={{color: '#1CC625'}}
        timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
        separatorStyle={{color: '#1CC625'}}
        timeToShow={['H', 'M', 'S']}
        timeLabels={{m: null, s: null}}
        showSeparator
      />
      </View>
    );
  }
  
}