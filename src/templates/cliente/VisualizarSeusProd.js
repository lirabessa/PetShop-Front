import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import axios from "axios";

const VisualizarSeusProd = ({navigation}) =>{

//********************************AXIOS************* */


  //************************AXIOS********************** */


    return(
        <>
            <ScrollView>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} style={{  paddingTop: 30 }}>
                    <Text style={styles.titulo}>Seus Produtos</Text>
                </KeyboardAvoidingView>
            

                
        
            <View style={styles.item}>
        
                <View style={styles.square}></View> 
                <View style={{ flex: 1}}>
                    <Text>Sua Tia</Text>
                </View>
                <View style={{ flex: 1}}>
                    <Text>Preço: 5,99</Text>
                </View>

                <Icon.Button name="trash-o" 
                    size={20} color="red"
                    backgroundColor = '#FFF'>
                </Icon.Button>
            </View>
         
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

export default VisualizarSeusProd;