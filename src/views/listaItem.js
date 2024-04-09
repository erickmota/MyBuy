import React, { useEffect } from "react";
import { View, Text, FlatList, TouchableWithoutFeedback, StyleSheet, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import IconeAdd from "../componentes/botaoAdd"

import config from "../config";

const DATA = [
    {
      id: '1',
      title: 'Macarrão',
      qtdItens: '5'
    },
    {
      id: '2',
      title: 'Miojo',
      qtdItens: '20'
    },
    {
      id: '3',
      title: 'Bife de berinjela',
      qtdItens: '4'
    },
    {
      id: '4',
      title: 'Leite',
      qtdItens: '16'
    },
    {
        id: '5',
        title: 'Pepino',
        qtdItens: '16'
    },
    {
        id: '6',
        title: 'Café',
        qtdItens: '16'
    },
    
  ];

  const DATA2 = [
    {
      id: '1',
      title: 'Macarrão',
      qtdItens: '5'
    },
    {
      id: '2',
      title: 'Miojo de feijão',
      qtdItens: '20'
    },
    {
      id: '3',
      title: 'Bife',
      qtdItens: '4'
    },
    {
      id: '4',
      title: 'Leite',
      qtdItens: '16'
    },
    {
        id: '5',
        title: 'Pepino',
        qtdItens: '16'
    },
    {
        id: '6',
        title: 'Café',
        qtdItens: '16'
    },
    
  ];

export default function ListaItem({route, navigation}){

    const {TituloLista} = route.params

    useEffect(() => {

        navigation.setOptions({ title: TituloLista });
        
    }, []);

    return(

        <View style={styles.container}>

            <View style={styles.areaListas}>

                <ScrollView>
                
                <View>

                    <Text style={styles.tituloListas}>

                        PARA PEGAR

                    </Text>

                </View>

                {DATA.map(item => (

                <View key={item.id} style={styles.itemLista}>

                    <View style={{flex: 3, flexDirection: "column"}}>

                        <Text style={styles.titleLista}>{item.title}</Text>

                        <View style={{flexDirection: "row"}}>

                            <Text style={styles.qtdItens}>2 Pacotes</Text>

                        </View>

                    </View>

                    <View style={[styles.iconeLista, {flex:1}]}>

                        <Icon
                            name="cart-plus"
                            size={25}
                            color={"#0ee031"}
                            />

                    </View>

                </View>

                ))}

                <View>

                    <Text style={styles.tituloListas}>

                        NO CARRINHO

                    </Text>

                </View>

                {DATA2.map(item => (

                <View key={item.id} style={styles.itemLista}>

                    <View style={{flex: 3, flexDirection: "column"}}>

                        <Text style={styles.titleLista}>{item.title}</Text>
                        
                        <View style={{flexDirection: "row"}}>

                            <Text style={styles.qtdItens}>{item.qtdItens} Pacotes /</Text>
                            <Text style={[styles.qtdItens, {color: "#8FBC8F"}]}> R$18,58</Text>

                        </View>

                    </View>

                    <View style={[styles.iconeLista, {flex: 1}]}>

                        <Icon
                            name="cart-minus"
                            size={25}
                            color={"#FF0000"}
                            />

                    </View>

                </View>

                ))}

            </ScrollView>

            <IconeAdd/>

            </View>

        </View>

    )

}

const styles = StyleSheet.create({

    container:{

        flex: 1

    },

    tituloListas: {

        color: "#747474",
        fontSize: 17,
        paddingHorizontal: 15,
        marginTop: 35,
        marginBottom: 5
    
    },

    areaListas:{

        flex: 9,
    
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

})