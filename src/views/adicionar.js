import React from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";

import IconeCorreto from "../componentes/botaoCorreto"

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
            keyboardType="numeric"
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
        fontSize: 20,
        paddingHorizontal: 20

    },

    input:{

        borderBottomWidth: 1,
        borderBottomColor: "#CCC",
        marginTop: 20,
        fontSize: 20,
        underlineColorAndroid: 'transparent',
        marginHorizontal: 20

    }

})