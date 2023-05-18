import React, {useState} from 'react';
import { View, Pressable, Modal, Text, StyleSheet, TextInput, Button, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, TouchableOpacity, Image} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import axios from "axios";
import Icon from 'react-native-vector-icons/FontAwesome';

import { Logs } from 'expo'

Logs.enableExpoCliLogging()

const VeiwCli = ({navigation}) => {

    const [editUserInfo, setEditUserInfo] = useState({
        nome: false,
        telefone: false,
        email: false,
        rua: false,
        bairro: false
      }); 

    const [nome, setNome] = useState("Kaenu");
    const [telefone, setTelefone] = useState("12 99887766");
    const [email, setEmail] = useState("kaenu@hives");
    const [rua, setRua] = useState("Matrixx");
    const [bairro, setBairro] = useState("Caverna");

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
    ]

    const petsMock = [
        {nome: "Rex", raca: "dinossauro", editar: false},
        {nome: "Raptor", raca: "dinossauro", editar: false},
        {nome: "Triporodonte", raca: "dinossauro", editar: false} 
    ]
    const [pets, setPets] = React.useState(petsMock)

    const [petNome, setPetNome] = React.useState("")
    const [petRaca, setPetRaca] = React.useState("")
    
    const editarPet = (index) => {
        const pet = pets[index]
        setPetNome(pet.nome)
        setPetRaca(pet.raca)
        pets[index].editar = true
        setPets(pets)
    }

    const concluirAlteracao = (index) => {
        setPetNome('')
        setPetRaca('')
        pets[index].editar = false
        setPets(pets)
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
                                justifyContent: "center",
                                marginTop: 20,
                            }}>
                                <Image 
                                source={{uri:"https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/a983ociqyrdchffwvfbt"}}
                                style = {{width:100, height:100}}/>
                                <Text style = {{margin: 5}}> Kaenu Hives da Shopee</Text>
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
                            <Text>{pet.nome}</Text>
                            <View>
                                <Icon.Button 
                                    name={pet.editar ? "check" : "edit"}
                                    size={20} 
                                    color="black"
                                    backgroundColor="rgba(255,255,255,0)"
                                    onPress={()=> pet.editar ? concluirAlteracao(index) : editarPet(index)}>

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
                                    value = {pet.nome} 
                                    onChangeText={(e) => {
                                        pets[index].nome = e
                                        setPets([...pets])
                                    }}/>
                                    ):(<Text style = {{margin: 5}}>Nome: {pet.nome}</Text>)}
                                
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
})

export default VeiwCli