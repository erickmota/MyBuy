import React, { useEffect, useContext, useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableNativeFeedback, Image, TouchableOpacity, TouchableWithoutFeedback, Modal, Button, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserContext } from '../context/user';
import { useFocusEffect } from '@react-navigation/native';

import IconeAdd from "../componentes/botaoAdd"

import config from "../config";

export default function ListaItem({route, navigation}){

    const {id_lista} = route.params;

    /* Estados */

    const [DATA, setData] = useState([]);
    const [DATA_carrinho, setCarrinho] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    /* Modal */

    const [qtd, onChangeQtd] = React.useState();
    const [valor, onChangeValor] = React.useState();

    let soma_carrinho = 0;

    /* Contexto */

    const { DATAUser } = useContext(UserContext);

    const carregar_API = useCallback(()=>{

        if(DATAUser){

            /* API produtos e categorias */
            
            fetch(`${config.URL_inicial_API}${DATAUser[0].id}/categorias`)
            .then(response => response.json())
            .then(async data => {
                
                let categoriesWithProducts = await Promise.all(data.data.map(async category => {
                    const response = await fetch(`${config.URL_inicial_API}${DATAUser[0].id}/produtos/${id_lista}/${category.id}`);
                    const productsData = await response.json();

                    return {
                        ...category,
                        produtos: productsData.data
                    };

                }));

                console.log(categoriesWithProducts);
                console.log("FIM");

                setData(categoriesWithProducts);

            })
            .catch(error => {
                console.error('Erro ao buscar dados da API:', error);
            });

            /* API Produtos no carrinho */
            fetch(`${config.URL_inicial_API}${DATAUser[0].id}/produtos_carrinho/${id_lista}`)
            .then(response => response.json())
            .then(data => {
                setCarrinho(data.data);
            })
            .catch(error => {
                console.error('Erro ao buscar dados da API dos carrinhos:', error);
            });

        }

    }, [DATAUser, id_lista])

    const atualiza_nome = ()=>{

        if(route.params){

            const {TituloLista} = route.params

            navigation.setOptions({ title: TituloLista });

        }else{

            navigation.setOptions({ title: "Mercado" });

        }

    }

    useFocusEffect(
        useCallback(() => {

            atualiza_nome();
            carregar_API();
    
          return () => {

            setData([]);
            setCarrinho([]);

          };
          
        }, [carregar_API])
    );

    function add_carrinho(qtd, valor){

        onChangeQtd(qtd);
        onChangeValor(valor);
        setModalVisible(true);
        
    }

    /* Função responsável a nomear os tipos de exibição
    de acordo com os números do banco:
    1 = Un
    2 = Kg
    3 = g
    4 = L
    5 = ml
    6 = dz
    7 = Caixa
    8 = Pacote
    9 = Garrafa
    10 = Lata
    11 = Embalagem */

    function verifica_exibicao(numero_exibicao, qtd){

        switch (numero_exibicao) {

            case 1:

                return "Un";

            break;

            case 2:

                return "Kg";

            break;

            case 3:

                return "g";

            break;

            case 4:

                return "L";

            break;

            case 5:

                return "ml";

            break;

            case 6:

                return "dz";

            break;

            case 7:

                if(qtd > 1){

                    return "Caixas";

                }else{

                    return "Caixa";

                }

            break;

            case 8:

                if(qtd > 1){

                    return "Pacotes";

                }else{

                    return "Pacote";

                }

            break;

            case 9:

                if(qtd > 1){

                    return "Garrafas";

                }else{

                    return "Garrafa";

                }

            break;

            case 10:

                if(qtd > 1){

                    return "Latas";

                }else{

                    return "Lata";

                }


            break;

            case 11:

                if(qtd > 1){

                    return "Embalagens";

                }else{

                    return "Embalagem";

                }

            break;

        }

    }

    /* Ajusta o tamanho do texto de observação.
    Texto e temanho desejado passados por parâmetro */

    function ajusta_tamanho_obs(texto, tamanho){

        if(texto.length > tamanho){

            return texto.substring(0, tamanho)+"...";

        }

    }

    /* 1 = Un
    2 = Kg
    3 = g
    4 = L
    5 = ml
    6 = dz
    7 = Caixa
    8 = Pacote
    9 = Garrafa
    10 = Lata
    11 = Embalagem */

    function soma_valor_quantidade(qtd, valor, tipo){

        let valor_real = 0;

        /* Se caso o tipo de exibição do produto for 3 (g) ou 5 (ml), o valor retornado como preço de exibição
        será mantido o mesmo, pois, em "ml" e "g" naõ será calculado pela quantidade. */

        if(tipo == 5 || tipo == 3){

            valor_real = valor;

        }else{

            valor_real = qtd * valor;

        }

        return valor_real;

    }

    /* Formata o valor para aparece corretamente nos itens do carrinho */

    function formatar_valor(valor){

        if(Number.isInteger(valor)){

            return valor+".00";

        }else{

            /* Retorna o valor com apenas duas casas decimais */

            const numString = valor.toString();

            const parte = numString.split(".");

            const inteiro = parte[0];

            const decimal = parte[1];

            if(decimal.length < 2){

                const decimal_atualizado = decimal.substring(0, 2);

                return inteiro+"."+decimal_atualizado+"0"

            }else{

                const decimal_atualizado = decimal.substring(0, 2);

                return inteiro+"."+decimal_atualizado

            }
            
        }

    }

    const somar_carrinho = (valor) => {

        const novo_valor = soma_carrinho + valor;

        soma_carrinho = novo_valor;

    }

    return(

        <View style={styles.container}>

            <StatusBar backgroundColor={config.cor1} style="light" />

            {/* Modal */}

            <Modal
                animationType="fade" // ou 'fade', 'none'
                transparent={true}    // Define se o fundo será transparente
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)} // Fechar modal ao clicar no botão 'voltar'
            >

                <View style={styles.centeredView}>

                    <View style={styles.modalView}>

                        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>

                        <View style={styles.areaX}>

                            <Text style={{color: "#BBB"}}>

                                (Cancelar)

                            </Text>

                        </View>

                        </TouchableWithoutFeedback>

                        <View style={styles.corpoInputs}>

                            <View style={styles.areaQtd}>

                                <Text style={styles.titulo}>

                                    Quantidade

                                </Text>

                                <TextInput style={[styles.input]}
                                onChangeText={text =>{

                                    const replaceNumero = text.replace(/[^0-9.]/g, '');
                                    const replacePonto = replaceNumero.replace(/(\..*)\./g, '$1');
                                    onChangeQtd(replacePonto);

                                }}
                                value={qtd}
                                keyboardType="numeric"
                                />

                            </View>

                            <View style={styles.areaValor}>

                                <Text style={styles.titulo}>

                                    Valor

                                </Text>

                                <TextInput style={[styles.input]}
                                onChangeText={text =>{

                                    const replaceNumero = text.replace(/[^0-9.]/g, '');
                                    const replacePonto = replaceNumero.replace(/(\..*)\./g, '$1');
                                    onChangeValor(replacePonto);

                                }}
                                value={valor}
                                keyboardType="numeric"
                                placeholder="0.00"
                                />

                            </View>                            

                        </View>

                        <View style={styles.AreaBtnConfirmar}>

                            <Button color={config.cor2} title="Confirmar  ->"/>

                        </View>

                        {/* <Text style={styles.modalText}>Este é um modal!</Text>
                        <Button title="Fechar" onPress={() => setModalVisible(false)} /> */}

                    </View>

                </View>

            </Modal>

            <ScrollView>

                <View style={styles.areaListas}>

                    <View style={{backgroundColor: "#FFF"}}>
 
                        {DATA && DATA.length > 0 ? (

                            DATA.map(item=>(

                                Array.isArray(item.produtos) && item.produtos.length > 0 && (

                                    <View key={item.id}>

                                        <Text style={styles.tituloListas}>

                                            {item.nome}

                                        </Text>

                                        {

                                            item.produtos.map(prod=>(

                                                <View key={prod.id} style={styles.itemLista}>

                                                    <View style={styles.areaFoto}>

                                                        {prod.url !== null ? (

                                                            /* Foto que aparecerá caso o item tiver uma foto */
                                                            <Image style={styles.imgProduto} source={{ uri: `${prod.url}` }} />

                                                        ):(

                                                            /* Foto caso o item não tiver uma foto */
                                                            <Image style={styles.imgProduto} source={{ uri: `${config.Foto_prod_nulo}` }} />

                                                        )}

                                                    </View>

                                                    <TouchableOpacity
                                                    
                                                        onPress={() => navigation.navigate("Editar_item", {id_produto: prod.id, nome_produto: prod.nome, qtd_produto: prod.qtd})}
                                                    
                                                    >

                                                        <View style={{flex: 3, flexDirection: "column"}}>

                                                            <Text style={styles.titleLista}>
                                                                
                                                                {prod.nome}
                                                                
                                                            </Text>

                                                            <View style={{flexDirection: "row"}}>

                                                                <Text style={styles.qtdItens}>
                                                                    
                                                                    {prod.qtd} {verifica_exibicao(parseInt(prod.tipo_exibicao), Math.ceil(prod.qtd))}
                                                                    
                                                                </Text>

                                                            </View>

                                                            {prod.obs && <View style={{flexDirection: "row"}}>

                                                                    <Text style={styles.obs}>
                                                                        
                                                                        * {ajusta_tamanho_obs(prod.obs, 37)}
                                                                        
                                                                    </Text>

                                                                </View>

                                                            }

                                                        </View>

                                                    </TouchableOpacity>

                                                    <TouchableWithoutFeedback onPress={()=> add_carrinho(prod.qtd, prod.valor)}>

                                                        <View style={[styles.iconeLista, {flex:1}]}>

                                                            <Icon
                                                                name="cart-plus"
                                                                size={25}
                                                                color={"#0ee031"}
                                                                />

                                                        </View>

                                                    </TouchableWithoutFeedback >

                                                </View>

                                            ))

                                        }

                                    </View>

                                )

                            ))

                        ):(

                            <View style={styles.itemVazio}>

                                <Text style={styles.textItemVazio}>

                                    Carregando...

                                </Text>

                            </View>

                        )}

                    </View>

                    {DATA_carrinho && DATA_carrinho.length > 0 ? (

                        <View style={styles.areaCarrinho}>

                            <View>

                                <Text style={[styles.tituloListas, styles.tituloListasCarrinho]}>

                                    <Icon
                                        name="cart-variant"
                                        size={19}
                                        color={config.cor1}
                                    /> Carrinho

                                </Text>

                            </View>

                            {/* Carrinho */}
                            {DATA_carrinho.map(item => (

                                <View key={item.id} style={styles.itemLista}>

                                    <View style={styles.areaFoto}>

                                        {item.url !== null ? (

                                            /* Foto que aparecerá caso o item tiver uma foto */
                                            <Image style={styles.imgProduto} source={{ uri: `${item.url}` }} />

                                        ):(

                                            /* Foto caso o item não tiver uma foto */
                                            <Image style={styles.imgProduto} source={{ uri: `${config.Foto_prod_nulo}` }} />

                                        )}

                                    </View>

                                    <View style={{flex: 3, flexDirection: "column"}}>

                                        <Text style={[styles.titleLista, styles.itemMarcado]}>
                                            
                                            {item.nome}
                                            
                                        </Text>
                                        
                                        <View style={{flexDirection: "row"}}>

                                            <Text style={styles.qtdItens}>
                                                
                                            {item.qtd} {verifica_exibicao(parseInt(item.tipo_exibicao), Math.ceil(item.qtd))}{" / "}
                                                
                                            </Text>

                                            <Text style={[styles.qtdItens, {color: "#6ec0fa"}]}>

                                                {/* Aqui existem 3 funções com funcionamento simultâneo (uma depende da outra para funcionar) */}
                                                
                                                {"R$"}{formatar_valor(soma_valor_quantidade(parseFloat(item.qtd), parseFloat(item.valor), parseInt(item.tipo_exibicao)))}

                                                {somar_carrinho(parseFloat(soma_valor_quantidade(parseFloat(item.qtd), parseFloat(item.valor), parseInt(item.tipo_exibicao))))}
                                                
                                            </Text>

                                        </View>

                                    </View>

                                    <View style={[styles.iconeLista, {flex: 1}]}>

                                        <Icon
                                            name="cart-minus"
                                            size={25}
                                            color={"#FF0000"}
                                            />

                                    </View>

                                </View>

                            ))}

                        </View>

                    ):(

                        <View style={styles.itemVazio}>

                            <Text style={styles.textItemVazio}>

                                Nenhum produto por aqui!

                            </Text>

                        </View>

                    )}

                </View>

            </ScrollView>

            <View>

                <IconeAdd caminho={"AddItem"} id_lista={id_lista}/>

            </View>

            <TouchableNativeFeedback>

            <View style={styles.containerBtnComprar}>

                <Icon
                    name="cart-arrow-right"
                    size={50}
                    color={"#FFF"}
                    />

                <Text style={styles.textBtnComprar}>

                    Registrar{"\n"}
                    <Text style={{fontSize: 20, fontWeight: "bold"}}>R${formatar_valor(soma_carrinho)}</Text>

                </Text>

            </View>

            </TouchableNativeFeedback>

        </View>

    )

}

