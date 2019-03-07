import React from 'react';
import {StyleSheet, View, TextInput, Text, TouchableOpacity} from 'react-native'; 

export default class LoginForm extends React.Component{

    constructor(props){
        super(props)
    
        this.state = {
          username: '',
          pasword: '',
          navigation: this.props.navigation
        }

        // this._onPressSubmit = this._onPressSubmit.bind(this);


    }

    _onPressSubmit() {
        console.log(this.state.username);
        console.log(this.state.password);
        
        this.state.navigation.navigate('Home');
    }


    render(){
        return(
            <View style={styles.container}>
                <TextInput 
                    placeholder="username or email"
                    placeholderTextColor="#fff" 
                    style={styles.input} 
                    onChangeText={(text) => this.setState({username:text})}
                />
                <TextInput 
                    placeholder="password"
                    placeholderTextColor="#fff" 
                    style={styles.input} 
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({password:text})}
                />

                <TouchableOpacity style = {styles.buttonContainer}
                    onPress={() => this._onPressSubmit()}>
                    <Text style = {styles.buttonText}>
                        LOGIN
                    </Text>
                </TouchableOpacity>    
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding:20
    },
    input:{
        height: 40,
        //backgroundColor: 'rgba(255,255,255,0.7)',
        marginBottom: 20,
        color: '#2d3436',
        paddingHorizontal: 10,
        fontWeight: '700',
        borderBottomColor: '#fdcb6e', // Add this to specify bottom border color
        borderBottomWidth: 2     // Add this to specify bottom border thickness
    },
    buttonContainer:{
        backgroundColor: '#fdcb6e',
        paddingVertical: 10,
    },
    buttonText:{
        textAlign: 'center',
        color:'#FFF',
    }
});
