import React from 'react';
import { StyleSheet, View, TextInput, Button, Text, ListView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


const styles = StyleSheet.create(
  {
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
    tandaLogo: {
        color: '#5f9ea0',
        fontWeight: 'bold',
        fontSize: 40,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    }
  }
);

export default class StatusScreen extends React.Component {

  constructor(props){
    super(props)
    
    this.state = {
      isLoaded: false,
      tableHead: ['Member', 'Status'],
      tableData: [
        ['Member1', 'waiting'],
        ['Member2', 'waiting'],
        ['Member3', 'paid']
      ],
      tanda: 'test3',
      members: []
    }
  }

  componentDidMount() {
    // get user tanda and member list 
    // fetch('http://10.21.61.179:5000/api/tanda')
    // .then(response => {
    //   return response.json();
    // }).then(response => {
    //   let num_tandas = Object.keys(response).length;
    //   for(let i = 0; i < num_tandas; i++){
    //     if (response[i]['name'] == 'test3'){
    //       this.setState({members: response[i]['members']});
    //       this.setState({isLoaded: true});
    //       console.log(this.state.members);
    //     }
    //   }
    // }).catch((error) => {
    //   console.log(error)
    // })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.tandaLogo}>Tanda Status</Text>
        <Table 
            borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={this.state.tableData} textStyle={styles.text}/>
        </Table>
      </View>
    );
  }
}