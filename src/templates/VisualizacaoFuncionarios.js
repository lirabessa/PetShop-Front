import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView,  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import axios from "axios";

const VisualizarFunc = ({ navigation }) => {
  const [modalVisibel, setModalVisible] = useState(false);

  // ********************************** AXIOS ********************************************

  const [funcionarios, setFuncionarios] = useState([])
  

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


  const DeletarFunc = (id) => {
    axios.delete(`https://pet-shop-back.vercel.app/funcionario/${id}`)
      .then(response => {
        buscarFunc();
      })
      .catch(error => {
        console.log('Erro ao excluir o funcionário', error);
      })
  }

  

  // ********************************** AXIOS ********************************************

  return (
    <>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} style={{  paddingTop: 30 }}>
        <Text style={styles.titulo}>Bem vindos</Text>
      </KeyboardAvoidingView>
{
      funcionarios.map((func) => (

       
        <View style={styles.item} key={func._id}>
        
        


         <View style={styles.square}></View> 

            <View style={{ flex: 1}}>
                <Text>{func.nomeFunc}</Text>
            </View>

            <View style={{ flex: 1 }}>
                <Text>{func.telefone}</Text> 
            </View>


            <Icon.Button name="trash-o" 
             size={20} color="red"
              backgroundColor = '#FFF'
              onPress={() => DeletarFunc(func._id)}
  
              > </Icon.Button>
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

export default VisualizarFunc;
