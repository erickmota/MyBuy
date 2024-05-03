import React, {useState} from "react"
import { View, Text, StyleSheet, TextInput, useWindowDimensions, TouchableNativeFeedback } from "react-native"
import { useNavigation } from '@react-navigation/native';

import config from "../config";

export default function Cadastro(){

    /* Use state dos inputs */
    const [number, onChangeNumber] = React.useState('');

    /* Tamanho da tela */
    const larguraTela = useWindowDimensions().width;
    const larguraEspacoLogin = larguraTela * 0.85;

    const navigation = useNavigation();

    return(

        <View style={styles.container}>

            <View style={[styles.areaLogin, {width: larguraEspacoLogin}]}>

                <View style={styles.conteudoLogin}>

                    <View style={styles.inputs}>

                        <Text style={styles.titulo}>

                            Nome:

                        </Text>

                        <TextInput style={styles.input}
                        onChangeText={onChangeNumber}
                        value={number}
                        keyboardType="default"
                        />

                        <Text style={[styles.titulo, styles.tituloSeguinte]}>

                            E-mail:

                        </Text>

                        <TextInput style={styles.input}
                        onChangeText={onChangeNumber}
                        value={number}
                        keyboardType="default"
                        />

                        <Text style={[styles.titulo, styles.tituloSeguinte]}>

                            Senha:

                        </Text>

                        <TextInput style={styles.input}
                        onChangeText={onChangeNumber}
                        value={number}
                        keyboardType="default"
                        />

                        <Text style={[styles.titulo, styles.tituloSeguinte]}>

                            Confirmar senha:

                        </Text>

                        <TextInput style={styles.input}
                        onChangeText={onChangeNumber}
                        value={number}
                        keyboardType="default"
                        />

                    </View>

                    <View style={styles.botoes}>

                        <View style={styles.espacoBtnNativo}>

                            <TouchableNativeFeedback onPress={() => navigation.navigate("Login")}>

                                <View style={[styles.btnNativo, styles.btnCadastrar]}>

                                    <Text style={styles.textBtn}>

                                        VOLTAR

                                    </Text>

                                </View>

                            </TouchableNativeFeedback>

                            <View style={[styles.btnNativo, styles.btnEntrar]}>

                                <Text style={styles.textBtn}>

                                    CADASTRAR

                                </Text>

                            </View>

                        </View>

                    </View>

                </View>

            </View>

        </View>

    )

}

const styles = StyleSheet.create({

    container:{

        flex: 1,
        backgroundColor: "#e1c6f5",
        justifyContent: "center",
        alignItems: "center"

    },

    areaLogin:{

        backgroundColor: "#FFF",
        height: "auto",
        borderRadius: 20,
        elevation: 10,
        paddingVertical: 35

    },

    titulo:{

        fontSize: 16,
        paddingHorizontal: 15,
        color: "#555"

    },

    input:{

        borderBottomWidth: 1,
        borderBottomColor: "#CCC",
        marginTop: 20,
        fontSize: 20,
        marginHorizontal: 15,
        color: "#777"

    },

    tituloSeguinte:{

        marginTop: 20

    },

    botoes:{

        marginTop: 30

    },

    espacoBtnNativo:{

        flexDirection: "row",
        marginBottom: 10,

    },

    btnNativo:{

        height: 60,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 5

    },

    btnCadastrar:{

        backgroundColor: "#999",
        flex: 1,
        marginLeft: 15,
        marginRight: 3

    },

    btnEntrar:{

        backgroundColor: config.cor2,
        flex: 1,
        marginRight: 15,
        marginLeft: 3

    },

    textBtn:{

        color: "#FFF"

    },

})