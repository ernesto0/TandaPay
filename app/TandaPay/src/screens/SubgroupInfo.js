import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
      auth: state.auth,
      tanda: state.tanda
    };
  };

 class SubgroupInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    

    componentDidMount() {
    
        console.log(this.props.tanda.tanda);

    }

    
    render() {
 
        return (
            <View>
                
            </View>
        )
    }
}

Subgroup = connect(mapStateToProps)(SubgroupInfo);
export default Subgroup;