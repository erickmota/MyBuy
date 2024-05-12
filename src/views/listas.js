import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/user';

import config from "../config"

import IconeMais from "../componentes/botaoAdd"

/* const DATA = [
  {
    id: '1',
    title: 'Mercado',
    qtdItens: '5'
  },
  {
    id: '2',
    title: 'Mecânico',
    qtdItens: '20'
  },
  {
    id: '3',
    title: 'Escola',
    qtdItens: '4'
  },
  {
    id: '4',
    title: 'Condomínio',
    qtdItens: '16'
  },
  
]; */

export default function App() {

  const [DATA, setData] = useState([]);

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

  const navigation = useNavigation();
  
  return (

    <View style={styles.container}>

      <View style={styles.espacoListas}>

        <View style={styles.areaListas}>

          <FlatList
          data={DATA}
          renderItem={({item}) =>

          <View style={styles.itemLista}>

            <TouchableWithoutFeedback onPress={() => navigation.navigate('ListaItem', {TituloLista: item.nome})}>

            <View style={{flex: 3, flexDirection: "column"}}>

              <Text style={styles.titleLista}>{item.nome}</Text>

              <View style={{flexDirection: "row"}}>

                <Text style={styles.qtdItens}>{item.qtdItens}- Itens</Text>

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

    fontSize: 20,
    
  },

  qtdItens:{

    fontSize: 15,
    color: config.corTextoSecundario,
    alignContent: "center",

  },

  iconeLista: {

    alignItems: "flex-end",
    flex: 1,
    justifyContent: "center"

  }

});
