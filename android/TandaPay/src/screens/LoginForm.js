import React from 'react';
import {StyleSheet, View, TextInput, Text, TouchableOpacity} from 'react-native'; 

export default class LoginForm extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <TextInput 
                    placeholder="username or email"
                    placeholderTextColor="#fff" 
                    style={styles.input} 
                    />
                <TextInput 
                    placeholder="password"
                    placeholderTextColor="#fff" 
                    style={styles.input} 
                    secureTextEntry={true}
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
