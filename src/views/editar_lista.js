import React, {useState, useContext, useLayoutEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/user';

import IconeCorreto from "../componentes/botaoCorreto"
import config from '../config';

export default function Editar_lista({route}){

    /* Dados da lista */
    const {TituloLista} = route.params;
    const {id_lista} = route.params;

    /* Resultado do input */
    const [number, onChangeNumber] = useState(TituloLista);

    /* Contexto */
    const { DATAUser } = useContext(UserContext);

    const navigation = useNavigation();

    useLayoutEffect(()=>{

        navigation.setOptions({
            
            headerRight: () => (
                <Icon
                  name="delete-sweep"
                  size={22}
                  color={"white"}
                  style={{marginRight: 10}}
                  onPress={()=>{
  
                    Alert.alert(
                      "Excluir lista",
                      `A lista "${TituloLista}" e todos os produtos relacionados a ela serão excluidos. Deseja continuar?`,
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
                            console.log("Lista excluída");
                            
                            apagar_lista();

                          }
                        }
                      ],
                      { cancelable: false }
                    );
                    
                  }}
                  />
              ),

        })

    },[navigation])

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

    /* Função responsável por apagar a lista */
    const apagar_lista = () => {

        const formData = new URLSearchParams();
        formData.append('id_lista', id_lista);

        fetch(`${config.URL_inicial_API}${DATAUser[0].id}/deletar_lista`, {
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