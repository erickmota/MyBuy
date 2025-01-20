import React, {useEffect, useState} from "react"
import { View, Text, StyleSheet, TextInput, useWindowDimensions, TouchableNativeFeedback, Image, TouchableWithoutFeedback } from "react-native"
import { useNavigation } from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import { showMessage, hideMessage } from 'react-native-flash-message';

import config from "../config";

export default function Cadastro({route}){

    const {email} = route.params
    const {nome} = route.params

    /* Use state dos inputs */
    const [digito, setDigito] = useState('');

    const [placeObrigatorio, setPlaceObrigatorio] = useState("");

    const [logo_aberto, setLogoAbertoStyle] = useState(styles.logo_aberto);
    const [logo_chateado, setLogoChateadoStyle] = useState(styles.logo_fechado);

    /* Tamanho da tela */
    const larguraTela = useWindowDimensions().width;
    const larguraEspacoLogin = larguraTela * 0.85;

    const navigation = useNavigation();

    const confirmar_codigo = () => {

        if(digito.trim() == ""){

            setPlaceObrigatorio("*");

            setLogoAbertoStyle(styles.logo_fechado);
            setLogoChateadoStyle(styles.logo_aberto);

            setTimeout(() => {

                setPlaceObrigatorio("");

                setLogoAbertoStyle(styles.logo_aberto);
                setLogoChateadoStyle(styles.logo_fechado);

            }, 3000)

            return false

        }

        const formData = new URLSearchParams();
        formData.append('email', email);
        formData.append('codigo_confirmacao', digito);

        fetch(`${config.URL_inicial_API}/confirma_codigo`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
        })
        .then(response => response.json())
        .then(data => {

            if(data.data == false){

                setLogoAbertoStyle(styles.logo_fechado);
                setLogoChateadoStyle(styles.logo_aberto);

                setTimeout(() => {

                    setPlaceObrigatorio("");
    
                    setLogoAbertoStyle(styles.logo_aberto);
                    setLogoChateadoStyle(styles.logo_fechado);
    
                }, 3200)

                showMessage({
                    message: `${data.msg}`,
                    type: "danger", // ou "danger", "info", etc.
                    icon: "danger",
                    duration: 3000
                });

            }else{

                showMessage({
                    message: "Código confirmado com sucesso!",
                    description: "Por favor, efetue o login para acessar o app.",
                    type: "success", // ou "danger", "info", etc.
                    icon: "success",
                    duration: 4000
                });

                navigation.navigate("Login");

            }
    
        })
        .catch(errors => {
        console.error('Erro ao enviar solicitação:', errors);
        });

    }

    const reenviar_email = () => {

        const formData = new URLSearchParams();
        formData.append('email', email);
        formData.append('nome', nome);

        fetch(`${config.URL_inicial_API}/reenviar_email`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
        })
        .then(response => response.json())
        .then(data => {

            showMessage({
                message: "Um novo código, foi enviado para seu e-mail",
                type: "info", // ou "danger", "info", etc.
                icon: "info",
                duration: 4000
            });
    
        })
        .catch(errors => {
        console.error('Erro ao enviar solicitação:', errors);
        });

    }

    return(

        <View style={styles.container}>

            <View style={[styles.areaLogin, {width: larguraEspacoLogin}]}>

                <View style={styles.area_logo}>
                
                    <Image style={logo_aberto} source={require("../img/logo_mybuy_menu.png")} />
                    <Image style={logo_chateado} source={require("../img/logo_mybuy_menu_chateado.png")} />

                </View>

                <View style={styles.conteudoLogin}>

                    <Text style={styles.titulo}>

                        Insira abaixo, o código de 4 dígitos que enviamos para: <Text style={{fontWeight: "700"}}>"{email}"</Text>. Verifique também a caixa de spans!

                    </Text>

                    <View style={styles.inputs}>

                        <TextInput style={styles.input}
                            onChangeText={setDigito}
                            placeholder={placeObrigatorio}
                            placeholderTextColor={"red"}
                            value={digito}
                            maxLength={4}
                            keyboardType="numeric"
                        />
                        
                    </View>

                    <Text style={[styles.titulo, styles.txt_inf]}>

                        O código expirará em 30 minutos. Reenvie o e-mail, para receber um novo.

                    </Text>

                    <View style={styles.botoes}>

                        <View style={styles.espacoBtnNativo}>

                            <TouchableNativeFeedback onPress={() => reenviar_email()}>

                                <View style={[styles.btnNativo, styles.btnCadastrar]}>

                                    <Text style={styles.textBtn}>

                                        REENVIAR E-MAIL 

                                    </Text>

                                </View>

                            </TouchableNativeFeedback>

                            <TouchableNativeFeedback onPress={()=>confirmar_codigo()}>

                                <View style={[styles.btnNativo, styles.btnEntrar]}>

                                    <Text style={styles.textBtn}>

                                        CONFIRMAR

                                    </Text>

                                </View>

                            </TouchableNativeFeedback>

                        </View>

                    </View>

                    <View style={styles.area_voltar}>

                        <TouchableWithoutFeedback onPress={()=> navigation.navigate("Login")}>

                            <Text style={{color: config.cor1, textAlign: "center"}}>

                                {"<"} Voltar

                            </Text>

                        </TouchableWithoutFeedback>

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

    logo_fechado:{

        display: "none"

    },

    inputs:{

        flexDirection: "row",
        justifyContent: "center"

    },

    area_voltar:{

        paddingHorizontal: 15,
        marginTop: 10,

    }

})