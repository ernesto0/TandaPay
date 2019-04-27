import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput} from 'react-native';
import { connect } from 'react-redux';
import {setTanda} from '../actions/tandaAction';
import {removeTanda} from '../actions/tandaAction';
import {NavigationActions} from 'react-navigation';
import {setSubgroup} from '../actions/subgroupAction';

function mapDispatchToProps(dispatch){
    return{
      setTanda: tanda => dispatch(setTanda(tanda)),
      removetanda: tanda => dispatch(removeTanda(tanda)),
      setSubgroup: subgroup => dispatch(setSubgroup(subgroup))
    };
  }

  const mapStateToProps = state => {
    return {
      reducer: state.reducer
    };
  };

 class CLaimNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            amount: '',
            evidence: ''
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
        fetch('http://10.21.75.178:5000/api/claim/create', 
            {
                method: 'POST',
                headers: {'Accept': 'application/json','Content-Type': 'application/json', 'Authorization': this.props.reducer.auth.user['token']},
                body: JSON.stringify({name: this.props.reducer.auth.user['name'], claimantID: this.props.reducer.auth.user['_id'], evidence: this.state.evidence, description: this.state.description, subgroupID: this.props.reducer.subgroup.subgroup['_id'] })
            }).then(response => {
                return response.json();
            }).then(response => {
                console.log(response);
                this.props.navigation.reset([NavigationActions.navigate({routeName: 'Home'})], 0);
            }).then(response => {
                console.log(response);
            }).catch((error) => {
                console.log(error)
            })

    }
    
    render() {
 
        return (

            <View style={style.container}>
                <Text style={style.tandaLogo}>New Claim</Text>
                <TextInput 
                placeholder="description"
                placeholderTextColor="#fff" 
                style={style.input} 
                onChangeText={(text) => this.setState({description:text})}
              />
              <TextInput 
                placeholder="evidence link"
                placeholderTextColor="#fff" 
                style={style.input} 
                onChangeText={(text) => this.setState({evidence:text})}
              />
              <TouchableOpacity style = {style.buttonContainer}
                onPress={() => this._onPressCreate()}>
                <Text style = {style.buttonText}>
                    Submit Claim
                </Text>
              </TouchableOpacity>
            </View>
        )
    }
}

Claim = connect(mapStateToProps, mapDispatchToProps)(CLaimNew);
export default Claim;


const style = StyleSheet.create({
      tandaLogo:{
        textAlign: 'center',
        color:'#FFF',
        fontWeight: 'bold',
        fontSize: 40,
        justifyContent: 'center',
        padding: 10
      },
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
        color: '#000000',
        paddingHorizontal: 10,
        fontWeight: '700',
        borderBottomColor: '#e17055', // Add this to specify bottom border color
        borderBottomWidth: 2     // Add this to specify bottom border thickness
      },
      buttonContainer:{
          backgroundColor: '#e17055',
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
