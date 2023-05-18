import React from 'react';
import { View , Text, StyleSheet, TextInput, Button, KeyboardAvoidingView, TouchableOpacity} from 'react-native'
import RadioButtons from '../components/RadioButtons';

const Login = ({navigation}) => {
    const [tipoLogin, setTipoLogin] = React.useState(1)

    const navegarTela = () => {
        navigation.navigate(tipoLogin === 1 ? "BemVindoFunc" :"BemVindoCli")
    }

    const setChecked = (id) => {
        setTipoLogin(id)
    }
  
    return(
        <>  
            
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>    
            <View style = {{marginTop: 90}}>
                <Text style= {styles.titulo}>Bem Vindo ao PetShop</Text>
                <TextInput style={styles.input} placeholder = "Email/CFP"/>
                <TextInput style={styles.input} placeholder = "Senha"/>
                {/* <Text style= {{paddingLeft: 11}}>Esqueceu a Senha?</Text> */}
            </View> 
            
            <View style={{ flexDirection: "column", justifyContent:"space-around", marginTop:60}}>
                <Text style={{marginTop: 10, width: '100%', textAlign: 'center', fontSize: 25}} onPress={()=>navigation.navigate("CadastroCli")}>Criar conta</Text>
                <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center'}}>
                    <RadioButtons key={1} item={{label:"Funcionário", id: 1}} setChecked={setChecked} checked={tipoLogin}/>
                    <RadioButtons key={2} item={{label:"Cliente", id: 2}} setChecked={setChecked} checked={tipoLogin}/>
                </View>
                <Text style={[styles.textStyle, styles.button, styles.buttonOpen]} onPress={()=>navegarTela()}>Login</Text>
            </View>   

            
            </KeyboardAvoidingView>     
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
        textAlign:"center",
        backgroundColor: "pink",
        height:55, 
        width:'95%',
        margin: '2.5%',
        borderRadius:10
    }
})

export default Login;