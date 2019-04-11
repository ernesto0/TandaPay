import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, KeyboardAvoidingView, TextInput, ScrollView} from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { connect } from 'react-redux';
import {setTanda} from '../actions/tandaAction';

function mapDispatchToProps(dispatch){
    return{
      setSubgroup: subgroup => dispatch(setSubgroup(subgroup))
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
            avail_list: []
        }
    }
    
    cList() {
        // return this.state.avail_list.map((member) => {
        //     return(

                
        //             <Button
        //                 onPress={() => this._onPressJoin(member._id)}
        //                 icon={<Icon name='code' color='#ffffff' />}
        //                 backgroundColor='#ffffff'
        //                 buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
        //                 title={member.name} />
                
        //     )
        // })
        
        return (
                <Button
                onPress={() => this._onPressJoin(member._id)}
                icon={<Icon name='code' color='#ffffff' />}
                backgroundColor='#000000'
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title={this.state.avail_list[0]['name']} />
            )
        }

    _onPressBack(){
        this.props.navigation.navigate('SubgroupScreen');
    }

    _onPressJoin(id){
        console.log(id);
    }

    componentDidMount() {
        fetch('http://10.21.57.5:5000/api/tanda', 
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

    
    render() {
 
        return (
            <View>
                
                
 
                    {this.cList}
                
               
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