import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../templates/Login'
import BemVindoFunc from '../templates/funcionario/BemVindoFuncionario'
import { NavigationContainer } from '@react-navigation/native';
import TelaHome from '../templates/TelaHome';
import VisualizarFunc from '../templates/funcionario/VisualizacaoFuncionarios';
import CadastroFunc from '../templates/funcionario/CadastroFunc';
import CadastroCli from '../templates/cliente/CadastroCli';
import VisualizarCli from '../templates/cliente/VisualizaçãoCliente';
import VeiwCli from '../templates/cliente/Viewcli';
import BemVindoCli from '../templates/cliente/BemVindoCliente';
import CadastroPets from '../templates/cliente/CadastroPets';
import CadastroProd from '../templates/produto/cadastroProduto'
import VisulizarProdFunc from '../templates/produto/VisualizarProdutosFunc'

export default function Routes(){
    const Stack = createNativeStackNavigator();
    return(     
            <NavigationContainer>
                <Stack.Navigator  initialRouteName="VisulizarProdFunc">
                    <Stack.Screen name = "TelaHome" component= {TelaHome}/>
                    <Stack.Screen name = "CadastroFunc"component= {CadastroFunc}/>
                    <Stack.Screen name="CadastroCli"component={CadastroCli} />
                    <Stack.Screen name="Login" component= {Login}/>
                    <Stack.Screen name="BemVindoFunc"component={BemVindoFunc} />
                    <Stack.Screen name="VisualizarFunc"component={VisualizarFunc} />
                    <Stack.Screen name="VisualizarCli"component={VisualizarCli} />
                    <Stack.Screen name="VeiwCli" component={VeiwCli}/>
                    <Stack.Screen name="BemVindoCli" component={BemVindoCli}/>
                    <Stack.Screen name="CadastroPets" component={CadastroPets}/>
                    <Stack.Screen name="CadastroProd" component={CadastroProd}/>
                    <Stack.Screen name="VisulizarProdFunc" component={VisulizarProdFunc}/>
                </Stack.Navigator>
            </NavigationContainer> 
    )
}