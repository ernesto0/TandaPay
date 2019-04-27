import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity,Linking, Clipboard, Image} from 'react-native';


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
        <Text style={style.RegularText}>Your Secretary Address is:</Text>
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

        <TouchableOpacity 
              onPress={() => {
                this.props.navigation.navigate("Charter");
              }}
              style={style.buttonContainer}
        >
         <Image
          style={{width: '100%', height: 75, resizeMode : 'contain' }}
          source = {require('../../assets/icons/baseline_ballot_white_48dp.png')}
        />
        <Text style={style.buttonText}>View Charter</Text> 
        </TouchableOpacity>  
      </View>
    );
  }
  
}