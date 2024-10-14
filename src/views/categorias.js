import React, {useState, useEffect, useContext} from "react";
import { Text, View, StyleSheet, FlatList, TouchableWithoutFeedback, Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import config from "../config"
import { UserContext } from '../context/user';

import IconeAdd from "../componentes/botaoAdd"

export default function Categorias(){

    const navigation = useNavigation();

    const [DATA, setData] = useState([]);

    /* Contexto */
    const { DATAUser } = useContext(UserContext);

    /* Conexão com a API */
    useEffect(() => {

    fetch(`${config.URL_inicial_API}${DATAUser[0].id}/categorias`)
    .then(response => response.json())
    .then(data => {
        setData(data.data);
    })
    .catch(error => {
        console.error('Erro ao buscar dados da API:', error);
    });

    }, [DATA]);

    function apagar_categoria(categoria){

      const formData = new URLSearchParams();
        formData.append('id_categoria', categoria);

        fetch(`${config.URL_inicial_API}${DATAUser[0].id}/deletar_categoria`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
        })
        .then(response => response.json())
        .then(data => {

            navigation.navigate("Categorias");
    
        })
        .catch(errors => {
        console.error('Erro ao enviar solicitação:', errors);
        });

    }

    function confirma_apagar(categoria, nome_categoria){

      Alert.alert(
        "Apagar categoria",
        `Deseja mesmo apagar a categoria "${nome_categoria}"? Se ainda existir algum item vinculado a ela,`+
        " em alguma de suas listas, o item será exluído.",
        [
          {
            text: "Cancelar",
            onPress: () => console.log("Cancelado"),
            style: "cancel"
          },
          {
            text: "Sim",
            onPress: () => {

              // Ação de exclusão
              
              apagar_categoria(categoria);

            }
          }
        ],
        { cancelable: false }
    );

    }

    return (

        <View style={styles.container}>

            <FlatList
            data={DATA}
            renderItem={({item}) =>

            <View style={styles.itemLista}>

                <TouchableWithoutFeedback onPress={() => navigation.navigate('ListaItem', {TituloLista: item.title})}>

                <View style={{flex: 3, flexDirection: "column"}}>

                <Text style={styles.titleLista}>
                    
                    {item.nome}
                    
                </Text>

                </View>

                </TouchableWithoutFeedback>

                <View style={[styles.iconeLista, {flex:1}]}>

                <TouchableWithoutFeedback onPress={() => confirma_apagar(item.id, item.nome)}>

                    <Icon
                        name="delete-sweep"
                        size={25}
                        color={config.cor2}
                        />

                </TouchableWithoutFeedback>

                </View>

            </View>

            }
            keyExtractor={item => item.id}
            /> 

            <IconeAdd caminho={"Adicionar_categoria"}/>

        </View>

    )

}

const styles = StyleSheet.create({

    container:{

        flex: 1

    },

    itemLista: {

        marginHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: "#CCC",
        flexDirection: "row"
    
      },
    
      titleLista: {
    
        fontSize: config.tamanhoTextosInputs,
        
      },
    
      iconeLista: {
    
        alignItems: "flex-end",
        flex: 1,
        justifyContent: "center"
    
      }

})