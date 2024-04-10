import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';

import config from "../config"

export default function BotaoAdd(props) {

  const navigation = useNavigation();

  const caminho = props.caminho

    return (

        <View style={styles.areaIconeMais}>

          <TouchableWithoutFeedback onPress={() => navigation.navigate(caminho)}>

            <View style={styles.iconeMais}>

              <Text style={styles.mais}>

                +

              </Text>

            </View>

          </TouchableWithoutFeedback>

    </View>

    )

}

const styles = StyleSheet.create({

    areaIconeMais: {

        ...StyleSheet.absoluteFillObject,
        flex: 2,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        pointerEvents: 'box-none',
    
    },

    iconeMais: {

        backgroundColor: config.cor2,
        width: 60,
        height: 60,
        marginBottom: 15,
        marginRight: 15,
        justifyContent: "center",
        borderRadius: 50,
        elevation: 5,
    
    },

    mais: {

        textAlign: "center",
        color: "#FFF",
        fontSize: 30,
        fontWeight: "400",
        marginTop: -2
    
    }

})