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
                        style={styles.rowInput} 
                        />
                    </View>
                
                    <View>
                    <TextInput 
                        placeholder="last name"
                        style={styles.rowInput}
                        />     
                    </View> 

             </View>           
                <TextInput 
                    placeholder="user name"
                    style={styles.input} 
                    />
                <TextInput 
                    placeholder="email"
                    style={styles.input} 
                    />
                <TextInput 
                    placeholder="password"
                    style={styles.input} 
                    secureTextEntry={true}
                    />
                <TextInput 
                    placeholder="verify password"
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
        backgroundColor: 'rgba(255,255,255,0.7)',
        marginBottom: 20,
        color: '#FFF',
        paddingHorizontal: 10,
        fontWeight: '700',
        width: 150,
        marginRight: 30,
    },
    input:{
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.7)',
        marginBottom: 20,
        color: '#FFF',
        paddingHorizontal: 10,
        fontWeight: '700',
        alignItems: 'stretch',
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
