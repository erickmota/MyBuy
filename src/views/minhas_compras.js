import React, {useState, useContext, useLayoutEffect, useEffect, useCallback} from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Alert, Image, TouchableWithoutFeedback, Modal, Button, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/user';
import { useFocusEffect } from '@react-navigation/native';

import config from '../config';

export default function Minhas_compras(){

    const navigation = useNavigation();

    /* Contexto */
    const { DATAUser } = useContext(UserContext);

    /* Estados */
    const [DATA, setData] = useState([]);

    /* Conexão com a API da página compras */
    const carregar_API = useCallback(() => {

        fetch(`${config.URL_inicial_API}${DATAUser[0].id}/compras`)
        .then(response => response.json())
        .then(data => {
            setData(data.data);
        })
        .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
        });

    }, []);

    useFocusEffect(
        useCallback(() => {

            carregar_API();
    
          return () => {

          };
          
        }, [])
    );

    useLayoutEffect(()=>{

        navigation.setOptions({
            
            headerRight: () => (
                <Icon
                  name="calendar-blank-outline"
                  size={25}
                  color={"white"}
                  style={{marginRight: 10}}
                  onPress={()=>

                    btn_apagar()
                    
                  }
                  />
              ),

        })

    },[])

    return(

        <View style={styles.container}>

            {DATA == false ? (

                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>

                    <Text style={{color: config.corTextoSecundario}}>

                        Recuperando suas compras...

                    </Text>

                </View>

            ):(

                <ScrollView>

                {DATA.map((item, index, array) => (

                    <View key={item.id}>

                        <TouchableWithoutFeedback
                        
                            onPress={()=> navigation.navigate("Minhas_compras_itens", {
                                id_compra: item.id,
                                data: item.data,
                                horas: item.horas,
                                valor_total: item.valor_compra,
                                mercado: item.nome_mercado
                            })}
                        
                        >

                            <View style={styles.boxCompra}>

                                <View style={styles.fundoData}>

                                    <Icon
                                        name="calendar-blank-outline"
                                        size={25}
                                        style={styles.iconCalendar}
                                    />

                                    <Text style={styles.textoData}>

                                        {item.data}

                                    </Text>

                                    <Icon
                                        name="clock-time-eight-outline"
                                        size={24}
                                        style={styles.iconTime}
                                    />

                                    <Text style={styles.textoData}>

                                        {item.horas}

                                    </Text>

                                </View>

                                <View style={styles.contentBox}>

                                    <View style={styles.areaQtd}>

                                        <Icon
                                            name="shopping-outline"
                                            size={30}
                                            style={styles.iconBag}
                                        />

                                        <Text style={styles.textBag}>

                                            {item.qtd_itens} Itens

                                        </Text>

                                    </View>

                                    <View style={styles.areaValor}>

                                        <Icon
                                            name="cash-register"
                                            size={30}
                                            style={styles.iconCash}
                                        />

                                        <Text style={styles.textValor}>

                                            R${item.valor_compra}

                                        </Text>

                                    </View>

                                </View>

                                <View style={styles.areaMercado}>

                                    <Icon
                                        name="map-marker-outline"
                                        size={25}
                                        style={styles.iconLocal}
                                    />

                                    <Text style={styles.textoMercado}>

                                        {item.nome_mercado}

                                    </Text>

                                </View>

                            </View>

                        </TouchableWithoutFeedback>

                        {index !== array.length - 1 && (

                            <View style={styles.areaRisco}>

                                <Icon
                                    name="timeline-text-outline"
                                    size={30}
                                    style={styles.iconDivisor}
                                />

                            </View>

                        )}

                    </View>

                ))}

            </ScrollView>

            )}

        </View>

    )

}

const styles = StyleSheet.create({

    container: {

        flex:1
    
    },

    /* Box */

    boxCompra:{

        height: 200,
        borderWidth: 1,
        borderColor: "#CCC",
        margin: 10,
        backgroundColor: "#FFF",
        borderRadius: 5,
        elevation: 7,

    },

    fundoData:{

        flex: 1,
        flexDirection: "row",
        backgroundColor: config.cor2,
        alignItems: "center",
        justifyContent: "center",
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5

    },

    iconCalendar:{

        color: "#FFF",
        marginRight: 5

    },

    iconTime:{

        color: "#FFF",
        marginLeft: 30,
        marginRight: 5

    },

    textoData:{

        color: "white",
        fontSize: 14,
        fontWeight: "600"

    },

    contentBox:{

        flex: 2,
        flexDirection: "row",

    },

    iconBag:{

        color: config.corObs

    },

    textBag:{

        color: config.corTextoSecundario,
        fontSize: 15,
        marginHorizontal: 5

    },

    textValor:{

        color: config.corTextoSecundario,
        fontSize: 22,
        marginHorizontal: 5,
        fontWeight: "500"

    },

    iconCash:{

        color: "#6ec0fa"

    },

    areaMercado:{

        flexDirection: "row",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderTopWidth: 1,
        borderColor: "#CCC",
        borderStyle: "dotted"

    },

    iconLocal:{

        color: "#CCC"

    },

    areaQtd:{

        flex: 5,
        flexDirection: "row",
        borderRightWidth: 1,
        borderColor: "#CCC",
        borderStyle: "dotted",
        justifyContent: "center",
        alignItems: "center",

    },

    areaValor:{

        flex: 7,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"

    },

    /* ***** */

    /* Risco icone */

    areaRisco:{

        alignItems: "center",
        marginVertical: 10

    },

    textoMercado:{

        color: config.corTextoSecundario

    },

    iconDivisor:{

        color: "#BBB"

    },

    /* ***** */

})