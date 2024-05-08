import React, {useState} from "react"
import { Image, View, Text, StyleSheet, TextInput, useWindowDimensions, TouchableNativeFeedback, Alert } from "react-native"
import { useNavigation } from '@react-navigation/native';

import config from "../config";

export default function Carregar_login({route}){

    const navigation = useNavigation();

    const {email} = route.params
    const {senha} = route.params

    const [DATA, setData] = useState([]);
    const [view, mostrarView] = useState(false);

    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('senha', senha);

    fetch(`${config.URL_inicial_API}login`, {
    method: "POST",
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString()
    })
    .then(response => response.json())
    .then(data => {

        setData(data.data);

    })
    .catch(error => {
    console.error('Erro ao enviar solicitação:', error);
    });

    setTimeout(()=>{

        mostrarView(true)

    }, 2500)

    return(

        <View style={styles.container}>

            <Text style={{color: "white"}}>

                <Text>

                    <Text>

                        Conectando...

                    </Text>

                </Text>

            </Text>

            {view && (<View>

                {DATA !== false ? (

                    DATA.map(item => (

                        <View key={item.token}>

                            <Text>

                                {item.token}

                            </Text>

                            <Text>

                                {item.nome}

                            </Text>

                            <Text>

                                {item.id}

                            </Text>

                        </View>

                    ))

                ) : (

                    Alert.alert(

                        "",
                        "Usuário inválido",
                        [{

                            text: "Ok",
                            onPress: () =>{

                                navigation.navigate("Login")

                            }

                        }]

                    )

                )}

            </View>)}

        </View>

    )

}

const styles = StyleSheet.create({

    container:{

        flex: 1,
        backgroundColor: config.cor2,
        justifyContent: "center",
        alignItems: "center",

    }

})