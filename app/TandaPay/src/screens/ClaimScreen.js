import React from 'react';
import { StyleSheet, View, TextInput, Button, Text, ListView, TouchableOpacity, Linking } from 'react-native';
import { connect } from 'react-redux';
import {removeTanda} from '../actions/tandaAction';
import {removeSubgroup} from '../actions/subgroupAction';
import {NavigationActions} from 'react-navigation';

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
      members: []
    }
  }

cList() {
  return this.state.cards.map((claim) => {
      return(

          <Card title={claim.name}>
              <Text style={{marginBottom: 10}}>
              Claim Amount: {claim.amount}
              </Text>
              <Button
                  onPress={()=>{ Linking.openURL('https://google.com')}}
                  icon={<Icon name='code' color='#ffffff' />}
                  backgroundColor='#03A9F4'
                  buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                  title='View Evidence' />
          </Card>
      )
  })
}

componentDidMount() {

      let cards = [];
          fetch('http://10.21.26.202:5000/api/subgroup/claimDetails', 
          {
              method: 'POST',
              headers: {'Accept': 'application/json','Content-Type': 'application/json'},
              body: JSON.stringify({subgroupID: this.props.reducer.subgroup.subgroup['_id']})
          }).then(response => {
              return response2.json();
          }).then(response => {
              let b = {name: response['name'], amount: response['amount'], evidence: response['evidence'], user: this.props.reducer.auth.user['name']};
              cards.push(b);
              console.log("cards:"+cards);
              this.setState({cards: cards});

          }).catch((error) => {
              console.log(error)
          })
      

}

  _onPressLeave(){

    fetch('http://10.21.26.202:5000/api/subgroup/deleteMember', 
    {
        method: 'DELETE',
        headers: {'Accept': 'application/json','Content-Type': 'application/json', 'Authorization': this.props.reducer.auth.user['token']},
        body: JSON.stringify({id:this.props.reducer.subgroup.subgroup['_id'] , user:this.props.reducer.auth.user['_id']})
    }).then(response => {
        return response.json();
    }).then(response => {
        console.log(response);
    }).catch((error) => {
        console.log(error)
    })

    fetch('http://10.21.26.202:5000/api/tanda/deleteMember', 
    {
        method: 'DELETE',
        headers: {'Accept': 'application/json','Content-Type': 'application/json', 'Authorization': this.props.reducer.auth.user['token']},
        body: JSON.stringify({tanda:this.props.reducer.tanda.tanda['_id'] , user:this.props.reducer.auth.user['_id']})
    }).then(response => {
        return response.json();
    }).then(response => {
        console.log(response);
    }).catch((error) => {
        console.log(error)
    })

    this.props.removeSubgroup();
    this.props.removeTanda();
    this.props.navigation.reset([NavigationActions.navigate({routeName: 'Start'})], 0);
  }

  render() {
    return (
        <View>
          <Text>My Tanda</Text>
          <Text>{this.props.reducer.tanda.tanda['name']}</Text>
          {this.cList()}
          <TouchableOpacity 
              onPress={() => this._onPressLeave()}
              style={style.buttonContainer}
        >
        <Text style={style.buttonText}>Leave Tanda</Text> 
        </TouchableOpacity>
        </View>
    );
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