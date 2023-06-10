import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Pressable} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

const BemVindoCli = ({navigation}) => {
    
    return(
        <>
        <View style = {styles.barra}>
            <Icon.Button name="angle-left" 
                size={20} color="black"
                backgroundColor = 'pink' onPress={()=>navigation.navigate("Login")}>Voltar 
            </Icon.Button>
        </View>
                        <KeyboardAvoidingView behavior={Platform.OS === 'ios'? 'padding' : 'padding'}>
                            <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>                
                                <KeyboardAvoidingView style = {{ paddingTop: 50}}>
                                    <Text style= {styles.titulo}>Bem vindo Cliente</Text>
                                </KeyboardAvoidingView> 
                            </TouchableWithoutFeedback>

                            <KeyboardAvoidingView style={{justifyContent: "space-around", alignItems: "center", }}>
                        
                                {/* <Pressable
                                    style={[styles.button, styles.buttonOpen]}>
                                    <Text onPress={()=>navigation.navigate("")}  style={styles.textStyle}>Agendar Consultas</Text>
                                </Pressable> */}

                                <Pressable
                                    style={[styles.button, styles.buttonOpen]}>
                                    <Text onPress={()=>navigation.navigate("VisualizarSeusProd")} style={styles.textStyle}>Visualizar seus Produtos</Text>
                                </Pressable>

                                <Pressable
                                    style={[styles.button, styles.buttonOpen]}>
                                    <Text  onPress={()=>navigation.navigate("VisualizarSeusPet")}  style={styles.textStyle}>Visualizar seus Pets ♥</Text>
                                </Pressable>

                                <Pressable
                                    style={[styles.button, styles.buttonOpen]}>
                                    <Text onPress={()=>navigation.navigate("CadastroPets")} style={styles.textStyle}>Adicionar seu novo Pets</Text>
                                </Pressable>

                                <Pressable
                                    style={[styles.button, styles.buttonOpen]}>
                                    <Text onPress={()=>navigation.navigate("VisualizarProdCli")} style={styles.textStyle}>Produtos</Text>
                                </Pressable>

                            </KeyboardAvoidingView>
                    </KeyboardAvoidingView> 
            
        </>
    )
}


const styles = StyleSheet.create({
    titulo:{
        textAlign:"center", fontSize: 30
    },
    barra:{
        backgroundColor: "pink", alignItems:'flex-start', paddingTop:40
    },

    input:{
        height: 40, margin: 12, borderWidth: 1, borderRadius: 10, padding: 10
    },
    textStyle: {
        color: 'pink', justifyContent: 'center', alignItems: 'center' 
    },
    centeredView: {
        flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 22,
    },
    button: {
        borderRadius: 10, justifyContent: 'center', padding: 15, height:50, width:300, textAlign:"center", margin: 10
    },
    buttonOpen: {
        backgroundColor: 'pink',
    },
    textStyle: {
        color: 'white', fontWeight: 'bold', textAlign: 'center',
      },
   
})

export default BemVindoCli;