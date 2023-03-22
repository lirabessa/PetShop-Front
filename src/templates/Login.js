import React from 'react';
import { View , Text, StyleSheet, TextInput, Button, KeyboardAvoidingView} from 'react-native'

const Login = ({navigation}) => {

    const [number, onChangeNumber] = React.useState('');
    return(
        <>           
            <View style = {{marginTop: 90}}>
                <Text style= {styles.titulo}>Bem Vindo ao PetShop</Text>
                <TextInput style={styles.input} placeholder = "Email/CFP"/>
                <TextInput style={styles.input} placeholder = "Senha"/>
                <Text style= {{paddingLeft: 11}}>Esqueceu a Senha?</Text>
            </View> 
            
            <View style={{ flexDirection: "row", justifyContent:"space-around", marginTop:60}}>
                <Text onPress={()=>navigation.navigate("Cadastro")}>Criar conta</Text>
                <Text style={[styles.textStyle, styles.button, styles.buttonOpen]}onPress={()=>navigation.navigate("BemVindoFunc")}>ENVIAR</Text>
                
            </View>             
        </>
    )
}


const styles = StyleSheet.create({
    titulo:{
        textAlign:"center", fontSize: 30
    },
    barra:{
        flex:0.15, height:40, backgroundColor: "pink", 
    },
    input:{
        height: 40, margin: 12, borderWidth: 1, borderRadius: 10, padding: 10, marginTop: 20
    },
    textStyle: {
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center' ,
        
    },
    button: {
        padding: 15,
        height:50,
        width:100,
        textAlign:"center",
        backgroundColor: "pink",
        height:50, width:100,
        borderRadius:10
    }
})

export default Login;