import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, KeyboardAvoidingView, TextInput, ScrollView} from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { connect } from 'react-redux';
import {setTanda} from '../actions/tandaAction';
import {removeTanda} from '../actions/tandaAction';
import {NavigationActions} from 'react-navigation';

function mapDispatchToProps(dispatch){
    return{
      setTanda: tanda => dispatch(setTanda(tanda)),
      removetanda: tanda => dispatch(removeTanda(tanda))
    };
  }

const mapStateToProps = state => {
    return {
      auth: state.auth,
      tanda: state.tanda
    };
  };

 class SubgroupNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avail_list: [],
            subgroup_name: ''
        }
    }
    
    cList() {
        return this.state.avail_list.map((member) => {
            return(
                <TouchableOpacity
                    onPress={() => this._onPressJoin(member._id)}
                    icon={<Icon name='code' color='#ffffff' />}
                    backgroundColor='#ffffff'
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title={member.name} />
            )
        })
    }

    _onPressCreate(){
        console.log("create");
        fetch('http://10.21.48.60:5000/api/subgroup/create', 
            {
                method: 'POST',
                headers: {'Accept': 'application/json','Content-Type': 'application/json', 'Authorization': this.props.auth.user['token']},
                body: JSON.stringify({name: this.state.subgroup_name, id: this.props.auth.user['_id'], tandaID: this.props.tanda.tanda['_id'], userID: this.props.auth.user['_id'], userName: this.props.auth.user['name']})
            }).then(response => {
                return response.json();
            }).then(response => {
                console.log(response);
                console.log(response['name']);
                console.log((response['name'] == this.props.tanda.tanda['name']));
                console.log("oooo");
                this.props.setTanda(response);
                // this.props.navigation.dismiss();
                this.props.navigation.reset([NavigationActions.navigate({routeName: 'Subgroup'})], 0);
                // this.props.navigation.navigate('Subgroup');
                
            }).catch((error) => {
                console.log(error)
            })

    }

    componentDidMount() {
        fetch('http://10.21.48.60:5000/api/tanda', 
            {
                method: 'GET'
            }).then(response => {
                return response.json();
            }).then(response => {
                console.log(response);
                console.log(response[0]['members']);
                let avail_mem = [];
                for(let x=0; x < response[0]['members'].length; x++){
                    if(response[0]['members'][x]['isInSubgroup'] == false){
                        avail_mem.push(response[0]['members'][x]);
                    }
                }
                console.log(avail_mem);
                this.setState({avail_list: avail_mem});
            }).catch((error) => {
                console.log(error)
            })
    }

    // componentWillUnmount(){
    //     console.log('unmount');
        

    // }

    
    render() {
 
        return (
            <View>
                <TextInput 
                placeholder="subgroup name"
                placeholderTextColor="#fff" 
                style={style.input} 
                secureTextEntry={true}
                onChangeText={(text) => this.setState({subgroup_name:text})}
              />
              <TouchableOpacity style = {style.buttonContainer}
                onPress={() => this._onPressCreate()}>
                <Text style = {style.buttonText}>
                    Create
                </Text>
              </TouchableOpacity>
            </View>
        )
    }
}

Subgroup = connect(mapStateToProps, mapDispatchToProps)(SubgroupNew);
export default Subgroup;


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