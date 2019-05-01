import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button, Icon } from 'react-native-elements';

const mapStateToProps = state => {
    return {
      reducer: state.reducer
    };
  };


class SubgroupScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            cards: [],
            test: ["one", "two", "three", "four"],
            loaded: 0
        }
    }

    _newSubgroup(){
        this.props.navigation.navigate('SubgroupNew');
    }

    viewSubgroup(id){
        console.log("navigate pls" + id);
        this.props.navigation.navigate('SubgroupInfo', {subgroupID: id});
    }

    _onPress(index) {
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

        console.log("^^^^^^^^^^^^" + this.props.reducer.auth.user['name']);
            let cards = [];
            for(let x = 0; x < this.props.reducer.tanda.tanda['subgroups'].length; x++){
                fetch('http://10.21.75.178:5000/api/subgroup/getSubgroupByID', 
                {
                    method: 'POST',
                    headers: {'Accept': 'application/json','Content-Type': 'application/json'},
                    body: JSON.stringify({subgroupID: this.props.reducer.tanda.tanda['subgroups'][x]})
                }).then(response2 => {
                    return response2.json();
                }).then(response2 => {
                    let b = {name: response2['name'], num_mem: response2['members'].length, mem_list: response2['members'], subgroup_id: this.props.reducer.tanda.tanda['subgroups'][x]};
                    console.log(b);
                    if(response2['members'].length < 7){
                        cards.push(b);
                    }

                    console.log("blue");
                    console.log("cards:"+cards);
                    this.setState({cards: cards});

                }).catch((error) => {
                    console.log(error)
                })
            }

    }



  
    render() {

    return (
      <View style={style.container}> 
          <ScrollView>
            {this.cList()} 
            <TouchableOpacity
                style = {style.buttonContainer} onPress={() => this._newSubgroup()}>
                <Image
                    style={{width: '100%', height: 100, resizeMode : 'contain' }}
                    source = {require('../../assets/icons/baseline_meeting_room_white_48dp.png')}
                />
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
        backgroundColor: 'rgba(0,0,0,0)',
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