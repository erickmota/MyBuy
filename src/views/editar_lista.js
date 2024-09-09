import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableWithoutFeedback, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/user';

import IconeCorreto from "../componentes/botaoCorreto"
import config from '../config';

export default function Editar_lista({route}){

    const navigation = useNavigation();

    const {TituloLista} = route.params;
    const {id_lista} = route.params;

    const [number, onChangeNumber] = useState(TituloLista);

    /* Contexto */
    const { DATAUser } = useContext(UserContext);

    /* Função responsável por atualizar o nome da Lista
    via API.
    Ela está sendo chamada via componente */
    function salvar_nome(novo_nome){

        const formData = new URLSearchParams();
        formData.append('id_lista', id_lista);
        formData.append('novo_nome', novo_nome);

        fetch(`${config.URL_inicial_API}${DATAUser[0].id}/atualiza_lista`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
        })
        .then(response => response.json())
        .then(data => {

            navigation.navigate("Listas");
    
        })
        .catch(errors => {
        console.error('Erro ao enviar solicitação:', errors);
        });

    }

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

            <IconeCorreto funcao={() => salvar_nome(number)}/>

        </View>

    )

}

const styles = StyleSheet.create({

    container: {

        flex:1,
    
    },

    titulo:{

        marginTop: 30,
        fontSize: config.tamanhoTextosInputs,
        paddingHorizontal: 15

    },

    input:{

        borderBottomWidth: 1,
        borderBottomColor: "#CCC",
        marginTop: 20,
        fontSize: config.tamanhoTextosInputs,
        marginHorizontal: 15,
        color: "#777"

    },

})