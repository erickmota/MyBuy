import React, {useState} from "react"
import { View, Text, StyleSheet, TextInput, useWindowDimensions } from "react-native"

import config from "../config";

export default function Login(){

    /* Use state dos inputs */
    const [number, onChangeNumber] = React.useState('');

    /* Tamanho da tela */
    const larguraTela = useWindowDimensions().width;
    const larguraEspacoLogin = larguraTela * 0.85;

    return(

        <View style={styles.container}>

            <View style={[styles.areaLogin, {width: larguraEspacoLogin}]}>

                <View style={styles.conteudoLogin}>

                    <View style={styles.inputs}>

                        <Text style={styles.titulo}>

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

                    </View>

                    <View style={styles.espacoEsqueci}>

                        <Text style={styles.txtEsqueci}>

                            Esqueci a senha

                        </Text>

                    </View>

                    <View style={styles.botoes}>

                        <View style={styles.espacoBtnNativo}>

                            <View style={[styles.btnNativo, styles.btnCadastrar]}>

                                <Text style={styles.textBtn}>

                                    CADASTRAR

                                </Text>

                            </View>

                            <View style={[styles.btnNativo, styles.btnEntrar]}>

                                <Text style={styles.textBtn}>

                                    ENTRAR

                                </Text>

                            </View>

                        </View>

                        <View style={styles.espacoBtnExtras}>

                            <View style={[styles.btn, styles.btnFacebook]}>

                                <Text style={styles.textBtn}>

                                    FACEBOOK

                                </Text>

                            </View>

                            <View style={[styles.btn, styles.btnGoole]}>

                                <Text style={styles.textBtn}>

                                    GOOGLE

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
        paddingVertical: 20

    },

    titulo:{

        fontSize: 20,
        paddingHorizontal: 15,
        color: "#555"

    },

    tituloSeguinte:{

        marginTop: 20

    },

    input:{

        borderBottomWidth: 1,
        borderBottomColor: "#CCC",
        marginTop: 20,
        fontSize: 20,
        marginHorizontal: 15,
        color: "#777"

    },

    inputs:{



    },

    botoes:{

        marginTop: 30

    },

    espacoBtnNativo:{

        flexDirection: "row",
        marginBottom: 10,

    },

    espacoBtnExtras:{

        marginTop: 5,
        borderTopWidth: 1,
        paddingTop: 10,
        borderColor: "#DDD",
        marginHorizontal: 15,
        borderStyle: "dashed"

    },

    btnNativo:{

        height: 60,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 5

    },

    btn:{

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

    btnFacebook:{

        backgroundColor: "#3d73bf",
        marginTop: 5

    },

    btnGoole:{

        backgroundColor: "#ed5d47",
        marginTop: 5

    },

    textBtn:{

        color: "#FFF"

    },

    espacoEsqueci:{

        marginHorizontal: 15,
        marginTop: 10

    },

    txtEsqueci:{

        color: config.cor1,
        textAlign: "right",

    }

})