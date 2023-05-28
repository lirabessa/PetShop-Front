import React, {useState} from 'react';
import { View ,Pressable, Modal, Image, Text, StyleSheet, TextInput, Button, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store'
import axios from "axios";

const CadastroPets = ({navigation}) =>{
    const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState(null);
    const [enviandoDados, setEnviandoDados] = useState(false)

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setImage(result.uri);
        salvaImagem()
      }
    };

    const salvaImagem = () => {
        let filename = image.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        let formData = new FormData();
        formData.append('File', { uri: image, name: filename, type });
        formData.append('tipo', 'cliente')
        formData.append('id', id)
        const fotos = {
            File:image,tipo:'pet', id
        }
        // const url = 'http://pet-shop-back.vercel.app'
        const url = 'http://192.168.0.138:3333' //RAFA
        //const url = 'http://10.0.2.2:3333'
        axios.post (url+'/uploads', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }}
        ).then(response => {
            console.log('Then', response.data);
            //setModalVisible(true)
            
        })
        .catch(error => {
            console.log('catch 333', error);
        })
    }

    const [nomeDep, setNomeDep] = useState('')
    const [raca, setRaca] = useState('')

    const cadastrarFoto = async (id) => {
        let filename = image.split('/').pop();
        console.log(image);

        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        let formData = new FormData();
        formData.append('File', { uri: image, name: filename, type });
        formData.append('tipo', 'pet')
        formData.append('id', id)
    
        const token = await SecureStore.getItemAsync("token")
        const url = 'http://pet-shop-back.vercel.app'
        //const url = 'http://192.168.0.138:3333' RAFA
        // const url = 'http://10.0.2.2:3333'
        axios.post (url+'/drive', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': token
              }}
        ).then(response => {
            console.log('Then', response.data);
            setModalVisible(true)
            
        })
        .catch(error => {
            console.log('catch 333', error);
        }).finally(() => {
            setEnviandoDados(false);
        })
    }

    //******************AXIOS************* */
    const cadastrarPets = async () =>{
        setEnviandoDados(true);
        const token = await SecureStore.getItemAsync("token")
        var varJson = {
            nomeDep: nomeDep,
            raca: raca
        }
        console.log('Foi', varJson);
        axios.post('https://pet-shop-back.vercel.app/pet', varJson,
        {headers: { Authorization: token }}
        ).then(async response => {
        console.log('Then', response.data);
        const cadFotos = await cadastrarFoto(response.data._id)
    })
    .catch(error => {
        console.log('catch', error);
    });
    setModalVisible(true)
    }


    //************AXIOS****************** */
    return(
        <>
            <ScrollView>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios'? 'padding' : 'padding'}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>                
                        <KeyboardAvoidingView style = {{ paddingTop: 50}}>
                            <Text style= {styles.titulo}>Cadastro novo Pets</Text>
                 
                            <View style={[styles.container]}>
                                <Text style= {styles.buttton} onPress={pickImage}>Selecionar imagem</Text>
                                {image && <Image source={{ uri: image }} style={styles.image} />}
                            </View>
 
                            <TextInput value={nomeDep} onChangeText={ e => {setNomeDep(e)} } style={styles.input} placeholder = "Nome:"/>                   
                            <TextInput value={raca} onChangeText={ e => {setRaca(e)} } style={styles.input} placeholder = "Raça:"/>
                       
                    
                        </KeyboardAvoidingView> 
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView> 
            </ScrollView>
            
            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { Alert.alert('Modal has been closed.'); setModalVisible(!modalVisible);}}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>PET Cadastrado</Text>
                                <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text onPress={()=>navigation.navigate("BemVindoCli")} style={styles.textStyle}>Voltar</Text>
                                </Pressable>
                            </View>
                        </View>
 
                    </Modal>
                    <View style={{flexDirection:"row",justifyContent:"space-around", paddingBottom:40}}>
                                                
                        <Pressable
                            style={[styles.button, styles.buttonOpen]}
                             >
                            <Text onPress={ () => cadastrarPets() } style={styles.textStyle}>ENVIAR</Text>
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