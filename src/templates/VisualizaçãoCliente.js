import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import axios from "axios";

const VisualizarCli = ({ navigation }) => {
  const [modalVisibel, setModalVisible] = useState(false);

  // ********************************** AXIOS ********************************************

  const [clientes, setClientes] = useState([])
  

  const buscarCli = async () => {
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
    buscarCli()
  }, [])


  const DeletarCli = (id) => {
    axios.delete(`https://pet-shop-back.vercel.app/cliente/${id}`)
      .then(response => {
        buscarCli();
        console.log(response.data.message);
      })
      .catch(error => {
        console.log('Erro ao excluir o cliente', error);
      })
  }
  

  // ********************************** AXIOS ********************************************
  return (
    <>
    <ScrollView>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} style={{  paddingTop: 30 }}>
        <Text style={styles.titulo}>Clientes</Text>
      </KeyboardAvoidingView>
{
      clientes.map((cli) => (

       
        <View style={styles.item} key={cli._id}>
        
         <View style={styles.square}>
          <Text>{cli.image}</Text>
          </View> 

            <View style={{ flex: 1}}>
                <Text>{cli.nomeCli}</Text>
            </View>

            <View style={{ flex: 1 }}>
                <Text>{cli.telefone}</Text> 
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
