import React, {useState} from 'react';
import { View, Pressable, Modal, Text, StyleSheet, TextInput, Button, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, TouchableOpacity, Image} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import axios from "axios";


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
                                alignItems: "center"
                            }}>
                                <Image source={{uri:"https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/a983ociqyrdchffwvfbt"}}
                                style = {{width:100, height:100}}/>
                                <Text>Kaenu Hives da Shopee</Text>
                        </View>
                            <View style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between"
                            }}>
                            <TouchableOpacity
                            
                            style={{...style.input, width: '90%'}}>
                                {editUserInfo.nome ? (<TextInput value = {nome} onChangeText={(e) => setNome(e)}/>):(<Text>Nome: {nome}</Text>)}
                                {editUserInfo.nome ? (
                                    <Text onPress={() => setEditUserInfo({ nome: false, telefone: false, email: false, rua: false, bairro: false })}>X</Text>
                                ): (
                                    <Text onPress={() => setEditUserInfo({ nome: true, telefone: false, email: false, rua: false, bairro: false })}>Editar</Text>
                            // <Image
                            // style = {{width:10, height:10}} 
                            // onPress={() => setEditUserInfo({ nome: true, telefone: false, email: false, rua: false, bairro: false })}
                            // source = {{ uri: "/home/rafawaltrick/Área de Trabalho/PetShop-Front/assets/edit.png"}}
                            // />
                                )}

                            </TouchableOpacity>
                            <TouchableOpacity style={{...style.input, width: '90%'}}>    
                            <Text>Nome: José</Text>
                            </TouchableOpacity>
                            </View>
                            
                            
                            {/* <TouchableOpacity>
                                <Text>Edição</Text>
                            </TouchableOpacity> */}
                            
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
})

export default VeiwCli