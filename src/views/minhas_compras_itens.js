import React, {useState, useContext, useLayoutEffect, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Alert, Image, TouchableWithoutFeedback, Modal, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/user';

import config from '../config';

export default function Minhas_compras_itens(){

    return(

        <View style={styles.container}>

            <View style={styles.areaData}>

                <Text>16/10/1996 - 16:54</Text>

            </View>

            <View style={styles.areaMercado}>

                <Text>Comercial esperança - Raposo Tavares</Text>

            </View>

            <View style={styles.corpoTable}>

                <View style={styles.colunaItem}>

                    <Text style={styles.colunaTitle}>

                        Item

                    </Text>

                </View>

                <View style={styles.colunaQtd}>

                    <Text style={styles.colunaTitle}>

                        Qtd

                    </Text>

                </View>

                <View style={styles.colunaValor}>

                    <Text style={styles.colunaTitle}>

                        Valor

                    </Text>

                </View>

            </View>

            <View style={[styles.corpoTable, styles.itemTable]}>

                <View style={styles.colunaItem}>

                    <Text>

                        Arroz

                    </Text>

                </View>

                <View style={styles.colunaQtd}>

                    <Text>

                        2 kg

                    </Text>

                </View>

                <View style={styles.colunaValor}>

                    <Text>

                        R$15.99

                    </Text>

                </View>

            </View>

            <View style={[styles.corpoTable, styles.itemTable]}>

                <View style={styles.colunaItem}>

                    <Text>

                        Feijão

                    </Text>

                </View>

                <View style={styles.colunaQtd}>

                    <Text>

                        2 kg

                    </Text>

                </View>

                <View style={styles.colunaValor}>

                    <Text>

                        R$15.99

                    </Text>

                </View>

            </View>

            <View style={[styles.corpoTable, styles.itemTable]}>

                <View style={styles.colunaItem}>

                    <Text>

                        Milho de pipoca

                    </Text>

                </View>

                <View style={styles.colunaQtd}>

                    <Text>

                        2 kg

                    </Text>

                </View>

                <View style={styles.colunaValor}>

                    <Text>

                        R$15.99

                    </Text>

                </View>

            </View>

            <View style={[styles.corpoTable, styles.itemTable]}>

                <View style={styles.colunaItem}>

                    <Text>

                        Café

                    </Text>

                </View>

                <View style={styles.colunaQtd}>

                    <Text>

                        2 kg

                    </Text>

                </View>

                <View style={styles.colunaValor}>

                    <Text>

                        R$15.99

                    </Text>

                </View>

            </View>

            <View style={[styles.corpoTable, styles.areaTotal]}>

                <Text style={styles.textTotal}>

                    Total:

                </Text>

                <Text style={styles.textValor}>

                    R$449.25

                </Text>

            </View>

        </View>

    )

}

const styles = StyleSheet.create({

    container: {

        flex:1,
    
    },

    areaData:{

        justifyContent: "center",
        alignItems: "center",
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: "#CCC"

    },

    areaMercado:{

        justifyContent: "center",
        alignItems: "center",
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: "#CCC"

    },

    /* Tabela */

    corpoTable:{

        flexDirection: "row"

    },

    areaTotal:{

        padding: 10,
        marginTop: 10,
        alignItems: "flex-end",
        justifyContent: "flex-end"

    },

    textTotal:{

        top: -3,
        color: config.corTextoSecundario

    },

    textValor:{

        fontSize: 22,
        fontWeight: "500",
        marginLeft: 10
        
    },

    itemTable:{

        borderBottomWidth: 1,
        borderBottomColor: "#CCC"

    },

    colunaTitle:{

        fontWeight: "900"

    },

    colunaItem:{

        flex: 3,
        padding: 10

    },

    colunaQtd:{

        flex: 1,
        padding: 10
        
    },

    colunaValor:{

        flex: 1,
        padding: 10
        
    },

    /* ***** */

})