import React, { useState, useEffect } from 'react';
import { View,  Text, StyleSheet, KeyboardAvoidingView, ScrollView, Image, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import axios from "axios"

const FichaMedica = ({navigation})=> {

    const mockFoto = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png?20220226140232'


    return(
        <>
            <ScrollView>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} style={{  paddingTop: 30 }}>
                    <Text style={styles.titulo}>Fichas Médicas</Text>

                    
                        <View style={styles.item}>
                            <Text style={styles.text}>Doença:</Text>
                        </View>
                        <View style={styles.item}>
                            <Text style={styles.text}>Tratamento: iuahsdiuoahsdiuahsasanscnASKJDNCjklascdnkjlDFSSDNCKLJSDNdckçjsJKCNDKFLCJSÇCFKLÇJSJCLKJndckjnDKSJCNkldfjsjdcnLKJSDCNKjldfsdcnlKJSDCNLKjdfsnsdnckfljNDCLFKÇJKLCnsdckflçjnLKJDFSJDLCNlkjsdncljkNDFSÇFKSÇSDNLJCJKJK</Text>
                        </View>
                        <View style={styles.item}>
                            <Text style={styles.text}>Custo:</Text>
                        </View>
                        <View style={styles.item}>   
                            <Text style={styles.text}>Data:</Text>
                        </View>    

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

    text:{
       
        
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

export default FichaMedica;
