import React, {useState} from "react"
import { View, Text, StyleSheet, TextInput, useWindowDimensions, TouchableNativeFeedback } from "react-native"
import { useNavigation } from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import { showMessage, hideMessage } from 'react-native-flash-message';

import config from "../config";

export default function Cadastro(){

    /* Use state dos inputs */
    const [nome, onChangeNome] = React.useState('');
    const [email, onChangeEmail] = React.useState('');
    const [senha, onChangeSenha] = React.useState('');
    const [confirma_senha, onChangeConfirmaSenha] = React.useState('');

    const [placeObrigatorio, setPlaceObrigatorio] = useState("");

    /* Tamanho da tela */
    const larguraTela = useWindowDimensions().width;
    const larguraEspacoLogin = larguraTela * 0.85;

    const navigation = useNavigation();

    function validarEmail(email) {
        
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);

    }

    const verifica_form = () => {

        if(nome.trim() == "" || email.trim() == "" || senha.trim() == "" || confirma_senha.trim() == ""){

            setPlaceObrigatorio("*");

            setTimeout(() => {

                setPlaceObrigatorio("");

            }, 3000)

            return false

        }

        if(!validarEmail(email)){

            showMessage({
                title: "E-mail",
                message: "Por favor, insira um e-mail válido!",
                type: "warning", // ou "danger", "info", etc.
                icon: "warning",
                duration: 3000
            });

            return false;

        }

        if(senha != confirma_senha){

            showMessage({
                title: "Senha",
                message: "Senha e confirmar senha não conferem!",
                type: "warning", // ou "danger", "info", etc.
                icon: "warning",
                duration: 3000
            });

            return false;

        }

    }

    return(

        <View style={styles.container}>

            <View style={[styles.areaLogin, {width: larguraEspacoLogin}]}>

                <View style={styles.conteudoLogin}>

                    <View style={styles.inputs}>

                        <Text style={styles.titulo}>

                            Nome:

                        </Text>

                        <TextInput style={styles.input}
                        onChangeText={onChangeNome}
                        placeholder={placeObrigatorio}
                        placeholderTextColor={"red"}
                        value={nome}
                        maxLength={25}
                        keyboardType="default"
                        />

                        <Text style={[styles.titulo, styles.tituloSeguinte]}>

                            E-mail:

                        </Text>

                        <TextInput style={styles.input}
                        onChangeText={onChangeEmail}
                        placeholder={placeObrigatorio}
                        placeholderTextColor={"red"}
                        value={email}
                        maxLength={254}
                        keyboardType="email-address"
                        />

                        <Text style={[styles.titulo, styles.tituloSeguinte]}>

                            Senha:

                        </Text>

                        <TextInput style={styles.input}
                        onChangeText={onChangeSenha}
                        placeholder={placeObrigatorio}
                        placeholderTextColor={"red"}
                        value={senha}
                        maxLength={128}
                        secureTextEntry={true}
                        keyboardType="default"
                        />

                        <Text style={[styles.titulo, styles.tituloSeguinte]}>

                            Confirmar senha:

                        </Text>

                        <TextInput style={styles.input}
                        onChangeText={onChangeConfirmaSenha}
                        placeholder={placeObrigatorio}
                        placeholderTextColor={"red"}
                        value={confirma_senha}
                        maxLength={128}
                        secureTextEntry={true}
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

                            <TouchableNativeFeedback onPress={()=>verifica_form()}>

                                <View style={[styles.btnNativo, styles.btnEntrar]}>

                                    <Text style={styles.textBtn}>

                                        CADASTRAR

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

        marginTop: 50

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