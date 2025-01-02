import React, {createContext, useState, useEffect} from "react";
import * as SQLite from "expo-sqlite"

export const UserContext = createContext()

export const UserProvider = ({children}) => {

    /* Estados */
    const [db, setDbLocal] = useState(null);
    const [DATAUser, setData] = useState(null);

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

    /* Função sendo chamada a cada vez que um login é efetuado.
    Essa função serve para atualizar os dados do contexto. */
    function login(db, resolve, reject) {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM usuarios",
                [],
                (_, { rows }) => {
                    const userData = [];
                    for (let i = 0; i < rows.length; i++) {
                        userData.push(rows.item(i));
                    }
                    setData(userData); // Atualiza os dados do contexto
    
                    console.log("Sucesso no retorno dos dados");
    
                    resolve();  // Resolve a promessa após carregar os dados
                },
                (_, error) => {
                    console.error("Erro ao consultar tabela de usuarios:", error);
                    reject(error); // Reject a promessa se ocorrer erro
                }
            );
        });
    }

    function logout(){

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

    function atualizar_foto_local(url){

        if (db) {
            db.transaction((tx) => {
                tx.executeSql(
                    `UPDATE usuarios SET foto_url='${url}'`,
                    [],
                    ()=>{

                        setData((prevData) => {
                            if (prevData && prevData.length > 0) {
                                return [{ ...prevData[0], foto_url: url }];
                            }
                            return [{ foto_url: url }];
                        });
        
                    console.log("Sucesso ao atualizar a foto local");
        
                    },
                    (_, error)=>{
        
                    console.error("Erro ao atualizar a foto local", error);
        
                    }
                );
            });
        }

    }

    function atualizar_nome_local(nome){

        if (db) {
            db.transaction((tx) => {
                tx.executeSql(
                    `UPDATE usuarios SET nome='${nome}'`,
                    [],
                    ()=>{

                        setData((prevData) => {
                            if (prevData && prevData.length > 0) {
                                return [{ ...prevData[0], nome: nome }];
                            }
                            return [{ nome: nome }];
                        });
        
                    console.log("Sucesso ao atualizar o nome local");
        
                    },
                    (_, error)=>{
        
                    console.error("Erro ao atualizar o nome local", error);
        
                    }
                );
            });
        }

    }

    return(

        <UserContext.Provider value={{DATAUser, login, logout, atualizar_foto_local, atualizar_nome_local}}>
            
            {children}
            
        </UserContext.Provider>

    )

}