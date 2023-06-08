import React, {useState} from 'react';
import { 
    View, Pressable, Modal, Text, StyleSheet, Image, 
    TextInput, Button, Keyboard, KeyboardAvoidingView,
     TouchableWithoutFeedback, KeyboardAwareScrollView,
    TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store'


const CadastroCli= ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [number, onChangeNumber] = React.useState('');
   
    //************IMagem */
    const [image, setImage] = useState(null);

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

    const [nomeCli, setNomeCli ] = useState('');
    const [cpf, setCpf ] = useState('');
    const [email, setEmail ] = useState('');
    const [telefone, setTelefone] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [pais, setPais] = useState('');
    const [cep, setCep] = useState('');
    const [nomeDep, setNomeDep] = useState('')
    const [raca, setRaca] = useState('')
    const [password, setPassword] = useState('')
    const [enviandoDados, setEnviandoDados] = useState(false)
  
    const cadastrarFoto = async (id) => {
        let filename = image.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        let formData = new FormData();
        formData.append('File', { uri: image, name: filename, type });
        formData.append('tipo', 'cliente')
        formData.append('id', id)
    
        const token = await SecureStore.getItemAsync("token")
    
        //const url = 'http://192.168.0.138:3333' RAFA
        // const url = 'http://10.0.2.2:3333'
        axios.post ('https://pet-shop-back.vercel.app/drive', formData, {
            headers: { 'Content-Type': 'multipart/form-data' ,  Authorization: token }}
        ).then(response => {
            console.log('Then cadastrar foto', response.data);
        })
        .catch(error => {
            console.log('catch 333', error);
        }).finally(() => {
            setEnviandoDados(false);
        })
    }

    const cadastrarUsuario = async () => {
        setEnviandoDados(true);
        var varJson = {
           
            nomeCli: nomeCli,
            endereco:{
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
            password:password
        }
        const url = 'http://pet-shop-back.vercel.app'
        axios.post(url+'/cliente', varJson
 
        ).then(async response => {
            const id = response.data.criarCliente._id
            console.log('Then cadastrar ususario', response.data);
            image && await cadastrarFoto(id)
            setModalVisible(true)
        })
        .catch(error => {
            console.log('catch 2222', {error});
            setEnviandoDados(false);
        });
        
    }
    return(
            <>
             <Modal 
                animationType="slide" 
                transparent={true} 
                visible={modalVisible} 
                onRequestClose={() => { Alert.alert('Modal has been closed.'); setModalVisible(!modalVisible);}}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Cliente Cadastrado</Text>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text onPress={()=>navigation.navigate("VisualizarCli")} style={styles.textStyle}>Voltar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        <ScrollView >
            {/* <KeyboardAvoidingView style = {{ paddingTop: 20}} behavior='padding'>               */}
                <Text style= {{...styles.titulo, marginBottom: 20}}>Cadastro de Clientes</Text>
                <View style={[styles.container, {marginTop: image ? 50 : 0}]}>
                    <Text style= {styles.buttton} onPress={pickImage}>Selecionar imagem</Text>
                    {image && <Image source={{ uri: image }} style={styles.image} />}
                </View>
                <Text style={styles.inputLabel}>Nome:</Text>
                <TextInput value={nomeCli} onChangeText={ e => {setNomeCli(e)} } style={styles.input} placeholder = "Nome:"/>  
                <Text style={styles.inputLabel}>CPF:</Text>
                <TextInput value={cpf} onChangeText={ e => {setCpf(e)} } style={styles.input} placeholder = "CPF:"/>                 
                <Text style={styles.inputLabel}>Rua:</Text>
                <TextInput value={rua} onChangeText={ e => {setRua(e)} } style={styles.input} placeholder = "Rua:"/>
                <Text style={styles.inputLabel}>Bairro:</Text>
                <TextInput value={bairro} onChangeText={ e => {setBairro(e)} } style={styles.input} placeholder = "Bairro:"/>
                <Text style={styles.inputLabel}>Cidade:</Text>
                <TextInput value={cidade} onChangeText={ e => {setCidade(e)} } style={styles.input} placeholder = "Cidade:"/>
                <Text style={styles.inputLabel}>Estado:</Text>
                <TextInput value={estado} onChangeText={ e => {setEstado(e)} } style={styles.input} placeholder = "Estado"/>
                <Text style={styles.inputLabel}>País:</Text>
                <TextInput value={pais} onChangeText={ e => {setPais(e)} } style={styles.input} placeholder = "Pais:"/>
                <Text style={styles.inputLabel}>CEP:</Text>
                <TextInput value={cep} onChangeText={ e => {setCep(e)} } style={styles.input} placeholder = "CEP"/>
                <Text style={styles.inputLabel}>Telefone:</Text>
                <TextInput value={telefone} onChangeText={ e => {setTelefone(e)} } style={styles.input} placeholder = "Telefone"/>
                <Text style={styles.inputLabel}>Email:</Text>
                <TextInput value={email} onChangeText={ e => {setEmail(e)} } style={styles.input} placeholder = "Email"/>
                <Text style={styles.inputLabel}>Senha:</Text>
                <TextInput value={password} onChangeText={ e => {setPassword(e)} } style={styles.input} placeholder = "Senha" secureTextEntry={true}/>
                                    
            {/* </KeyboardAvoidingView> */}
           
            <View style={{flexDirection:"row",justifyContent:"space-around", paddingBottom:20}}>
                
                <TouchableOpacity
                    style={[styles.button, styles.buttonOpen]}
                    disabled={enviandoDados}
                        >
                    <Text onPress={ () => cadastrarUsuario() } style={styles.textStyle}>ENVIAR</Text>
                </TouchableOpacity>
            </View>      
        </ScrollView>

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
    inputLabel: {
        marginHorizontal: 12,
        paddingHorizontal: 10
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
export default CadastroCli;