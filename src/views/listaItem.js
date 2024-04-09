import React, { useEffect } from "react";
import { View, Text, FlatList, TouchableWithoutFeedback, StyleSheet, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import IconeAdd from "../componentes/botaoAdd"

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

  const DATA2 = [
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

                <FlatList
                data={DATA}
                renderItem={({item}) =>

                <View style={styles.itemLista}>

                    <TouchableWithoutFeedback onPress={() => navigation.navigate('ListaItem', {TituloLista: item.title})}>

                        <View style={{flex: 1, flexDirection: "row"}}>

                            <Text style={styles.titleLista}>{item.title}</Text>
                            <Text style={styles.qtdItens}> / 2 Pacotes</Text>

                        </View>

                    </TouchableWithoutFeedback>

                    <View style={styles.iconeLista}>

                        <Icon
                            name="cart-plus"
                            size={25}
                            color={"#65bbbb"}
                            />

                    </View>

                </View>

                }
                keyExtractor={item => item.id}
                />

                <View>

                    <Text style={styles.tituloListas}>

                        NO CARRINHO

                    </Text>

                </View>

                <FlatList
                data={DATA2}
                renderItem={({item}) =>

                <View style={styles.itemLista}>

                    <TouchableWithoutFeedback onPress={() => navigation.navigate('ListaItem', {TituloLista: item.title})}>

                        <View style={{flex: 1, flexDirection: "row"}}>

                            <Text style={styles.titleLista}>{item.title}</Text>
                            <Text style={styles.qtdItens}> / {item.qtdItens} Pacotes /</Text>
                            <Text style={[styles.qtdItens, {color: "#8FBC8F"}]}> R$18,58</Text>

                        </View>

                    </TouchableWithoutFeedback>

                    <View style={styles.iconeLista}>

                        <Icon
                            name="cart-minus"
                            size={25}
                            color={"#FF0000"}
                            />

                    </View>

                </View>

                }
                keyExtractor={item => item.id}
                />

            </ScrollView>

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
        color: "#DDD",
        alignContent: "center"
    
    },

    iconeLista: {

        alignItems: "flex-end",
        flex: 1,
        justifyContent: "center"
    
    }

})