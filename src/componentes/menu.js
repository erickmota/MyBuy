import React from "react";
import { View, Text, StyleSheet } from "react-native";

import config from "../config";

export default function Menu(){

    return(

        <View style={styles.container}>

            <View style={styles.parte1}>

                <Text>

                    Teste

                </Text>

            </View>

            <View style={styles.parte2}>



            </View>

        </View>

    )

}

const styles = StyleSheet.create({

    container:{

        flex: 1

    },

    parte1:{

        flex: 1,
        backgroundColor: config.cor2

    },

    parte2:{

        flex: 8
        
    }

})