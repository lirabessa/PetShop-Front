import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import axios from "axios";

const VisualizarSeusPet = ({navigation}) =>{

//********************************AXIOS************* */

const [clientes, setClientes] = useState([])
  

  const buscarPet = async () => {
    axios.get('https://pet-shop-back.vercel.app/clientes', {
      maxRedirects: 0,
      validateStatus: function (status) {
        return status >= 200 && status < 303;
      }
    }).then(response => {
    //   console.log('esse then', response.data.readCliente);
      setClientes(response.data.readCliente)
    //   console.log('aqui foi amem');
    })
      .catch(error => {
        // console.log('catch', error);
      })
  }

  useEffect(() => {
    buscarPet()
  }, [])

  //************************AXIOS********************** */


    return(
        <>
            <ScrollView>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} style={{  paddingTop: 30 }}>
                    <Text style={styles.titulo}>Seus Pets</Text>
                </KeyboardAvoidingView>
            

                {
        clientes.map((cli) => (
            <View style={styles.item} key={cli._id}>
        
                <View style={styles.square}></View> 
                <View style={{ flex: 1}}>
                    <Text>{cli.dependentes.nomeDep}</Text>
                </View>
                <View style={{ flex: 1}}>
                    <Text>{cli.dependentes.raca}</Text>
                </View>

                <Icon.Button name="trash-o" 
                    size={20} color="red"
                    backgroundColor = '#FFF'>
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