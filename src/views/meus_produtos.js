import React, {useState, useContext, useLayoutEffect, useCallback} from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableWithoutFeedback, Modal, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/user';
import { useFocusEffect } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Menu } from 'react-native-paper';
import FlashMessage from 'react-native-flash-message';
import { showMessage, hideMessage } from 'react-native-flash-message';

import config from '../config';

export default function Meus_produtos(){

    const navigation = useNavigation();

    /* Contexto */
    const { DATAUser } = useContext(UserContext);

    /* Conexão com a API da página compras */
    /* const carregar_API = useCallback(() => {

        setLoadApi(true);
        fetch(`${config.URL_inicial_API}${DATAUser[0].id}/compras/${URL_API}`)
        .then(response => response.json())
        .then(data => {
            setData(data.data);
            setVisible(false);
            setModalVisible(false);
            setLoadApi(false);
            hideMessage();
        })
        .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
        });

    }, [URL_API, DATAUser]); */

    /* useFocusEffect(

        useCallback(() => {

            carregar_API();
    
          return () => {

          };
          
        }, [URL_API, DATAUser])

    );
 */
    return(

        <View style={styles.container}>

            <View style={styles.item_lista}>

                <View style={styles.area_foto}>

                    <Image style={styles.imgProduto} source={{ uri: `${config.Foto_prod_nulo}` }} />

                </View>

                <View style={styles.area_nome}>

                    <Text style={styles.nomeProduto}>

                        Produto exemplo

                    </Text>

                </View>

                <View style={styles.area_btn_apagar}>

                    <Icon
                        name="delete-sweep"
                        size={25}
                        color={config.cor2}
                        style={styles.iconApagar}
                        />

                </View>

            </View>

        </View>

    )

}

const styles = StyleSheet.create({

    container: {

        flex:1
    
    },

    item_lista:{

        flexDirection: "row",
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderColor: "#DDD"

    },

    area_foto:{

        flex: 1

    },

    area_nome:{

        flex: 5,
        justifyContent: "center"

    },

    area_btn_apagar:{

        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end"

    },

    imgProduto:{

        width: 45,
        height: 45,
        borderRadius: 50,
        marginLeft: 5

    },

    iconApagar:{

        marginRight: 5

    },

    nomeProduto:{

        fontSize: 15,
        marginLeft: 10

    }

})