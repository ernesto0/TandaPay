import React from 'react';
import { StyleSheet, View, TextInput, Button, Text, ListView, TouchableOpacity,Linking, Clipboard, FlatList} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
//import {DrawerNavigator} from'react-navigation';
import * as firebase from 'firebase';



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
      backgroundColor: '#ff7675',
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
  },
  msgBox: {
    flexDirection:'row',
    padding: 20,
    backgroundColor: '#fff'
  },
  txtInput: {
    flex: 1
  },
listItemContainer:{
  borderRadius:5,
  margin: 5,
  backgroundColor: '#fff'
},
listItem:{
  fontSize: 20,
  padding: 10,

}
});

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCNv_m9xTZ-DGbH89GZbSjJRcg3pfg7rrU",
  authDomain: "tandapay-701a7.firebaseapp.com",
  databaseURL: "https://tandapay-701a7.firebaseio.com",
  projectId: "tandapay-701a7",
  storageBucket: "tandapay-701a7.appspot.com",
  messagingSenderId: "358165704798"
};
firebase.initializeApp(config);


export default class Chat extends React.Component {
constructor(props){
  super(props)

  this.state ={
    message: '',
    messages:[]
  }
 this.addItem = this.addItem.bind(this);
}

componentDidMount(){
  firebase
  .datebase()
  .ref()
  .child("messages")
  .once("value",snapshot =>{
    if(snapshot.val()){
      const initMessages =[];
      Object
      .keys(data)
      .forEach(message => initMessages.push(data[message]));
      this.setState({
        messages:initMessages
      })
    }
  });

  firebase
  .database()
  .ref()
  .child("messages")
  .on("child_added", snapshot => {
    const data = snapshot.val();
    if (data) {
      this.setState(prevState => ({
        messages: [data, ...prevState.messages]
      }))
      
    }
  })

}
addItem(){
  if(!this.state.message) return;

  const newMessage =firebase.database().ref()
                        .child("messages")
                        .push()
  newMessage.set(this.set.message, () => this.setState({message:''}))
}

  render() {
    return (
      <View style={style.container}>
        <View style ={StyleSheet.msgBox}>
          <TextInput placeholder= 'Enter your message'
          value={this.state.message}
          onChangeText={(text) => this.setState({message: text})}
          style={StyleSheet.txtInput}/>
          <Button title= 'send' onPress={this.addItem}/>
        </View>
        <FlatList data= {this.state.messages}
        renderItem={({item}) => 
        <View style ={StyleSheet.ListItemContiner}>
          <Text style ={StyleSheet.listItem}>
            {item}
          </Text>
        </View>
        }
        />
      </View>
    );
  }
  
}