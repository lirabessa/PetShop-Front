import React, {useState} from 'react';
import { View ,Pressable, Modal, Text, StyleSheet, Image, TextInput, Button, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, KeyboardAwareScrollView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import axios from "axios";

const CadastroProd = ({navigation}) =>{
    const [modalVisible, setModalVisible] = useState(false);

    return(
        <>
            <ScrollView>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios'? 'padding' : 'position'}>
                                        
                    <KeyboardAvoidingView style = {{ paddingTop: 50}}>
                        <Text style= {styles.titulo}>Cadastro de Produto</Text>
                       
                        <TextInput  style={styles.input} placeholder = "Nome do Produto:"/>                   
                        <TextInput  style={styles.input} placeholder = "Preço:"/>
            
                    </KeyboardAvoidingView>
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

            <View style={{flexDirection:"row",justifyContent:"space-around", paddingBottom:40}}>
              
                <Pressable
                    style={[styles.button, styles.buttonOpen]}
                        >
                    <Text  style={styles.textStyle}>Cadastrar</Text>
                </Pressable>
                    </View>  
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        marginTop: 50,
        paddingBottom:40,
        paddingLeft:15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200, 
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },

    textPets:{
        textAlign: "right",
        marginRight: 20,
        marginTop: 20,    
    },

    titulo:{
        textAlign:"center", fontSize: 30
    },

    titulo2:{
        textAlign:"center", fontSize: 30, marginTop:30
    },
    barra:{
        flex:0.15, backgroundColor: "pink", 
    },
    input:{
        height: 40, margin: 12, borderWidth: 1, borderRadius: 10, padding: 10
    },
   
    textStyle: {
        color: 'pink', justifyContent: 'center', alignItems: 'center' , marginEnd: 100
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
export default CadastroProd;