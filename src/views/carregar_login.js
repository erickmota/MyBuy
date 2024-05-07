import React, {useState} from "react"
import { View, Text, StyleSheet, TextInput, useWindowDimensions, TouchableNativeFeedback } from "react-native"
import { useNavigation } from '@react-navigation/native';

import config from "../config";

export default function Carregar_login({route}){

    const {email} = route.params
    const {senha} = route.params

    return(

        <View style={styles.container}>

            <Text style={{color: "white"}}>

                Carregando...

            </Text>

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

function Login(){

    fetch('https://exemplo.com/api/recurso', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        // Outros cabeçalhos, se necessário
    },
    body: JSON.stringify({
        chave1: valor1,
        chave2: valor2,
        // Adicione outras chaves e valores conforme necessário
    }),
    })
    .then(response => response.json())
    .then(data => {
    console.log('Resposta da API:', data);
    })
    .catch(error => {
    console.error('Erro ao enviar solicitação:', error);
    });

}