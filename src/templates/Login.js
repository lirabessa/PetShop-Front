import React, { useState } from 'react';
import { View , Text, StyleSheet, TextInput, Button, KeyboardAvoidingView} from 'react-native'
import axios from "axios";
import * as SecureStore from 'expo-secure-store'

const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const realizarLogin = () =>{
    
        var varJson = {
            email:email,
            password:password
        }
        axios.post('https://pet-shop-back.vercel.app/login', varJson
        ).then(async response => {
            await SecureStore.setItemAsync("token","Bearer " + response.data.token)
            console.log('then',response.data);
            if(response.data.tipo === 'Funcionario'){
                console.log("FOI FUNC");
                navigation.navigate("BemVindoFunc")
            }else{
                navigation.navigate("BemVindoCli")
            }
        })
        .catch(error => {
            console.log('catch',error.response.data);
        });
    }

    return(
        <>           
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>    
            <View style = {{marginTop: 90}}>
                <Text style= {styles.titulo}>Bem Vindo ao PetShop</Text>
                <Text style={styles.inputLabel}>Email/CPF:</Text>
                <TextInput value= {email} onChangeText = {e => {setEmail(e)}} style={styles.input} placeholder = "Email/CFP"/>
                <Text style={styles.inputLabel}>Senha:</Text>
                <TextInput value = {password} onChangeText = {e => {setPassword(e)}} style={styles.input} placeholder = "Senha" secureTextEntry={true}/>
                {/* <Text style= {{paddingLeft: 11}}>Esqueceu a Senha?</Text> */}
            </View> 
            
            <View style={{ flexDirection: "row", justifyContent:"space-around", marginTop:60}}>
                <Text style={{marginTop: 10}} onPress={()=>navigation.navigate("CadastroCli")}>Criar conta</Text>
                <Text style={[styles.textStyle, styles.button, styles.buttonOpen]} onPress={()=>realizarLogin()}>ENVIAR</Text>
            </View>   

            
            </KeyboardAvoidingView>     
        </>
    )
}

const styles = StyleSheet.create({
    titulo:{
        textAlign:"center", fontSize: 30
    },
    barra:{
        flex:0.15, height:40, backgroundColor: "pink", 
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
        height:50,
        width:100,
        textAlign:"center",
        backgroundColor: "pink",
        height:50, width:100,
        borderRadius:10
    },
    inputLabel: {
        marginHorizontal: 12,
        paddingHorizontal: 10
    },
})

export default Login;