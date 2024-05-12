import React, {useEffect, useState, useContext} from "react"
import { Image, View, Text, StyleSheet, Alert } from "react-native"
import { useNavigation } from '@react-navigation/native'
import * as SQLite from "expo-sqlite"
import { UserContext } from '../context/user';

import config from "../config";

export default function Carregar_login({route}){

  const { login } = useContext(UserContext); 
  
  /* Banco de dados local - Inicio da view (SQLite) */
  const [db, setDbLocal] = useState(null);
  const [DATA, setData] = useState([]);
  const [view, mostrarView] = useState(false);

  const navigation = useNavigation();

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

  /* Criando uma tabela se ela ainda não existe */
  useEffect(()=>{

    if (db) {
      db.transaction((tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS usuarios (id INTEGER, nome VARCHAR, token VARCHAR)",
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

  },[db])

  /* Excluir a tabela */
  /* useEffect(()=>{

    if (db) {
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
    }

  },[db]) */

  /* Função para inserir um novo dado na tabela local */
  function inserirNoBancoLocal(id, nome, token){   
    
    console.log("A função inserirNoBandoLocal está sendo chamada");

    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO usuarios (id, nome, token) VALUES (${id}, '${nome}', '${token}')`,
        [],
        ()=>{

          console.log("Dados inseridos corretamente na tabela");
          login();
          navigation.navigate("Drawer");

        },
        (_, error)=>{

          console.error("Erro ao inserir os dados na tabela", error);

        }
      );
    });

  }

  /* Chamando a função para inserir um dado na tabela local */
  useEffect(()=>{

    if (db && DATA.length > 0 && !view) {
      const dataP = DATA[0];
      console.log("Dados a serem inseridos:", dataP);
      inserirNoBancoLocal(dataP.id, dataP.nome, dataP.token);
    }

  },[db, DATA, view])

  /* useEffect(() => {
    if (db) {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM usuarios",
                [],
                (_, { rows }) => {
                    const userData = [];
                    for (let i = 0; i < rows.length; i++) {
                        userData.push(rows.item(i));
                    }
                    setData(userData);
                    mostrarView(true);
                },
                (_, error) => {
                    console.error("Erro ao consultar tabela de usuarios:", error);
                }
            );
        });
    }
  }, [db]); */

  /* API */
    const {email} = route.params
    const {senha} = route.params

    /* const [DATA, setData] = useState([]);
    const [view, mostrarView] = useState(false); */

    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('senha', senha);

    /* formData.append('email', 'eli@gmail.com');
    formData.append('senha', "1234"); */

    fetch(`${config.URL_inicial_API}login`, {
    method: "POST",
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString()
    })
    .then(response => response.json())
    .then(data => {

      if (!view) {
        setData(data.data);
        mostrarView(true);
      }

    })
    .catch(errors => {
    console.error('Erro ao enviar solicitação:', errors);
    });

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

                  <View>

                    <Text style={{color: "white"}}>

                      Conectado com sucesso!

                    </Text>

                  </View>

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