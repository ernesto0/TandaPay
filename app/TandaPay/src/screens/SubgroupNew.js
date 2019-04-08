import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
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

    }

    componentDidMount() {

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

Subgroup = connect(mapStateToProps, mapDispatchToProps)(SubgroupNew);
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