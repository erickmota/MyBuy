import React, {useState, useEffect, useContext} from "react"
import { View, Text, StyleSheet, TextInput, useWindowDimensions, TouchableNativeFeedback, StatusBar, Image, TouchableWithoutFeedback} from "react-native"
import { useNavigation } from '@react-navigation/native';
import * as SQLite from "expo-sqlite"
import { UserContext } from '../context/user';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';

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

    const selectImage = async () => {
        // Pedir permissão para acessar a galeria
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
        if (permissionResult.granted === false) {
          alert('Para acessar a galeria de imagens do seu aparelho, precisamos da permissão!');
          return;
        }
      
        // Abrir a galeria para selecionar uma imagem
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 0,
        });
      
        if (!result.canceled) {
            const image = result.assets[0]; // Exemplo: {uri, width, height, fileName}
            console.log(image);
            await uploadImage(image); // Passar a imagem para a função de upload
        }
    };

    const uploadImage = async (image) => {
        const formData = new FormData();
        formData.append('file', {
          uri: image.uri,
          name: image.fileName || 'photo.jpg',
          type: 'image/jpeg', // Altere o tipo conforme necessário
        });
      
        try {
          const response = await fetch(`${config.URL_inicial_API}${DATAUser[0].id}/upload_img_user`, {
            method: 'POST',
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
      
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error('Erro ao enviar imagem:', error);
        }
    };

    /* const uploadImage = async (image) => {
        const formData = new FormData();
        formData.append('file', {
          uri: image.uri,
          name: image.fileName || 'photo.jpg',
          type: 'image/jpeg', // Altere o tipo conforme necessário
        });
      
        try {
          const response = await fetch(`${config.URL_inicial_API}${DATAUser[0].id}/upload_img_user`, {
            method: 'POST',
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
   
          // Registrar a resposta como texto para verificar o erro
          const text = await response.text(); 
          console.log('Resposta do servidor:', text);
   
          // Agora, tente interpretar como JSON, se for uma resposta válida
          const data = JSON.parse(text); 
          console.log(data);
        } catch (error) {
          console.error('Erro ao enviar imagem:', error);
        }
    }; */
   

    return(

        <View style={styles.container}>

            <View style={styles.area_foto}>

                <TouchableWithoutFeedback onPress={()=> selectImage()}>

                    <Image style={styles.img_user} source={{ uri: `${config.Foto_usuario_nulo}` }} />

                </TouchableWithoutFeedback>

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