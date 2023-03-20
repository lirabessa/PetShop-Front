import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../templates/Login'
import Cadastro from '../templates/Cadastro'
import { NavigationContainer } from '@react-navigation/native';


export default function Routes(){
    const Stack = createNativeStackNavigator();
    return(     
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name = "Cadastro"component= {Cadastro}/>
                    <Stack.Screen name = "Login" component= {Login}/>
                </Stack.Navigator>
            </NavigationContainer> 
    )
}