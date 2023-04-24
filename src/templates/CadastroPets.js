import React, {useState} from 'react';
import { View ,Pressable, Modal, Text, StyleSheet, TextInput, Button, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';


const CadastroPets = () =>{
    return(
        <>
            <ScrollView>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios'? 'padding' : 'padding'}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>                
                        <KeyboardAvoidingView style = {{ paddingTop: 50}}>
                            <Text style= {styles.titulo}>Cadastro de Pets</Text>
                            <TextInput style={styles.input} placeholder = "Nome Pets:"/>                   
                            <TextInput style={styles.input} placeholder = "Idade Pets:"/>
                            <TextInput style={styles.input} placeholder = "Nome Pets:"/>  
                            
                        </KeyboardAvoidingView> 
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView> 
            </ScrollView>
            
            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { Alert.alert('Modal has been closed.'); setModalVisible(!modalVisible);}}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Cliente Cadastrado</Text>
                                <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text onPress={()=>navigation.navigate("Login")} style={styles.textStyle}>Voltar</Text>
                                </Pressable>
                            </View>
                        </View>
 
                    </Modal>
                    <KeyboardAvoidingView style={{flexDirection:"row",justifyContent:"space-around", paddingBottom:40}}>
                        <Text style={{marginTop: 10}} onPress={()=>navigation.navigate("Login")}>Fazer Login</Text>
                        
                        <Pressable
                            style={[styles.button, styles.buttonOpen]}
                             >
                            <Text onPress={ () => cadastrarUsuario() } style={styles.textStyle}>ENVIAR</Text>
                        </Pressable>
                    </KeyboardAvoidingView>
    
        </>
    )

}

const styles = StyleSheet.create({
    titulo:{
        textAlign:"center", fontSize: 30
    },

    input:{
        height: 40, margin: 12, borderWidth: 1, borderRadius: 10, padding: 10
    },
    modalView: {
        margin: 20,backgroundColor: 'white',borderRadius: 20,padding: 35,alignItems: 'center',shadowColor: '#000',
        shadowOffset: {
          width: 0,height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15, textAlign: 'center',
    },    button: {
        borderRadius: 10, padding: 15, height:50, width:100, textAlign:"center"
    },
    buttonOpen: {
        backgroundColor: 'pink',
    },
    buttonClose: {
        backgroundColor: 'pink',
    },
    textStyle: {
        color: 'white', fontWeight: 'bold', textAlign: 'center',
      },
    modalText: {
        marginBottom: 15, textAlign: 'center',
    }
})

export default CadastroPets;