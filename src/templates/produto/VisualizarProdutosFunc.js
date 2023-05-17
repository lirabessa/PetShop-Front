import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import axios from "axios";

const VisualizarProdFunc = ({navigation}) =>{

    return(
        <>
            <ScrollView>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} style={{  paddingTop: 30 }}>
                    <Text style={styles.titulo}>Todos os Produtos</Text>
                </KeyboardAvoidingView>
            
            <View style={styles.item}>
        
                <View style={{ flex: 1}}>
                    <Text>Ração</Text>
                </View>
                <View style={{ flex: 1}}>
                    <Text>3,99 kg</Text>
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

export default VisualizarProdFunc;