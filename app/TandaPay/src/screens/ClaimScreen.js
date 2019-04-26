import React from 'react';
import { StyleSheet, View, TextInput, Button, Text, ListView, TouchableOpacity, Linking, Card, Icon, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import {removeTanda} from '../actions/tandaAction';
import {removeSubgroup} from '../actions/subgroupAction';

function mapDispatchToProps(dispatch){
  return{
    removeTanda: tanda => dispatch(removeTanda(tanda)),
    removeSubgroup: subgroup => dispatch(removeSubgroup(subgroup))
  };
}

const mapStateToProps = state => {
  return {
    reducer: state.reducer
  };
};

class ClaimScreen extends React.Component {

  constructor(props){
    super(props)
    
    this.state = {
      isLoaded: false,
      tableHead: ['Member', 'Status'],
      tableData: [],
      members: [],
      cards: []
    }
  }

_newClaim(){
  this.props.navigation.navigate('ClaimNew');
}

cList() {
  console.log("in clist");
  console.log(this.state.cards);
  if(this.state.cards.length > 0){
    return this.state.cards.map((claim) => {
      return(
          <Card title={claim.name}>
              <Text style={{marginBottom: 10}}>
              Claim Amount: {claim.amount}
              </Text>
              <Button
                  onPress={()=>{ Linking.openURL(claim.evidence)}}
                  icon={<Icon name='code' color='#ffffff' />}
                  backgroundColor='#03A9F4'
                  buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                  title='View Evidence' />
          </Card>
      )
  })
  }
  
}

componentDidMount() {

      let cards = [];
      console.log("num: "+this.props.reducer.subgroup.subgroup['claims'].length);
      for(let x = 0; x < this.props.reducer.subgroup.subgroup['claims'].length; x++){
          fetch('http://10.21.75.178:5000/api/claim/getClaimByID', 
          {
              method: 'POST',
              headers: {'Accept': 'application/json','Content-Type': 'application/json'},
              body: JSON.stringify({claimID: this.props.reducer.subgroup.subgroup['claims'][x]})
          }).then(response => {
              return response.json();
          }).then(response => {
              console.log(response);
              let b = {user: response['claimant']['name'], evidence: response['evidence'], description: response['description']};
              cards.push(b);
              console.log("cards:"+cards);
              this.setState({cards: cards});

          }).catch((error) => {
              console.log(error)
          })
      }
}

  render() {
    return (
        <View>
          <ScrollView>
            {this.cList()} 
            <TouchableOpacity
                  style = {style.buttonContainer} onPress={() => this._newClaim()}>
                  <Text style={style.buttonText}>
                      New Claim
                  </Text>
            </TouchableOpacity>
            </ScrollView>
        </View>
    );

    // <View> 
    //       <ScrollView>
    //         {this.cList()} 
    //         <TouchableOpacity
    //             style = {style.buttonContainer} onPress={() => this._newSubgroup()}>
    //             <Text style={style.buttonText}>
    //                 New Subgroup
    //             </Text>
    //         </TouchableOpacity>
    //       </ScrollView>
    //   </View>

  }
}

const Claim = connect(mapStateToProps, mapDispatchToProps)(ClaimScreen);
export default Claim;


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