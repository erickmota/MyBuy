import React, {useLayoutEffect, useState} from 'react';
import { StyleSheet, Text, View, Dimensions,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { BarChart } from 'react-native-chart-kit';
import { PieChart } from 'react-native-chart-kit';
import { LineChart } from 'react-native-chart-kit';
import { ProgressChart } from 'react-native-chart-kit';

import config from '../../config';
import { color } from 'react-native-elements/dist/helpers';

export default function Categorias(){

    const [selectedValue, setSelectedValue] = useState(null);
    const [selectedX, setSelectedX] = useState(null);
    const [selectedY, setSelectedY] = useState(null);

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

    const data = [
        {
          name: "Bebidas",
          population: 5000000,
          color: "rgba(131, 167, 234, 1)",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Mistura de café",
          population: 2800000,
          color: "#F00",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Beijing",
          population: 527612,
          color: "red",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "New York",
          population: 8538000,
          color: "#CCC",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Moscow",
          population: 11920000,
          color: "rgb(0, 4, 255)",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
            name: "Moscow",
            population: 11920000,
            color: "rgb(0, 150, 255)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
          },
          {
            name: "Moscow",
            population: 11920000,
            color: "rgb(55, 0, 255)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
          },
          {
            name: "Moscow",
            population: 11920000,
            color: "rgb(79, 0, 255)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
          },
          {
            name: "Moscow",
            population: 11920000,
            color: "rgb(128, 50, 255)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
          },
          {
            name: "Moscow",
            population: 0,
            color: "rgb(80, 0, 255)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
          }
      ];

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
            data: [20, 22, 21, 20, 22, 22, 21, 19, 20.4, 20, 18, 19], // valores do eixo Y
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // opcional
            strokeWidth: 2 // opcional
          }
        ]
      };

      const data3 = {
        labels: ["Gastos"], // optional
        data: [0.4]
      };

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

    return(

        <View style={styles.container}>

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
                    />
                    {selectedValue !== null && (
                        <View style={{ position: 'absolute', left: selectedX - 40, top: selectedY - 10 }}>
                            <Text style={{ color: config.cor2, fontSize: 12 }}>R${selectedValue}</Text>
                        </View>
                    )}

                </ScrollView>

                <View style={{flexDirection: "row"}}>

                    <Text style={{color: config.corTextoSecundario, fontStyle: "italic"}}>

                        Total do ano:{" "}

                    </Text>

                    <Text style={{color: "#6ec0fa", fontStyle: "italic"}}>

                        R$2556,32

                    </Text>

                </View>

                <View style={{flexDirection: "row"}}>

                    <Text style={{color: config.corTextoSecundario, fontStyle: "italic"}}>

                        A média mensal é de:{" "}

                    </Text>

                    <Text style={{color: "#6ec0fa", fontStyle: "italic"}}>

                        R$556,32

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

                <View style={styles.linha_nomes}>

                    <View style={styles.linha_nomes_principal}>

                        <View style={{flex: 2}}>

                            <Text style={{paddingLeft: 5}}>

                                Dezembro

                            </Text>

                        </View>

                        <View style={{flex: 1}}>

                            <Text style={{textAlign: "center"}}>

                                17

                            </Text>

                        </View>

                        <View style={{flex: 1}}>

                            <Text style={{textAlign: "right", paddingRight: 5}}>

                                R$566,65

                            </Text>

                        </View>

                    </View>

                    <View style={styles.area_legenda}>

                        {/* Linha */}
                        <View style={{flexDirection: "row", justifyContent: "flex-end", paddingVertical: 2}}>

                            <Text style={styles.txt_legenda}>

                                Categoria mais utilizada: {" "}

                            </Text>

                            <Text style={[styles.txt_legenda, styles.txt_legenda_principal]}>

                                Mistura de café

                            </Text>

                        </View>

                        {/* Linha */}
                        <View style={{flexDirection: "row", justifyContent: "flex-end", paddingVertical: 2}}>

                            <Text style={styles.txt_legenda}>

                                Mecado mais frequente: {" "}

                            </Text>

                            <Text style={[styles.txt_legenda, styles.txt_legenda_principal]}>

                                Comercial Esperança - Loja

                            </Text>

                        </View>

                        {/* Linha */}
                        <View style={{flexDirection: "row", justifyContent: "flex-end", paddingVertical: 2}}>

                            <Text style={styles.txt_legenda}>

                                Produto com maior gasto: {" "}

                            </Text>

                            <Text style={[styles.txt_legenda, styles.txt_legenda_principal]}>

                                Café premium

                            </Text>

                        </View>

                    </View>

                </View>

                <View style={styles.linha_nomes}>

                    <View style={styles.linha_nomes_principal}>

                        <View style={{flex: 2}}>

                            <Text style={{paddingLeft: 5}}>

                                Novembro

                            </Text>

                        </View>

                        <View style={{flex: 1}}>

                            <Text style={{textAlign: "center"}}>

                                17

                            </Text>

                        </View>

                        <View style={{flex: 1}}>

                            <Text style={{textAlign: "right", paddingRight: 5}}>

                                R$566,65

                            </Text>

                        </View>

                    </View>

                    <View style={styles.area_legenda}>

                        {/* Linha */}
                        <View style={{flexDirection: "row", justifyContent: "flex-end", paddingVertical: 2}}>

                            <Text style={styles.txt_legenda}>

                                Categoria mais utilizada: {" "}

                            </Text>

                            <Text style={[styles.txt_legenda, styles.txt_legenda_principal]}>

                                Mistura de café

                            </Text>

                        </View>

                        {/* Linha */}
                        <View style={{flexDirection: "row", justifyContent: "flex-end", paddingVertical: 2}}>

                            <Text style={styles.txt_legenda}>

                                Mecado mais frequente: {" "}

                            </Text>

                            <Text style={[styles.txt_legenda, styles.txt_legenda_principal]}>

                                Comercial Esperança - Loja

                            </Text>

                        </View>

                        {/* Linha */}
                        <View style={{flexDirection: "row", justifyContent: "flex-end", paddingVertical: 2}}>

                            <Text style={styles.txt_legenda}>

                                Produto com maior gasto: {" "}

                            </Text>

                            <Text style={[styles.txt_legenda, styles.txt_legenda_principal]}>

                                Café premium

                            </Text>

                        </View>

                    </View>

                </View>

            </View>

            </ScrollView>

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

    }

})