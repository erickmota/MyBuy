import React from "react";
import { Text, View, StyleSheet, FlatList, TouchableWithoutFeedback } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import config from "../config"

import IconeAdd from "../componentes/botaoAdd"

const DATA = [
    {
      id: '1',
      title: 'Frios',
      qtdItens: '5'
    },
    {
      id: '2',
      title: 'Limpeza',
      qtdItens: '20'
    },
    {
      id: '3',
      title: 'Bebidas',
      qtdItens: '4'
    },
    {
      id: '4',
      title: 'Frutas',
      qtdItens: '16'
    },
    {
        id: '5',
        title: 'Carnes',
        qtdItens: '16'
    },
    {
        id: '6',
        title: 'Legumes e verduras',
        qtdItens: '16'
    },
    {
        id: '7',
        title: 'Higiene pessoal',
        qtdItens: '16'
    },
    
  ];

export default function Categorias(){

    return (

        <View style={styles.container}>

            <FlatList
            data={DATA}
            renderItem={({item}) =>

            <View style={styles.itemLista}>

                <TouchableWithoutFeedback onPress={() => navigation.navigate('ListaItem', {TituloLista: item.title})}>

                <View style={{flex: 3, flexDirection: "column"}}>

                <Text style={styles.titleLista}>
                    
                    {item.title}
                    
                </Text>

                </View>

                </TouchableWithoutFeedback>

                <View style={[styles.iconeLista, {flex:1}]}>

                <Icon
                    name="delete-sweep"
                    size={25}
                    color={config.cor2}
                    />

                </View>

            </View>

            }
            keyExtractor={item => item.id}
            /> 

            <IconeAdd caminho={"Adicionar_categoria"}/>

        </View>

    )

}

const styles = StyleSheet.create({

    container:{

        flex: 1

    },

    itemLista: {

        marginHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: "#CCC",
        flexDirection: "row"
    
      },
    
      titleLista: {
    
        fontSize: config.tamanhoTextosInputs,
        
      },
    
      iconeLista: {
    
        alignItems: "flex-end",
        flex: 1,
        justifyContent: "center"
    
      }

})