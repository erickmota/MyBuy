import React, {useEffect, useLayoutEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { BarChart } from 'react-native-chart-kit';
import { PieChart } from 'react-native-chart-kit';
import { LineChart } from 'react-native-chart-kit';
import { ProgressChart } from 'react-native-chart-kit';
import { UserContext } from '../../context/user';

import config from '../../config';
import { color } from 'react-native-elements/dist/helpers';

export default function Categorias(){

    /* Contexto */
    const { DATAUser } = useContext(UserContext);

    const [DATA, setData] = useState([]);
    const [DATA_totalMedia, setData_totalMedia] = useState([]);
    const [DATA_detalhes, setData_detalhes] = useState([]);
    const [load_API, set_loadAPI] = useState(true);

    const [selectedValue, setSelectedValue] = useState(null);
    const [selectedX, setSelectedX] = useState(null);
    const [selectedY, setSelectedY] = useState(null);

    useEffect(()=>{

        const fetchData = async () => {

            try{

                const [resposta_1, resposta_2, resposta_3] = await Promise.all([

                    fetch(`${config.URL_inicial_API}${DATAUser[0].id}/graficos/geral/2024`),
                    fetch(`${config.URL_inicial_API}${DATAUser[0].id}/graficos/total_media/2024`),
                    fetch(`${config.URL_inicial_API}${DATAUser[0].id}/graficos/detalhes_compras/2024`)

                ]);

                const [data_1, data_2, data_3] = await Promise.all([

                    resposta_1.json(),
                    resposta_2.json(),
                    resposta_3.json()

                ]);

                setData(data_1.data);
                setData_totalMedia(data_2.data);
                setData_detalhes(data_3.data);

                set_loadAPI(false);
    
            }catch(error){
    
                console.error('Erro ao buscar dados da API:', error);
    
            }

        }

        fetchData();

    }, [])

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

            posicao = selectedX - 47;

        }else if(valor >= 10 && valor < 100){

            posicao = selectedX - 53;

        }else if(valor >= 100 && valor < 1000){

            posicao = selectedX - 60;

        }else if(valor >= 1000 && valor < 10000){

            posicao = selectedX - 67;

        }else if(valor >= 10000 && valor < 100000){

            posicao = selectedX - 77;

        }else{

            posicao = selectedX - 90;

        }

        return posicao;

    }

    return(

        <View style={styles.container}>

            {load_API == true ? (

                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>

                    <Image style={styles.gif_load} source={require("../../img/carregando.gif")} />

                </View>

            ):(

                <ScrollView>

                    <View style={[styles.container_padrao, styles.container_abaixo, {paddingVertical: 10}]}>

                        <View style={{flexDirection: "row", justifyContent: "center"}}>

                            <Text style={{fontSize: 16, color: "#333"}}>

                                Depesas totais do mês atual:{" "}

                            </Text>

                            <Text style={{fontSize: 16, color: "red"}}>

                                R$835,56

                            </Text>

                        </View>

                        <View>

                            <Text style={{textAlign: "center", marginLeft: 65, color: config.corTextoSecundario}}>

                                Mês anterior: R$545,58

                            </Text>

                        </View>

                    </View>

                    <View style={[styles.container_padrao, styles.container_abaixo, styles.container_grafico]}>

                        <ScrollView
                        
                        horizontal

                        >

                            {DATA.length > 0 ? (

                                <LineChart
                                data={data2}
                                width={Dimensions.get("window").width}
                                height={250}
                                chartConfig={chartConfig}
                                accessor={"population"}
                                backgroundColor={"transparent"}
                                paddingLeft={"0"}
                                center={[10, 10]}
                                absolute={false}
                                hasLegend={true}
                                avoidFalseZero={false}
                                bezier={true}
                                withDots={true}
                                onDataPointClick={handleDataPointClick}
                                fromZero={true}
                                animation={true}
                                />

                            ):null}
                            {selectedValue !== null && (
                                <View style={{ position: 'absolute', left: posicao_valor(selectedValue), top: selectedY - 10 }}>
                                    <Text style={{ color: config.cor2, fontSize: 12, backgroundColor: "#FFF" }}>R${selectedValue.toFixed(2)}</Text>
                                </View>
                            )}

                        </ScrollView>

                        <View style={{flexDirection: "row"}}>

                            <Text style={{color: config.corTextoSecundario, fontStyle: "italic"}}>

                                Total do ano:{" "}

                            </Text>

                            <Text style={{color: "#6ec0fa", fontStyle: "italic"}}>

                                R${DATA_totalMedia.total.toFixed(2)}

                            </Text>

                        </View>

                        <View style={{flexDirection: "row"}}>

                            <Text style={{color: config.corTextoSecundario, fontStyle: "italic"}}>

                                A média mensal é de:{" "}

                            </Text>

                            <Text style={{color: "#6ec0fa", fontStyle: "italic"}}>

                                R${DATA_totalMedia.media.toFixed(2)}

                            </Text>

                        </View>

                        <Text style={{color: config.corTextoSecundario, marginTop: 10}}>

                            Despesas de:

                        </Text>

                        <Text style={styles.txtPeriodo}>

                            2024

                        </Text>

                    </View>

                    <View style={[styles.container_padrao, styles.container_abaixo]}>

                        <View style={styles.linha_nomes_legendas}>

                            <View style={{flex: 2}}>

                                <Text style={{paddingLeft: 5}}>

                                    

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

                                <Text style={{textAlign: "right", paddingRight: 5}}>

                                    

                                </Text>

                            </View>

                        </View>

                        {DATA_detalhes.map(item=>(

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

                                                <Text style={[styles.txt_legenda, styles.txt_legenda_principal]}>

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

                                                <Text style={[styles.txt_legenda, styles.txt_legenda_principal]}>

                                                    {item.mercado_principal}

                                                </Text>

                                            )}

                                        </View>

                                        {/* Linha */}
                                        <View style={{flexDirection: "row", justifyContent: "flex-end", paddingVertical: 2}}>

                                            <Text style={styles.txt_legenda}>

                                                Produto com maior gasto: {" "}

                                            </Text>

                                            {item.produto_principal == null ? (

                                                <Text style={[styles.txt_legenda, styles.txt_legenda_principal]}>

                                                    Indisponível

                                                </Text>

                                            ):(

                                                <Text style={[styles.txt_legenda, styles.txt_legenda_principal]}>

                                                    {item.produto_principal}

                                                </Text>


                                            )}

                                        </View>

                                    </View>

                                </View>

                            ):null

                        ))}

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

        backgroundColor: "#FFF",
        borderBottomWidth: 2,
        borderBottomColor: config.cor1,
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
        borderRadius: 20,
        marginTop: 5

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

        paddingBottom: 22,
        justifyContent: "center",
        alignItems: "center",

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

    }

})