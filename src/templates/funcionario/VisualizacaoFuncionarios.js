import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Pressable, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import axios from "axios";

const VisualizarFunc = ({ navigation }) => {
  const [modalVisibel, setModalVisible] = useState(false);
  const mockFoto = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png?20220226140232'

  // ********************************** AXIOS ********************************************

  const [funcionarios, setFuncionarios] = useState([])
  

  const buscarFunc = async () => {
    const url = 'https://pet-shop-back.vercel.app/funcionarios'
    // const url = 'http://192.168.0.138:3333/funcionarios'
    axios.get(url, {
      maxRedirects: 0,
      validateStatus: function (status) {
        return status >= 200 && status < 303;
      }
    }).then(response => {
      setFuncionarios(response.data.readFuncionarios)
    })
      .catch(error => {
        console.log('catch', error);
      })
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      buscarFunc()
    });
    return unsubscribe;
  }, [navigation]);


  const DeletarFunc = (id) => {
    axios.delete(`https://pet-shop-back.vercel.app/funcionario/${id}`)
      .then(response => {
        buscarFunc();
        console.log('Funcionario Exluido');
      })
      .catch(error => {
        console.log('Erro ao excluir o funcionário', error);
      })
  }

  const verFunc = (func) => {
    navigation.navigate('CadastroFunc', {id: func._id})
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
    
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} style={{  paddingTop: 30 }}>
        <Text style={styles.titulo}>Bem vindos</Text>
      </KeyboardAvoidingView>
{
      funcionarios.map((func) => (

       
        <View style={styles.item} key={func._id}>
        
        


         {/* <View style={styles.square}></View>  */}
         <Image source={{uri:func.foto?.src || mockFoto}} style={{width: 50, height: 50, borderRadius: 5, marginRight: 15,}}/>

            <View style={{ flex: 1}}>
                <Pressable onPress={() => verFunc(func)}><Text>{func.nomeFunc}</Text></Pressable>
            </View>

            <View style={{ flex: 1 }}>
              <Pressable onPress={() => verFunc(func)}><Text>{func.telefone}</Text></Pressable>
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

export default VisualizarFunc;
