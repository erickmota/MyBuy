import React, {useState, useEffect, useContext} from "react"
import { View, Text, StyleSheet, TextInput, useWindowDimensions, TouchableNativeFeedback, StatusBar, Image} from "react-native"
import { useNavigation } from '@react-navigation/native';
import * as SQLite from "expo-sqlite"
import { UserContext } from '../context/user';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import config from "../config";

export default function Perfil(){

    /* Contexto */
    const { DATAUser } = useContext(UserContext);

    const [DATA, setData] = useState([]);

    useEffect(()=>{

        fetch(`${config.URL_inicial_API}${DATAUser[0].id}/perfil`)
        .then(response => response.json())
        .then(data => {
            setData(data.data);
        })
        .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
        });

    },[DATAUser])

    return(

        <View style={styles.container}>

            <View style={styles.area_foto}>

                <Image style={styles.img_user} source={{ uri: `${config.Foto_usuario_nulo}` }} />

            </View>

            <View style={styles.informacoes}>

                {/* <View style={styles.area_confirma}>

                    <Text style={[styles.txt_padrao, styles.txt_confirma]}>

                        Confirmação pendente!

                    </Text>

                    <Text style={[styles.txt_confirma]}>

                        Clique no link que enviamos para seu endereço de e-mail.

                    </Text>

                    <Text style={[styles.txt_confirma]}>

                        Prazo de 7 dias restantes

                    </Text>

                    <Text style={[styles.txt_confirma, {marginTop: 15}]}>

                        REENVIAR E-MAIL

                    </Text>

                </View> */}

                {DATA.map(item=>(

                    <View key={item.nome}>

                        <View style={styles.area_inf}>

                            <View style={styles.col_1}>

                                <Text style={[styles.txt_padrao, styles.txt_titulo]}>

                                    Nome:

                                </Text>

                            </View>

                            <View style={styles.col_2}>

                                <Text style={styles.txt_padrao}>

                                    {item.nome}

                                </Text>

                            </View>

                            <View style={styles.col_3}>

                                <Icon
                                    name="pencil-box"
                                    size={28}
                                    color={config.cor2}
                                />

                            </View>

                        </View>

                        <View style={styles.area_inf}>

                            <View style={styles.col_1}>

                                <Text style={[styles.txt_padrao, styles.txt_titulo]}>

                                    E-mail:

                                </Text>

                            </View>

                            <View style={styles.col_2}>

                                <Text style={styles.txt_padrao}>

                                    {item.email}

                                </Text>

                            </View>

                            <View style={styles.col_3}>

                                <Icon
                                    name="pencil-box"
                                    size={28}
                                    color={config.cor2}
                                />

                            </View>

                        </View>

                        <View style={styles.area_inf}>

                            <View style={styles.col_1}>

                                <Text style={[styles.txt_padrao, styles.txt_titulo]}>

                                    Senha:

                                </Text>

                            </View>

                            <View style={styles.col_2}>

                                <Text style={styles.txt_padrao}>

                                    **********

                                </Text>

                            </View>

                            <View style={styles.col_3}>

                                <Icon
                                    name="pencil-box"
                                    size={28}
                                    color={config.cor2}
                                />

                            </View>

                        </View>

                        <View style={styles.area_inf}>

                            <View style={styles.col_1}>

                                <Text style={[styles.txt_padrao, styles.txt_titulo]}>

                                    Cadastro:

                                </Text>

                            </View>

                            <View style={styles.col_2}>

                                <Text style={styles.txt_padrao}>

                                    {item.data_cadastro}

                                </Text>

                            </View>

                            <View style={styles.col_3}>

                                {/* ***** */}

                            </View>

                        </View>

                    </View>

                ))}

            </View>

        </View>

    )

}

const styles = StyleSheet.create({

    container:{

        flex: 1

    },

    area_foto:{

        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"

    },

    img_user:{

        width: 190,
        height: 190,
        borderRadius: 150

    },

    informacoes:{

        flex: 2

    },

    area_inf:{

        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 8

    },

    col_1:{

        flex: 1

    },

    col_2:{

        flex: 2

    },

    col_3:{

        flex: 1,
        alignItems: "flex-end"

    },

    txt_padrao:{

        fontSize: 16

    },

    txt_titulo:{

        fontWeight: "600"

    },

    area_confirma:{

        height: 110,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
        marginBottom: 15

    },

    txt_confirma:{

        color: "white",
        fontWeight: 600

    }

})