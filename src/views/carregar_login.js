import React, {useState} from "react"
import { View, Text, StyleSheet, TextInput, useWindowDimensions, TouchableNativeFeedback } from "react-native"
import { useNavigation } from '@react-navigation/native';

import config from "../config";

export default function Carregar_login({route}){

    const {email} = route.params
    const {senha} = route.params

    const [DATA, setData] = useState([]);

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

    return(

        <View style={styles.container}>

            <Text style={{color: "white"}}>

                Carregando...

            </Text>

            <View>

                {DATA.map(item => (

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

                ))}

            </View>

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