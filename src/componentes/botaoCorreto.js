import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View, Text } from "react-native";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function BotaoAdd() {

  const navigation = useNavigation();

    return (

        <View style={styles.areaIconeMais}>

          <TouchableWithoutFeedback onPress={() => navigation.navigate('Adicionar')}>

            <View style={styles.iconeMais}>

              <Text style={styles.mais}>

              <Icon
              name="check-bold"
              size={35}
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
        backgroundColor: "#65bbbb",
        width: 65,
        height: 65,
        marginBottom: 15,
        marginRight: 15,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    
    },

    mais: {

        textAlign: "center",
        color: "#FFF",
        fontSize: 40,
        marginTop: -5
    
    }

})