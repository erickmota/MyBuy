import React, {useContext} from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import { UserContext } from '../context/user';
import { useNavigation } from '@react-navigation/native';

import IconeCorreto from "../componentes/botaoCorreto"
import config from '../config';

export default function Adicionar(){

    const navigation = useNavigation();

    const [number, onChangeNumber] = React.useState('');

    /* Contexto */
    const { DATAUser } = useContext(UserContext);

    /*  */
    function Inserir_lista(nova_lista){

        const formData = new URLSearchParams();
        formData.append('nome_lista', nova_lista);

        fetch(`${config.URL_inicial_API}${DATAUser[0].id}/adiciona_lista`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
        })
        .then(response => response.json())
        .then(data => {

            navigation.navigate("Listas");
    
        })
        .catch(errors => {
        console.error('Erro ao enviar solicitação:', errors);
        });

    }

    return(

        <View style={styles.container}>

            <Text style={styles.titulo}>

                Nome da lista

            </Text>

            <TextInput style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            keyboardType="default"
            />

            <IconeCorreto funcao={() => Inserir_lista(number)}/>

        </View>

    )

}

const styles = StyleSheet.create({

    container:{

        flex: 1

    },

    titulo:{

        marginTop: 30,
        fontSize: config.tamanhoTextosInputs,
        paddingHorizontal: 15

    },

    input:{

        borderBottomWidth: 1,
        borderBottomColor: "#CCC",
        marginTop: 20,
        fontSize: 20,
        marginHorizontal: 15,
        color: "#777"

    }

})