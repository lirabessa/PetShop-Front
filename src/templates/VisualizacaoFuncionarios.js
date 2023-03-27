import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView,  } from 'react-native';

import axios from "axios";

const VisualizarFunc = ({ navigation }) => {
  const [modalVisibel, setModalVisible] = useState(false);

  // ********************************** AXIOS ********************************************

  const [funcionarios, setFuncionarios] = useState([])
  const getItemCount = _data => 10;


  const buscarFunc = async () => {
    axios.get('https://pet-shop-back.vercel.app/funcionarios', {
      maxRedirects: 0,
      validateStatus: function (status) {
        return status >= 200 && status < 303;
      }
    }).then(response => {
      console.log("************************************************************************************");
      console.log("************************************************************************************");
      console.log("************************************************************************************");
      console.log("************************************************************************************");
      console.log("************************************************************************************");
      console.log('esse then', response.data.readFuncionarios);
      setFuncionarios(response.data.readFuncionarios)
      console.log('aqui foi amem');
    })
      .catch(error => {
        console.log('catch', error);
      })
  }
  useEffect(() => {
    buscarFunc()
  }, [])

  // ********************************** AXIOS ********************************************

  return (
    <>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} style={{ backgroundColor: "red", paddingTop: 50 }}>
        <Text style={styles.titulo}>Bem vindos</Text>
      </KeyboardAvoidingView>
{
      funcionarios.map((func) => (

       
        <View style={styles.item} key={func._id}>
        
            <View style={{ flex: 1 }}>  
                <Text>foto</Text> 
            </View>

            <View style={{ flex: 1 }}>
                <Text>{func.nomeFunc}</Text>
            </View>

            <View style={{ flex: 1 }}>
                <Text>{func.telefone}</Text> 
            </View>

        </View>

        
        
))
      }


    </>
  )
}
const styles = StyleSheet.create({
  titulo: {
    textAlign: "center", fontSize: 30
  },
  container: {
    flex: 1,
    backgroundColor: "pink",
  },
  item: {  
    padding: 20,
    flexDirection:"row",
    justifyContent:"space-around",
    
  },


})

export default VisualizarFunc;
