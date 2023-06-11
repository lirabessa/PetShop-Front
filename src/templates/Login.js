import React, { useState } from 'react';
import { View , Text, StyleSheet, TextInput, Button, KeyboardAvoidingView, Pressable} from 'react-native'
import axios from "axios";
import * as SecureStore from 'expo-secure-store'
import Toast from 'react-native-toast-message';

const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    handleDoubleTap = () => {
        setEmail('teste@teste')
        setPassword('teste')
    }

    handleDoubleEmail = () => {
        setEmail('rodrigocli@teste')
        setPassword('oi')
    }

    const realizarLogin = () =>{
    
        var varJson = {
            email:email,
            password:password
        }
        axios.post('https://pet-shop-back.vercel.app/login', varJson
        ).then(async response => {
            await SecureStore.setItemAsync("token","Bearer " + response.data.token)
            console.log('Login response',response.data);
            if(response.data.tipo === 'Funcionario'){
                navigation.navigate("BemVindoFunc")
            }else{
                navigation.navigate("BemVindoCli")
            }
        })
        .catch(error => {
            Toast.show({
                type: 'error',
                text1: 'Email ou Senha incorretos',
            });
            console.log('catch',error.response.data);
        })
    }

    return(
        <> 
            <View style = {styles.barra}/>          
           
            <View style = {{marginTop: 90}}>
                <Pressable  onLongPress={handleDoubleTap}><Text style= {styles.titulo}>Bem Vindo ao PetShop</Text></Pressable>
                <Pressable  onLongPress={handleDoubleEmail}><Text style={styles.inputLabel}>Email/CPF:</Text></Pressable>
                <TextInput value= {email} onChangeText = {e => {setEmail(e)}} style={styles.input} placeholder = "Email/CFP" type="email"/>
                <Text style={styles.inputLabel}>Senha:</Text>
                <TextInput value = {password} onChangeText = {e => {setPassword(e)}} style={styles.input} placeholder = "Senha" secureTextEntry={true}/>
                {/* <Text style= {{paddingLeft: 11}}>Esqueceu a Senha?</Text> */}
            </View> 
            
            <View style={{ flexDirection: "column", justifyContent:"space-around", marginTop:60}}>
                <Text style={[styles.textStyle, styles.button, styles.buttonOpen]} onPress={()=>realizarLogin()}>ENVIAR</Text>
                <Text style={{marginTop: 10, textAlign: 'center'}} onPress={()=>navigation.navigate("CadastroCli")}>Criar conta</Text>
            </View>   

            
           
        </>
    )
}

const styles = StyleSheet.create({
    titulo:{
        textAlign:"center", fontSize: 30
    },
    barra:{
        flex:0.20, height:40, backgroundColor: "pink", 
    },
    input:{
        height: 40, margin: 12, borderWidth: 1, borderRadius: 10, padding: 10, marginTop: 20
    },
    textStyle: {
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center' ,
        
    },
    button: {
        padding: 15,
        textAlign:"center",
        backgroundColor: "pink",
        height:55, 
        width:'95%',
        margin: '2.5%',
        borderRadius:10
    },
    inputLabel: {
        marginHorizontal: 12,
        paddingHorizontal: 10
    },
})

export default Login;