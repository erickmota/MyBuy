import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

/* Views */
import Listas from "./src/views/listas"
import AddLista from "./src/views/adicionar_lista"
import ListaItem from "./src/views/listaItem"
import AddItem from "./src/views/adicionar_item"
import Categorias from "./src/views/categorias"
import AddCategoria from "./src/views/adicionar_categoria"

import Menu from "./src/componentes/menu"

import config from "./src/config"

const stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  return (
    <Drawer.Navigator drawerContent={Menu}>
      <Drawer.Screen name="ListaItem" component={ListaItem}  options={{

        title: "Lista Item",
        headerTintColor: "#FFF",
        headerStyle: {

          backgroundColor: config.cor1,
          borderWidth: 0,

        }

      }} />
      <Drawer.Screen name="Listas" component={Listas} options={{

        title: "Minhas listas",
        headerTintColor: "#FFF",
        headerStyle: {

          backgroundColor: config.cor1,
          borderWidth: 0,

        }

      }} />
    </Drawer.Navigator>
  );
}

export default function App() {
  
  return (

    <NavigationContainer>
      <stack.Navigator initialRouteName='ListaItem'>

        <stack.Screen name="Drawer" component={DrawerNavigation} options={{ headerShown: false }} />

        {/* <stack.Screen name="Listas"  component={Listas} options={{

          title: "Minhas listas",
          headerTintColor: "#FFF",
          headerStyle: {

            backgroundColor: config.cor1,
            borderWidth: 0,

          }

        }} /> */}
        <stack.Screen name="Adicionar_lista" component={AddLista} options={{

          title: "Adicionar Lista",
          headerTintColor: "#FFF",
          headerStyle: {

            backgroundColor: config.cor1,
            borderWidth: 0,

          }

        }} />
        {/* <stack.Screen name="ListaItem" component={ListaItem} options={{

          title: "Lista Item",
          headerTintColor: "#FFF",
          headerStyle: {

            backgroundColor: config.cor1,
            borderWidth: 0,

          }

        }} /> */}
        <stack.Screen name="AddItem" component={AddItem} options={{

          title: "Adicionar item",
          headerTintColor: "#FFF",
          headerStyle: {

            backgroundColor: config.cor1,
            borderWidth: 0,

          }

        }} />
        <stack.Screen name="Categorias" component={Categorias} options={{

          title: "Gerenciar categorias",
          headerTintColor: "#FFF",
          headerStyle: {

            backgroundColor: config.cor1,
            borderWidth: 0,

          }

        }} />
        <stack.Screen name="Adicionar_categoria" component={AddCategoria} options={{

          title: "Nova categoria",
          headerTintColor: "#FFF",
          headerStyle: {

            backgroundColor: config.cor1,
            borderWidth: 0,

          }

        }} />
      </stack.Navigator>
    </NavigationContainer>

  );

}
