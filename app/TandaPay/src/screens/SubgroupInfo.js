import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { connect } from 'react-redux';
import {setSubgroup} from '../actions/subgroupAction';

function mapDispatchToProps(dispatch){
    return{
      setSubgroup: subgroup => dispatch(setSubgroup(subgroup))
    };
  }

  const mapStateToProps = state => {
    return {
      reducer: state.reducer
    };
  };

 class SubgroupInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // subgroupID: '5c817ab942a9b71988d68a69',
            name: '',
            num_mem: '',
            mem_list: ''

        }
    }
    

    _onPressBack(){
        this.props.navigation.navigate('SubgroupScreen');
    }

    _onPressJoin(){
        console.log("Join");
        console.log(this.props.navigation.state.params.subgroupID);

        fetch('http://10.21.75.178:5000/api/subgroup/addMember', 
        {
            method: 'POST',
            headers: {'Accept': 'application/json','Content-Type': 'application/json', 'Authorization': this.props.reducer.auth.user['token']},
            body: JSON.stringify({subgroupID: this.props.navigation.state.params.subgroupID, newMemberID: this.props.reducer.auth.user['id'], name: this.props.reducer.auth.user['name']})
        }).then(response => {
            return response.json();
        }).then(response => {

            console.log(response);
            this.props.setSubgroup(response);
            this.props.navigation.navigate('Home');
        }).catch((error) => {
            console.log(error)
        })

    }

    componentDidMount() {


    
        console.log(this.props.reducer.tanda.tanda);
        console.log("ajsdkfjaksdjcfasdfhsdi"+ this.props.navigation.state.params.subgroupID);

        fetch('http://10.21.75.178:5000/api/subgroup/getSubgroupByID', 
            {
                method: 'POST',
                headers: {'Accept': 'application/json','Content-Type': 'application/json'},
                body: JSON.stringify({subgroupID: this.props.navigation.state.params.subgroupID})
            }).then(response2 => {
                return response2.json();
            }).then(response2 => {
                console.log("HI: "+ response2);
                console.log("num_mem" + response2['members'].length-1);
                console.log("mem" + response2['members']);

                let names = [];
                for(let x=0; x < response2['members'].length; x++){
                    console.log("sg "+ x + " is " + response2['members'][x]['name']);
                    names.push(response2['members'][x]['name']);
                }

                this.setState({name : response2['name']});
                this.setState({num_mem : response2['members'].length});
                this.setState({mem_list : names});

                console.log(this.props.reducer.auth.user['name']);

            }).catch((error) => {
                console.log(error)
            })

    }

    
    render() {
 
        return (
            <View>
                <Text>{this.state.name}</Text>
                <Text>{this.state.mem_list}</Text>
                <TouchableOpacity style = {style.buttonContainer}
                    onPress={() => this._onPressJoin()}>
                    <Text style = {style.buttonText}>
                        Join Subgroup
                    </Text>
              </TouchableOpacity>
            </View>
        )
    }
}

Subgroup = connect(mapStateToProps, mapDispatchToProps)(SubgroupInfo);
export default Subgroup;


const style = StyleSheet.create({
    buttonContainer:{
        backgroundColor: '#fdcb6e',
        paddingVertical: 10,
        marginBottom:10
    },
    buttonText:{
        textAlign: 'center',
        color:'#FFF',
    }
  });