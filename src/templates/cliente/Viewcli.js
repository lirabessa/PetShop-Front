import React, {useState} from 'react';
import { View, Pressable, Modal, Text, StyleSheet, TextInput, Button, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, TouchableOpacity, Image} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import axios from "axios";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store'

import { Logs } from 'expo'

Logs.enableExpoCliLogging()

const VeiwCli = ({route, navigation}) => {

    const {id} = route.params

    const [editUserInfo, setEditUserInfo] = useState({
        nome: false,
        cpf: false,
        telefone: false,
        email: false,
        rua: false,
        bairro: false,
        cidade: false
      }); 


    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [rua, setRua] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("")

    const campos = [
        {
            campo: "nome", 
            state: nome, 
            onchange: (e) => setNome(e), 
            label: "Nome", 
            setEditInfo: {
                ...editUserInfo, nome: true
            },
            setEditInfoFalse: {
                ...editUserInfo, nome: false
            }
        },
        {
            campo: "cpf", 
            state: cpf, 
            onchange: (e) => setCpf(e), 
            label: "CPF", 
            setEditInfo: {
                ...editUserInfo, cpf: true
            },
            setEditInfoFalse: {
                ...editUserInfo, cpf: false
            }
        },
        {
            campo: "telefone", 
            state: telefone, 
            onchange: (e) => setTelefone(e), 
            label: "Telefone", 
            setEditInfo: {
                ...editUserInfo, telefone: true
            },
            setEditInfoFalse: {
                ...editUserInfo, telefone: false
            }
        },
        {
            campo: "email", 
            state: email, 
            onchange: (e) => setEmail(e), 
            label: "e-mail", 
            setEditInfo: {
                ...editUserInfo, email: true
            },
            setEditInfoFalse: {
                ...editUserInfo, email: false
            }
        },
        {
            campo: "rua", 
            state: rua, 
            onchange: (e) => setRua(e), 
            label: "Rua", 
            setEditInfo: {
                ...editUserInfo, rua: true
            },
            setEditInfoFalse: {
                ...editUserInfo, rua: false
            }
        },
        {
            campo: "bairro", 
            state: bairro, 
            onchange: (e) => setBairro(e), 
            label: "Bairro", 
            setEditInfo: {
                ...editUserInfo, bairro: true
            },
            setEditInfoFalse: {
                ...editUserInfo, bairro: false
            }
        },
        {
            campo: 'cidade',
            state: cidade,
            onchange: (e) => setCidade(e),
            label: 'Cidade',
            setEditInfo: {
                ...editUserInfo, cidade: true
            },
            setEditInfoFalse: {
                ...editUserInfo, cidade: false
            }
        }
    ]

    const petsMock = []
    const [pets, setPets] = React.useState(petsMock)
    const mockFoto = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png?20220226140232'
    const mockPetFoto = 'https://i.pinimg.com/originals/a0/8b/a5/a08ba59656e06a42390959bc59e14d0d.jpg'

    const [petNome, setPetNome] = React.useState("")
    const [petRaca, setPetRaca] = React.useState("")
    const [image, setImage] = useState(mockFoto);

    React.useEffect(() => {
        buscarCli()
    }, [id])

    const buscarCli = async () => {
        const url = 'http://pet-shop-back.vercel.app/'
        // const url = 'http://192.168.0.138:3333/'
        axios.get(url+'cliente/'+id,{
            maxRedirects: 0,
            validateStatus: function (status) {
              return status >= 200 && status < 303;
            }
          }).then(response => {
          const cliente = response.data.readCliente
          setNome(cliente.nomeCli)
          setTelefone(cliente.telefone)
          setEmail(cliente.email)
          setCpf(cliente.cpf)
          setImage(cliente.foto?.src || mockFoto)
          setRua(cliente.endereco?.rua)
          setBairro(cliente.endereco?.bairro)
          setCidade(cliente.endereco?.cidade)
          setPets(cliente.dependentes)
        })
          .catch(error => {
            console.log(error)
          })
      }
    
    const editarPet = (index) => {
        const pet = pets[index]
        setPetNome(pet.nome)
        setPetRaca(pet.raca)
        pets[index].editar = true
        setPets(pets)
    }

    const concluirAlteracao = async (index) => {
        const data = {
            idCli: id,
            idPet: pets[index]._id,
            nomeDep: pets[index].nomeDep,
            raca: pets[index].raca
        }
        let baseUrl = 'http://192.168.0.138:3333/pet'
        let funcaoPet = pets[index]._id ? axios.put : axios.post
        const token = await SecureStore.getItemAsync("token")
        funcaoPet(baseUrl, data,{
            maxRedirects: 0,
            validateStatus: function (status) {
            return status >= 200 && status < 303;
            }, 
            headers: { authorization: token }
         }).then(res=>{
             setPetNome('')
             setPetRaca('')
             pets[index].editar = false
            setPets(pets.map((p, i)=> i===index ? {...pets[index]} : {...p}))
        }).catch(erro => {
            console.error(erro)
        })
        
    }

    const alteraImagem = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          if (!result.canceled) {
            setImage(result.uri);
            salvaImagem(result.uri)
          }
    }

    const salvaImagem = async (imagem) => {
        let filename = imagem.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        let formData = new FormData();
        formData.append('File', { uri: imagem, name: filename, type });
        formData.append('tipo', 'cliente')
        formData.append('id', id)
        const fotos = {
            File:image,tipo:'cliente', id
        }
        const token = await SecureStore.getItemAsync("token")
        const url = 'https://pet-shop-back.vercel.app'
        // const url = 'http://192.168.0.138:3333' //RAFA
        //const url = 'http://10.0.2.2:3333'
        axios.post (url+'/drive', formData, {
            headers: { 'Content-Type': 'multipart/form-data', authorization: token }}
        ).then(response => {
            console.log('Then', response.data);
            //setModalVisible(true)
            
        })
        .catch(error => {
            console.log('catch', error);
        })
    }

    const adicionaPet = () => {
        setPets(pets.concat({nome: "", raca: "", editar: true}))
    }

    const salvar = () => {
        const data = {
            nomeCli: nome, 
            rua, 
            bairro, 
            cidade,
            telefone, 
            email, 
            cpf
        }
        const url = 'http://pet-shop-back.vercel.app/'
        // const url = 'http://192.168.0.138:3333/'
        axios.put(url+'cliente/'+id, data, {
            maxRedirects: 0,
            validateStatus: function (status) {
              return status >= 200 && status < 303;
            }
          }).then(res => {
            navigation.navigate('VisualizarCli')
          }).catch(err => {
            console.log(err)
          })
    }

    const removePet = async (index) => {
        
        const pet = pets[index]
        const url = 'https://pet-shop-back.vercel.app/'
        // const url = 'http://192.168.0.138:3333/'
        const token = await SecureStore.getItemAsync("token")
        axios.delete(url+'pet/'+pet._id+'/'+id, {
            maxRedirects: 0,
            validateStatus: function (status) {
              return status >= 200 && status < 303;
            }, headers: { authorization: token } 
          }).then(res => {
            const objects = pets.filter((p, i) => i!=index && p)
            setPets(objects)
        }).catch(err => {
            console.log(err)
        })
        
    }

    const alteraImagemPet = async (index) => {
        const idPet = pets[index]._id
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          if (!result.canceled) {
            const foto = result.uri;
            setPets(pets.map((p, i)=> i===index ? {...pets[index], foto} : {...p}))
            salvaImagemPet(foto, idPet)
          }

    }

    const salvaImagemPet = async (imagem, petId) => {
        let filename = imagem.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        let formData = new FormData();
        formData.append('File', { uri: imagem, name: filename, type });
        formData.append('tipo', 'pet')
        formData.append('id', petId)
        formData.append('idCliente', id)
        const fotos = {
            File:imagem,tipo:'pet', id: petId, idCliente: id
        }
        const token = await SecureStore.getItemAsync("token")
        // const url = 'https://pet-shop-back.vercel.app'
        const url = 'http://192.168.0.138:3333' //RAFA
        //const url = 'http://10.0.2.2:3333'
        axios.post (url+'/drive', formData, {
            headers: { 'Content-Type': 'multipart/form-data', authorization: token }}
        ).then(response => {
            console.log('Then foto pet', response.data);
            //setModalVisible(true)
            
        })
        .catch(error => {
            console.log('catch', error);
        })
    }


    return(
        <>
        <ScrollView>
            <KeyboardAvoidingView>
                <TouchableWithoutFeedback>
                    <KeyboardAvoidingView>
                        <View style={{}}>
                        <View style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-around",
                                marginTop: 20,
                            }}>
                                <Image 
                                source={{uri:image}}
                                style = {{width:100, height:100}}/>
                                <View style={{flex: .85}}>
                                    <Text style = {{margin: 5, flex: .9}}> {nome}</Text>
                                    <TouchableOpacity onPress={alteraImagem}>
                                        <Text>Alterar Imagem</Text>
                                    </TouchableOpacity>
                                </View>
                        </View>
                        {campos.map((campo, index)=> (
                            <View key = {index} style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between"
                            }}>
                            <View
                            
                            style={{
                                ...style.input, 
                                width: '90%', 
                                flexDirection: "row", 
                                justifyContent: "space-between", 
                                padding: 0}}>
                                    {editUserInfo[campo.campo] ? (
                                    <TextInput style = {{margin: 5, minWidth: 300, backgroundColor: "#fff"}} 
                                    value = {campo.state} 
                                    onChangeText={campo.onchange}/>
                                    ):(<Text style = {style.inputWithoutEdit}>{campo.label}: {campo.state}</Text>)}
                                    {editUserInfo[campo.campo] ? (
                                        <Text
                                            style = {{margin: 5}} 
                                            onPress={() => setEditUserInfo(campo.setEditInfoFalse)}
                                        >
                                            X
                                        </Text>
                                        ): (
                                        <>                                    
                                            <Icon.Button 
                                                name="edit" 
                                                size={20} 
                                                color="black"
                                                backgroundColor="rgba(255,255,255,0)"
                                                onPress={() => setEditUserInfo(campo.setEditInfo)}
                                            ></Icon.Button>
                                        </>
                                    )}
                                </View>
                            </View>
                        ))}
                                                       
                            
                           
                            
                        </View> 
                        <TouchableOpacity
                                onPress={salvar}
                                style={[style.button, style.buttonOpen, {width: '85%', marginLeft: '7%'}]}>
                                <Text>Aplicar</Text>
                            </TouchableOpacity>
                        <View style={{paddingTop: 25}}>
                        <Text style={{width: "100%", textAlign: "center", fontSize: 25}}>Pets</Text> 
                        </View>   
                        {pets?.map((pet, index) => (
                            <View key={index}>                                
                                <View style={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-around",
                                    marginTop: 20,
                                }}>
                                    <Image 
                                    source={{uri:pet.foto?.src || pet.foto || mockPetFoto}}
                                    style = {{width:100, height:100}}/>
                                    <View style={{flex: .85}}>
                                        <Text style = {{margin: 5, flex: .9}}> {pet.nomeDep}</Text>
                                        <TouchableOpacity onPress={() => alteraImagemPet(index)}>
                                            <Text>Adicionar Imagem</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style = {{flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, marginTop: 20}}>
                                    
                                    <View style={{flexDirection:"row"}}>
                                        <Icon.Button 
                                            name={pet.editar ? "check" : "edit"}
                                            size={20} 
                                            color="black"
                                            backgroundColor="rgba(255,255,255,0)"
                                            onPress={()=> pet.editar ? concluirAlteracao(index) : editarPet(index)}>

                                        </Icon.Button>
                                        <Icon.Button 
                                            name="trash-o" 
                                            size={20}
                                            color="black"
                                            backgroundColor="rgba(255,255,255,0)"
                                            onPress={()=>removePet(index)}>    
                                        </Icon.Button>
                                    </View>
                                </View>
                                <View style={{
                                        ...style.input, 
                                        width: '90%', 
                                        flexDirection: "row", 
                                        justifyContent: "space-between", 
                                        padding: 0}}>
                                        {pet.editar ? (
                                            <TextInput style = {{margin: 5, minWidth: 300, backgroundColor: "#fff"}} 
                                            value = {pet.nomeDep} 
                                            onChangeText={(e) => {
                                                pets[index].nomeDep = e
                                                setPets([...pets])
                                            }}/>
                                            ):(<Text style = {style.inputWithoutEdit}>Nome: {pet.nomeDep}</Text>)}
                                        
                                </View>
                                <View style={{
                                        ...style.input, 
                                        width: '90%', 
                                        flexDirection: "row", 
                                        justifyContent: "space-between", 
                                        padding: 0}}>
                                        {pet.editar ? (
                                            <TextInput style = {{margin: 5, minWidth: 300, backgroundColor: "#fff"}}
                                            value = {pet.raca}
                                            onChangeText={(e) => {
                                                pets[index].raca = e
                                                setPets([...pets])}}/>
                                        ):(<Text style = {style.inputWithoutEdit}>Raça: {pet.raca}</Text>)}
                                        
                                </View>
                                
                            </View>            
                        ))}
                        <TouchableOpacity 
                            onPress={adicionaPet}
                            style={[style.button, style.buttonOpen, {width: '85%', marginLeft: '7%'}]}>
                            <Text>Adicionar</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
        </>
    )
}

const style = StyleSheet.create ({
    input:{
        height: 40, margin: 12, borderWidth: 1, borderRadius: 10, padding: 10
    },
    button: {
        borderRadius: 10, 
        padding: 15, 
        height:50, 
        textAlign:"center", 
        flex: 1,
        alignItems: 'center',
        margin: 10,
    },
    buttonOpen: {
        backgroundColor: 'pink',
    },
    inputWithoutEdit: {
        margin: 5, 
        marginTop: 9
    }
})

export default VeiwCli