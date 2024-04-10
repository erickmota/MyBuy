import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

import IconeCorreto from "../componentes/botaoCorreto"

export default function AddItem(){

    const [number, onChangeNumber] = React.useState('');

    return(

        <View style={styles.container}>

            <Text style={styles.titulo}>

                Nome do item

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
        fontSize: 20,
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