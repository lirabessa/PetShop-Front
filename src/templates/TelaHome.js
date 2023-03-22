import React from 'react';
import { View , Text, KeyboardAvoidingView, StyleSheet} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

const TelaHome = ({navigation}) => {
    
    return(
        <>
           <ScrollView>
                <Text onPress={()=>navigation.navigate("Login")} style={[styles.textStyle,]}>Login</Text>
                    
                    <KeyboardAvoidingView style={{ flexDirection:"row", justifyContent:"space-around", alignItems:'center',  paddingTop:80}}>
                        <KeyboardAvoidingView>
                            <Text style={styles.titulo}>Banho e tosa</Text>
                            <Text style={styles.valor}>R$ 40.00</Text>
                            <Text style={[styles.textStyle, styles.button,]} >Comprar</Text>

                            <Text style={styles.titulo2}>Vacinação</Text>
                            <Text style={styles.valor}>R$ 40.00</Text>
                            <Text style={[styles.textStyle, styles.button,]} >Comprar</Text>
                        </KeyboardAvoidingView>

                        <KeyboardAvoidingView>
                            <Text style={styles.titulo}>Banho e tosa</Text>
                            <Text style={styles.valor}>R$ 40.00</Text>
                            <Text style={[styles.textStyle, styles.button,]} >Comprar</Text>

                            <Text style={styles.titulo2}>Vacinação</Text>
                            <Text style={styles.valor}>R$ 40.00</Text>
                            <Text style={[styles.textStyle, styles.button,]} >Comprar</Text>
                        </KeyboardAvoidingView>
                    </KeyboardAvoidingView>
                     

                   

                    
                
    
           </ScrollView>
        </>
    )
}
const styles = StyleSheet.create({
    titulo:{
        fontSize:25
    },
    titulo2:{
        fontSize:25,
        marginTop:60
    },
    valor:{
        color:"red",
        textAlign:"justify",
        fontSize:20
    },
    textStyle: {
        color: 'black',
        justifyContent: 'center',
        textAlign:'right',
        marginTop:15,
        marginEnd:25,
        fontSize:17
        
    },
    button: {
        padding: 15,
        height:50,
        width:100,
        textAlign:"center",
        backgroundColor: "pink",
        height:50, width:100,
        borderRadius:10
    },
 
  
    

})

export default TelaHome;