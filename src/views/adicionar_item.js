import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AddItem(){

    return(

        <View style={styles.container}>

            <Text>

                Tela adicionar Item

            </Text>

        </View>

    )

}

const styles = StyleSheet.create({

    container:{

        flex: 1

    }

})