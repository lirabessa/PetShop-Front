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

    const [nome, setNome] = useState("Kaenu");
    const [cpf, setCpf] = useState('CPF');
    const [telefone, setTelefone] = useState("12 99887766");
    const [email, setEmail] = useState("kaenu@hives");
    const [rua, setRua] = useState("Matrixx");
    const [bairro, setBairro] = useState("Caverna");
    const [cidade, setCidade] = useState('Cidade')

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

    const petsMock = [
        {nomeDep: "Rex", raca: "dinossauro", editar: false},
        {nomeDep: "Raptor", raca: "dinossauro", editar: false},
        {nomeDep: "Triporodonte", raca: "dinossauro", editar: false} 
    ]
    const [pets, setPets] = React.useState(petsMock)

    const [petNome, setPetNome] = React.useState("")
    const [petRaca, setPetRaca] = React.useState("")
    const [image, setImage] = useState(null);

    React.useEffect(() => {
        buscarCli()
    }, [id])

    const buscarCli = async () => {
        // const url = 'http://pet-shop-back.vercel.app/'
        const url = 'http://192.168.0.138:3333/'
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
          setRua(cliente.endereco.rua)
          setBairro(cliente.endereco.bairro)
          setCidade(cliente.endereco.cidade)
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

    const concluirAlteracao = (index) => {
        const data = {
            idCli: id,
            idPet: pets[index]._id,
            nome: pets[index].nomeDep,
            raca: pets[index].raca
        }
        axios.put("http://192.168.0.138:3333/pet", data,{maxRedirects: 0,
        validateStatus: function (status) {
          return status >= 200 && status < 303;
        }}).then(res=>{
            // console.log(res.data)
        }).catch(erro => {
            console.error(erro)
        })
        setPetNome('')
        setPetRaca('')
        pets[index].editar = false
        setPets(pets)
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
          }
    }

    const adicionaPet = () => {
        setPets(pets.concat({nome: "", raca: "", editar: false}))
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
        // const url = 'http://pet-shop-back.vercel.app/'
        const url = 'http://192.168.0.138:3333/'
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
        const url = 'http://192.168.0.138:3333/'
        const token = await SecureStore.getItemAsync("token")
        console.log(token)
        axios.delete(url+'pet/'+pet._id, {
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
                                source={{uri:"https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/a983ociqyrdchffwvfbt"}}
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
                                    ):(<Text style = {{margin: 5}}>{campo.label}: {campo.state}</Text>)}
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
                        <View style={{paddingTop: 25}}>
                        <Text style={{width: "100%", textAlign: "center", fontSize: 25}}>Pets</Text> 
                        </View>   
                        {pets?.map((pet, index) => (
                            <View key={index}>
                            <View style = {{flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20}}>
                                <Text>{pet.nomeDep}</Text>
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
                                        ):(<Text style = {{margin: 5}}>Nome: {pet.nomeDep}</Text>)}
                                    
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
                                    ):(<Text style = {{margin: 5}}>Raça: {pet.raca}</Text>)}
                                    
                            </View>
                        </View>            
                        ))}
                        <View style={{display: 'flex', flexDirection: 'row'}}>
                            <TouchableOpacity 
                                onPress={adicionaPet}
                                style={[style.button, style.buttonOpen]}>
                                <Text>Adicionar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={salvar}
                                style={[style.button, style.buttonOpen]}>
                                <Text>Aplicar</Text>
                            </TouchableOpacity>
                        </View>
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
})

export default VeiwCli