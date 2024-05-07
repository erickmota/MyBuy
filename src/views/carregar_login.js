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