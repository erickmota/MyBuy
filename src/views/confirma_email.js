import React, {useEffect, useState} from "react"
import { View, Text, StyleSheet, TextInput, useWindowDimensions, TouchableNativeFeedback, Image, KeyboardAvoidingView, Keyboard } from "react-native"
import { useNavigation } from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import { showMessage, hideMessage } from 'react-native-flash-message';

import config from "../config";

export default function Cadastro(){

    /* Use state dos inputs */
    const [digito, setDigito] = useState('');

    const [placeObrigatorio, setPlaceObrigatorio] = useState("");

    const [logo_aberto, setLogoAbertoStyle] = useState(styles.logo_aberto);

    /* Tamanho da tela */
    const larguraTela = useWindowDimensions().width;
    const larguraEspacoLogin = larguraTela * 0.85;

    const navigation = useNavigation();

    return(

        <View style={styles.container}>

            <View style={[styles.areaLogin, {width: larguraEspacoLogin}]}>

                <View style={styles.area_logo}>
                
                    <Image style={logo_aberto} source={require("../img/logo_mybuy_menu.png")} />

                </View>

                <View style={styles.conteudoLogin}>

                    <Text style={styles.titulo}>

                        Insira abaixo, o código de 4 dígitos que enviamos para seu e-mail. Verifique também sua caixa de spans!

                    </Text>

                    <View style={styles.inputs}>

                        <TextInput style={styles.input}
                            onChangeText={setDigito}
                            placeholder={placeObrigatorio}
                            placeholderTextColor={"red"}
                            value={digito}
                            maxLength={4}
                            keyboardType="default"
                        />
                        
                    </View>

                    <Text style={[styles.titulo, styles.txt_inf]}>

                        O código expirará em 30 minutos. Reenvie o e-mail, para gerar um novo.

                    </Text>

                    <View style={styles.botoes}>

                        <View style={styles.espacoBtnNativo}>

                            <TouchableNativeFeedback onPress={() => navigation.navigate("Login")}>

                                <View style={[styles.btnNativo, styles.btnCadastrar]}>

                                    <Text style={styles.textBtn}>

                                        REENVIAR E-MAIL 

                                    </Text>

                                </View>

                            </TouchableNativeFeedback>

                            <TouchableNativeFeedback onPress={()=>verifica_form()}>

                                <View style={[styles.btnNativo, styles.btnEntrar]}>

                                    <Text style={styles.textBtn}>

                                        CONFIRMAR

                                    </Text>

                                </View>

                            </TouchableNativeFeedback>

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
        borderRadius: 5,
        elevation: 15,
        paddingVertical: 35

    },

    titulo:{

        fontSize: 16,
        paddingHorizontal: 15,
        color: "#555", 
        marginTop: 25,
        textAlign: "center"

    },

    txt_inf:{

        fontSize: 13,
        color: "#AAA",
        marginTop: 40

    },

    input:{

        borderBottomWidth: 1,
        borderBottomColor: "#CCC",
        marginTop: 15,
        fontSize: 20,
        color: "#777",
        width: 80,
        textAlign: "center",
        borderStyle: "solid",
        letterSpacing: 4

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

    area_logo:{

        alignItems: "center",
        justifyContent: "center",
        marginTop: -70,
        marginBottom: -20

    },

    logo_aberto:{

        width: 100,
        height: 100,

    },

    inputs:{

        flexDirection: "row",
        justifyContent: "center"

    }

})