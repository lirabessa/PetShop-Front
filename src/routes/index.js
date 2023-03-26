import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../templates/Login'
import Cadastro from '../templates/Cadastro'
import BemVindoFunc from '../templates/BemVindoFuncionario'
import { NavigationContainer } from '@react-navigation/native';
import TelaHome from '../templates/TelaHome';
import VisualizarFunc from '../templates/VisualizacaoFuncionarios';


export default function Routes(){
    const Stack = createNativeStackNavigator();
    return(     
            <NavigationContainer>
                <Stack.Navigator  initialRouteName="VisualizarFunc">
                    <Stack.Screen name = "TelaHome" component= {TelaHome}/>
                    <Stack.Screen name = "Cadastro"component= {Cadastro}/>
                    <Stack.Screen name = "Login" component= {Login}/>
                    <Stack.Screen name="BemVindoFunc"component={BemVindoFunc} />
                    <Stack.Screen name="VisualizarFunc"component={VisualizarFunc} />
                </Stack.Navigator>
            </NavigationContainer> 
    )
}