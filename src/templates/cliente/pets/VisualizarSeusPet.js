import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as SecureStore from 'expo-secure-store'

import axios from "axios";

const VisualizarSeusPet = ({navigation}) =>{
  // const mockFoto = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png?20220226140232'
  const mockFoto = 'https://i.pinimg.com/originals/a0/8b/a5/a08ba59656e06a42390959bc59e14d0d.jpg'
//********************************AXIOS************* */

const [pets, setPets] = useState([])

  

  const buscarPet = async () => {
    const token = await SecureStore.getItemAsync("token")
    const url = 'https://pet-shop-back.vercel.app/pets'
    // let url = 'http://192.168.0.138:3333/pets'
    axios.get(url, {
      maxRedirects: 0,
      validateStatus: function (status) {
        return status >= 200 && status < 303;
      }, headers: { authorization: token } 
    }).then(response => {
    console.log('esse then busca pet', response.data);
      setPets(response.data)
    })
      .catch(error => {
        console.log('catch', error);
      })
  }
  

  useEffect(() => {
    buscarPet()
  }, [])

  const DeletarSeusPets = async (id) =>{
    const token = await SecureStore.getItemAsync("token")
    // let url = 'http://192.168.0.138:3333/pet/'
    const url = 'https://pet-shop-back.vercel.app/pet/'
    axios.delete(`${url}${id}`,
    {headers: { authorization: token }} )
    .then(response => {
      buscarPet();
      console.log(response.data);
    })
    .catch(error => {
      console.log('Erro ao excluir o Pet', error);
    })
  }

  //************************AXIOS********************** */


    return(
        <>

<View style = {styles.barra}>
        <Icon.Button name="angle-left" 
            size={20} color="black"
            backgroundColor = 'pink' onPress={()=>navigation.navigate("BemVindoCli")}>Voltar 
        </Icon.Button>
        </View>
            <ScrollView>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} style={{  paddingTop: 30 }}>
                    <Text style={styles.titulo}>Seus Pets</Text>
                </KeyboardAvoidingView>
            

                {
        pets.map((pets) => (
            <View style={styles.item} key={pets._id}>
        
        <Image source={{uri:pets.foto?.src || mockFoto}} style={{width: 50, height: 50, borderRadius: 5, marginRight: 15,}}/> 
                <View style={{ flex: 1}}>
                    <Text>{pets.nomeDep}</Text>
                </View>
                <View style={{ flex: 1}}>
                    <Text>{pets.raca}</Text>
                </View>

                <Icon.Button name="trash-o" 
                    size={20} color="red"
                    backgroundColor = '#FFF'
                    onPress={() => DeletarSeusPets(pets._id)}>
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
    square: {
        width: 50,
        height: 50,
        backgroundColor: 'pink',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
      },
      
  barra:{
    backgroundColor: "pink", alignItems:'flex-start', paddingTop:40
  },

  
  })

export default VisualizarSeusPet;