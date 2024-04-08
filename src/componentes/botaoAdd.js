import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View, Text } from "react-native";
import { NavigationContainer, useNavigation } from '@react-navigation/native';

export default function BotaoAdd() {

  const navigation = useNavigation();

    return (

        <View style={styles.areaIconeMais}>

          <TouchableWithoutFeedback onPress={() => navigation.navigate('Adicionar')}>

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

        backgroundColor: "#65bbbb",
        width: 60,
        height: 60,
        marginBottom: 15,
        marginRight: 15,
        justifyContent: "center",
        borderRadius: 50
    
    },

    mais: {

        textAlign: "center",
        color: "#FFF",
        fontSize: 30,
        fontWeight: "400",
        marginTop: -2
    
    }

})