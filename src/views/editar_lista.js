import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableWithoutFeedback, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/user';

import IconeCorreto from "../componentes/botaoCorreto"

export default function Editar_lista(){

    const [number, onChangeNumber] = useState('');

    return(

        <View style={styles.container}>

            <Text style={styles.titulo}>

                Editar nome

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

    container: {

        flex:1,
    
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

    },

})