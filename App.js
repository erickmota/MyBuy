import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

/* Views */
import Listas from "./src/views/listas"
import Adicionar from "./src/views/adicionar"
import ListaItem from "./src/views/listaItem"

const stack = createStackNavigator();

export default function App() {
  
  return (

    <NavigationContainer>
      <stack.Navigator initialRouteName='Listas'>
        <stack.Screen name="Listas"  component={Listas} options={{

          title: "Minhas Listas",
          headerTintColor: "#FFF",
          headerStyle: {

            backgroundColor: "#498989",
            borderWidth: 0,

          }

        }} />
        <stack.Screen name="Adicionar" component={Adicionar} options={{

          title: "Adicionar Lista",
          headerTintColor: "#FFF",
          headerStyle: {

            backgroundColor: "#498989",
            borderWidth: 0,

          }

        }} />
        <stack.Screen name="ListaItem" component={ListaItem} options={{

          title: "Lista Item",
          headerTintColor: "#FFF",
          headerStyle: {

            backgroundColor: "#498989",
            borderWidth: 0,

          }

        }} />
      </stack.Navigator>
    </NavigationContainer>

  );

}
