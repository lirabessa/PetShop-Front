import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as SecureStore from 'expo-secure-store'

import axios from "axios";

const VisualizarSeusPet = ({navigation}) =>{

//********************************AXIOS************* */

const [pets, setPets] = useState([])

  

  const buscarPet = async () => {
    const token = await SecureStore.getItemAsync("token")
    axios.get('https://pet-shop-back.vercel.app/pets', {
      maxRedirects: 0,
      validateStatus: function (status) {
        return status >= 200 && status < 303;
      }, headers: { Authorization: token } 
    }).then(response => {
    console.log('esse then');
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
    axios.delete(`https://pet-shop-back.vercel.app/pet/${id}`,
    {headers: { Authorization: token }} )
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
            <ScrollView>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} style={{  paddingTop: 30 }}>
                    <Text style={styles.titulo}>Seus Pets</Text>
                </KeyboardAvoidingView>
            

                {
        pets.map((pets) => (
            <View style={styles.item} key={pets._id}>
        
                <View style={styles.square}></View> 
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
  
  })

export default VisualizarSeusPet;