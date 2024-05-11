import React, {useEffect, useState} from "react"
import { Image, View, Text, StyleSheet, TextInput, useWindowDimensions, TouchableNativeFeedback, Alert } from "react-native"
import { useNavigation } from '@react-navigation/native'
import * as SQLite from "expo-sqlite"

import config from "../config";

export default function Carregar_login({route}){
  
  /* Banco de dados local - Inicio da view (SQLite) */
  const [db, setDbLocal] = useState(null);

  useEffect(()=>{

    try {

      const db = SQLite.openDatabase("MyBuy.db");
      setDbLocal(db);

      console.warn("Sucesso ao abrir o banco");
      
    } catch (error) {
      
      console.error("conexão com o banco de dados local, falhou", error);
  
    }

  },[])

  /* useEffect(()=>{

    if (db) {
      db.transaction((tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nome VARCHAR(200), token VARCHAR(200))",
          [],
          ()=>{

            console.warn("Tabela criada com sucesso");

          },
          (_, error)=>{

            console.warn("Erro ao criar uma tabela", error);

          }
        );
      });
    }

  },[db]) */

  /* function inserirNoBancoLocal(id, nome, token){

    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO usuarios (id, nome, token) VALUES ('${id}', '${nome}', '${token}')`
      );
    });

    try {

      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO usuarios (id, nome, token) VALUES ('${id}', '${nome}', '${token}')`
        );
      });

      console.warn("Sucesso ao inserir o dado no banco.");
      
    } catch (error) {

      console.warn("Erro ao inserir o dado no banco.", error);
      
    }

  } */

  /* API */
    const navigation = useNavigation();

    /* const {email} = route.params
    const {senha} = route.params */

    const [DATA, setData] = useState([]);
    const [view, mostrarView] = useState(false);

    const formData = new URLSearchParams();
    formData.append('email', 'erick@gmail.com');
    formData.append('senha', '1234');

    fetch(`${config.URL_inicial_API}login`, {
    method: "POST",
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString()
    })
    .then(response => response.json())
    .then(data => {

        setData(data.data);
        mostrarView(true);

    })
    .catch(errors => {
    console.error('Erro ao enviar solicitação:', errors);
    });

    setTimeout(()=>{

        mostrarView(true)

    }, 2500)

    return(

        <View style={styles.container}>

            <Text style={{color: "white"}}>

                <Text>

                    <Text>

                        Conectando...

                    </Text>

                </Text>

            </Text>

            {view && (<View>

                {DATA !== false ? (

                    DATA.map(item => (

                        <View key={item.token}>

                            <Text>

                                {item.token}

                            </Text>

                            <Text>

                                {item.nome}

                            </Text>

                            <Text>

                                {item.id}

                            </Text>

                            {/* {inserirNoBancoLocal(item.id, item.nome, item.token)} */}

                        </View>

                    ))

                ) : (

                    Alert.alert(

                        "",
                        "Usuário inválido",
                        [{

                            text: "Ok",
                            onPress: () =>{

                                navigation.navigate("Login")

                            }

                        }]

                    )

                )}

            </View>)}

        </View>

    )

}

const styles = StyleSheet.create({

    container:{

        flex: 1,
        backgroundColor: config.cor2,
        justifyContent: "center",
        alignItems: "center",

    }

})