import React from 'react';
import {StyleSheet, View, TextInput, Text, TouchableOpacity} from 'react-native'; 

export default class RegistrationForm extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <View style = {styles.rowContainer}>
                    <View>
                    <TextInput 
                        placeholder="first name"
                        placeholderTextColor="#fff" 
                        style={styles.rowInput} 
                        />
                    </View>
                
                    <View>
                    <TextInput 
                        placeholder="last name"
                        placeholderTextColor="#fff" 
                        style={styles.rowInput}
                        />     
                    </View> 

             </View>           
                <TextInput 
                    placeholder="user name"
                    placeholderTextColor="#fff" 
                    style={styles.input} 
                    />
                <TextInput 
                    placeholder="email"
                    placeholderTextColor="#fff" 
                    style={styles.input} 
                    />
                <TextInput 
                    placeholder="password"
                    placeholderTextColor="#fff" 
                    style={styles.input} 
                    secureTextEntry={true}
                    />
                <TextInput 
                    placeholder="verify password"
                    placeholderTextColor="#fff" 
                    style={styles.input} 
                    secureTextEntry={true}
                    />

                <TouchableOpacity style = {styles.buttonContainer}>
                    <Text style = {styles.buttonText}>
                        NEXT
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
    rowInput:{
        height: 40,
        //backgroundColor: 'rgba(255,255,255,0.7)',
        marginBottom: 20,
        color: '#FFF',
        paddingHorizontal: 10,
        fontWeight: '700',
        width: 150,
        marginRight: 30,
        borderBottomColor: '#fdcb6e', // Add this to specify bottom border color
        borderBottomWidth: 2     // Add this to specify bottom border thickness
    },
    input:{
        height: 40,
        //backgroundColor: 'rgba(255,255,255,0.7)',
        marginBottom: 20,
        color: '#FFF',
        paddingHorizontal: 10,
        fontWeight: '700',
        alignItems: 'stretch',
        borderBottomColor: '#fdcb6e', // Add this to specify bottom border color
        borderBottomWidth: 2     // Add this to specify bottom border thickness
    },
    rowContainer:{
        flexDirection:'row',
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
