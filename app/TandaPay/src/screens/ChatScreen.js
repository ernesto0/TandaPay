import React, {Component} from 'react';
import {StyleSheet, TextInput, View, Button, Dimensions} from 'react-native';
import { Text,FlatList} from 'react-native';
// import * as firebase from 'firebase';

// // Get a reference to the database service
// var config = {
//   apiKey: "AIzaSyCNv_m9xTZ-DGbH89GZbSjJRcg3pfg7rrU",
//   authDomain: "tandapay-701a7.firebaseapp.com",
//   databaseURL: "https://tandapay-701a7.firebaseio.com",
//   projectId: "tandapay-701a7",
//   storageBucket: "tandapay-701a7.appspot.com",
//   messagingSenderId: "358165704798"
// };
// if (!firebase.apps.length) {
//   firebase.initializeApp(config);
// }

// function writeNewPost(username, uid, body) {
//   // A post entry.
//   console.log("working?")
//   var postData = {
//     author: username,
//     uid: uid,
//     body: body,
//     // Tanda ID needs to be implemented 
//     starCount: 0, // likes????? hopefully to be implemented
//   };
//   // Get a key for a new Post.
//   var newPostKey = firebase.database().ref().child('posts').push().key;
//   // Write the new post's data simultaneously in the posts list and the user's post list.
//   var updates = {};
//   updates['/posts/' + newPostKey] = postData;
//   updates['/user-posts/' + uid + '/' + newPostKey] = postData;
//   return firebase.database().ref().update(updates);
// };

// export default class App extends Component{
//   constructor(props){
//     super(props)
//     this.state ={
//       text: '',
//       texts:[],
//       old_Text:[],
//       user:"Evan",
//       temp:[],
//       userid: "001",
//     }
//   }

//     AddItem(){
//     var starCountRef = firebase.database().ref('posts/');
//     starCountRef.once('value').then(snapshot => {
//         console.log(snapshot.val());
//         var items = [];
//         snapshot.forEach((child) => {
//             items.push(
//               child.val().author+":"+ child.val().body
//             );
//          });
//       this.setState({texts: items});
//       //alert(JSON.stringify(items))   
//       }); 
//     data = [this.state.user+": "+this.state.text]
//     this.setState({ texts: [...this.state.texts,...data] })
//     writeNewPost( this.state.user, this.state.userid, this.state.text)
//   }

  
//   render() {
//      return (
//       <View style={style.container}>
//         <View style ={StyleSheet.msgBox}>
//           <TextInput placeholder= 'Enter your message'
//           value={this.state.message}
//           onChangeText={(text) => this.setState({text})}
//           style={StyleSheet.txtInput}/>
//           <Button title= 'send' onPress={this.AddItem.bind(this)}/>
//         </View>
//         <FlatList data= {this.state.texts}
//         renderItem={({item}) => 
//         <View style ={StyleSheet.ListItemContiner}>
//           <Text style ={StyleSheet.listItem}>
//             {item}
//           </Text>
//         </View>
//         }
//         />
//         </View>
//     );
//   }
// }

// const style = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
//   inputContainer:{
//     flex: 3,
//     justifyContent:'center',
//     alignItems: 'stretch',
//   },
//   container2: {
//     padding:20
//   },
//   input:{
//     height: 40,
//     marginBottom: 20,
//     color: '#FFF',
//     paddingHorizontal: 10,
//     fontWeight: '700',
//     borderBottomColor: '#fdcb6e', // Add this to specify bottom border color
//     borderBottomWidth: 2     // Add this to specify bottom border thickness
//   },
//   buttonContainer:{
//       backgroundColor: '#ff7675',
//       paddingVertical: 10,
//       marginBottom:10,
//       marginTop:10
//   },
//   buttonText:{
//       textAlign: 'center',
//       color:'#FFF',
//   },
//   tandaLogo:{
//     textAlign: 'center',
//     color:'#FFF',
//     fontWeight: 'bold',
//     fontSize: 40,
//     justifyContent: 'center',
//     padding: 30
//   },
//   RegularText: {
//     color: '#333738',
//     fontWeight: 'bold',
//     fontSize: 30,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   msgBox: {
//     flexDirection:'row',
//     padding: 20,
//     backgroundColor: '#fff'
//   },
//   txtInput: {
//     flex: 1
//   },
// listItemContainer:{
//   borderRadius:5,
//   margin: 5,
//   backgroundColor: '#fff'
// },
// listItem:{
//   fontSize: 20,
//   padding: 10,
// }
// });
const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
};

