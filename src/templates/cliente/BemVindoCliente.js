import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Pressable} from 'react-native'

const BemVindoCli = ({navigation}) => {
    
    return(
        <>
            <ScrollView>
                    <View style = {styles.barra}/>
                        <KeyboardAvoidingView behavior={Platform.OS === 'ios'? 'padding' : 'padding'}>
                            <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>                
                                <KeyboardAvoidingView style = {{ paddingTop: 50}}>
                                    <Text style= {styles.titulo}>Bem vindo Cliente</Text>
                                </KeyboardAvoidingView> 
                            </TouchableWithoutFeedback>

                            <KeyboardAvoidingView style={{justifyContent: "space-around", alignItems: "center", }}>
                        
<<<<<<< HEAD:src/templates/cliente/BemVindoCliente.js
=======
                                <Pressable
                                    style={[styles.button, styles.buttonOpen]}>
                                    <Text onPress={()=>navigation.navigate("BemVindoCli")}  style={styles.textStyle}>Agendar Consultas</Text>
                                </Pressable>

>>>>>>> dac772321f726616af06060890536f7d94139838:src/templates/BemVindoCliente.js
                                {/* <Pressable
                                    style={[styles.button, styles.buttonOpen]}>
                                    <Text onPress={()=>navigation.navigate("")}  style={styles.textStyle}>Agendar Consultas</Text>
                                </Pressable> */}

                                <Pressable
                                    style={[styles.button, styles.buttonOpen]}>
<<<<<<< HEAD:src/templates/cliente/BemVindoCliente.js
                                    <Text onPress={()=>navigation.navigate("VisualizarSeusProd")} style={styles.textStyle}>Visualizar seus Produtos</Text>
=======
                                    <Text  onPress={()=>navigation.navigate({name: "BemVindoCli"})}  style={styles.textStyle}>Visualizar seus Pets ♥</Text>
>>>>>>> dac772321f726616af06060890536f7d94139838:src/templates/BemVindoCliente.js
                                </Pressable>

                                <Pressable
                                    style={[styles.button, styles.buttonOpen]}>
<<<<<<< HEAD:src/templates/cliente/BemVindoCliente.js
                                    <Text  onPress={()=>navigation.navigate("VisualizarSeusPet")}  style={styles.textStyle}>Visualizar seus Pets ♥</Text>
                                </Pressable>

                                <Pressable
                                    style={[styles.button, styles.buttonOpen]}>
                                    <Text onPress={()=>navigation.navigate("CadastroPets")} style={styles.textStyle}>Adicionar seu novo Pets</Text>
=======
                                    <Text onPress={()=>navigation.navigate({name:"CadastroPets"})} style={styles.textStyle}>Cadastrar novos Pets</Text>
>>>>>>> dac772321f726616af06060890536f7d94139838:src/templates/BemVindoCliente.js
                                </Pressable>

                            </KeyboardAvoidingView>
                    </KeyboardAvoidingView> 
            </ScrollView> 
        </>
    )
}


const styles = StyleSheet.create({
    titulo:{
        textAlign:"center", fontSize: 30
    },
    barra:{
        flex:0.15, backgroundColor: "pink", 
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