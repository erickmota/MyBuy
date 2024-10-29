import React, {useLayoutEffect, useState} from 'react';
import { StyleSheet, Text, View, Dimensions,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { BarChart } from 'react-native-chart-kit';
import { PieChart } from 'react-native-chart-kit';
import { LineChart } from 'react-native-chart-kit';

import config from '../../config';

export default function Categorias(){

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
        labels: ["January", "February", "March", "April", "May", "June", "Julho", "Julho", "Julho", "Julho"], // rótulos do eixo X
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43, 80, 42, 10, 11], // valores do eixo Y
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // opcional
            strokeWidth: 2 // opcional
          }
        ]
      };

      const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#FFF",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(128, 0, 128, ${opacity})`,
        strokeWidth: 1, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };

    return(

        <View style={styles.container}>

            <View style={[styles.barraPeriodo]}>

                <Text style={styles.txtPeriodo}>

                    Mês atual

                </Text>

            </View>

            <ScrollView>

            {/* <View style={[styles.container_padrao, styles.container_total]}>

                <Text>

                    Gasto total: R$853,25

                </Text>

            </View> */}

            <View style={[styles.container_padrao, styles.container_abaixo, styles.container_grafico]}>

                <ScrollView
                
                horizontal

                >

                    <PieChart
                        data={data}
                        width={Dimensions.get('window').width}
                        height={250}
                        chartConfig={chartConfig}
                        accessor={"population"}
                        backgroundColor={"transparent"}
                        paddingLeft={"10"}
                        center={[10, 10]}
                        absolute={false}
                        hasLegend={true}
                        avoidFalseZero={false}
                    />

                </ScrollView>

                <Text style={{color: config.corTextoSecundario}}>

                    Categorias

                </Text>

            </View>

            <View style={[styles.container_padrao, styles.container_abaixo, styles.container_nomes]}>

                    <View style={styles.linha_nomes}>

                        <View style={{flex: 1}}>

                            <View style={styles.cor_nome}>

                                {/* Ícones de cor */}

                            </View>

                        </View>

                        <View style={[styles.linha_padrao, {flex: 3}]}>

                            <Text>

                                Mistura de café

                            </Text>

                        </View>

                        <View style={[styles.linha_padrao, {flex: 1}]}>

                            <Text style={{textAlign: "right"}}>

                                7%

                            </Text>

                        </View>

                        <View style={[styles.linha_padrao, {flex: 2}]}>

                            <Text style={{textAlign: "right", paddingRight: 5}}>

                                R$450,56

                            </Text>

                        </View>

                    </View>

                    <View style={styles.linha_nomes}>

                        <View style={{flex: 1}}>

                            <View style={styles.cor_nome}>

                                {/* Ícones de cor */}

                            </View>

                        </View>

                        <View style={[styles.linha_padrao, {flex: 3}]}>

                            <Text>

                                Mistura de café

                            </Text>

                        </View>

                        <View style={[styles.linha_padrao, {flex: 1}]}>

                            <Text style={{textAlign: "right"}}>

                                7%

                            </Text>

                        </View>

                        <View style={[styles.linha_padrao, {flex: 2}]}>

                            <Text style={{textAlign: "right", paddingRight: 5}}>

                                R$450,56

                            </Text>

                        </View>

                    </View>

                    <View style={styles.linha_nomes}>

                        <View style={{flex: 1}}>

                            <View style={styles.cor_nome}>

                                {/* Ícones de cor */}

                            </View>

                        </View>

                        <View style={[styles.linha_padrao, {flex: 3}]}>

                            <Text>

                                Mistura de café

                            </Text>

                        </View>

                        <View style={[styles.linha_padrao, {flex: 1}]}>

                            <Text style={{textAlign: "right"}}>

                                7%

                            </Text>

                        </View>

                        <View style={[styles.linha_padrao, {flex: 2}]}>

                            <Text style={{textAlign: "right", paddingRight: 5}}>

                                R$450,56

                            </Text>

                        </View>

                    </View>

                    <View style={styles.linha_nomes}>

                        <View style={{flex: 1}}>

                            <View style={styles.cor_nome}>

                                {/* Ícones de cor */}

                            </View>

                        </View>

                        <View style={[styles.linha_padrao, {flex: 3}]}>

                            <Text>

                                Mistura de café

                            </Text>

                        </View>

                        <View style={[styles.linha_padrao, {flex: 1}]}>

                            <Text style={{textAlign: "right"}}>

                                7%

                            </Text>

                        </View>

                        <View style={[styles.linha_padrao, {flex: 2}]}>

                            <Text style={{textAlign: "right", paddingRight: 5}}>

                                R$450,56

                            </Text>

                        </View>

                    </View>

                    <View style={styles.linha_nomes}>

                        <View style={{flex: 1}}>

                            <View style={styles.cor_nome}>

                                {/* Ícones de cor */}

                            </View>

                        </View>

                        <View style={[styles.linha_padrao, {flex: 3}]}>

                            <Text>

                                Mistura de café

                            </Text>

                        </View>

                        <View style={[styles.linha_padrao, {flex: 1}]}>

                            <Text style={{textAlign: "right"}}>

                                7%

                            </Text>

                        </View>

                        <View style={[styles.linha_padrao, {flex: 2}]}>

                            <Text style={{textAlign: "right", paddingRight: 5}}>

                                R$450,56

                            </Text>

                        </View>

                    </View>

                    <View style={styles.linha_nomes}>

                        <View style={{flex: 1}}>

                            <View style={styles.cor_nome}>

                                {/* Ícones de cor */}

                            </View>

                        </View>

                        <View style={[styles.linha_padrao, {flex: 3}]}>

                            <Text>

                                Mistura de café

                            </Text>

                        </View>

                        <View style={[styles.linha_padrao, {flex: 1}]}>

                            <Text style={{textAlign: "right"}}>

                                7%

                            </Text>

                        </View>

                        <View style={[styles.linha_padrao, {flex: 2}]}>

                            <Text style={{textAlign: "right", paddingRight: 5}}>

                                R$450,56

                            </Text>

                        </View>

                    </View>

                    <View style={styles.linha_nomes}>

                        <View style={{flex: 1}}>

                            <View style={styles.cor_nome}>

                                {/* Ícones de cor */}

                            </View>

                        </View>

                        <View style={[styles.linha_padrao, {flex: 3}]}>

                            <Text>

                                Mistura de café

                            </Text>

                        </View>

                        <View style={[styles.linha_padrao, {flex: 1}]}>

                            <Text style={{textAlign: "right"}}>

                                7%

                            </Text>

                        </View>

                        <View style={[styles.linha_padrao, {flex: 2}]}>

                            <Text style={{textAlign: "right", paddingRight: 5}}>

                                R$450,56

                            </Text>

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

        flexDirection: "row",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#DDD",

    },

    container_nomes:{

        minHeight: 150

    }

})