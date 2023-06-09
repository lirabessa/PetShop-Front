import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as SecureStore from 'expo-secure-store'

import axios from "axios";

const VisualizarProdFunc = ({navigation}) =>{


    //*************AXIOS**************** */
    const [produtos,setProdutos] = useState([])


    const getSelecionados =async (produtosget) => {
        // busca produtos ja selecionados e deixa check true
        const token = await SecureStore.getItemAsync("token")
        const baseUrl = 'https://pet-shop-back.vercel.app/'
        // const baseUrl = 'http://192.168.0.138:3333/'
        axios.get(baseUrl+'carrinhos', 
        {
            maxRedirects: 0,
            validateStatus: function (status) {
            return status >= 200 && status < 303;
            },
            headers: { authorization: token }
        }).then(res => {
            let prods = []
            res.data.forEach(prod => {
                if (!prods.includes(prod.idProd)){
                    prods.push(prod.idProd)
                }
            })
            const selecionados = produtosget.map(p => prods.includes(p._id) ? ({...p, selecionado: true}) : p)
            setProdutos(selecionados)
        }).catch(error => {
            console.log('catch', error)
        })
    } 
    
    const buscarProd = async () =>{
        const token = await SecureStore.getItemAsync("token")
        const baseUrl = 'https://pet-shop-back.vercel.app/'
        //const baseUrl = 'http://192.168.0.138:3333/'
        axios.get(baseUrl+'produtos',{
            maxRedirects: 0,
            validateStatus: function (status) {
            return status >= 200 && status < 303;
            }
        }).then(response => {
            getSelecionados(response.data.readProdutos)
        })
        .catch(error => {
            console.log('catch', error);
        })
        
    }



    useEffect(() => {
        buscarProd()
    }, [])

    const SelecionaProd = async (prod) => {
        const token = await SecureStore.getItemAsync("token")
        
        const url = 'https://pet-shop-back.vercel.app/carrinho/'
        //const url = 'http://192.168.0.138:3333/carrinho/' //RAFA
        axios.post(url+prod._id,null, {headers: { authorization: token }}).then(response => {
          setProdutos(produtos.map(p => prod._id === p._id ? ({...prod, selecionado: !prod.selecionado}) : p))
        })
        .catch(error => {
            console.log('catch', error);
        })
        
    }

    const apagaProdutoCarrinho = async (prod) => {
        const token = await SecureStore.getItemAsync("token")
        const url = 'https://pet-shop-back.vercel.app/carrinho/'
        //const url = 'http://192.168.0.138:3333/carrinho/' //RAFA
        axios.delete(url+prod._id, {headers: { authorization: token }}).then(response => {
            console.log('esse then', response.data);
            setProdutos(produtos.map(p => prod._id === p._id ? ({...prod, selecionado: !prod.selecionado}) : p))
          })
          .catch(error => {
              console.log('catch', error);
          })
    }
    //****************AXIOS**************** */

    return(
        <>
            <ScrollView>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} style={{  paddingTop: 30 }}>
                    <Text style={styles.titulo}>Todos os Produtos</Text>
                </KeyboardAvoidingView>
            {
            produtos.map((prod)=> (
                <View style={styles.item} key={prod._id}>
            
                    <View style={{ flex: 1}}>
                        <Text>{prod.nomeProd}</Text>
                    </View>
                    <View style={{ flex: 1 , paddingLeft: 35}}>
                        <Text>{prod.preco}</Text>
                    </View>

                    <Icon.Button name={prod.selecionado ? "check" : "square-o" }
                        size={20} color="red"
                        backgroundColor = '#FFF'
                        onPress={()=> prod.selecionado ? apagaProdutoCarrinho(prod) : SelecionaProd(prod)}
                        >
                    </Icon.Button>
                </View>
            ))}

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('VisualizarSeusProd')}>
                <Text style={{color: '#fff', textAlign:"center"}}>Adicionar</Text>
            </TouchableOpacity>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    titulo: {
      textAlign: "center", fontSize: 30
    },
    container: {
      flex: 1,
    
    },
    item: {  
      backgroundColor: '#FFF',
      padding: 15,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop:20,
      marginHorizontal:15
  
    },
    button: {
        borderRadius: 10,
        justifyContent: 'center',
        padding: 15,
        height:50,
        textAlign:"center",
        margin: 10,
        marginTop: 40,
        backgroundColor: 'pink',
        flex: .65
    },
  
  })

export default VisualizarProdFunc;