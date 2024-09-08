import React from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";

import IconeCorreto from "../componentes/botaoCorreto"
import config from '../config';

export default function Adicionar(){

    const [number, onChangeNumber] = React.useState('');

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

            <IconeCorreto/>

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