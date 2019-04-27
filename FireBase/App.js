import React, {Component} from 'react';
import {StyleSheet, TextInput, View, Button} from 'react-native';
import { Text,FlatList} from 'react-native';
import * as firebase from 'firebase';

// Get a reference to the database service
var config = {
  apiKey: "AIzaSyCNv_m9xTZ-DGbH89GZbSjJRcg3pfg7rrU",
  authDomain: "tandapay-701a7.firebaseapp.com",
  databaseURL: "https://tandapay-701a7.firebaseio.com",
  projectId: "tandapay-701a7",
  storageBucket: "tandapay-701a7.appspot.com",
  messagingSenderId: "358165704798"
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

function writeNewPost(username, uid, body) {
  // A post entry.
  console.log("working?")
  var postData = {
    author: username,
    uid: uid,
    body: body,
    // Tanda ID needs to be implemented 
    starCount: 0, // likes????? hopefully to be implemented
  };
  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('posts').push().key;
  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;
  return firebase.database().ref().update(updates);
};

export default class App extends Component{
  constructor(props){
    super(props)
    this.state ={
      text: '',
      texts:[],
      old_Text:[],
      user:"Evan",
      temp:[],
      userid: "001",
    }
  }

    AddItem(){
    var starCountRef = firebase.database().ref('posts/');
    starCountRef.once('value').then(snapshot => {
        console.log(snapshot.val());
        var items = [];
        snapshot.forEach((child) => {
            items.push(
              child.val().author+":"+ child.val().body
            );
         });
      this.setState({texts: items});
      //alert(JSON.stringify(items))   
      }); 
    data = [this.state.user+": "+this.state.text]
    this.setState({ texts: [...this.state.texts,...data] })
    writeNewPost( this.state.user, this.state.userid, this.state.text)
  }

  
  render() {
     return (
      <View style={style.container}>
        <View style ={StyleSheet.msgBox}>
          <TextInput placeholder= 'Enter your message'
          value={this.state.message}
          onChangeText={(text) => this.setState({text})}
          style={StyleSheet.txtInput}/>
          <Button title= 'send' onPress={this.AddItem.bind(this)}/>
        </View>
        <FlatList data= {this.state.texts}
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

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
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
