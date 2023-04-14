import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../templates/Login'
import Cadastro from '../templates/CadastroFunc'
import BemVindoFunc from '../templates/BemVindoFuncionario'
import { NavigationContainer } from '@react-navigation/native';
import TelaHome from '../templates/TelaHome';
import VisualizarFunc from '../templates/VisualizacaoFuncionarios';
import CadastroFunc from '../templates/CadastroFunc';
import CadastroCli from '../templates/CadastroCli';
import VisualizarCli from '../templates/VisualizaçãoCliente';
import Foto from '../templates/Foto';
import VeiwCli from '../templates/Viewcli';



export default function Routes(){
    const Stack = createNativeStackNavigator();
    return(     
            <NavigationContainer>
                <Stack.Navigator  initialRouteName="TelaHome">
                    <Stack.Screen name = "TelaHome" component= {TelaHome}/>
                    <Stack.Screen name = "CadastroFunc"component= {CadastroFunc}/>
                    <Stack.Screen name="CadastroCli"component={CadastroCli} />
                    <Stack.Screen name = "Login" component= {Login}/>
                    <Stack.Screen name="BemVindoFunc"component={BemVindoFunc} />
                    <Stack.Screen name="VisualizarFunc"component={VisualizarFunc} />
                    <Stack.Screen name="VisualizarCli"component={VisualizarCli} />
                    <Stack.Screen name="Foto" component={Foto}/>
                    <Stack.Screen name="VeiwCli" component={VeiwCli}/>
                </Stack.Navigator>
            </NavigationContainer> 
    )
}