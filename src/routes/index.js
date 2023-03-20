import {createNativeStackNavigator} from 'react-native/native-stack'
import { createStackNavigator } from '@react-navigation/native-stack';



import Login from '../templates/login'
import Cadastro from './cadastro'

const Stack = createStackNavigator();

export default function Routes(){
    return(
        <Stack.Navigator>
            <Stack.screen
                name = "Login"
                component= {Login}
            />
            <Stack.screen
                name = "Cadastro"
                component= {Cadastro}
            />
        </Stack.Navigator>
    )
}