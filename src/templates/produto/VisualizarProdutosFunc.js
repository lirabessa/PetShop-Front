import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import axios from "axios";

const VisualizarProdFunc = ({navigation}) =>{

    //*************AXIOS**************** */
    const [produtos,setProdutos] = useState([])
    
    const buscarProd = async () =>{
        axios.get('https://pet-shop-back.vercel.app/produtos',{
            maxRedirects: 0,
            validateStatus: function (status) {
            return status >= 200 && status < 303;
            }
        }).then(response => {
    //   console.log('esse then', response.data.readCliente);
    setProdutos(response.data.readProdutos)
    //   console.log('aqui foi amem');
    })
    .catch(error => {
        // console.log('catch', error);
    })
}

useEffect(() => {
    buscarProd()
}, [])

const DeletarProd = (id) => {
    axios.delete(`https://pet-shop-back.vercel.app/produto/${id}`)
    .then(response => {
        buscarProd();
        console.log(response.data.message);
    })
    .catch(error => {
        console.log('Erro ao excluir o produto', error);
    })
}
    //****************AXIOS**************** */

    return(
        <>
        <View style = {styles.barra}>
        <Icon.Button name="angle-left" 
            size={20} color="black"
            backgroundColor = 'pink' onPress={()=>navigation.navigate("BemVindoFunc")}>Voltar 
        </Icon.Button>
        </View>

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

                <Icon.Button name="trash-o" 
                    size={20} color="red"
                    backgroundColor = '#FFF'
                    onPress={()=> DeletarProd(prod._id)}
                    >
                </Icon.Button>
            </View>

))}
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
    barra:{
           backgroundColor: "pink", alignItems:'flex-start', paddingTop:40
       },
   
  
  })

export default VisualizarProdFunc;