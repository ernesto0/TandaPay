import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

export default class SubgroupScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          tableHead: ['Name', 'Members', 'More Info'],
        //   tableData: [
        //     ['1', '2', '3'],
        //     ['a', 'b', 'c'],
        //     ['1', '2', '3'],
        //     ['a', 'b', 'c']
        //   ]
        tableData: [],
        sg_list: ["5c817ab942a9b71988d68a69", "5c817ac342a9b71988d68a6a","5c817ac542a9b71988d68a6b"]
        }
    }

    _onPress(index) {
        Alert.alert(`This is row ${index + 1}`);
    }

    componentDidMount() {
    
        // const request = async () => {
        //     const response = await fetch('http://192.168.1.27:5000/api/tanda/subgroupsByTandaID', 
        //     {
        //     method: 'POST',
        //     headers: {'Accept': 'application/json','Content-Type': 'application/json'},
        //     body: JSON.stringify({tandaID: '5c803d243c4acd485b374a64'})
        //     });
        //     const json = await response.json();
        //     this.setState({sg_list: response});
        //     console.log(json);
        // }
        // request();

        // this.setState({sg_list: ["5c817ab942a9b71988d68a69", "5c817ac342a9b71988d68a6a","5c817ac542a9b71988d68a6b"]});

        console.log("hi");
        let table = [];
        let num_sg = this.state.sg_list.length;
        for(let x = 0; x < num_sg; x++){
            fetch('http://192.168.1.27:5000/api/subgroup/getSubgroupByID', 
            {
                method: 'POST',
                headers: {'Accept': 'application/json','Content-Type': 'application/json'},
                body: JSON.stringify({subgroupID: this.state.sg_list[x]})
            }).then(response2 => {
                return response2.json();
            }).then(response2 => {
                console.log(response2);
                // console.log(response2['name']);
                let name = response2['name'];
                let num_mem = response2['members'].length;
                let b = ([name, num_mem, "more info"]);
                // console.log(b);
                table.push(b);
                // console.log(table);

                console.log("blue");
                console.log(table);
                this.setState({tableData: table});

            }).catch((error) => {
                console.log(error)
            })
        }

    }


    render() {

        const element = (data, index) => (
        <TouchableOpacity onPress={() => this._onPress(index)}>
            <View style={styles.btn}>
                <Text style={styles.btnText}>more info</Text>
            </View>
        </TouchableOpacity>
    );
 
    return (
        <View style={styles.container}>
            <Table borderStyle={{borderColor: 'transparent'}}>
            <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
            {
                this.state.tableData.map((rowData, index) => (
                <TableWrapper key={index} style={styles.row}>
                    {
                    rowData.map((cellData, cellIndex) => (
                        <Cell key={cellIndex} data={cellIndex === 2 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                    ))
                    }
                </TableWrapper>
                ))
            }
            </Table>
        </View>
    )
    }
}

  const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#808B97' },
    text: { margin: 0 },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }
  });