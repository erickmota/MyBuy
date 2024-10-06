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

    const [db, setDbLocal] = useState(null);

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

    /* Removendo o banco de dados e deslogando o usuário */
    function sair(){

        db.transaction((tx) => {
            tx.executeSql(
                "DROP TABLE IF EXISTS usuarios",
                [],
                ()=>{

                console.log("Tabela excluída com sucesso");

                },
                (_, error)=>{

                console.error("Erro ao excluir tabela", error);

                }
            );
        });

        navigation.navigate("Login");

    }

    const log = () => {

        console.log(config.Foto_usuario_nulo);

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

                <TouchableWithoutFeedback onPress={() => {navigation.navigate("Listas")}}>

                    <View style={styles.areaItemMenu}>

                        {DATAUser[0].foto_url != "null" ? (

                            <Image style={styles.imgUsuario} source={{ uri: `${DATAUser[0].foto_url}` }} />

                        ):(

                            <Image style={styles.imgUsuario} source={{ uri: `${config.Foto_usuario_nulo}` }} />

                        )}

                        <Text style={styles.itemMenu}>

                            {DATAUser[0].nome}

                        </Text>

                    </View>

                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => {navigation.navigate("Listas")}}>

                    <View style={styles.areaItemMenu}>

                        <Icon
                            name="view-list"
                            style={styles.iconMenu}
                            size={25}
                            color={"#CCC"}
                            />

                        <Text style={styles.itemMenu}>

                            Minhas listas

                        </Text>

                    </View>

                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => {navigation.navigate("MinhasCompras")}}>

                    <View style={styles.areaItemMenu}>

                        <Icon
                            name="shopping"
                            style={styles.iconMenu}
                            size={25}
                            color={"#CCC"}
                            />

                        <Text style={styles.itemMenu}>

                            Minhas compras

                        </Text>

                    </View>

                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => log()}>

                    <View style={styles.areaItemMenu}>

                        <Icon
                            name="chart-bar"
                            style={styles.iconMenu}
                            size={25}
                            color={"#d6b94f"}
                            />

                        <Text style={styles.itemMenu}>

                            Minhas despesas

                        </Text>

                    </View>

                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => {navigation.navigate("Categorias")}}>

                    <View style={styles.areaItemMenu}>

                        <Icon
                            name="list-status"
                            style={styles.iconMenu}
                            size={25}
                            color={"#CCC"}
                            />

                        <Text style={styles.itemMenu}>

                            Gerenciar categorias

                        </Text>

                    </View>

                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => {navigation.navigate("Categorias")}}>

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

                <TouchableWithoutFeedback onPress={()=>{sair()}}>

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

})