import React, {useEffect, useState, useContext} from "react"
import { Image, View, Text, StyleSheet, Alert, StatusBar } from "react-native"
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

  },[db])

  /* Função para inserir um novo dado na tabela local */
  function inserirNoBancoLocal(id, nome, token, foto_url){   
    
    console.log("A função inserirNoBandoLocal está sendo chamada");

    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO usuarios (id, nome, token, foto_url, ultima_lista) VALUES (${id}, '${nome}', '${token}', '${foto_url}', 0)`,
        [],
        ()=>{

          console.log("Dados inseridos corretamente na tabela");
          chama_login();

        },
        (_, error)=>{

          console.error("Erro ao inserir os dados na tabela", error);

        }
      );
    });

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

  /* Chamando a função para inserir um dado na tabela local */
  useEffect(()=>{

    /* API */
    const {email} = route.params
    const {senha} = route.params

    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('senha', senha);

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

    if (db && DATA.length > 0 && !view) {
      const dataP = DATA[0];

      if(dataP.confirmado == 0){

        navigation.navigate("Confirma_email", {email: dataP.email, nome: dataP.nome});

      }else{

        inserirNoBancoLocal(dataP.id, dataP.nome, dataP.token, dataP.foto_url);

      }

    }

  },[db, DATA, view])

    return(

        <View style={styles.container}>

            <StatusBar backgroundColor={config.cor_splash} style="light" />

            <Image style={styles.gif_load} source={require("../img/carregando3.gif")} />  

            {view && (<View>

                {DATA !== false ? null : (

                    /* Alerta retornado quando o usuário não é localizado */
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
        backgroundColor: config.cor_splash,
        justifyContent: "center",
        alignItems: "center",

    },

    gif_load:{

      width: 150,
      height: 150

  }

})