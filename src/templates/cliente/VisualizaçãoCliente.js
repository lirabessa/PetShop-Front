import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Image, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';

import axios from "axios";

const VisualizarCli = ({ navigation }) => {
  const [modalVisibel, setModalVisible] = useState(false);
  const mockFoto = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png?20220226140232'

  // ********************************** AXIOS ********************************************

  const [clientes, setClientes] = useState([])
  

  const buscarCli = async () => {
    axios.get('https://pet-shop-back.vercel.app/clientes', {
      maxRedirects: 0,
      validateStatus: function (status) {
        return status >= 200 && status < 303;
      }
    }).then(response => {
      setClientes(response.data.readCliente)
    //   console.log('aqui foi amem');
    })
      .catch(error => {
        // console.log('catch', error);
      })
  }

  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      buscarCli()
    });
    return unsubscribe;
  }, [navigation]);


  const DeletarCli = (id) => {
    axios.delete(`https://pet-shop-back.vercel.app/cliente/${id}`)
      .then(response => {
        buscarCli();
      })
      .catch(error => {
        console.log('Erro ao excluir o cliente', error);
      })
  }

  const verCliente = (cliente) => {
    navigation.navigate('VeiwCli', {id: cliente._id})
  }
  

  // ********************************** AXIOS ********************************************
  return (
    <>
                <View style = {styles.barra}>
                    <Icon.Button name="angle-left" 
                        size={20} color="black"
                        backgroundColor = 'pink' onPress={()=>navigation.navigate("BemVindoFunc")}>Voltar 
                    </Icon.Button>
                </View>
    <ScrollView>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} style={{  paddingTop: 30 }}>
        <Text style={styles.titulo}>Clientes</Text>
      </KeyboardAvoidingView>
    {
      clientes.map((cli) => (

       
        <View style={styles.item} key={cli._id}>
          
    
          <Image source={{uri:cli.foto?.src || mockFoto}} style={{width: 50, height: 50, borderRadius: 5, marginRight: 15,}}/>
    
          <View  >
              <Pressable onPress={()=>verCliente(cli)}><Text>{cli.image}</Text></Pressable>
            </View> 

            <View style={{ flex: 1}} >
              <Pressable onPress={()=>verCliente(cli)}><Text>{cli.nomeCli}</Text></Pressable>
            </View>
           

            <View style={{ flex: 1 }} >
              <Pressable onPress={()=>verCliente(cli)}><Text>{cli.telefone}</Text></Pressable>
            </View>


            <Icon.Button name="trash-o" 
             size={20} color="red"
              backgroundColor = '#FFF'
              onPress={() => DeletarCli(cli._id)}
  
              > </Icon.Button>
        </View>

        
      ))
    }
      </ScrollView>


    </>
  )
}
const styles = StyleSheet.create({
  titulo: {
    textAlign: "center", fontSize: 30
  },
  barra:{
    backgroundColor: "pink", alignItems:'flex-start', paddingTop:40
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

export default VisualizarCli;
