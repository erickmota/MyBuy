import React, {useState, useContext, useLayoutEffect, useCallback} from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableWithoutFeedback, Modal, Button, Alert} from 'react-native';
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

    const [DATA, setData] = useState([]);
    const [load_API, setLoadApi] = useState();

    /* Conexão com a API da página compras */
    const carregar_API = useCallback(() => {

        setLoadApi(true);
        fetch(`${config.URL_inicial_API}${DATAUser[0].id}/meus_produtos`)
        .then(response => response.json())
        .then(data => {
            setData(data.data);
            setLoadApi(false);
        })
        .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
        });

    }, [DATAUser]);

    useFocusEffect(

        useCallback(() => {

            carregar_API();
    
          return () => {

          };
          
        }, [DATAUser])

    );

    const apagar_produto = (id_produto) => {

        const formData = new URLSearchParams();
        formData.append('id_produto', id_produto);

        fetch(`${config.URL_inicial_API}${DATAUser[0].id}/apaga_produto_usuario`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
        })
        .then(response => response.json())
        .then(data => {

            carregar_API();
    
        })
        .catch(errors => {
        console.error('Erro ao enviar solicitação:', errors);
        });

    }

    function confirma_apagar(id_produto, nome_produto){

        Alert.alert(
            "Apagar produto",
            `Deseja mesmo apagar o item "${nome_produto}" de sua lista de produtos? Todos os itens nas listas, e dados nos relatórios de despesas ligados a ele, serão excluidos.`,
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
                    
                    apagar_produto(id_produto);

                }
                }
            ],
            { cancelable: false }
        );
  
    }

    return(

        <View style={styles.container}>

            {load_API == true ? (

                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>

                    <Image style={styles.gif_load} source={require("../img/carregando.gif")} />

                </View>

            ):(

                DATA == false ? (

                    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>

                        <Text>

                            Nenhum produto encontrado

                        </Text>

                    </View>

                ):(

                    <ScrollView>

                        {DATA.map((item, index, array)=>(

                            <View key={item.id} style={[styles.item_lista, index === array.length - 1 ? {borderBottomWidth: 0}:null]}>

                                <View style={styles.area_foto}>

                                    {item.url_foto == null ? (

                                        <Image style={styles.imgProduto} source={{ uri: `${config.Foto_prod_nulo}` }} />

                                    ):(

                                        <Image style={styles.imgProduto} source={{ uri: `${item.url_foto}` }} />

                                    )}

                                </View>

                                <View style={styles.area_nome}>

                                    <Text style={styles.nomeProduto}>

                                        {item.nome}

                                    </Text>

                                </View>

                                <View style={styles.area_btn_apagar}>

                                    <TouchableWithoutFeedback onPress={()=> confirma_apagar(item.id, item.nome)}>

                                        <Icon
                                            name="delete-sweep"
                                            size={25}
                                            color={config.cor2}
                                            style={styles.iconApagar}
                                            />

                                    </TouchableWithoutFeedback>

                                </View>

                            </View>

                        ))}

                    </ScrollView>
                    
                )
                
            )}

        </View>

    )

}

const styles = StyleSheet.create({

    container: {

        flex:1
    
    },

    item_lista:{

        flexDirection: "row",
        paddingVertical: 10,
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

        width: 40,
        height: 40,
        borderRadius: 50,
        marginLeft: 10

    },

    iconApagar:{

        marginRight: 10

    },

    nomeProduto:{

        fontSize: 15,
        marginLeft: 10

    },

    gif_load:{

        width: 70,
        height: 70
  
    }

})