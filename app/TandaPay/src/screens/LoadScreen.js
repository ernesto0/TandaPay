import React from 'react';
import { StyleSheet, View, Image, Text} from 'react-native';
import { connect } from 'react-redux';
import {setTanda} from '../actions/tandaAction';
import {removeTanda} from '../actions/tandaAction';
import authReducer from '../reducers/authReducer';

function mapDispatchToProps(dispatch){
    return{
      setTanda: tanda => dispatch(setTanda(tanda)),
      removetanda: tanda => dispatch(removeTanda(tanda))
    };
  }

  const mapStateToProps = state => {
    return {
      reducer: state.reducer
    };
  };

 class LoadScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount(){

      let auth = this.props.reducer.auth.isAuthenticated;
      let tanda = Object.keys(this.props.reducer.tanda.tanda).length != 0;
      let subgroup = Object.keys(this.props.reducer.subgroup.subgroup).length != 0;
      // console.log(auth + "" + tanda + "" + subgroup);

      if (auth == false){
        this.props.navigation.navigate('Start');
      }

      fetch('http://10.21.48.60:5000/api/users/current', 
      {
        method: 'GET',
        headers: {'Accept': 'application/json','Content-Type': 'application/json', 'Authorization': this.props.reducer.auth.user['token']}
      }).then(response => {
          return response.json();
      }).then(response => {
        console.log(response);
      }).catch((error) => {
        if(tanda == true){
          this.props.navigation.navigate('Login');
        }
        else{
          this.props.navigation.navigate('Start');
        }
      })
      
      if (auth == true && tanda == false){
        this.props.navigation.navigate('Start');
      }

      if (auth == true && tanda == true && subgroup == false){
        this.props.navigation.navigate('Subgroup');
      }

      if (auth == true && tanda == true && subgroup == true){
        this.props.navigation.navigate('Home');
      }

    }

    render() {

      // console.log(this.props.reducer);
      // console.log(this.props.reducer.auth.isAuthenticated);
      // if(this.props.reducer.auth.isAuthenticated == true){
      //   console.log("yaaas");
      // }
 
        return (
            <View style={style.container}>
                <Image
                  style={{width: '100%', height: 300, resizeMode : 'contain'}}
                  source = {require('../../assets/image/tanda2v3.png')}
                />
            </View>
        )
    }
}

Load = connect(mapStateToProps, mapDispatchToProps)(LoadScreen);
export default Load;


const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#00cec9',
  }
});