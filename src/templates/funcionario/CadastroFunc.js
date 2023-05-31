import React, {useState, useEffect} from 'react';
import {
     View ,Pressable, Modal, Text, StyleSheet, TextInput,
     Button, Keyboard, KeyboardAvoidingView, Image,
     TouchableWithoutFeedback} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store'

const CadastroFunc = ({route, navigation}) => {
    const {id} = route.params || {id: null};
    const [modalVisible, setModalVisible] = useState(false);
    const [number, onChangeNumber] = React.useState('');
    const mockFoto = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png?20220226140232'

    //************IMagem */
    const [image, setImage] = useState(mockFoto);

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
      }
    };

    //************Imagem */



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
    const [password, setPassword] = useState()
    const [enviandoDados, setEnviandoDados] = useState(false)
    const [editar, setEditar] = useState(false)

    const cadastrarFoto = async (id) => {
        let filename = image.split('/').pop();

        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        let formData = new FormData();
        formData.append('File', { uri: image, name: filename, type });
        formData.append('tipo', 'funcionario')
        formData.append('id', id)
    

        const fotos = {
            File:image,tipo:'funcionario', id
        }
        const token = await SecureStore.getItemAsync("token")
        const url = 'https://pet-shop-back.vercel.app'
        //const url = 'http://192.168.0.138:3333' RAFA
        // const url = 'http://10.0.2.2:3333'
        axios.post (url+'/drive', formData, {
            headers: { 'Content-Type': 'multipart/form-data', authorization: token }}
        ).then(response => {
            console.log('Then', response.data);
            setModalVisible(true)
            
        })
        .catch(async error => {
            
            console.log('catch 333', error);
            
        }).finally(() => {
            setEnviandoDados(false);
        })
    }
  
    const cadastrarFuncionario = () => {
        setEnviandoDados(true);
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
              cpf: cpf,
              password:password }
              console.log('Foi', varJson);
        let url = 'https://pet-shop-back.vercel.app/funcionario'
        let axiosFunc = axios.post
        if (editar){
            url += '/'+id
            axiosFunc = axios.put
        }
        axiosFunc(url, varJson).then(async response => {
            const id = response.data.criarFuncionario?._id || response.data.updateFuncionario?._id
            console.log('Then', response.data);
            await cadastrarFoto(id)
        })
        .catch( error => {
            
            console.log('catch', error.response);
            
        });

    setModalVisible(true)
}

const getFunc = (id) => {
    console.log('getFunc', id)
    const url = 'https://pet-shop-back.vercel.app/funcionario/'
    // const url = 'http://localhost:3333/funcionario/'
    axios.get(url+id).then(response => {
        console.log('Then', response.data);
    }).catch(error => {
        if (error.response.data){
            const func = error.response.data.readFuncionario
            console.log('Error', func)
            setNomeFunc(func.nomeFunc)
            setCpf(func.cpf)
            setEmail(func.email)
            setTelefone(func.telefone)
            setRua(func['endereço']?.rua)
            setBairro(func['endereço']?.bairro)
            setCidade(func['endereço']?.cidade)
            setEstado(func['endereço']?.estado)
            setPais(func['endereço']?.pais)
            setCep(func['endereço']?.cep)
            setPassword(func.password)
            setEditar(true)
            setImage(func.foto?.src || mockFoto)
        }
    })
}

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
        if (id) {
            getFunc(id)
        }
        });
        return unsubscribe;
    }, [navigation]);

    return(
        <>
        <ScrollView>
            <View style = {styles.barra}/>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios'? 'padding' : 'padding'}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>                
                        <KeyboardAvoidingView style = {{ paddingTop: 50}}>
                            <Text style= {[styles.titulo, {marginBottom: 30}]}>{editar ? 'Editar' : 'Cadastro de'} Funcionário</Text>
                            <View style={[styles.container, {marginTop: image ? 50 : 0}]}>
                                <Text style= {styles.buttton} onPress={pickImage}>Selecionar imagem</Text>
                                {image && <Image source={{ uri: image }} style={styles.image} />}
                            </View>
                            <Text style={styles.inputLabel}>Nome:</Text>
                            <TextInput value={nomeFunc} onChangeText={ e => {setNomeFunc(e)} } style={styles.input} placeholder = "Nome:"/>    
                            <Text style={styles.inputLabel}>Rua:</Text>               
                            <TextInput value={rua} onChangeText={ e => {setRua(e)} } style={styles.input} placeholder = "Rua:"/>
                            <Text style={styles.inputLabel}>Bairro:</Text>      
                            <TextInput value={bairro} onChangeText={ e => {setBairro(e)} } style={styles.input} placeholder = "Bairro:"/>
                            <Text style={styles.inputLabel}>Cidade:</Text> 
                            <TextInput value={cidade} onChangeText={ e => {setCidade(e)} } style={styles.input} placeholder = "Cidade:"/>
                            <Text style={styles.inputLabel}>Estado:</Text> 
                            <TextInput value={estado} onChangeText={ e => {setEstado(e)} } style={styles.input} placeholder = "Estado"/>
                            <Text style={styles.inputLabel}>Pais:</Text> 
                            <TextInput value={pais} onChangeText={ e => {setPais(e)} } style={styles.input} placeholder = "Pais:"/>
                            <Text style={styles.inputLabel}>CEP:</Text> 
                            <TextInput value={cep} onChangeText={ e => {setCep(e)} } style={styles.input} placeholder = "CEP"/>
                            <Text style={styles.inputLabel}>Telefone:</Text> 
                            <TextInput value={telefone} onChangeText={ e => {setTelefone(e)} } style={styles.input} placeholder = "Telefone"/>
                            <Text style={styles.inputLabel}>CPF:</Text> 
                            <TextInput value={cpf} onChangeText={ e => {setCpf(e)} } style={styles.input} placeholder = "CPF:"/>
                            <Text style={styles.inputLabel}>Email:</Text> 
                            <TextInput value={email} onChangeText={ e => {setEmail(e)} } style={styles.input} placeholder = "Email"/>
                            <Text style={styles.inputLabel}>Senha:</Text> 
                            <TextInput value={password} onChangeText={ e => {setPassword(e)} } style={styles.input} placeholder = "Senha" secureTextEntry={true}/>
                        </KeyboardAvoidingView> 
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView> 
            </ScrollView>
                <KeyboardAvoidingView>

                    <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { Alert.alert('Modal has been closed.'); setModalVisible(!modalVisible);}}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text onPress={()=>navigation.navigate("Login")}style={styles.modalText}>Funcionário Cadastrado</Text>
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
                            disabled={enviandoDados}
                             >
                            <Text onPress={ () => cadastrarFuncionario() } style={styles.textStyle}>ENVIAR</Text>
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
    },
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
    inputLabel: {
        marginHorizontal: 12,
        paddingHorizontal: 10
    },
})
export default CadastroFunc;