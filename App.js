import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import FlashMessage from "react-native-flash-message";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
import Minhas_compras_itens from "./src/views/minhas_compras_itens"
import Historico_lista from "./src/views/historico_lista"
import Tela_loading from "./src/views/tela_loading.js"
import Meus_produtos from "./src/views/meus_produtos.js"
import Meus_mercados from "./src/views/meus_mercados.js"
import Perfil from "./src/views/perfil.js"
/* Despesas */
import Despesas_categorias from "./src/views/pg-despesas/categoria.js"
import Despesas_mercados from "./src/views/pg-despesas/mercados.js"
import Despesas_produtos from "./src/views/pg-despesas/produtos.js"
import Despesas_gerais from "./src/views/pg-despesas/geral.js"

/* Componentes */
import Menu from "./src/componentes/menu"

/* Contexto */
import { UserProvider } from './src/context/user';

import config from "./src/config"
import { View } from 'react-native-web';

const stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const theme = {
  ...DefaultTheme, // ou DarkTheme
  colors: {
    ...DefaultTheme.colors,
    background: 'white', // Defina o fundo explicitamente
    surface: 'white', // ou qualquer cor que preferir
  },
};

/* Menu Página despesas */
function Tabs_despesas() {

  return (

    <Tab.Navigator
      initialRouteName="Geral"
      detachInactiveScreens={false}
      screenOptions={{
        tabBarActiveTintColor: config.cor2, // Cor do ícone ativo
        tabBarInactiveTintColor: '#777', // Cor do ícone inativo
        tabBarStyle: { 
          backgroundColor: '#EEE', // Cor de fundo da barra
          height: 60,
          paddingBottom: 5
        }
      }}
    >
      <Tab.Screen
        name="Geral"
        component={Despesas_gerais}
        options={{
          tabBarLabel: "Geral",
          tabBarIcon: ({ color }) => (
            <Icon name="chart-areaspline" color={color} size={28} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Categorias"
        component={Despesas_categorias}
        options={{
          tabBarLabel: "Categorias",
          tabBarIcon: ({ color }) => (
            <Icon name="format-list-bulleted-square" color={color} size={30} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Mercados"
        component={Despesas_mercados}
        options={{
          tabBarLabel: 'Mercados',
          tabBarIcon: ({ color }) => (
            <Icon name="store" color={color} size={32} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Produtos"
        component={Despesas_produtos}
        options={{
          tabBarLabel: 'Produtos',
          tabBarIcon: ({ color }) => (
            <Icon name="shopping" color={color} size={28} />
          ),
          headerShown: false
        }}
      />
    </Tab.Navigator>

  );

}

/* Menu lateral */
function DrawerNavigation() {

  return (

    <Drawer.Navigator drawerContent={Menu} initialRouteName="Listas"
    detachInactiveScreens={false}>

      <Drawer.Screen name="ListaItem" component={ListaItem}  options={{

        title: "Lista Item",
        headerTintColor: "#FFF",
        headerStyle: {

          backgroundColor: config.cor1,
          borderWidth: 0,

        }

      }} />

      <Drawer.Screen name="Perfil" component={Perfil}  options={{

        title: "Meu Perfil",
        headerTintColor: "#FFF",
        headerStyle: {

          backgroundColor: config.cor1,
          borderWidth: 0,

        }

      }} />

      <Drawer.Screen name="Categorias" component={Categorias} options={{

        title: "Minhas categorias",
        headerTintColor: "#FFF",
        headerStyle: {

          backgroundColor: config.cor1,
          borderWidth: 0,

        }

      }} />

      <Drawer.Screen name="MeusProdutos" component={Meus_produtos}  options={{

        title: "Meus produtos",
        headerTintColor: "#FFF",
        headerStyle: {

          backgroundColor: config.cor1,
          borderWidth: 0,

        }

      }} />

      <Drawer.Screen name="MeusMercados" component={Meus_mercados}  options={{

        title: "Meus mercados",
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

      <Drawer.Screen name="Despesas" component={Tabs_despesas} options={{

        title: "Minhas despesas",
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

    <PaperProvider theme={theme}>

      <UserProvider>

        <NavigationContainer>

          <stack.Navigator initialRouteName='Tela_loading'>

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

            <stack.Screen name="Tela_loading" component={Tela_loading} options={{

            headerShown: false

            }} />

            <stack.Screen name="Editar_lista" component={Editar_lista} options={{

              title: "Configurações da lista",
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

            <stack.Screen name="Adicionar_categoria" component={AddCategoria} options={{

              title: "Nova categoria",
              headerTintColor: "#FFF",
              headerStyle: {

                backgroundColor: config.cor1,
                borderWidth: 0,

              }

            }} />

            <stack.Screen name="Minhas_compras_itens" component={Minhas_compras_itens} options={{

            title: "Dados da compra",
            headerTintColor: "#FFF",
            headerStyle: {

              backgroundColor: config.cor1,
              borderWidth: 0,

            }

            }} />

            <stack.Screen name="Historico_lista" component={Historico_lista} options={{

            title: "Histórico da lista",
            headerTintColor: "#FFF",
            headerStyle: {

              backgroundColor: config.cor1,
              borderWidth: 0,

            }

            }} />

          </stack.Navigator>

        </NavigationContainer>

        {<FlashMessage
          position="top"
        />}

      </UserProvider>

    </PaperProvider>

  );

}
