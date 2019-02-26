import React from 'react';
import {StyleSheet, View, TextInput, Text, TouchableOpacity} from 'react-native'; 

export default class LoginForm extends React.Component{
    render(){
        return(
            <View style={StyleSheet.container}>
                <TextInput 
                    placeholder="username or email"
                    style={styles.input} 
                    />
                <TextInput 
                    placeholder="password"
                    style={styles.input} 
                    />

                <TouchableOpacity style = {styles.buttonContainer}>
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
        backgroundColor: 'rgba(255,255,255,0.7)',
        marginBottom: 20,
        color: '#FFF',
        paddingHorizontal: 10,
        fontWeight: '700'
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
