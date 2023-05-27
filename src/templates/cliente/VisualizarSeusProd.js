import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as SecureStore from 'expo-secure-store'
import axios from "axios";

const VisualizarSeusProd = ({navigation}) =>{

//********************************AXIOS************* */
  const [prod, setProd] = useState([])

  const buscarProd = async () => {
    const token = await SecureStore.getItemAsync("token")
    axios.get('https://pet-shop-back.vercel.app/carrinhos', {
      maxRedirects: 0,
      validateStatus: function (status) {
        return status >= 200 && status < 303;
      }, headers: { Authorization: token } 
    }).then(response => {
      console.log('esse then');
      setProd(response.data)
    })
      .catch(error => {
        console.log('catch', error);
      })
  }

  useEffect(() => {
    buscarProd()
  }, [])

  const DeletarProdInCli = async (id) =>{
    const token = await SecureStore.getItemAsync("token")
    axios.delete(`https://pet-shop-back.vercel.app/carrinho/${id}`,
    {headers: { Authorization: token }} )
    .then(response => {
      buscarProd();
      console.log(response.data);
    })
    .catch(error => {
      console.log('Erro ao excluir o produto', error);
    })
  }


  

  //************************AXIOS********************** */


    return(
        <>
            <ScrollView>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} style={{  paddingTop: 30 }}>
                    <Text style={styles.titulo}>Seus Produtos</Text>
                </KeyboardAvoidingView>
            

                
        
          {
            prod.map((prod, i)=> (
              <View style={styles.item} key={prod._id +`-${i}`}>
        
                <View style={styles.square}></View> 
                <View style={{ flex: 1}}>
                    <Text>{prod.nomeProd}</Text>
                </View>
                <View style={{ flex: 1}}>
                    <Text>{prod.preco}</Text>
                </View>

                <Icon.Button name="trash-o" 
                    size={20} color="red"
                    backgroundColor = '#FFF'
                    onPress={() => DeletarProdInCli(prod._id.split('-')[0])}
                ></Icon.Button>
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
    square: {
        width: 50,
        height: 50,
        backgroundColor: 'pink',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
      },
  
  })

export default VisualizarSeusProd;