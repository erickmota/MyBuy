import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/user';
import * as SQLite from "expo-sqlite"

import config from "../config"

import IconeMais from "../componentes/botaoAdd"

export default function App() {

  const [DATA, setData] = useState([]);

  /* Estados */
  const [dbs, setDbLocal] = useState(null);

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

  /* Contexto */
  const { DATAUser } = useContext(UserContext);

    /* Conexão com a API */
    useEffect(() => {
        fetch(`${config.URL_inicial_API}${DATAUser[0].id}/listas`)
        .then(response => response.json())
        .then(data => {
            setData(data.data);
        })
        .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
        });
    }, [DATA]);
  
  return (

    <View style={styles.container}>

      <View style={styles.espacoListas}>

        <View style={styles.areaListas}>

          <FlatList
          data={DATA}
          renderItem={({item}) =>

          <View style={styles.itemLista}>

            <TouchableWithoutFeedback onPress={() => navigation.navigate('ListaItem', {TituloLista: item.nome, id_lista: item.id})}>

            <View style={{flex: 3, flexDirection: "column"}}>

              <Text style={styles.titleLista}>{item.nome}</Text>

              <View style={{flexDirection: "row"}}>

                <Text style={styles.qtdItens}>{item.qtd_produtos} - Produtos</Text>

              </View>

            </View>

            </TouchableWithoutFeedback>

            <View style={[styles.iconeLista, {flex:1}]}>

              <Icon
                name="note-edit-outline"
                size={25}
                color={config.cor2}
                />

            </View>

          </View>

          }
          keyExtractor={item => item.id}
          />          

        </View>

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

  }

});
