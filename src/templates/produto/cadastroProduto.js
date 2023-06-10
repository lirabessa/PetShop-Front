import React, {useState} from 'react';
import { View ,Pressable, Modal, Text, StyleSheet, Image, TextInput, Button, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, KeyboardAwareScrollView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import axios from "axios";
import Icon from 'react-native-vector-icons/FontAwesome';

const CadastroProd = ({navigation}) =>{
    const [modalVisible, setModalVisible] = useState(false);

    //***********AXIOS*********** */
    const [nomeProd, setNomeProd] = useState('')
    const [preco, setPreco] = useState('')

    const cadastroProd = async () =>{
        var varJson = {
            nomeProd: nomeProd,
            preco: preco
        }
        axios.post('https://pet-shop-back.vercel.app/produto', varJson
        ).then(async response => {
            console.log('Then', response.data);
        })
        .catch(error => {
            console.log('catch', error.response);
        });
        setModalVisible(true)
    }



    //***********AXIOS*********** */

    return(
        <>
        <View style = {styles.barra}>
        <Icon.Button name="angle-left" 
            size={20} color="black"
            backgroundColor = 'pink' onPress={()=>navigation.navigate("BemVindoFunc")}>Voltar 
        </Icon.Button>
        </View>
            <ScrollView>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios'? 'padding' : 'position'}>
                                        
                    <KeyboardAvoidingView style = {{ paddingTop: 50}}>
                        <Text style= {styles.titulo}>Cadastro de Produto</Text>
                    
                        <TextInput value={nomeProd} onChangeText={e=>{setNomeProd(e)}} style={styles.input} placeholder = "Nome do Produto:"/>                   
                        <TextInput value={preco} onChangeText={e=>{setPreco(e)}} style={styles.input} placeholder = "Preço:"/>
            
                    </KeyboardAvoidingView>
                </KeyboardAvoidingView>           
            </ScrollView>

            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { Alert.alert('Modal has been closed.'); setModalVisible(!modalVisible);}}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Produto Cadastrado</Text>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text onPress={()=>navigation.navigate("VisulizarProdFunc")} style={styles.textStyle}>Voltar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <View style={{flexDirection:"row",justifyContent:"space-around", paddingBottom:40}}>
              
                <Pressable
                    style={[styles.button, styles.buttonOpen, {flex: .85}]}
                        >
                    <Text onPress={()=> cadastroProd()} style={styles.textStyle}>Cadastrar</Text>
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
        backgroundColor: "pink", alignItems:'flex-start', paddingTop:40
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