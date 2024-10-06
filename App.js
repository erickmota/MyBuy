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
import login from "./src/views/login"
import Cadastro from "./src/views/cadastro"
import Carregar_login from "./src/views/carregar_login"
import Editar_lista from "./src/views/editar_lista"
import Editar_Item from "./src/views/editar_item"
import Minhas_compras from "./src/views/minhas_compras"

/* Componentes */
import Menu from "./src/componentes/menu"

/* Contexto */
import { UserProvider } from './src/context/user';

import config from "./src/config"
import { View } from 'react-native-web';

const stack = createStackNavigator();
const Drawer = createDrawerNavigator();

/* Menu lateral */
function DrawerNavigation() {

  return (

    <Drawer.Navigator drawerContent={Menu} initialRouteName="Listas">

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

      <Drawer.Screen name="MinhasCompras" component={Minhas_compras} options={{

      title: "Minhas compras",
      headerTintColor: "#FFF",
      headerStyle: {

        backgroundColor: config.cor1,
        borderWidth: 0,

      }

      }} />

    </Drawer.Navigator>
  );
}

/* Menu Stack */
export default function App() {
  
  return (

    <UserProvider>

      <NavigationContainer>

        <stack.Navigator initialRouteName='Login'>

          <stack.Screen name="Drawer" component={DrawerNavigation} options={{ headerShown: false }} />

          <stack.Screen name="Login" component={login} options={{

            headerShown: false

          }} />

          <stack.Screen name="Cadastro" component={Cadastro} options={{

            headerShown: false

          }} />

          <stack.Screen name="Carregar_login" component={Carregar_login} options={{

            headerShown: false

          }} />

          <stack.Screen name="Editar_lista" component={Editar_lista} options={{

            title: "Informações da lista",
            headerTintColor: "#FFF",
            headerStyle: {

              backgroundColor: config.cor1,
              borderWidth: 0,

            }

          }} />

          <stack.Screen name="Adicionar_lista" component={AddLista} options={{

            title: "Nova lista",
            headerTintColor: "#FFF",
            headerStyle: {

              backgroundColor: config.cor1,
              borderWidth: 0,

            }

          }} />

          <stack.Screen name="AddItem" component={AddItem} options={{

            title: "Adicionar produto",
            headerTintColor: "#FFF",
            headerStyle: {

              backgroundColor: config.cor1,
              borderWidth: 0,

            }

          }} />

          <stack.Screen name="Editar_item" component={Editar_Item} options={{

            title: "Editar produto",
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

    </UserProvider>

  );

}
