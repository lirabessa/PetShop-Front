import React, {useState} from 'react';

import { View ,Pressable, Modal, Text, StyleSheet, TextInput, Button, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';


const Cadastro = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [number, onChangeNumber] = React.useState('');
    return(
        <>
        <ScrollView>
            <View style = {styles.barra}/>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios'? 'padding' : 'padding'}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>                
                        <KeyboardAvoidingView style = {{ paddingTop: 50}}>
                            <Text style= {styles.titulo}>Cadastro de Funcionário</Text>
                            <TextInput style={styles.input} placeholder = "Nome:"/>
                            <TextInput style={styles.input} placeholder = "Telefone"/>
                            <TextInput style={styles.input} placeholder = "Email"/>                    
                            <TextInput style={styles.input} placeholder = "Rua:"/>
                            <TextInput style={styles.input} placeholder = "Bairro:"/>
                            <TextInput style={styles.input} placeholder = "Cidade:"/>
                            <TextInput style={styles.input} placeholder = "Estado"/>
                            <TextInput style={styles.input} placeholder = "Pais:"/>
                            <TextInput style={styles.input} placeholder = "CEP"/>
                        </KeyboardAvoidingView> 
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView> 

                <KeyboardAvoidingView>
                    <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { Alert.alert('Modal has been closed.'); setModalVisible(!modalVisible);}}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Funcionário Cadastrado</Text>
                                <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Voltar</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                    <KeyboardAvoidingView style={{flexDirection:"row",justifyContent:"space-around",  marginTop:60}}>
                        <Text onPress={()=>navigation.navigate("Login")}>Fazer Login</Text>
                        
                        <Pressable
                            style={[styles.button, styles.buttonOpen]}
                            onPress={() => setModalVisible(true)}>
                            <Text style={styles.textStyle}>ENVIAR</Text>
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
    modalView: {
        margin: 20,backgroundColor: 'white',borderRadius: 20,padding: 35,alignItems: 'center',shadowColor: '#000',
        shadowOffset: {
          width: 0,height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
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
export default Cadastro;