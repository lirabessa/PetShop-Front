import React, { useState } from 'react';
import { View,SafeAreaView, VirtualizedList, StatusBar,  Text, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Pressable} from 'react-native'
import axios from "axios";

const VisualizarFunc = () => {
    const [modalVisibel, setModalVisible] = useState(false);
    const [funcionarios, setFuncionarios] = useState()
        
    const getItem = (_data, index) => ({
    id: Math.random().toString(12).substring(0),
    title: `Funcionário: ${index + 1}`,
    });
    
    const getItemCount = (_data) => 10;
    
    

    const Item = ({title}) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
    );  
     
    React.useEffect(()=>{
        function render(){
            axios.get('https://pet-shop-back.vercel.app/funcionarios'
    
            ).then(response => {
                console.log("*********************************************************************************************************************");
                console.log(response);
                setFuncionarios(response.data)
            })
            .catch(error => {
                console.log();
            });
        } 
        render()   
    },[])

    return(
        <>
            <ScrollView>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios'? 'padding' : 'padding'}>
                    <KeyboardAvoidingView style = {{ paddingTop: 50}}>
                        <Text style= {styles.titulo}>Bem vindo</Text>
                    </KeyboardAvoidingView>
                    <SafeAreaView style={styles.container}>
                    <VirtualizedList
                        initialNumToRender={4}
                        renderItem={({item}) => <Item title={item.title} />}
                        keyExtractor={item => item.id}
                        getItemCount={getItemCount}
                        getItem={getItem}
                    />
                    </SafeAreaView>


                </KeyboardAvoidingView>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
titulo:{
    textAlign:"center", fontSize: 30
},
container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
},
item: {
    height: 150,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
},


})

export default VisualizarFunc;