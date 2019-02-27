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
            justifyContent: 'center'
          }
    }
  );

export default class StatusScreen extends React.Component {

  constructor(props){
    super(props)
    
    this.state = {
        tableHead: ['Member', 'Status'],
        tableData: [
          ['uhhh1', 'nope'],
          ['uhhh2', 'nope'],
          ['uhhh3', 'joined'],
          ['uhhh4', 'paid']
        ]
      }
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