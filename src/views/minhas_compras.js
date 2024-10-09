import React, {useState, useContext, useLayoutEffect, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Alert, Image, TouchableWithoutFeedback, Modal, Button, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/user';

import config from '../config';

export default function Minhas_compras(){

    const navigation = useNavigation();

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

        <View style={StyleSheet.container}>

            <ScrollView>

                <TouchableWithoutFeedback
                
                    onPress={()=> navigation.navigate("Minhas_compras_itens")}
                
                >

                    <View style={styles.boxCompra}>

                        <View style={styles.fundoData}>

                            <Icon
                                name="calendar-blank-outline"
                                size={25}
                                style={styles.iconCalendar}
                            />

                            <Text style={styles.textoData}>

                                06/10/2024

                            </Text>

                            <Icon
                                name="clock-time-eight-outline"
                                size={24}
                                style={styles.iconTime}
                            />

                            <Text style={styles.textoData}>

                                16:54

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

                                    25 Itens

                                </Text>

                            </View>

                            <View style={styles.areaValor}>

                                <Icon
                                    name="cash-register"
                                    size={30}
                                    style={styles.iconCash}
                                />

                                <Text style={styles.textValor}>

                                    R$1425.89

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

                                Comercial esperança - L4

                            </Text>

                        </View>

                    </View>

                </TouchableWithoutFeedback>

                <View style={styles.areaRisco}>

                    <Icon
                        name="timeline-text-outline"
                        size={30}
                        style={styles.iconDivisor}
                    />

                </View>

                <View style={styles.boxCompra}>

                    <View style={styles.fundoData}>

                        <Icon
                            name="calendar-blank-outline"
                            size={25}
                            style={styles.iconCalendar}
                        />

                        <Text style={styles.textoData}>

                            06/10/2024

                        </Text>

                        <Icon
                            name="clock-time-eight-outline"
                            size={24}
                            style={styles.iconTime}
                        />

                        <Text style={styles.textoData}>

                            16:54

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

                                25 Itens

                            </Text>

                        </View>

                        <View style={styles.areaValor}>

                            <Icon
                                name="cash-register"
                                size={30}
                                style={styles.iconCash}
                            />

                            <Text style={styles.textValor}>

                                R$1425.89

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

                            Comercial esperança - L4

                        </Text>

                    </View>

                </View>

                <View style={styles.areaRisco}>

                    <Icon
                        name="timeline-text-outline"
                        size={30}
                        style={styles.iconDivisor}
                    />

                </View>

                <View style={styles.boxCompra}>

                    <View style={styles.fundoData}>

                        <Icon
                            name="calendar-blank-outline"
                            size={25}
                            style={styles.iconCalendar}
                        />

                        <Text style={styles.textoData}>

                            06/10/2024

                        </Text>

                        <Icon
                            name="clock-time-eight-outline"
                            size={24}
                            style={styles.iconTime}
                        />

                        <Text style={styles.textoData}>

                            16:54

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

                                25 Itens

                            </Text>

                        </View>

                        <View style={styles.areaValor}>

                            <Icon
                                name="cash-register"
                                size={30}
                                style={styles.iconCash}
                            />

                            <Text style={styles.textValor}>

                                R$1425.89

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

                            Comercial esperança - L4

                        </Text>

                    </View>

                </View>

            </ScrollView>

        </View>

    )

}

const styles = StyleSheet.create({

    container: {

        flex:1,
    
    },

    /* Box */

    boxCompra:{

        height: 200,
        borderWidth: 1,
        borderColor: "#CCC",
        margin: 10,
        backgroundColor: "#FFF",
        borderRadius: 20,
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