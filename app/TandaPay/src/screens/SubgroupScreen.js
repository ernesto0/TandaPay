import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { connect } from 'react-redux';
import blank from '../blank.jpeg';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import { withNavigationFocus } from 'react-navigation';

const mapStateToProps = state => {
    return {
      reducer: state.reducer
    };
  };

  


class SubgroupScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //   tableHead: ['Name', 'Members', 'More Info'],
            //   tableData: [
            //     ['1', '2', '3'],
            //     ['a', 'b', 'c'],
            //     ['1', '2', '3'],
            //     ['a', 'b', 'c']
            //   ]
            tableData: [],
            cards: [],
            test: ["one", "two", "three", "four"],
            loaded: 0
        }
        // this.viewSubgroup = viewSubgroup().bind(this);
    }

    _newSubgroup(){
        this.props.navigation.navigate('SubgroupNew');
    }

    viewSubgroup(id){
        console.log("navigate pls" + id);
        this.props.navigation.navigate('SubgroupInfo', {subgroupID: id});
    }

    _onPress(index) {
        // Alert.alert(`This is row ${index + 1}`);
        this.props.navigation.navigate('SubgroupInfo');
    }

    cList() {
        return this.state.cards.map((subgroup) => {
            return(

                <Card title={subgroup.name}>
                    <Text style={{marginBottom: 10}}>
                    Number of members: {subgroup.num_mem} / 7
                    </Text>
                    <Button
                        onPress={() => this.viewSubgroup(subgroup.subgroup_id)}
                        icon={<Icon name='code' color='#ffffff' />}
                        backgroundColor='#03A9F4'
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title='VIEW MEMBERS' />
                </Card>
            )
        })
    }
    

    componentDidMount() {
    
        // const request = async () => {
        //     const response = await fetch('http://10.21.40.55:5000/api/tanda/subgroupsByTandaID', 
        //     {
        //     method: 'POST',
        //     headers: {'Accept': 'application/json','Content-Type': 'application/json'},
        //     body: JSON.stringify({tandaID: '5c803d243c4acd485b374a64'})
        //     });
        //     const json = await response.json();
        //     this.setState({subgroup_list: response});
        //     console.log(json);
        // }
        // request();

        // this.setState({subgroup_list: ["5c817ab942a9b71988d68a69", "5c817ac342a9b71988d68a6a","5c817ac542a9b71988d68a6b"]});

        console.log("^^^^^^^^^^^^" + this.props.reducer.auth.user['name']);
            let cards = [];
            // let num_sg = this.state.subgroup_list.length;
            // console.log("log list:"+this.state.subgroup_list);
            for(let x = 0; x < this.props.reducer.tanda.tanda['subgroups'].length; x++){
                fetch('http://10.21.75.178:5000/api/subgroup/getSubgroupByID', 
                {
                    method: 'POST',
                    headers: {'Accept': 'application/json','Content-Type': 'application/json'},
                    body: JSON.stringify({subgroupID: this.props.reducer.tanda.tanda['subgroups'][x]})
                }).then(response2 => {
                    return response2.json();
                }).then(response2 => {
                    // console.log("resp: "+response2);
                    // console.log("UJJJJJJJJJ" +response2['_id']);
                    let b = {name: response2['name'], num_mem: response2['members'].length, mem_list: response2['members'], subgroup_id: this.props.reducer.tanda.tanda['subgroups'][x]};
                    console.log(b);
                    if(response2['members'].length < 7){
                        cards.push(b);
                    }
                    // console.log(table);

                    console.log("blue");
                    console.log("cards:"+cards);
                    this.setState({cards: cards});

                }).catch((error) => {
                    console.log(error)
                })
            }

    }



  
    render() {
        // const element = (data, index) => (
        // <TouchableOpacity onPress={() => this._onPress(index)}>
        //     <View style={styles.btn}>
        //         <Text style={styles.btnText}>more info</Text>
        //     </View>
        // </TouchableOpacity>
    // );
 
    // return (
    //     // <View style={styles.container}>
    //     //     <Table borderStyle={{borderColor: 'transparent'}}>
    //     //     <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
    //     //     {
    //     //         this.state.tableData.map((rowData, index) => (
    //     //         <TableWrapper key={index} style={styles.row}>
    //     //             {
    //     //             rowData.map((cellData, cellIndex) => (
    //     //                 <Cell key={cellIndex} data={cellIndex === 2 ? element(cellData, index) : cellData} textStyle={styles.text}/>
    //     //             ))
    //     //             }
    //     //         </TableWrapper>
    //     //         ))
    //     //     }
    //     //     </Table>
    //     // </View>
    //     <View style={styles.container}>
    //         <CardList cards={this.state.cards} />
    //     </View>
    // )

    return (
      <View> 
          <ScrollView>
            {this.cList()} 
            <TouchableOpacity
                style = {style.buttonContainer} onPress={() => this._newSubgroup()}>
                <Text style={style.buttonText}>
                    New Subgroup
                </Text>
            </TouchableOpacity>
          </ScrollView>
      </View>
    );
    }

    
}

const Subgroup = connect(mapStateToProps)(SubgroupScreen);
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