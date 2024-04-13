import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableNativeFeedback } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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

    useEffect(() => {

        if(route.params){

            const {TituloLista} = route.params

            navigation.setOptions({ title: TituloLista });

        }else{

            navigation.setOptions({ title: "Mercado" });

        }
        
    }, [route.params, navigation]);

    return(

        <View style={styles.container}>

            <StatusBar backgroundColor={config.cor1} style="light" />

            <ScrollView>

                <View style={styles.areaListas}>

                    <View style={{backgroundColor: "#FFF"}}>
                    
                        <View>

                            <Text style={styles.tituloListas}>

                                Frios

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

                            <Text style={[styles.tituloListas, styles.tituloListasSeguir]}>

                                Limpeza

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

                    </View>

                    <View style={styles.areaCarrinho}>

                        <View>

                            <Text style={[styles.tituloListas, styles.tituloListasCarrinho]}>

                                SEU CARRINHO

                            </Text>

                        </View>

                        {DATA2.map(item => (

                        <View key={item.id} style={styles.itemLista}>

                            <View style={{flex: 3, flexDirection: "column"}}>

                                <Text style={[styles.titleLista, styles.itemMarcado]}>{item.title}</Text>
                                
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

                    </View>

                </View>

            </ScrollView>

            <View>

                <IconeAdd caminho={"AddItem"}/>

            </View>

            <TouchableNativeFeedback>

            <View style={styles.containerBtnComprar}>

                <Icon
                    name="cart-arrow-right"
                    size={50}
                    color={"#FFF"}
                    />

                <Text style={styles.textBtnComprar}>

                    Registrar{"\n"}
                    <Text style={{fontSize: 20, fontWeight: "bold"}}>R$189,90</Text>

                </Text>

            </View>

            </TouchableNativeFeedback>

        </View>

    )

}

const styles = StyleSheet.create({

    container:{

        flex: 1,
        backgroundColor: "#f8eaff"

    },

    tituloListas: {

        color: config.cor2,
        fontSize: 17,
        paddingHorizontal: 15,
        marginTop: 20,
        marginBottom: 5,
        fontWeight: "bold"
    
    },

    tituloListasSeguir:{

        marginTop: 35

    },
    
    tituloListasCarrinho:{

        color: config.cor1

    }, 

    areaListas:{

        flex: 9,
        paddingBottom: 80
    
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

    itemMarcado:{

        textDecorationLine: "line-through",

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
    
    },

    areaCarrinho:{

        backgroundColor: "#f8eaff",
        borderTopWidth: 1,
        marginTop: -1,
        borderColor: config.cor1

    },

    containerInfo:{

        backgroundColor: config.cor2,
        height: 30,
        flexDirection: "row",

    },

    containerBtnComprar:{

        backgroundColor: config.cor1,
        height: 60,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center"

    },

    textBtnComprar:{

        color: "#FFF",
        fontWeight: "300",
        fontSize: 15,
        paddingRight: 5,
        textAlign: "center"

    },

})