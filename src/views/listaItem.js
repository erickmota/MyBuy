import React, { useEffect, useContext, useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableNativeFeedback, Image } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserContext } from '../context/user';
import { useFocusEffect } from '@react-navigation/native';

import IconeAdd from "../componentes/botaoAdd"

import config from "../config";

export default function ListaItem({route, navigation}){

    const {id_lista} = route.params;

    const [DATA, setData] = useState([]);
    const [DATA_carrinho, setCarrinho] = useState([]);

    /* Contexto */
    const { DATAUser } = useContext(UserContext);

    const carregar_API = useCallback(()=>{

        if(DATAUser){

            /* API produtos e categorias */
            fetch(`${config.URL_inicial_API}${DATAUser[0].id}/categorias`)
            .then(response => response.json())
            .then(async data => {
                
                let categoriesWithProducts = await Promise.all(data.data.map(async category => {
                    const response = await fetch(`${config.URL_inicial_API}${DATAUser[0].id}/produtos/${id_lista}/${category.id}`);
                    const productsData = await response.json();

                    /* setProTamanho(productsData); */

                    return {
                        ...category,
                        produtos: productsData.data
                    };

                }));

                console.log(categoriesWithProducts);
                console.log("FIM");

                setData(categoriesWithProducts);

            })
            .catch(error => {
                console.error('Erro ao buscar dados da API:', error);
            });

            /* API Produtos no carrinho */
            fetch(`${config.URL_inicial_API}${DATAUser[0].id}/produtos_carrinho/${id_lista}`)
            .then(response => response.json())
            .then(data => {
                setCarrinho(data.data);
            })
            .catch(error => {
                console.error('Erro ao buscar dados da API dos carrinhos:', error);
            });

        }

    }, [DATAUser, id_lista])

    const atualiza_nome = ()=>{

        if(route.params){

            const {TituloLista} = route.params

            navigation.setOptions({ title: TituloLista });

        }else{

            navigation.setOptions({ title: "Mercado" });

        }

    }

    useFocusEffect(
        useCallback(() => {

            setData([]);
            setCarrinho([]);

            atualiza_nome();

            carregar_API();
    
          return () => {

          };
        }, [carregar_API])
    );

    return(

        <View style={styles.container}>

            <StatusBar backgroundColor={config.cor1} style="light" />

            <ScrollView>

                <View style={styles.areaListas}>

                    <View style={{backgroundColor: "#FFF"}}>
 
                        {DATA && DATA.length > 0 ? (

                            DATA.map(item=>(

                                Array.isArray(item.produtos) && item.produtos.length > 0 && (

                                    <View key={item.id}>

                                        <Text style={styles.tituloListas}>

                                            {item.nome}

                                        </Text>

                                        {

                                            item.produtos.map(prod=>(

                                                <View key={prod.id} style={styles.itemLista}>

                                                    <View style={styles.areaFoto}>

                                                        {prod.url !== null ? (

                                                            /* Foto que aparecerá caso o item tiver uma foto */
                                                            <Image style={styles.imgProduto} source={{ uri: `${prod.url}` }} />

                                                        ):(

                                                            /* Foto caso o item não tiver uma foto */
                                                            <Image style={styles.imgProduto} source={{ uri: `${config.Foto_prod_nulo}` }} />

                                                        )}

                                                    </View>

                                                    <View style={{flex: 3, flexDirection: "column"}}>

                                                        <Text style={styles.titleLista}>
                                                            
                                                            {prod.nome}
                                                            
                                                        </Text>

                                                        <View style={{flexDirection: "row"}}>

                                                            <Text style={styles.qtdItens}>
                                                                
                                                                2 Pacotes
                                                                
                                                            </Text>

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

                                            ))

                                        }

                                    </View>

                                )

                            ))

                        ):(

                            <View style={styles.itemVazio}>

                            </View>

                        )}

                    </View>

                    {DATA_carrinho && DATA_carrinho.length > 0 ? (

                        <View style={styles.areaCarrinho}>

                            <View>

                                <Text style={[styles.tituloListas, styles.tituloListasCarrinho]}>

                                    SEU CARRINHO

                                </Text>

                            </View>

                            {/* Carrinho */}
                            {DATA_carrinho.map(item => (

                                <View key={item.id} style={styles.itemLista}>

                                    <View style={styles.areaFoto}>

                                        {item.url !== null ? (

                                            /* Foto que aparecerá caso o item tiver uma foto */
                                            <Image style={styles.imgProduto} source={{ uri: `${item.url}` }} />

                                        ):(

                                            /* Foto caso o item não tiver uma foto */
                                            <Image style={styles.imgProduto} source={{ uri: `${config.Foto_prod_nulo}` }} />

                                        )}

                                    </View>

                                    <View style={{flex: 3, flexDirection: "column"}}>

                                        <Text style={[styles.titleLista, styles.itemMarcado]}>
                                            
                                            {item.nome}
                                            
                                        </Text>
                                        
                                        <View style={{flexDirection: "row"}}>

                                            <Text style={styles.qtdItens}>
                                                
                                                3 Pacotes /
                                                
                                            </Text>

                                            <Text style={[styles.qtdItens, {color: "#8FBC8F"}]}>
                                                
                                                R$18,58
                                                
                                            </Text>

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

                    ):(

                        <View style={styles.itemVazio}>

                            <Text style={styles.textItemVazio}>

                                Nenhum produto por aqui!

                            </Text>

                        </View>

                    )}

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

        fontSize: 18,
        
    },

    itemMarcado:{

        textDecorationLine: "line-through",

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

    imgProduto:{

        width: 45,
        height: 45,
        borderRadius: 50,

    },

    areaFoto:{

        marginRight: 15

    },

    itemVazio:{

        marginVertical: 30

    },

    textItemVazio:{

        fontSize: 15,
        color: "#AAA",
        textAlign: "center"

    }

})