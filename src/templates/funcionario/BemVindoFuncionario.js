import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Pressable} from 'react-native'

const BemVindoFunc = ({navigation}) => {
    const [modalVisibel, setModalVisible] = useState(false);
    return(
        <>
            <ScrollView>
                    <View style = {styles.barra}/>
                        <KeyboardAvoidingView behavior={Platform.OS === 'ios'? 'padding' : 'padding'}>
                            <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>                
                                <KeyboardAvoidingView style = {{ paddingTop: 50}}>
                                    <Text style= {styles.titulo}>Bem vindo</Text>
                                </KeyboardAvoidingView> 
                            </TouchableWithoutFeedback>

                            <KeyboardAvoidingView style={{justifyContent: "space-around", alignItems: "center", }}>
                        
                                <Pressable
                                    style={[styles.button, styles.buttonOpen]}
                                    onPress={() => setModalVisible(true)}>
                                    <Text onPress={()=>navigation.navigate("VisualizarCli")}  style={styles.textStyle}>Visualizar Clientes</Text>
                                </Pressable>

                                <Pressable
                                    style={[styles.button, styles.buttonOpen]}
                                    onPress={() => setModalVisible(true)}>
                                    <Text  onPress={()=>navigation.navigate("VisualizarFunc")}  style={styles.textStyle}>Visualizar Funcionários</Text>
                                </Pressable>

                                <Pressable
                                    style={[styles.button, styles.buttonOpen]}
                                    onPress={() => setModalVisible(true)}>
                                    <Text onPress={()=>navigation.navigate("VisulizarProdFunc")} style={styles.textStyle}>Visualizar Produtos</Text>
                                </Pressable>

                                <Pressable
                                    style={[styles.button, styles.buttonOpen]}
                                    onPress={() => setModalVisible(true)}>
                                    <Text onPress={()=>navigation.navigate("CadastroCli")} style={styles.textStyle}>Cadastrar Clientes</Text>
                                </Pressable>

                                <Pressable
                                    style={[styles.button, styles.buttonOpen]}
                                    onPress={() => setModalVisible(true)}>
                                    <Text onPress={()=>navigation.navigate("CadastroFunc")} style={styles.textStyle}>Cadastrar Funcionários</Text>
                                </Pressable>


                                <Pressable
                                    style={[styles.button, styles.buttonOpen]}
                                    onPress={() => setModalVisible(true)}>
                                    <Text onPress={()=>navigation.navigate("CadastroProd")} style={styles.textStyle}>Cadastrar Produtos</Text>
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
    button: {
        borderRadius: 10, justifyContent: 'center', padding: 15, height:50, width:300, textAlign:"center", margin: 10
    },
    buttonOpen: {
        backgroundColor: 'pink',
    },
    textStyle: {
        color: 'white', fontWeight: 'bold', textAlign: 'center',
      },
   
})

export default BemVindoFunc;