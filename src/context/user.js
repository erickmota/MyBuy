import React, {createContext, useState, useEffect} from "react";
import * as SQLite from "expo-sqlite"

export const UserContext = createContext()

export const UserProvider = ({children}) => {

    /* Estados */
    const [db, setDbLocal] = useState(null);
    const [DATA, setData] = useState([]);

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

    /* Retornar dados */
    useEffect(() => {
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

                        console.log("Sucesso no retorno dos dados");
                    },
                    (_, error) => {
                        console.error("Erro ao consultar tabela de usuarios:", error);
                    }
                );
            });
        }
      }, [db]);

    return(

        <UserContext.Provider value={DATA}>
            
            {children}
            
        </UserContext.Provider>

    )

}