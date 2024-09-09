import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View, Text } from "react-native";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import config from "../config"

export default function BotaoAdd(props) {

  const navigation = useNavigation();

  const funcao = props.funcao

    return (

        <View style={styles.areaIconeMais}>

          {/* O componente está chamando uma função passada
          via parametro(props). */}
          <TouchableWithoutFeedback onPress={funcao}>

            <View style={styles.iconeMais}>

              <Text style={styles.mais}>

              <Icon
              name="check-bold"
              size={25}
              color={"#FFF"}
              />

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

        borderRadius: 50,
        backgroundColor: config.cor2,
        width: 60,
        height: 60,
        marginBottom: 15,
        marginRight: 15,
        justifyContent: "center",
        elevation: 5,
    
    },

    mais: {

        textAlign: "center",
        color: "#FFF",
    
    }

})