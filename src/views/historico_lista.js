import React, {useState, useContext, useLayoutEffect, useCallback} from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableWithoutFeedback, Modal, Button, StatusBar, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/user';
import { useFocusEffect } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Menu } from 'react-native-paper';

import config from '../config';

export default function Historico_lista(){

    return(

        <View style={styles.container}>

            <StatusBar backgroundColor={config.cor1} style="light" />

            <ScrollView>

                <View style={[styles.linha_balao_1, styles.linha_balao, {justifyContent: "flex-end"}]}>

                    <View style={styles.balao}>

                        <Text style={{color: "#666"}}>

                            12/11/2024 - 16:24

                        </Text>

                        <Text style={{marginTop: 10, color: "#222"}}>

                            Erick Mota foi adicionado a lista

                        </Text>

                    </View>

                </View>

                <View style={styles.linha_icon}>

                    <Icon
                        name="timeline-text-outline"
                        size={25}
                        color={"#DDD"}
                        />

                </View>

                <View style={[styles.linha_balao, {justifyContent: "flex-start"}]}>

                    <View style={styles.balao}>

                        <Text style={{color: "#666"}}>

                            12/11/2024 - 16:24

                        </Text>

                        <Text style={{marginTop: 10, color: "#222"}}>

                            Erick Mota saiu da lista

                        </Text>

                    </View>

                </View>

                <View style={styles.linha_icon}>

                    <Icon
                        name="timeline-text-outline"
                        size={25}
                        color={"#DDD"}
                        />

                </View>

                <View style={[styles.linha_balao, {justifyContent: "flex-start"}]}>

                    <View style={styles.balao}>

                        <Text style={{color: "#666"}}>

                            12/11/2024 - 16:24

                        </Text>

                        <Text style={{marginTop: 10, color: "#222"}}>

                            Compra efetuada por Erick Mota, no valor de R$59,90.{" "}

                            <Text style={{color: "#09F"}}>

                                Vizualizar compra

                            </Text>

                        </Text>

                    </View>

                </View>

                <View style={styles.linha_icon}>

                    <Icon
                        name="timeline-text-outline"
                        size={25}
                        color={"#DDD"}
                        />

                </View>

                <View style={[styles.linha_balao, {justifyContent: "flex-end"}]}>

                    <View style={styles.balao}>

                        <Text style={{color: "#666"}}>

                            12/11/2024 - 16:24

                        </Text>

                        <Text style={{marginTop: 10, color: "#222"}}>

                            Erick Mota adiciou o item "Sardinha" a lista

                        </Text>

                    </View>

                </View>

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
        padding: 15,
        borderRadius: 15,
        marginHorizontal: 10

    },

    linha_icon:{

        alignItems: "center",
        paddingVertical: 20

    }

})