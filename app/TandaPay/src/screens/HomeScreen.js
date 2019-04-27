import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';




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
                this.props.navigation.navigate("Status");
              }}
              style={style.buttonContainer}
          > 
        <Image
          style={{width: '100%', height: 75, resizeMode : 'contain' }}
          source = {require('../../assets/icons/baseline_reorder_white_48dp.png')}
        />
            <Text style={style.buttonText}>View Status</Text>
          </TouchableOpacity>

          <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Pay");
              }}
              style={style.buttonContainer}
          > 
        <Image
          style={{width: '100%', height: 75, resizeMode : 'contain' }}
          source = {require('../../assets/icons/baseline_face_white_48dp.png')}
        />
            <Text style={style.buttonText}>Pay Secretary</Text>
          </TouchableOpacity>

		    <TouchableOpacity 
              onPress={() => {
                console.log('going to Pay Page');
                this.props.navigation.navigate("PayPremium");
              }}
              style={style.buttonContainer}
        >
        <Image
          style={{width: '100%', height: 75, resizeMode : 'contain' }}
          source = {require('../../assets/icons/baseline_attach_money_white_48dp.png')}
        />
        <Text style={style.buttonText}>Pay Premium</Text> 
        </TouchableOpacity> 

        <TouchableOpacity 
              onPress={() => {
                this.props.navigation.navigate("ClaimNew");
              }}
              style={style.buttonContainer}
        >
         <Image
          style={{width: '100%', height: 75, resizeMode : 'contain' }}
          source = {require('../../assets/icons/baseline_announcement_white_48dp.png')}
        />
        <Text style={style.buttonText}>Make a Claim</Text> 
        </TouchableOpacity>     

        <TouchableOpacity 
              onPress={() => {
                this.props.navigation.navigate("TandaStatus");
              }}
              style={style.buttonContainer}
        >
         <Image
          style={{width: '100%', height: 75, resizeMode : 'contain' }}
          source = {require('../../assets/icons/baseline_recent_actors_white_48dp.png')}
        />
        <Text style={style.buttonText}>My Tanda</Text> 
        </TouchableOpacity>  

        <TouchableOpacity 
              onPress={() => {
                this.props.navigation.navigate("SubgroupStatus");
              }}
              style={style.buttonContainer}
        >
         <Image
          style={{width: '100%', height: 75, resizeMode : 'contain' }}
          source = {require('../../assets/icons/baseline_group_white_48dp.png')}
        />
        <Text style={style.buttonText}>My Subgroup</Text> 
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
    backgroundColor: 'rgba(0,0,0,0)',
      paddingVertical: 10,
      marginBottom:5
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
    padding: 10
  }
});