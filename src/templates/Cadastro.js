import React, {useState} from 'react';
import { View ,Pressable, Modal, Text, StyleSheet, TextInput, Button, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import axios from "axios";


const Cadastro = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [number, onChangeNumber] = React.useState('');

    const [nomeFunc, setNomeFunc ] = useState('');
    const [cpf, setCpf ] = useState('');
    const [email, setEmail ] = useState('');
    const [telefone, setTelefone] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [pais, setPais] = useState('');
    const [cep, setCep] = useState('');
  
    const cadastrarUsuario = () => {
        var varJson = {
           
            nomeFunc: nomeFunc,
            endereço:{
                rua: rua,
                bairro: bairro,
                cidade:cidade,
                estado:estado,
                pais:pais,
                cep: cep,
              },
              telefone:telefone,
              email: email,
              cpf: cpf }
              console.log('Foi', varJson);
        axios.post('https://pet-shop-back.vercel.app/funcionario', varJson
 
).then(response => {
    console.log('Then', response.data);
  })
  .catch(error => {
    console.log('catch', error.response);
  });
  setModalVisible(true)
    }
    return(
        <>
        <ScrollView>
            <View style = {styles.barra}/>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios'? 'padding' : 'padding'}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>                
                        <KeyboardAvoidingView style = {{ paddingTop: 50}}>
                            <Text style= {styles.titulo}>Cadastro de Funcionário</Text>
                            <TextInput value={nomeFunc} onChangeText={ e => {setNomeFunc(e)} } style={styles.input} placeholder = "Nome:"/>                   
                            <TextInput value={rua} onChangeText={ e => {setRua(e)} } style={styles.input} placeholder = "Rua:"/>
                            <TextInput value={bairro} onChangeText={ e => {setBairro(e)} } style={styles.input} placeholder = "Bairro:"/>
                            <TextInput value={cidade} onChangeText={ e => {setCidade(e)} } style={styles.input} placeholder = "Cidade:"/>
                            <TextInput value={estado} onChangeText={ e => {setEstado(e)} } style={styles.input} placeholder = "Estado"/>
                            <TextInput value={pais} onChangeText={ e => {setPais(e)} } style={styles.input} placeholder = "Pais:"/>
                            <TextInput value={cep} onChangeText={ e => {setCep(e)} } style={styles.input} placeholder = "CEP"/>
                            <TextInput value={telefone} onChangeText={ e => {setTelefone(e)} } style={styles.input} placeholder = "Telefone"/>
                            <TextInput value={email} onChangeText={ e => {setEmail(e)} } style={styles.input} placeholder = "Email"/>
                            <TextInput value={cpf} onChangeText={ e => {setCpf(e)} } style={styles.input} placeholder = "CPF:"/>
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
                    <KeyboardAvoidingView style={{flexDirection:"row",justifyContent:"space-around"}}>
                        <Text style={{marginTop: 10}} onPress={()=>navigation.navigate("Login")}>Fazer Login</Text>
                        
                        <Pressable
                            style={[styles.button, styles.buttonOpen]}
                             >
                            <Text onPress={ () => cadastrarUsuario() } style={styles.textStyle}>ENVIAR</Text>
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