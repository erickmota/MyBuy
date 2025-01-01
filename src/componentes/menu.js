import React, {useContext, useEffect, useState} from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import * as SQLite from "expo-sqlite"
import { UserContext } from '../context/user';

import config from "../config";

/* Menu drawer do aplicativo */
export default function Menu(){   

    const navigation = useNavigation();

    const { logout } = useContext(UserContext); 

    const [db, setDbLocal] = useState(null);

    const [sub_meus_itens, setSubMeusItens] = useState([false, 1, "menu-down", 0]);

    /* Contexto */
    const { DATAUser } = useContext(UserContext);

    useEffect(()=>{

        try {

        const db = SQLite.openDatabase("mybuy.db");
        setDbLocal(db);

        console.log("Sucesso ao abrir o bancos");
        
        } catch (error) {
        
        console.error("conexão com o banco de dados local, falhou", error);
    
        }

    },[])

    const define_meus_itens = () => {

        if(sub_meus_itens[0] == false){

            setSubMeusItens([true, 0, "menu-up", 1]);

        }else{

            setSubMeusItens([false, 1, "menu-down", 0]);

        }

    }

    return(

        <View style={styles.container}>

            <View style={styles.parte1}>

                <Icon
                    name="view-list"
                    style={styles.logo}
                    size={35}
                    color={"white"}
                    />

                <Text style={styles.textPtRoxa}>

                    My Buy

                </Text>

            </View>

            <View style={styles.parte2}>

                <TouchableWithoutFeedback onPress={() => {navigation.navigate("Perfil")}}>

                    <View style={styles.areaItemMenu}>

                        {DATAUser[0].foto_url && DATAUser[0].foto_url != "null" ? (

                            <Image style={styles.imgUsuario} source={{ uri: `${config.URL_inicial_API}${DATAUser[0].foto_url}` }} />

                        ):(

                            <Image style={styles.imgUsuario} source={{ uri: `${config.Foto_usuario_nulo}` }} />

                        )}

                        <Text style={styles.itemMenu}>

                            {DATAUser[0].nome}

                        </Text>

                    </View>

                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => {[navigation.navigate("Listas"), setSubMeusItens([false, 1, "menu-down", 0])]}}>

                    <View style={styles.areaItemMenu}>

                        <Icon
                            name="view-list"
                            style={[styles.iconMenu, {marginLeft: 3, marginRight: 22}]}
                            size={27}
                            color={"#CCC"}
                            />

                        <Text style={styles.itemMenu}>

                            Listas

                        </Text>

                    </View>

                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => {[navigation.navigate("MinhasCompras"), setSubMeusItens([false, 1, "menu-down", 0])]}}>

                    <View style={styles.areaItemMenu}>

                        <Icon
                            name="cart"
                            style={styles.iconMenu}
                            size={25}
                            color={"#CCC"}
                            />

                        <Text style={styles.itemMenu}>

                            Compras

                        </Text>

                    </View>

                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => {define_meus_itens()}}>

                    <View style={[styles.areaItemMenu, {borderBottomWidth: sub_meus_itens[1]}]}>

                        <Icon
                            name={sub_meus_itens[2]}
                            style={[styles.iconMenu, {marginLeft: 3, marginRight: 18}]}
                            size={30}
                            color={"#CCC"}
                            />

                        <Text style={styles.itemMenu}>

                            Meus registros

                        </Text>

                    </View>

                </TouchableWithoutFeedback>

                {sub_meus_itens[0] && (

                    <View style={styles.itens_meus_itens}>

                        <TouchableWithoutFeedback onPress={() => {navigation.navigate("Categorias")}}>

                            <View style={[styles.areaItemMenu, {borderBottomWidth: 0}]}>

                                <Icon
                                    name="list-status"
                                    style={styles.iconMenu}
                                    size={25}
                                    color={"#CCC"}
                                    />

                                <Text style={styles.itemMenu}>

                                    Categorias

                                </Text>

                            </View>

                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => {navigation.navigate("MeusProdutos")}}>

                            <View style={[styles.areaItemMenu, {borderBottomWidth: 0}]}>

                                <Icon
                                    name="shopping"
                                    style={styles.iconMenu}
                                    size={25}
                                    color={"#CCC"}
                                    />

                                <Text style={styles.itemMenu}>

                                    Produtos

                                </Text>

                            </View>

                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => {navigation.navigate("MeusMercados")}}>

                            <View style={[styles.areaItemMenu, {borderBottomWidth: 0}]}>

                                <Icon
                                    name="store"
                                    style={[styles.iconMenu, {marginLeft: 4, marginRight: 19}]}
                                    size={27}
                                    color={"#CCC"}
                                    />

                                <Text style={styles.itemMenu}>

                                    Mercados

                                </Text>

                            </View>

                        </TouchableWithoutFeedback>

                    </View>

                )}

                <TouchableWithoutFeedback onPress={() => {[navigation.navigate("Despesas"), setSubMeusItens([false, 1, "menu-down", 0])]}}>

                    <View style={[styles.areaItemMenu, {borderTopWidth: sub_meus_itens[3]}]}>

                        <Icon
                            name="chart-bar"
                            style={styles.iconMenu}
                            size={25}
                            color={"#d6b94f"}
                            />

                        <Text style={styles.itemMenu}>

                            Despesas

                        </Text>

                    </View>

                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => {[navigation.navigate("Categorias"), setSubMeusItens([false, 1, "menu-down", 0])]}}>

                    <View style={styles.areaItemMenu}>

                        <Icon
                            name="cog"
                            style={styles.iconMenu}
                            size={25}
                            color={"#CCC"}
                            />

                        <Text style={styles.itemMenu}>

                            Configurações

                        </Text>

                    </View>

                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={()=>{[logout(), navigation.navigate("Login"), setSubMeusItens([false, 1, "menu-down", 0])]}}>

                    <View style={styles.areaItemMenu}>

                        <Icon
                            name="information"
                            style={styles.iconMenu}
                            size={25}
                            color={"#CCC"}
                            />

                        <Text style={styles.itemMenu}>

                            Sobre

                        </Text>

                    </View>

                </TouchableWithoutFeedback>

            </View>

            <View style={styles.parte3}>

                <Text style={{color: "#CCC"}}>

                    Alfa

                </Text>

            </View>

        </View>

    )

}

const styles = StyleSheet.create({

    container:{

        flex: 1

    },

    parte1:{

        flex: 2,
        backgroundColor: config.cor2,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"

    },

    parte2:{

        flex: 8,
        marginTop: 20,
        marginHorizontal: 15
        
    },

    textPtRoxa:{

        color: "white",
        fontSize: 20,
        fontWeight: "500"

    },

    itemMenu:{

        fontSize: 15

    },

    areaItemMenu:{

        paddingTop: 15,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        paddingBottom: 15,
        borderColor: "#DDD"

    },

    iconMenu:{

        marginRight: 20,
        marginLeft: 5,

    },

    parte3:{

        flex: 3,
        marginLeft: 25,
        justifyContent: "flex-end",
        marginBottom: 20

    },

    logo:{

        marginLeft: 20,
        marginRight: 20

    },

    imgUsuario:{

        width: 35,
        height: 35,
        borderRadius: 50,
        marginRight: 20,
        marginLeft: 5,

    },

    itens_meus_itens:{

        paddingLeft: 20,
        marginTop: -10

    }

})