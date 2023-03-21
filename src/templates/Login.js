import React from 'react';
import { View , Text, StyleSheet, TextInput} from 'react-native'

const Login = () => {

    const [number, onChangeNumber] = React.useState('');
    return(
        <>
            <View style = {styles.barra}/>
            <Text style= {styles.titulo}>Login</Text>

            <TextInput
                style={styles.input}
                value={number}
                placeholder="Nome:"
                keyboardType="String"
            />

            <TextInput
                style={styles.input}
                value={number}
                placeholder="Nome:"
                keyboardType="String"
            />
             
        </>
    )
}



const styles = StyleSheet.create({
    titulo:{
        textAlign:"center", fontSize: 50, fontFamily: "",
    },
    barra:{
        flex:0.15, height:40, backgroundColor: "pink"
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
      }
})

export default Login;