const styles = StyleSheet.create({

    container:{

        flex: 1,
        backgroundColor: "#f8eaff"

    },

    tituloListas: {

        color: config.cor2,
        fontSize: 15,
        paddingHorizontal: 15,
        marginTop: 20,
        marginBottom: 5,
        fontWeight: "bold"
    
    },

    tituloListasSeguir:{

        marginTop: 35

    },
    
    tituloListasCarrinho:{

        fontSize: 18,
        color: config.cor1

    }, 

    areaListas:{

        flex: 9,
        paddingBottom: 80
    
    },

    itemLista: {

    marginHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#CCC",
    flexDirection: "row"

    },

    titleLista: {

        fontSize: 17,
        
    },

    itemMarcado:{

        textDecorationLine: "line-through",

    },

    qtdItens:{

        fontSize: 13,
        color: config.corTextoSecundario,
        alignContent: "center",
    
    },

    obs:{

        fontSize: 13,
        color: config.corObs

    },

    iconeLista: {

        alignItems: "flex-end",
        flex: 1,
        justifyContent: "center"
    
    },

    areaCarrinho:{

        backgroundColor: "#f8eaff",
        borderTopWidth: 1,
        marginTop: -1,
        borderColor: config.cor1

    },

    containerInfo:{

        backgroundColor: config.cor2,
        height: 30,
        flexDirection: "row",

    },

    containerBtnComprar:{

        backgroundColor: config.cor1,
        height: 60,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center"

    },

    textBtnComprar:{

        color: "#FFF",
        fontWeight: "300",
        fontSize: 15,
        paddingRight: 5,
        textAlign: "center"

    },

    imgProduto:{

        width: 45,
        height: 45,
        borderRadius: 50,

    },

    areaFoto:{

        marginRight: 15

    },

    itemVazio:{

        marginVertical: 30

    },

    textItemVazio:{

        fontSize: 15,
        color: "#AAA",
        textAlign: "center"

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
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,

        },

        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

      },

      modalText: {
        marginBottom: 15,
        textAlign: 'center',
        
      },

      input:{

        borderBottomWidth: 1,
        borderBottomColor: "#CCC",
        marginTop: 20,
        fontSize: config.tamanhoTextosInputs,
        color: "#777"

    },

    corpoInputs:{

        flexDirection: "row",
        marginTop: 15

    },

    areaQtd:{

        flex: 1,
        marginRight: 15

    },

    areaValor:{

        flex: 1,
        marginLeft: 15

    },

    areaX:{

        position: "absolute",
        top: 3,
        left: 8

    },

    AreaBtnConfirmar:{

        marginTop: 20

    }

})