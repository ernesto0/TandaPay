import React from 'react';
import { StyleSheet, View, TextInput, Button, Text, ListView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {removeSubgroup} from '../actions/subgroupAction';
import {NavigationActions} from 'react-navigation';

function mapDispatchToProps(dispatch){
  return{
    removeSubgroup: subgroup => dispatch(removeSubgroup(subgroup))
  };
}

const mapStateToProps = state => {
  return {
    reducer: state.reducer
  };
};

class SubgroupStatus extends React.Component {

  constructor(props){
    super(props)
    
    this.state = {
      delete: 0
    }
  }

  componentDidMount(){
    console.log("name: "+this.props.reducer.subgroup.subgroup['name']);

  }

  cList() {
    if(this.props.reducer.subgroup.subgroup.members){
      return this.props.reducer.subgroup.subgroup.members.map((member) => {
        return(
            <Text>
                {member.name}
            </Text>
        )
    })
    }
    
  }

  _onPressLeave(){

    fetch('http://10.21.9.47:5000/api/subgroup/deleteMember', 
            {
                method: 'DELETE',
                headers: {'Accept': 'application/json','Content-Type': 'application/json', 'Authorization': this.props.reducer.auth.user['token']},
                body: JSON.stringify({id:this.props.reducer.subgroup.subgroup['_id'] , user:this.props.reducer.auth.user['_id']})
            }).then(response => {
                return response.json();
            }).then(response => {
                console.log(response);
                console.log("num mem in sg: "+ response.length > 0);
                this.props.removeSubgroup();
                if(response['members'].length > 0){
                  console.log("navigating");
                  this.props.navigation.reset([NavigationActions.navigate({routeName: 'Subgroup'})], 0);
                }
                console.log("deleting");
                return fetch('http://10.21.9.47:5000/api/subgroup/delete', 
                {
                    method: 'POST',
                    headers: {'Accept': 'application/json','Content-Type': 'application/json', 'Authorization': this.props.reducer.auth.user['token']},
                    body: JSON.stringify({id:response['_id'], tandaID:this.props.reducer.tanda.tanda['_id']})
                }).then(response => {
                    return response.json();
                }).then(response => {
                    console.log("wooo: "+response);
                    this.props.navigation.reset([NavigationActions.navigate({routeName: 'Subgroup'})], 0);
                }).catch((error) => {
                    console.log(error)
                })
              
            }).catch((error) => {
                console.log(error)
            })

  }

  render() {
    return (
        <View>
          <Text>My Subgroup</Text>
          <Text>{this.props.reducer.subgroup.subgroup['name']}</Text>
          {this.cList()}
          <TouchableOpacity 
              onPress={() => this._onPressLeave()}
              style={style.buttonContainer}
        >
        <Text style={style.buttonText}>Leave Subgroup</Text> 
        </TouchableOpacity>
        </View>
    );
  }
}

const Status = connect(mapStateToProps, mapDispatchToProps)(SubgroupStatus);
export default Status;


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