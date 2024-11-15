import React, {useState, useContext, useLayoutEffect, useCallback, useRef, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableWithoutFeedback, Modal, Button, StatusBar, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/user';
import { useFocusEffect } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Menu } from 'react-native-paper';

import config from '../config';

export default function Historico_lista({route}){
    
    const scrollViewRef = useRef(null);

    const {id_lista} = route.params;

    /* Contexto */
    const { DATAUser } = useContext(UserContext);

    const [DATA, setData] = useState([]);
    const [DATA_produtos, setDataProdutos] = useState([]);
    const [ID_Compra, setIdCompra] = useState([]);
    const [inicio, setInicio] = useState(false);

    /* Modal */
    const [modalVisible, setModalVisible] = useState(false);

    /* Conexão com a API da página compras */
    const carregar_API = useCallback(() => {

        fetch(`${config.URL_inicial_API}${DATAUser[0].id}/historico/${id_lista}`)
        .then(response => response.json())
        .then(data => {
            setData(data.data);
        })
        .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
        });

    }, []);

    useEffect(()=>{

        if(inicio == false){

            setInicio(true)

            return;
            
        }

        fetch(`${config.URL_inicial_API}${DATAUser[0].id}/produtos_compra/${ID_Compra}`)
        .then(response => response.json())
        .then(data => {
            setDataProdutos(data.data);
        })
        .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
        });

    }, [ID_Compra])

    useFocusEffect(

        useCallback(() => {

            carregar_API();
    
          return () => {

          };
          
        }, [])

    );

    const chamar_modal = (id_compra) => {

        setIdCompra(id_compra);
        setModalVisible(true);

    }

    return(

        <View style={styles.container}>

            <StatusBar backgroundColor={config.cor1} style="light" />

            <Modal
                animationType="fade" // ou 'fade', 'none'
                transparent={true}    // Define se o fundo será transparente
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)} // Fechar modal ao clicar no botão 'voltar'
            >

                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>

                <View style={styles.centeredView}>

                    <View style={styles.modalView}>

                        <ScrollView>

                            {DATA_produtos.map((item, index, array)=>(

                                <TouchableWithoutFeedback key={item.id}>

                                    <View style={[styles.item_lista, index !== array.length - 1 ? {borderBottomWidth: 1}:{borderBottomWidth: 0}]}>

                                        <Text style={styles.txt_item_lista}>

                                            {item.qtd} {item.tipo_exibicao} - {item.nome_produto}

                                        </Text>

                                    </View>

                                </TouchableWithoutFeedback>

                            ))}

                        </ScrollView>
                      
                    </View>

                </View>

                </TouchableWithoutFeedback>

            </Modal>

            <ScrollView
            
            ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: false })}
            
            >

                {DATA.map((item, index, array)=>(

                    <View key={item.id} style={index === array.length - 1 ? {marginBottom: 20}:null}>

                        <View style={[index === 0 ? styles.linha_balao_1:null, styles.linha_balao, item.id_usuario == DATAUser[0].id ? {justifyContent: "flex-start"}:{justifyContent: "flex-end"}]}>

                            <View style={[styles.balao, item.tipo == 1 || item.tipo == 3 || item.tipo == 6 || item.tipo == 8 ? {borderColor: "#54ff71"}: item.tipo == 2 || item.tipo == 5 ? {borderColor: "#ebd50e"}: item.tipo == 4 || item.tipo == 7 ? {borderColor: "red"}:null]}>

                                <Text style={{color: "#666"}}>

                                    {item.data}

                                </Text>

                                <Text style={{marginTop: 10, color: config.cor2, fontWeight: "700"}}>

                                    {item.id_usuario == DATAUser[0].id ? (

                                        "Você"

                                    ):(

                                        item.nome_usuario

                                    )}

                                    {" "}

                                    <Text style={{marginTop: 10, color: "#222", fontWeight: "normal"}}>

                                        {item.msg}

                                    </Text>

                                </Text>

                                {item.id_compras != null && (

                                    <TouchableWithoutFeedback onPress={()=> chamar_modal(item.id_compras)}>

                                        <Text style={{marginTop: 5, color: "#09F", fontWeight: "500"}}>

                                            Itens comprados

                                        </Text>

                                    </TouchableWithoutFeedback>

                                )}

                            </View>

                        </View>

                        {index !== array.length - 1 && (

                            <View style={styles.linha_icon}>

                                <Icon
                                    name="timeline-text-outline"
                                    size={25}
                                    color={"#DDD"}
                                    />

                            </View>

                        )}

                    </View>

                ))}

            </ScrollView>

        </View>

    )

}

const styles = StyleSheet.create({

    container: {

        flex:1
    
    },

    linha_balao_1:{

        marginTop: 20

    },

    linha_balao:{

        flexDirection: "row"

    },

    balao:{

        backgroundColor: "#DDD",
        width: Dimensions.get("window").width - 100,
        padding: 20,
        borderRadius: 5,
        marginHorizontal: 10,
        borderLeftWidth: 5

    },

    linha_icon:{

        alignItems: "center",
        paddingVertical: 20

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

    item_lista:{

        paddingVertical: 10,
        borderBottomColor: "#CCC"

    },

    txt_item_lista:{

        marginLeft: 10

    }

})