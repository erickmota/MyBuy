import React, {useEffect, useLayoutEffect, useState, useContext, useCallback,} from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, Image, Modal, TouchableWithoutFeedback, FlatList, TouchableNativeFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { BarChart } from 'react-native-chart-kit';
import { PieChart } from 'react-native-chart-kit';
import { LineChart } from 'react-native-chart-kit';
import { ProgressChart } from 'react-native-chart-kit';
import { UserContext } from '../../context/user';
import { useFocusEffect } from '@react-navigation/native';

import config from '../../config';
import { color } from 'react-native-elements/dist/helpers';

export default function Categorias(){

    /* Contexto */
    const { DATAUser } = useContext(UserContext);

    const [DATA, setData] = useState([]);
    const [DATA_totalMedia, setData_totalMedia] = useState([]);
    const [DATA_detalhes, setData_detalhes] = useState([]);
    const [DATA_mes, setData_mes] = useState([]);
    const [load_API, set_loadAPI] = useState(true);

    const [selectedValue, setSelectedValue] = useState(null);
    const [selectedX, setSelectedX] = useState(null);
    const [selectedY, setSelectedY] = useState(null);

    /* Modal */
    const [modalVisible, setModalVisible] = useState(false);

    const [Ano_selecionado, setAnoSelecionado] = useState(new Date().getFullYear());

    const carregar_API = useCallback(() => {

        const fetchData = async () => {

            try{

                const [resposta_1, resposta_2, resposta_3, resposta_4] = await Promise.all([

                    fetch(`${config.URL_inicial_API}${DATAUser[0].id}/graficos/geral/${Ano_selecionado}`),
                    fetch(`${config.URL_inicial_API}${DATAUser[0].id}/graficos/total_media/${Ano_selecionado}`),
                    fetch(`${config.URL_inicial_API}${DATAUser[0].id}/graficos/detalhes_compras/${Ano_selecionado}`),
                    fetch(`${config.URL_inicial_API}${DATAUser[0].id}/graficos/valor_mes`)

                ]);

                const [data_1, data_2, data_3, data_4] = await Promise.all([

                    resposta_1.json(),
                    resposta_2.json(),
                    resposta_3.json(),
                    resposta_4.json()

                ]);

                if(data_1.data == null){
                    
                    setData([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

                }else{

                    setData(data_1.data);

                }

                setData_totalMedia(data_2.data);
                setData_detalhes(data_3.data);
                setData_mes(data_4.data);

                set_loadAPI(false);
    
            }catch(error){
    
                console.error('Erro ao buscar dados da API:', error);
    
            }

        }

        fetchData();

    }, [Ano_selecionado])

    useFocusEffect(

        useCallback(() => {

            carregar_API();
    
          return () => {

            setData([]);
            setData_totalMedia([]);
            setData_detalhes([]);
            setData_mes([]);

            set_loadAPI(true);

          };
          
        }, [Ano_selecionado])

    );

    const data2 = {
        labels: [

            "Jan",
            "Fev",
            "Mar",
            "Abr",
            "Mai",
            "Jun",
            "Jul",
            "Ago",
            "Set",
            "Out",
            "Nov",
            "Dez",

        ], // rótulos do eixo X
        datasets: [
            {
            data: DATA, // valores do eixo Y
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // opcional
            strokeWidth: 2 // opcional
            }
        ]
        };

    const handleDataPointClick = (data) => {
        
        setSelectedValue(data.value);
        setSelectedX(data.x);
        setSelectedY(data.y);

        setTimeout(() => {

            setSelectedValue(null);
            setSelectedX(null);
            setSelectedY(null);
            
        }, 3000);
    };

    const navigation = useNavigation();

    const chartConfig = {
    backgroundGradientFrom: "#FFF",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#FFF",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(128, 128, 128, ${opacity})`,
    strokeWidth: 1, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    style: {
        borderRadius: 16,
    },
    propsForDots: {
        r: "6",
        strokeWidth: "4",
        stroke: "#FFF"
    },
    propsForBackgroundLines:{

        strokeWidth: 1,
        stroke: "#ddd",
        strokeDasharray: [4, 4],
        opacity: 0.5

    }
    };

    function posicao_valor(valor){

        posicao = 0;

        if(valor >= 0 && valor < 10){

            posicao = selectedX - 50;

        }else if(valor >= 10 && valor < 100){

            posicao = selectedX - 58;

        }else if(valor >= 100 && valor < 1000){

            posicao = selectedX - 65;

        }else if(valor >= 1000 && valor < 10000){

            posicao = selectedX - 67;

        }else if(valor >= 10000 && valor < 100000){

            posicao = selectedX - 77;

        }else{

            posicao = selectedX - 90;

        }

        return posicao;

    }

    function retorna_datas(){

        const data_atual = new Date();
        var ano_atual = data_atual.getFullYear();

        const DATA_anos = [];

        var i = 0

        while(i <= 10){

            DATA_anos.push(ano_atual);

            ano_atual--;

            i++;
        }

        return DATA_anos

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

                        <FlatList
                        data={retorna_datas()}
                        renderItem={({item}) =>
                        
                            <View>

                                <TouchableNativeFeedback onPress={()=> {setAnoSelecionado(item), setModalVisible(false)}}>

                                    <View style={styles.item_lista_anos}>

                                        <Text>

                                            {item}

                                        </Text>

                                    </View>

                                </TouchableNativeFeedback>

                            </View>
                        
                        }

                        keyExtractor={item => item}
                        />
                      
                    </View>

                </View>

                </TouchableWithoutFeedback>

            </Modal>

            {load_API == true ? (

                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>

                    <Image style={styles.gif_load} source={require("../../img/carregando.gif")} />

                </View>

            ):(

                <ScrollView>

                    <View style={[styles.barraPeriodo]}>

                        <TouchableWithoutFeedback onPress={()=> setModalVisible(true)}>

                            <Text style={styles.txtPeriodo}>

                                {Ano_selecionado}

                            </Text>

                        </TouchableWithoutFeedback>

                    </View>

                    <View style={[styles.container_padrao, {paddingVertical: 30}]}>

                        <View style={{flexDirection: "row", justifyContent: "center"}}>

                            <Text style={{color: config.corTextoSecundario}}>

                                Total do ano:{" "}

                            </Text>

                            {DATA_totalMedia == false ? (

                                <Text style={{color: "#6ec0fa"}}>

                                    Indisponível

                                </Text>

                            ):(

                                <Text style={{color: "#6ec0fa"}}>

                                    R${DATA_totalMedia.total.toFixed(2)}

                                </Text>

                            )}

                        </View>

                        <View>

                            <View style={{flexDirection: "row", justifyContent: "center"}}>

                                <Text style={{textAlign: "center", color: config.corTextoSecundario}}>

                                    Média mensal:{" "}

                                </Text>

                                {DATA_totalMedia == false ? (

                                    <Text style={{textAlign: "center", color: config.corObs}}>

                                        Indisponível

                                    </Text>

                                ):(

                                    <Text style={{textAlign: "center", color: config.corObs}}>

                                        R${DATA_totalMedia.media.toFixed(2)}

                                    </Text>
                                    
                                )}

                            </View>

                        </View>

                    </View>

                    <View style={[styles.container_padrao, styles.container_abaixo, styles.container_grafico]}>

                        <ScrollView
                        
                        horizontal

                        >

                            <LineChart
                            data={data2}
                            width={Dimensions.get("window").width}
                            height={300}
                            chartConfig={chartConfig}
                            backgroundColor={"transparent"}
                            paddingLeft={"0"}
                            center={[10, 10]}
                            absolute={false}
                            hasLegend={true}
                            avoidFalseZero={false}
                            bezier={true}
                            withDots={true}
                            onDataPointClick={handleDataPointClick}
                            />

                            {selectedValue !== null && (
                                <View style={{ position: 'absolute', left: posicao_valor(selectedValue), top: selectedY - 10 }}>
                                    <Text style={{ color: config.cor2, fontSize: 12, backgroundColor: "#FFF" }}>R${selectedValue.toFixed(2)}</Text>
                                </View>
                            )}

                        </ScrollView>

                        {/* <View style={{flexDirection: "row"}}>

                            <Text style={{color: config.corTextoSecundario, fontStyle: "italic"}}>

                                Total do ano:{" "}

                            </Text>

                            {DATA_totalMedia == false? (

                                <Text style={{color: "#6ec0fa", fontStyle: "italic"}}>

                                    Indisponível

                                </Text>

                            ):(

                                <Text style={{color: "#6ec0fa", fontStyle: "italic"}}>

                                    R${DATA_totalMedia.total.toFixed(2)}

                                </Text>

                            )}

                        </View>

                        <View style={{flexDirection: "row"}}>

                            <Text style={{color: config.corTextoSecundario, fontStyle: "italic"}}>

                                A média mensal é de:{" "}

                            </Text>

                            {DATA_totalMedia == false ? (

                                <Text style={{color: "#6ec0fa", fontStyle: "italic"}}>

                                    Indisponível

                                </Text>

                            ):(

                                <Text style={{color: "#6ec0fa", fontStyle: "italic"}}>

                                    R${DATA_totalMedia.media.toFixed(2)}

                                </Text>

                            )}

                        </View> */}

                        {/* <Text style={{color: config.corTextoSecundario, marginTop: 10}}>

                            Despesas de:

                        </Text> */}

                        {/* <TouchableWithoutFeedback onPress={()=> setModalVisible(true)}>

                            <Text style={styles.txtPeriodo}>

                                {Ano_selecionado}

                            </Text>

                        </TouchableWithoutFeedback> */}

                    </View>

                    <View style={[{alignItems: "center", paddingVertical: 8}]}>

                        <Icon
                            name="chevron-down"
                            size={25}
                            color={"#DDD"}
                        />

                    </View>

                    <View style={[styles.container_padrao]}>

                        <View style={styles.linha_nomes_legendas}>

                            <View style={{flex: 2}}>

                                <Text>

                                    

                                </Text>

                            </View>

                            <View style={{flex: 1}}>

                                <Text style={{textAlign: "center", color: config.corTextoSecundario, fontSize: 10}}>

                                    Compras

                                </Text>

                                <Text style={{textAlign: "center", color: config.corTextoSecundario, fontSize: 10}}>

                                    efetuadas

                                </Text>

                            </View>

                            <View style={{flex: 1}}>

                                <Text>

                                    

                                </Text>

                            </View>

                        </View>

                        {DATA_totalMedia == false ? (

                            <View style={{justifyContent: "center", alignItems: "center", height: 50}}>

                                <Text style={{color: config.corTextoSecundario}}>

                                    Nenhuma compra disponível

                                </Text>

                            </View>

                        ):(

                            DATA_detalhes.map(item=>(

                                item.qtd_compras > 0 ? (

                                    <View key={item.nome} style={styles.linha_nomes}>

                                        <View style={styles.linha_nomes_principal}>

                                            <View style={{flex: 2}}>

                                                <Text style={{paddingLeft: 5}}>

                                                    {item.nome}

                                                </Text>

                                            </View>

                                            <View style={{flex: 1}}>

                                                <Text style={{textAlign: "center"}}>

                                                    {item.qtd_compras}

                                                </Text>

                                            </View>

                                            <View style={{flex: 1}}>

                                                <Text style={{textAlign: "right", paddingRight: 5}}>

                                                    R${item.valor_total.toFixed(2)}

                                                </Text>

                                            </View>

                                        </View>

                                        <View style={styles.area_legenda}>

                                            {/* Linha */}
                                            <View style={{flexDirection: "row", justifyContent: "flex-end", paddingVertical: 2}}>

                                                <Text style={styles.txt_legenda}>

                                                    Categoria mais utilizada: {" "}

                                                </Text>

                                                {item.categoria_principal == null ? (

                                                    <Text style={[styles.txt_legenda, styles.txt_legenda_principal]}>

                                                        Indisponível

                                                    </Text>

                                                ):(

                                                    <Text style={[styles.txt_legenda, styles.txt_legenda_principal, {color: "#6ec0fa"}]}>

                                                        {item.categoria_principal}

                                                    </Text>
                                                    
                                                )}

                                            </View>

                                            {/* Linha */}
                                            <View style={{flexDirection: "row", justifyContent: "flex-end", paddingVertical: 2}}>

                                                <Text style={styles.txt_legenda}>

                                                    Mecado mais frequente: {" "}

                                                </Text>

                                                {item.mercado_principal == null ? (

                                                    <Text style={[styles.txt_legenda, styles.txt_legenda_principal]}>

                                                        Indisponível

                                                    </Text>

                                                ):(

                                                    <Text style={[styles.txt_legenda, styles.txt_legenda_principal, {color: "#6ec0fa"}]}>

                                                        {item.mercado_principal}

                                                    </Text>

                                                )}

                                            </View>

                                            {/* Linha */}
                                            <View style={{flexDirection: "row", justifyContent: "flex-end", paddingVertical: 2}}>

                                                <Text style={styles.txt_legenda}>

                                                    Produto mais comprado: {" "}

                                                </Text>

                                                {item.produto_principal == null ? (

                                                    <Text style={[styles.txt_legenda, styles.txt_legenda_principal]}>

                                                        Indisponível

                                                    </Text>

                                                ):(

                                                    <Text style={[styles.txt_legenda, styles.txt_legenda_principal, {color: "#6ec0fa"}]}>

                                                        {item.produto_principal}

                                                    </Text>


                                                )}

                                            </View>

                                        </View>

                                    </View>

                                ):null

                            ))

                        )}

                    </View>

                </ScrollView>

            )}

        </View>

    )

}

const styles = StyleSheet.create({

    container: {

        flex:1,
        backgroundColor: "#EEE"
    
    },

    /* Barra inicial de períodos */

    barraPeriodo:{

        padding: 10,
        justifyContent: "center",
        alignItems: "center"

    },

    barraPadrao:{

        height: 40,
        justifyContent: "center",
        alignItems: "center"

    },

    barra_baixo:{

        marginTop: 10

    },

    txtPeriodo:{

        color: "#FFF",
        paddingVertical: 7,
        paddingHorizontal: 20,
        backgroundColor: config.cor2,
        borderRadius: 20

    },

    txtPadrao:{

        color: "#777",

    },

    container_padrao:{

        backgroundColor: "#FFF",
        marginHorizontal: 5,
        borderRadius: 2,
        elevation: 5,

    },

    container_abaixo:{

        marginTop: 15

    },

    container_grafico:{

        justifyContent: "center",
        alignItems: "center",
        paddingTop: 15

    },

    container_total:{
        
        justifyContent: "center",
        alignItems: "center",
        height: 50

    },

    linha_padrao:{

        justifyContent: "center"

    },

    cor_nome:{

        width: 30,
        height: 30,
        backgroundColor: "red",
        borderRadius: 50,
        marginLeft: 5

    },

    linha_nomes:{

        flexDirection: "column",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#DDD",

    },

    linha_nomes_principal:{

        flexDirection: "row",

    },

    linha_nomes_legendas:{

        flexDirection: "row",
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#DDD",


    },

    area_legenda:{

        paddingHorizontal: 5,
        paddingTop: 5,
        marginTop: 5,
        borderTopWidth: 1,
        borderTopColor: "#DDD",
        borderStyle: "dotted"

    },

    txt_legenda:{

        color: config.corTextoSecundario,
        fontSize: 11,
        fontStyle: "italic"

    },

    txt_legenda_principal:{

        fontWeight: "800"

    },

    container_nomes:{

        minHeight: 150

    },

    /* ***** */

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

    item_lista_anos:{

        paddingVertical: 15,
        paddingHorizontal: 10

    }

})