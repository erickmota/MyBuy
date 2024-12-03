import React, {useState, useContext, useLayoutEffect, useCallback} from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableWithoutFeedback, Modal, Button, Alert, TextInput, TouchableOpacity} from 'react-native';
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

    /* Modal */
    const [modalVisible, setModalVisible] = useState(false);
    const [input, onChangeInput] = useState();
    const [id_produto, onChangeIdProduto] = useState(false);
    const [nome_produto, onChangeNomeProduto] = useState("");

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

    function atualiza_nome(){

        const formData = new URLSearchParams();
        formData.append('id_produto', id_produto);
        formData.append('nome_produto', nome_produto);
  
        fetch(`${config.URL_inicial_API}${DATAUser[0].id}/altera_nome_meus_produtos`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
        })
        .then(response => response.json())
        .then(data => {
  
          carregar_API();
          setModalVisible(false);
    
        })
        .catch(errors => {
        console.error('Erro ao enviar solicitação:', errors);
        });
  
    }

    return(

        <View style={styles.container}>

            <Modal
                animationType="fade" // ou 'fade', 'none'
                transparent={true}    // Define se o fundo será transparente
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)} // Fechar modal ao clicar no botão 'voltar'
            >

                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>

                <View style={styles.centeredView}>

                    <View style={styles.modalView}>

                      <View style={styles.corpoModal}>

                        <View>

                          <Text>

                            Alterar nome

                          </Text>

                        </View>

                        <View>

                          <TextInput style={[styles.input]}
                            onChangeText={onChangeNomeProduto}
                            value={nome_produto}
                            keyboardType="default"
                            maxLength={30}
                          />

                        </View>

                        <View style={styles.AreaBtnConfirmar}>

                            <Button onPress={()=> atualiza_nome()} color={config.cor2} title="Alterar  ->"/>

                        </View>

                      </View>
                      
                    </View>

                </View>

                </TouchableWithoutFeedback>

            </Modal>

            {load_API == true ? (

                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>

                    <Image style={styles.gif_load} source={require("../img/carregando.gif")} />

                </View>

            ):(

                DATA == false ? (

                    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>

                        <Text style={{color: config.corTextoSecundario}}>

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

                                    <TouchableOpacity activeOpacity={config.opacity_btn} onPress={()=>{

                                        onChangeIdProduto(item.id),
                                        onChangeNomeProduto(item.nome),
                                        setModalVisible(true);


                                    }}>

                                        <Text style={styles.nomeProduto}>

                                            {item.nome}

                                        </Text>

                                    </TouchableOpacity>

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
  
    },

    /* Modal */

    centeredView: {

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', // Fundo semitransparente

      },

      modalView: {

        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,

        },

        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

      },

      input:{

        borderBottomWidth: 1,
        borderBottomColor: "#CCC",
        marginTop: 20,
        fontSize: config.tamanhoTextosInputs,
        color: "#777",

      },

      corpoModal:{

        flexDirection: "column"

      },

      AreaBtnConfirmar:{

        marginTop: 20

    },

})