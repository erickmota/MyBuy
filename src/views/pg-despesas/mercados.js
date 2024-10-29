import React, {useLayoutEffect, useState} from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';
import { PieChart } from 'react-native-chart-kit';

import config from '../../config';

export default function Categorias(){

    const navigation = useNavigation();

     /* Menu popup */
     const [visible, setVisible] = useState(false);
     const openMenu = () => setVisible(true);
     const closeMenu = () => setVisible(false);

     const [URL_API, setURL_API] = useState("mes_passado");

    useLayoutEffect(()=>{

        const parent = navigation.getParent();

        if(parent){

            parent.setOptions({
            
            headerRight: () => (
                    <View style={{ flexDirection: 'row' }}>
                        <Menu
                            visible={visible}
                            onDismiss={closeMenu}
                            anchor={
                                <Icon
                                    name="filter-variant-plus"
                                    size={25}
                                    color={"white"}
                                    style={{ marginRight: 10 }}
                                    onPress={openMenu}
                                />
                            }
                        >
                            <Menu.Item style={URL_API == "mes_atual" ? {backgroundColor: config.cor2} : null} onPress={() => {}} title={<View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon
                                    name="sort-calendar-descending"
                                    size={30}
                                    color={URL_API == "mes_atual" ? "white": "#444"}
                                    style={{ marginRight: 10 }}
                                />
                                <Text style={URL_API == "mes_atual" ? {marginLeft: 0, color: "white"}:{marginLeft: 0, color: "#444"}}>Mês atual</Text>
                            </View>} />

                            <Menu.Item style={URL_API == "mes_passado" ? {backgroundColor: config.cor2} : null} onPress={() => {}} title={<View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon
                                    name="sort-calendar-ascending"
                                    size={30}
                                    color={URL_API == "mes_passado" ? "white": "#444"}
                                    style={{ marginRight: 10 }}
                                />
                                <Text style={URL_API == "mes_passado" ? {marginLeft: 0, color: "white"}:{marginLeft: 0, color: "#444"}}>Mês passado</Text>
                            </View>} />

                            <Menu.Item style={divide_url(URL_API) == "escolher_datas" ? {backgroundColor: config.cor2} : null} onPress={() => {{}}} title={<View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon
                                    name="calendar-range"
                                    size={28}
                                    color={divide_url(URL_API) == "escolher_datas" ? "white": "#444"}
                                    style={{ marginLeft: -3 }}
                                />
                                <Text style={divide_url(URL_API) == "escolher_datas" ? {marginLeft: 14, color: "white"}:{marginLeft: 14, color: "#444"}}>Selecionar datas</Text>
                            </View>} />

                        </Menu>
                    </View>
              ),

        })

    }

    },[navigation, URL_API, visible])

    const divide_url = (url) => {

        url_inicial = url.split("/");

        return url_inicial[0]

    }

    const data = [
        {
          name: "Bebidas",
          population: 5000000,
          color: "rgba(131, 167, 234, 1)",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Mistura de c...",
          population: 2800000,
          color: "#F00",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Beijing",
          population: 612,
          color: "red",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "New York",
          population: 88000,
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
            population: 119000,
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
        labels: ["January", "February", "March", "April", "May", "June", "Julho", "Julho", "Julho", "Julho", "Julho", "Dezembro"], // rótulos do eixo X
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43, 80, 42, 10, 11, 72, 44,], // valores do eixo Y
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

            <View style={styles.barraPeriodo}>

                <Text style={styles.txtPeriodo}>

                    Mês atual

                </Text>

            </View>

            <View style={[styles.container_padrao, styles.container_total]}>

                <Text>

                    Gasto total: R$853,25

                </Text>

            </View>

            <View style={[styles.container_padrao, styles.container_grafico]}>

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

            </View>

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

        height: 40,
        justifyContent: "center",
        alignItems: "center"

    },

    container_padrao:{

        backgroundColor: "#FFF",
        marginHorizontal: 5,
        borderRadius: 2,
        elevation: 5,

    },

    container_grafico:{

        paddingBottom: 22,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10

    },

    container_total:{
        
        justifyContent: "center",
        alignItems: "center",
        height: 50

    }

})