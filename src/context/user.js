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
    

    return(

        <UserContext.Provider value={{DATAUser, login}}>
            
            {children}
            
        </UserContext.Provider>

    )

}