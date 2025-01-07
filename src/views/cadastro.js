import React, {useEffect, useState} from "react"
import { View, Text, StyleSheet, TextInput, useWindowDimensions, TouchableNativeFeedback, Image, KeyboardAvoidingView, Keyboard } from "react-native"
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
    const [altura, setAltura] = useState(null);

    const [placeObrigatorio, setPlaceObrigatorio] = useState("");

    const [logo_aberto, setLogoAbertoStyle] = useState(styles.logo_aberto);
    const [logo_fechado, setLogoFechadoStyle] = useState(styles.logo_fechado);
    const [logo_chateado, setLogoChateadoStyle] = useState(styles.logo_fechado);

    /* Tamanho da tela */
    const larguraTela = useWindowDimensions().width;
    const larguraEspacoLogin = larguraTela * 0.85;
    const altura_tela = useWindowDimensions().height;

    useEffect(()=>{

        const alturaEspacoLogin = altura_tela * 0.15;
        setAltura(alturaEspacoLogin);

    },[])

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
          "keyboardDidShow",
          () => subir_view()
        );
        const keyboardDidHideListener = Keyboard.addListener(
          "keyboardDidHide",
          () => baixar_view()
        );
    
        // Cleanup
        return () => {
          keyboardDidShowListener.remove();
          keyboardDidHideListener.remove();
        };
      }, []);

    const navigation = useNavigation();

    function validarEmail(email) {
        
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);

    }

    function cadastrar_usuario(){

        const formData = new URLSearchParams();
        formData.append('nome', nome);
        formData.append('email', email);
        formData.append('senha', senha);
        formData.append('confirma_senha', confirma_senha);

        fetch(`${config.URL_inicial_API}/cadastrar`, {
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
                setLogoFechadoStyle(styles.logo_fechado);
                setLogoChateadoStyle(styles.logo_aberto);

                setTimeout(() => {

                    setPlaceObrigatorio("");
    
                    setLogoAbertoStyle(styles.logo_aberto);
                    setLogoFechadoStyle(styles.logo_fechado);
                    setLogoChateadoStyle(styles.logo_fechado);
    
                }, 3200)

                showMessage({
                    message: "Cadastro não realizado!",
                    description: `${data.msg}`,
                    type: "danger", // ou "danger", "info", etc.
                    icon: "danger",
                    duration: 3000
                });

            }else{

                showMessage({
                    message: "Cadastro realizado com sucesso!",
                    description: "Por favor, faça o login para continuar.",
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

    const verifica_form = () => {

        if(nome.trim() == "" || email.trim() == "" || senha.trim() == "" || confirma_senha.trim() == ""){

            setPlaceObrigatorio("*");

            setLogoAbertoStyle(styles.logo_fechado);
            setLogoFechadoStyle(styles.logo_fechado);
            setLogoChateadoStyle(styles.logo_aberto);

            setTimeout(() => {

                setPlaceObrigatorio("");

                setLogoAbertoStyle(styles.logo_aberto);
                setLogoFechadoStyle(styles.logo_fechado);
                setLogoChateadoStyle(styles.logo_fechado);

            }, 3000)

            return false

        }

        if(!validarEmail(email)){

            setLogoAbertoStyle(styles.logo_fechado);
            setLogoFechadoStyle(styles.logo_fechado);
            setLogoChateadoStyle(styles.logo_aberto);

            setTimeout(() => {

                setLogoAbertoStyle(styles.logo_aberto);
                setLogoFechadoStyle(styles.logo_fechado);
                setLogoChateadoStyle(styles.logo_fechado);

            }, 3200)

            showMessage({
                message: "Por favor, insira um endereço de e-mail válido!",
                type: "warning", // ou "danger", "info", etc.
                icon: "warning",
                duration: 3000
            });

            return false;

        }

        if(senha != confirma_senha){

            setLogoAbertoStyle(styles.logo_fechado);
            setLogoFechadoStyle(styles.logo_fechado);
            setLogoChateadoStyle(styles.logo_aberto);

            setTimeout(() => {

                setLogoAbertoStyle(styles.logo_aberto);
                setLogoFechadoStyle(styles.logo_fechado);
                setLogoChateadoStyle(styles.logo_fechado);

            }, 3200)

            showMessage({
                message: "Senha e confirmar senha não conferem!",
                type: "warning", // ou "danger", "info", etc.
                icon: "warning",
                duration: 3000
            });

            return false;

        }

        cadastrar_usuario();

    }

    const fechar_olho = async (tipo) => {

        switch(tipo){

            case "fechado":

                setLogoAbertoStyle(styles.logo_fechado);
                setLogoFechadoStyle(styles.logo_aberto);
                setLogoChateadoStyle(styles.logo_fechado);


            break;

            case "aberto":

                setLogoAbertoStyle(styles.logo_aberto);
                setLogoFechadoStyle(styles.logo_fechado);
                setLogoChateadoStyle(styles.logo_fechado);

            break;

        }

    }

    const subir_view = () => {

        const alturaEspacoLogin = altura_tela * 0.05;
        setAltura(alturaEspacoLogin);

    }

    const baixar_view = () => {

        const alturaEspacoLogin = altura_tela * 0.15;
        setAltura(alturaEspacoLogin);

    }

    return(

        <View style={styles.container}>

            <KeyboardAvoidingView behavior="padding" style={{ flex: 1}}>

            <View style={[styles.areaLogin, {width: larguraEspacoLogin, marginTop: altura}]}>

                <View style={styles.area_logo}>
                
                    <Image style={logo_aberto} source={require("../img/logo_mybuy_menu.png")} />
                    <Image style={logo_fechado} source={require("../img/logo_mybuy_menu_fechado.png")} />
                    <Image style={logo_chateado} source={require("../img/logo_mybuy_menu_chateado.png")} />

                </View>

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
                        onFocus={()=>fechar_olho("fechado")}
                        onBlur={()=>fechar_olho("aberto")}
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
                        onFocus={()=>fechar_olho("fechado")}
                        onBlur={()=>fechar_olho("aberto")}
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

            </KeyboardAvoidingView>

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

    }

})