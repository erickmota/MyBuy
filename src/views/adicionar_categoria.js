import React, {useContext}  from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

import IconeCorreto from "../componentes/botaoCorreto"
import config from "../config";
import { UserContext } from '../context/user';

export default function AddCategoria(){

    const navigation = useNavigation();

    const [number, onChangeNumber] = React.useState('');

    /* Contexto */
    const { DATAUser } = useContext(UserContext);

    function Inserir_categoria(nova_categoria){

        const formData = new URLSearchParams();
        formData.append('nome_categoria', nova_categoria);

        fetch(`${config.URL_inicial_API}${DATAUser[0].id}/adiciona_categoria`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
        })
        .then(response => response.json())
        .then(data => {

            navigation.navigate("Categorias");
    
        })
        .catch(errors => {
        console.error('Erro ao enviar solicitação:', errors);
        });

    }

    return(

        <View style={styles.container}>

            <Text style={styles.titulo}>

                Nome da categoria

            </Text>

            <TextInput style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            keyboardType="default"
            maxLength={30}
            />

            <IconeCorreto funcao={() => Inserir_categoria(number)}/>

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
        fontSize: config.tamanhoTextosInputs,
        marginHorizontal: 15,
        color: "#777"

    }

})