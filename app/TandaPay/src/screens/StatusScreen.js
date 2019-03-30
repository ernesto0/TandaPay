import React from 'react';
import { StyleSheet, View, TextInput, Button, Text, ListView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { connect } from 'react-redux';


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

const mapStateToProps = state => {
  return {
    auth: state.auth,
    tanda: state.tanda
  };
};

class StatusScreen extends React.Component {

  constructor(props){
    super(props)
    
    this.state = {
      isLoaded: false,
      tableHead: ['Member', 'Status'],
      // tableData: [
      //   ['Member1', 'waiting'],
      //   ['Member2', 'waiting'],
      //   ['Member3', 'paid']
      // ],
      tableData: [],
      // tanda: 'test3',
      members: []
    }
  }

  componentDidMount() {

    fetch('http://10.21.60.160:5000/api/tanda/getTandaByID', 
    {
      method: 'POST',
      headers: {'Accept': 'application/json','Content-Type': 'application/json'},
      body: JSON.stringify({id: this.props.navigation.state.params.data})
    })
    .then(response => {
      return response.json();
    }).then(response => {
      if(response != null){
        // set table data to arrays of member name and status
        console.log(response['members']);
        let members = response['members'];
        let y = members.length;
        let table = [];
        for(x=0; x<y; x++ ){
          let b = [];
          b.push([members[x].user, members[x].status]);
          table.push(b);
        }
        console.log("HERE");
        console.log(table);
        this.setState({tableData: table});
        this.setState({isLoaded: true});
      }
      else{
        console.log("empty member list")
      }
    }).catch((error) => {
      console.log(error)
    })
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

const Status = connect(mapStateToProps, null)(StatusScreen);
export default Status;