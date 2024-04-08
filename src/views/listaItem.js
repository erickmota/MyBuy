import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function ListaItem({route, navigation}){

    const {TituloLista} = route.params

    useEffect(() => {

        navigation.setOptions({ title: TituloLista });
        
    }, []);

    return(

        <Text>

            {TituloLista}

        </Text>

    )

}