class TermsAndConditions extends Component{

  state = {
      accepted: false
  }

  render(){
    return (
     <View style={styles.container}>
            <Text style={styles.title}>Terms and conditions</Text>
            <ScrollView 
            style={styles.tcContainer}
            onScroll={({nativeEvent}) => {
                if (isCloseToBottom(nativeEvent)) {
                  this.setState({
                      accepted: true
                  })
                }
              }}
            >
                <Text style={styles.tcP}>Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern [business name]’s relationship with you in relation to this website. If you disagree with any part of these terms and conditions, please do not use our website.</Text>
                <Text style={styles.tcP}>The term ‘[business name]’ or ‘us’ or ‘we’ refers to the owner of the website whose registered office is [address]. Our company registration number is [company registration number and place of registration]. The term ‘you’ refers to the user or viewer of our website.</Text>
                    <Text style={styles.tcL}>{'\u2022'} The content of the pages of this website is for your general information and use only. It is subject to change without notice.</Text>
                    <Text style={styles.tcL}>{'\u2022'} This website uses cookies to monitor browsing preferences. If you do allow cookies to be used, the following personal information may be stored by us for use by third parties: [insert list of information].</Text>
                    <Text style={styles.tcL}>{'\u2022'} Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</Text>
                    <Text style={styles.tcL}>{'\u2022'} Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.</Text>
                    <Text style={styles.tcL}>{'\u2022'} This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</Text>
                    <Text style={styles.tcL}>{'\u2022'} All trademarks reproduced in this website, which are not the property of, or licensed to the operator, are acknowledged on the website.
Unauthorised use of this website may give rise to a claim for damages and/or be a criminal offence.</Text>
                    <Text style={styles.tcL}>{'\u2022'} From time to time, this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).</Text>
                    <Text style={styles.tcL}>{'\u2022'} Your use of this website and any dispute arising out of such use of the website is subject to the laws of England, Northern Ireland, Scotland and Wales.</Text>
                <Text style={styles.tcP}>The use of this website is subject to the following terms of use</Text>
            </ScrollView>

            <TouchableOpacity disabled={ !this.state.accepted } onPress={() => {
                this.props.navigation.navigate("Home");
              }} style={ this.state.accepted ? styles.button : styles.buttonDisabled }><Text style={styles.buttonLabel}>Accept</Text></TouchableOpacity>
      </View>
    );
  }

}

const { width , height } = Dimensions.get('window');

const styles = {

  container:{
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  title: {
      fontSize: 22,
      alignSelf: 'center'
  },
  tcP: {
      marginTop: 10,
      marginBottom: 10,
      fontSize: 12
  },
  tcP:{
      marginTop: 10,
      fontSize: 12
  },
  tcL:{
      marginLeft: 10,
      marginTop: 10,
      marginBottom: 10,
      fontSize: 12
  },
  tcContainer: {
      marginTop: 15,
      marginBottom: 15,
      height: height * .7
  },

  button:{
      backgroundColor: '#136AC7',
      borderRadius: 5,
      padding: 10
  },

  buttonDisabled:{
    backgroundColor: '#999',
    borderRadius: 5,
    padding: 10
 },

  buttonLabel:{
      fontSize: 14,
      color: '#FFF',
      alignSelf: 'center'
  }

}

export default TermsAndConditions;