import React, {useState, useContext} from "react"
import { View, Text, StyleSheet, TextInput, useWindowDimensions, TouchableNativeFeedback, StatusBar} from "react-native"
import { useNavigation } from '@react-navigation/native';
import * as SQLite from "expo-sqlite"
import { UserContext } from '../context/user';

import Icon from 'react-native-vector-icons/Ionicons';

import config from "../config";

export default function Login(){

    const { login } = useContext(UserContext); 

    const navigation = useNavigation();

    /* Use state dos inputs */
    const [email, onChangeEmail] = useState('');
    const [senha, onChangeSenha] = useState('');

    /* Estado para alterar a cor dos inputs */
    const [borda, changeBorda] = useState({});

    /* Tamanho da tela */
    const larguraTela = useWindowDimensions().width;
    const larguraEspacoLogin = larguraTela * 0.85;

    function enviarForm(){

        if(email.trim() === "" || senha.trim() === ""){

            changeBorda({backgroundColor: "#f0d5da", borderBottomColor: "red"});

            setTimeout(() => {

                changeBorda({borderBottomColor: "#CCC", borderBottomWidth: 1});

            }, 3000)

        }else{

            navigation.navigate("Carregar_login", {email: email, senha: senha})

        }

    }

    return(

        <View style={styles.container}>

            <StatusBar backgroundColor={config.cor1} style="light" />

            <View style={[styles.areaLogin, {width: larguraEspacoLogin}]}>

                <View style={styles.conteudoLogin}>

                    <View style={styles.inputs}>

                        <Text style={styles.titulo}>

                            E-mail:

                        </Text>

                        <TextInput style={[styles.input, {...borda}]}
                        onChangeText={onChangeEmail}
                        value={email}
                        required
                        keyboardType="email-address"
                        />

                        <Text style={[styles.titulo, styles.tituloSeguinte]}>

                            Senha:

                        </Text>

                        <TextInput style={[styles.input, {...borda}]}
                        onChangeText={onChangeSenha}
                        value={senha}
                        required
                        secureTextEntry={true}
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

                            <TouchableNativeFeedback onPress={() => navigation.navigate("Cadastro")}>

                                <View style={[styles.btnNativo, styles.btnCadastrar]}>

                                    <Text style={styles.textBtn}>

                                        CADASTRAR

                                    </Text>

                                </View>

                            </TouchableNativeFeedback>

                            <TouchableNativeFeedback onPress={() => enviarForm()}>

                                <View style={[styles.btnNativo, styles.btnEntrar]}>

                                    <Text style={styles.textBtn}>

                                        ENTRAR

                                    </Text>

                                </View>

                            </TouchableNativeFeedback>

                        </View>

                        <View style={styles.espacoBtnExtras}>

                            <View style={[styles.btn, styles.btnFacebook]}>

                                <Icon
                                    name="logo-facebook"
                                    size={30}
                                    color={"white"}
                                    />

                            </View>

                            <View style={[styles.btn, styles.btnGoole]}>

                                <Icon
                                    name="logo-google"
                                    size={30}
                                    color={"white"}
                                    />

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
        backgroundColor: config.corTelaLogin,
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