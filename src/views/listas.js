import React, {useState, useEffect, useContext, useCallback} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableWithoutFeedback, TouchableOpacity, StatusBar, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/user';
import { useFocusEffect } from '@react-navigation/native';
import * as SQLite from "expo-sqlite"
import FlashMessage from 'react-native-flash-message';
import { showMessage, hideMessage } from 'react-native-flash-message';

import config from "../config"

import IconeMais from "../componentes/botaoAdd"

export default function App() {

  const [DATA, setData_listas] = useState([]);
  const [load_API, setLoadApi] = useState();

  /* Estados */
  const [dbs, setDbLocal] = useState(null);

  /* Contexto */
  const { DATAUser } = useContext(UserContext);

  const navigation = useNavigation();

  /* Abrindo o Banco de dados */
  useEffect(()=>{

      try {

      const dbs = SQLite.openDatabase("mybuy.db");
      setDbLocal(dbs);

      console.log("Sucesso ao abrir o banco");
      
      } catch (error) {
      
      console.error("conexão com o banco de dados local, falhou", error);
  
      }

  },[])

  useEffect(()=>{

    if(dbs){

      dbs.transaction((tx) => {
        tx.executeSql(
            "SELECT * FROM usuarios WHERE ultima_lista != 0",
            [],
            (_, { rows }) => {
                const userData = [];
                for (let i = 0; i < rows.length; i++) {
                    userData.push(rows.item(i));
                }

                if(userData.length > 0){

                  navigation.navigate("ListaItem", {id_lista: userData[0].ultima_lista});

                }

                console.log(userData);
            },
            /* (_, error) => {
                console.error("-Ultima lista não existe:", error);
            } */
        );
      });

    }

  },[dbs])

  /* Conexão com a API */
  const carregar_API = useCallback(() => {

    setLoadApi(true);

    fetch(`${config.URL_inicial_API}${DATAUser[0].id}/listas`)
      .then(response => response.json())
      .then(data => {
          setData_listas(data.data);
          hideMessage();
          setLoadApi(false);
      })
      .catch(error => {
          console.error('Erro ao buscar dados da API:', error);
      });

  }, [DATAUser]);

  useFocusEffect(

      useCallback(() => {

          carregar_API();

        return () => {

          setLoadApi(true);
          setData_listas([])

        };
        
      }, [DATAUser])

  );
  
  return (

    <View style={styles.container}>

      <StatusBar backgroundColor={config.cor1} style="light" />

      <View style={styles.espacoListas}>

        {load_API == true ? (

          <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>

            <Image style={styles.gif_load} source={require("../img/carregando.gif")} />

          </View>

        ):(

          DATA == false ? (

            <View style={{alignItems: "center"}}>

              <Text style={{color: config.corTextoSecundario, marginTop: 50}}>

                Crie uma lista para começar!

              </Text>

            </View>

          ):(

            <View style={styles.areaListas}>

              <FlatList
              data={DATA}
              renderItem={({item}) =>

              <View style={styles.itemLista}>

                <TouchableOpacity

                  activeOpacity={config.opacity_btn}
                  onPress={() => navigation.navigate('ListaItem', {TituloLista: item.nome, id_lista: item.id})}
                  onLongPress={() => navigation.navigate('Editar_lista', {TituloLista: item.nome, id_lista: item.id, origem: "listas"})}
                  
                >

                <View style={{flex: 3, flexDirection: "column"}}>

                  <Text style={styles.titleLista}>{item.nome}</Text>

                  <View style={{flexDirection: "row"}}>

                    <Text style={styles.qtdItens}>{item.qtd_produtos} - Produtos</Text>

                    {item.qtd_usuarios > 1 && (

                      <View style={{flexDirection: "row"}}>

                        <Text style={styles.barraIcon}>

                        -

                        </Text>

                        <Icon
                        name="account-multiple"
                        size={21}
                        style={styles.iconShare}
                        />


                      </View>

                    )}

                  </View>

                </View>

                </TouchableOpacity>

                <View style={[styles.iconeLista, {flex:1}]}>

                  <TouchableWithoutFeedback onPress={() => navigation.navigate('Editar_lista', {TituloLista: item.nome, id_lista: item.id, origem: "listas"})}>

                    <Icon
                      name="pencil-box"
                      size={28}
                      color={config.cor2}
                      />

                  </TouchableWithoutFeedback>

                </View>

              </View>

              }
              keyExtractor={item => item.id}
              />          

            </View>

          )

        )}

        <IconeMais caminho={"Adicionar_lista"}/>

      </View>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {

    flex:1,

  },

  espacoListas: {

    backgroundColor: "#FFF",
    flex: 9,

  },

  areaListas:{

    flex: 8,

  },

  itemLista: {

    marginHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#CCC",
    flexDirection: "row"

  },

  titleLista: {

    fontSize: 17,
    
  },

  qtdItens:{

    fontSize: 14,
    color: config.corTextoSecundario,
    alignContent: "center",

  },

  iconeLista: {

    alignItems: "flex-end",
    flex: 1,
    justifyContent: "center"

  },

  iconShare:{

    left: 10,
    color: "#CCC",
    top: 1

  },

  barraIcon:{

    left: 5,
    color: config.corTextoSecundario

  },

  /* ***** */

  gif_load:{

    width: 70,
    height: 70

  }

});
