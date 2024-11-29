import React, {useState, useEffect, useContext} from "react"
import { View, Text, StyleSheet, TextInput, useWindowDimensions, TouchableNativeFeedback, StatusBar, Image} from "react-native"
import { useNavigation } from '@react-navigation/native';
import * as SQLite from "expo-sqlite"
import { UserContext } from '../context/user';

import Icon from 'react-native-vector-icons/Ionicons';

import config from "../config";

export default function Tela_loading(){

    const { login } = useContext(UserContext);

    const navigation = useNavigation();

    const [db, setDbLocal] = useState(null);

    /* Abrindo o Banco de dados */
    useEffect(()=>{

        try {

        const db = SQLite.openDatabase("mybuy.db");
        setDbLocal(db);

        console.log("Sucesso ao abrir o banco");
        
        } catch (error) {
        
        console.error("conexão com o banco de dados local, falhou", error);
    
        }

    },[])

    useEffect(()=>{

        if (db) {
          db.transaction((tx) => {
            tx.executeSql(
              "CREATE TABLE IF NOT EXISTS usuarios (id INTEGER, nome VARCHAR, token VARCHAR, foto_url VARCHAR, ultima_lista INTEGER)",
              [],
              ()=>{
    
                console.log("Tabela criada com sucesso");
    
              },
              (_, error)=>{
    
                console.error("Erro ao criar uma tabela", error);
    
              }
            );
          });
        }

        ver_login()
    
    },[db])

    function ver_login() {

        if(db){

            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM usuarios",
                    [],
                    (_, { rows }) => {
                        const userData = [];
                        for (let i = 0; i < rows.length; i++) {
                            userData.push(rows.item(i));
                        }
                        
                        if(userData.length > 0){
    
                            chama_login();
    
                        }else{

                            navigation.navigate("Login");

                        }
    
                    },
                    (_, error) => {
                        console.error("Erro ao consultar tabela de usuarios:", error);
                        reject(error); // Reject a promessa se ocorrer erro
                    }
                );
            });

        }
    }

    const chama_login = async () => {
        
        if (db) {
            // Aguarda o login ser processado antes de navegar
            try {
                await new Promise((resolve, reject) => {
                    login(db, resolve, reject);  // Passa resolve e reject para o login
                });
    
                // Após o login ser completado, navega para a tela "Drawer"
                navigation.navigate("Drawer");
            } catch (error) {
                console.error("Erro no login:", error);
            }
        }
    };

    return(

        <View style={styles.container}>

            <StatusBar backgroundColor={config.cor1} style="light" />

            <Image style={styles.gif_load} source={require("../img/carregando3.gif")} />

        </View>

    )

}

const styles = StyleSheet.create({

    container:{

        flex: 1,
        backgroundColor: config.cor1,
        justifyContent: "center",
        alignItems: "center"

    },

    gif_load:{

        width: 150,
        height: 150

    }

})