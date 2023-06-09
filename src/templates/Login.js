<<<<<<< HEAD
import React, { useState } from 'react';
import { View , Text, StyleSheet, TextInput, Button, KeyboardAvoidingView, Pressable} from 'react-native'
import axios from "axios";
import * as SecureStore from 'expo-secure-store'

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
            console.log('catch',error.response.data);
        });
    }

=======
import React from 'react';
import { View , Text, StyleSheet, TextInput, Button, KeyboardAvoidingView, TouchableOpacity} from 'react-native'
import RadioButtons from '../components/RadioButtons';

const Login = ({navigation}) => {
    const [tipoLogin, setTipoLogin] = React.useState(1)

    const navegarTela = () => {
        navigation.navigate(tipoLogin === 1 ? "BemVindoFunc" :"BemVindoCli")
    }

    const setChecked = (id) => {
        setTipoLogin(id)
    }
  
>>>>>>> dac772321f726616af06060890536f7d94139838
    return(
        <>           
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>    
            <View style = {{marginTop: 90}}>
                <Pressable  onLongPress={handleDoubleTap}><Text style= {styles.titulo}>Bem Vindo ao PetShop</Text></Pressable>
                <Pressable  onLongPress={handleDoubleEmail}><Text style={styles.inputLabel}>Email/CPF:</Text></Pressable>
                <TextInput value= {email} onChangeText = {e => {setEmail(e)}} style={styles.input} placeholder = "Email/CFP" type="email"/>
                <Text style={styles.inputLabel}>Senha:</Text>
                <TextInput value = {password} onChangeText = {e => {setPassword(e)}} style={styles.input} placeholder = "Senha" secureTextEntry={true}/>
                {/* <Text style= {{paddingLeft: 11}}>Esqueceu a Senha?</Text> */}
            </View> 
            
<<<<<<< HEAD
            <View style={{ flexDirection: "row", justifyContent:"space-around", marginTop:60}}>
                <Text style={{marginTop: 10}} onPress={()=>navigation.navigate("CadastroCli")}>Criar conta</Text>
                <Text style={[styles.textStyle, styles.button, styles.buttonOpen]} onPress={()=>realizarLogin()}>ENVIAR</Text>
=======
            <View style={{ flexDirection: "column", justifyContent:"space-around", marginTop:60}}>
                <Text style={{marginTop: 10, width: '100%', textAlign: 'center', fontSize: 25}} onPress={()=>navigation.navigate("CadastroCli")}>Criar conta</Text>
                <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center'}}>
                    <RadioButtons key={1} item={{label:"Funcionário", id: 1}} setChecked={setChecked} checked={tipoLogin}/>
                    <RadioButtons key={2} item={{label:"Cliente", id: 2}} setChecked={setChecked} checked={tipoLogin}/>
                </View>
                <Text style={[styles.textStyle, styles.button, styles.buttonOpen]} onPress={()=>navegarTela()}>Login</Text>
>>>>>>> dac772321f726616af06060890536f7d94139838
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