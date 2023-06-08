import React, { useState, useEffect } from 'react';
import { View,  Text, StyleSheet, KeyboardAvoidingView, ScrollView, Image, TouchableOpacity, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import axios from "axios"
import * as SecureStore from 'expo-secure-store'

const FichaMedica = ({route, navigation})=> {

    const mockFoto = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png?20220226140232'
    const {id, idCli} = route.params || {id: null, idCli: null};
    const [fichas, setFichas] = useState([])

    const [data, setData] = useState('')
    const [doenca, setDoenca] = useState('')
    const [tratamento, setTratamento] = useState('')
    const [custo, setCusto] = useState('')

    const formatData = date => {
      if (date && date != ''){
        return date.split('T')[0]
      }
      else{
        return date
      }
    }

    const buscaFichas = async () => {
      const token = await SecureStore.getItemAsync("token")
      const url = 'https://pet-shop-back.vercel.app'
      // const url = 'http://192.168.0.138:3333' //RAFA
      axios.get(url+`/fichamedica/${id}/${idCli}`, {headers: { authorization: token }}).then(res => {
        setFichas(res.data.map(ficha => ({...ficha, editar: false, data: formatData(ficha.data) })))
        console.log(res.data)
      }).catch(err => {console.log('error', err)});
    }

    const adicionaFicha = () => {
      const ficha = {
        doenca: '',
        data: '',
        tratamento: '',
        custo: '',
        editar: true
      }
      setFichas([ficha].concat(fichas))
    }

    const concluirAlteracao = async (index) => {
      const token = await SecureStore.getItemAsync("token")
      const url = 'https://pet-shop-back.vercel.app'
      // const url = 'http://192.168.0.138:3333' //RAFA
      const data = {
        ...fichas[index]
      }
      axios.post(
        url+`/fichamedica/${id}/${idCli}`, 
        data, 
        {headers: { authorization: token }}
      ).then(res => {
        const fichas = res.data.pet.fichaMedica.map(ficha => ({...ficha, editar: false, data: formatData(ficha.data) }))
        setFichas(fichas)
      }).catch(err => {console.log('error', err)});

    }

    const editarFicha = async (index) => {
      const ficha = fichas[index]
      setData(ficha.data)
      setDoenca(ficha.doenca)
      setTratamento(ficha.tratamento)
      setCusto(ficha.custo)
      fichas[index].editar = true
      setFichas(fichas)
    }

    const removeFicha = async (index) => {
      const token = await SecureStore.getItemAsync("token")
      const url = 'https://pet-shop-back.vercel.app'
      // const url = 'http://192.168.0.138:3333' //RAFA
      axios.delete(
        url+`/fichamedica/${fichas[index]._id}`, 
        {headers: { authorization: token }}
      ).then(res => {
        const fichas = res.data.map(ficha => ({...ficha, editar: false, data: formatData(ficha.data) }))
        setFichas(fichas)
      }).catch(err => {console.log('error', err)});

    }
    useEffect(() => {
      buscaFichas()
    }, [route.params])


    return(
        <>
            <ScrollView>
                <View style={{flexDirection:"row",justifyContent:"space-around", paddingBottom:20, borderBottomWidth: 1, marginVertical: 15}}>
                  <TouchableOpacity style={[styles.button, styles.buttonOpen, {flex: .85}]} onPress={adicionaFicha}>
                    <Text style={styles.textStyle}>Nova Ficha</Text>
                  </TouchableOpacity>
                </View>
                <KeyboardAvoidingView style={{  paddingTop: 30 }}>
                    <Text style={styles.titulo}>Fichas Médicas</Text>
                    {fichas.map((ficha, index) => (

                      <View style={styles.ficha} key={index}>
                        <View style={{flexDirection:"row", ...styles.botoes}}>
                              {!ficha._id ? (
                                <Icon.Button 
                                    name={ficha.editar ? "check" : "edit"}
                                    size={20} 
                                    color="black"
                                    backgroundColor="rgba(255,255,255,0)"
                                    onPress={()=> ficha.editar ? concluirAlteracao(index) : editarFicha(index)}>
                                </Icon.Button>
                              ) : (<></>)}
                              
                              <Icon.Button 
                                  name="trash-o" 
                                  size={20}
                                  color="black"
                                  backgroundColor="rgba(255,255,255,0)"
                                  onPress={()=>removeFicha(index)}>    
                              </Icon.Button>
                          </View>
                        <View style={styles.item}>
                          {ficha.editar ? (
                            <View>
                            <Text style={styles.text}>Data:</Text>
                            <TextInput style = {{margin: 5, minWidth: 300, backgroundColor: "#fff"}} 
                              value = {ficha.data} 
                              onChangeText={(e) => {
                                  fichas[index].data = e
                                  setFichas([...fichas])
                              }}/>
                              </View>
                            ):(<Text style={styles.text}>Data: {ficha.data}</Text>)}
                        </View>    
                        <View style={styles.item}>
                          {ficha.editar ? (
                            <View>
                            <Text style={styles.text}>Doença:</Text>
                              <TextInput style = {{margin: 5, minWidth: 300, backgroundColor: "#fff"}} 
                              value = {ficha.doenca} 
                              onChangeText={(e) => {
                                  fichas[index].doenca = e
                                  setFichas([...fichas])
                              }}/>
                            </View>
                            ):(<Text style={styles.text}>Doença: {ficha.doenca}</Text>)}
                        </View>
                        <View style={styles.item}>
                          {ficha.editar ? (
                            <View>
                            <Text style={styles.text}>Tratamento:</Text>
                            <TextInput style = {{margin: 5, minWidth: 300, backgroundColor: "#fff"}} 
                              value = {ficha.tratamento} 
                              onChangeText={(e) => {
                                  fichas[index].tratamento = e
                                  setFichas([...fichas])
                              }}/>
                            </View>
                            ):(<Text style={styles.text}>Tratamento: {ficha.tratamento}</Text>)}
                            
                        </View>
                        <View style={styles.item}>
                          {ficha.editar ? (
                            <View>
                              <Text style={styles.text}>Custo:</Text>
                            <TextInput style = {{margin: 5, minWidth: 300, backgroundColor: "#fff"}} 
                              value = {ficha.custo} 
                              onChangeText={(e) => {
                                  fichas[index].custo = e
                                  setFichas([...fichas])
                              }}/>
                            </View>
                            ):(<Text style={styles.text}>Custo: {ficha.custo}</Text>)}
                            
                        </View>
                      </View>
                      ))}

                </KeyboardAvoidingView>
                
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
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginTop:20,
      marginHorizontal:15  
    },
    botoes:{
      paddingHorizontal: 15,
      marginHorizontal:15,
      flex: 1
    },

    text:{
       
        
    },
    textStyle: {
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        flex:1
    },
  
    square: {
      width: 50,
      height: 50,
      backgroundColor: 'pink',
      opacity: 0.4,
      borderRadius: 5,
      marginRight: 15,
    },
    ficha: {
      borderBottomWidth: 1,
      paddingVertical: 15,
      marginHorizontal: 15
    },
    button: {
      borderRadius: 10, padding: 15, height:50, width:100, textAlign:"center"
    },
    buttonOpen: {
        backgroundColor: 'pink',
    },
  
  })

export default FichaMedica;
