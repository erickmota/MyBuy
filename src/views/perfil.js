import React, {useState, useEffect, useContext, useCallback, useLayoutEffect} from "react"
import { View, Text, StyleSheet, TextInput, useWindowDimensions, TouchableNativeFeedback, StatusBar, Image, TouchableWithoutFeedback} from "react-native"
import { useNavigation } from '@react-navigation/native';
import * as SQLite from "expo-sqlite"
import { useFocusEffect } from '@react-navigation/native';
import { UserContext } from '../context/user';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import FlashMessage from 'react-native-flash-message';
import { showMessage, hideMessage } from 'react-native-flash-message';

import config from "../config";

export default function Perfil(){

    /* Contexto */
    const { DATAUser } = useContext(UserContext);
    const { atualizar_foto_local } = useContext(UserContext);

    const [DATA, setData] = useState([]);
    const [db, setDbLocal] = useState(null);

    /* Abrindo o Banco de dados */
    useEffect(()=>{

        try {

            const db = SQLite.openDatabase("mybuy.db");
            setDbLocal(db);

            console.log("Sucesso ao abrir o banco");
            
        } catch (error) {
            
            console.error("conexão com o banco de dados local, falhou", error);

        }

    },[])

    const carregar_API = useCallback(()=>{

        fetch(`${config.URL_inicial_API}${DATAUser[0].id}/perfil`)
        .then(response => response.json())
        .then(data => {
            setData(data.data);
            atualiza_foto(data.data[0].foto_url)
        })
        .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
        });
        
    }, [])

    function atualiza_foto(url){

        atualizar_foto_local(url);

    }

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
          quality: 0.2,
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

          if(data.success == false){

            showMessage({
                message: "Imagem não atualizada!",
                description: `${data.message}`,
                type: "danger", // ou "danger", "info", etc.
                icon: "auto",
                duration: 3000
            });

          }else{

            carregar_API();

          }
          
        } catch (error) {
          console.error('Erro ao enviar imagem:', error);

            showMessage({
                message: "Imagem não atualizada!",
                description: `${error}`,
                type: "danger", // ou "danger", "info", etc.
                icon: "auto",
                duration: 3000
            });

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
   
    useFocusEffect(

        useCallback(() => {

            carregar_API();
    
            return () => {

            setData([]);

            };
            
        }, [])

    );

    return(

        <View style={styles.container}>

            {DATA.map(item=>(

                <View style={{flex: 1}} key={item.nome}>

                    <View style={styles.area_foto}>

                        <TouchableWithoutFeedback on onPress={()=> selectImage()}>

                            {item.foto_url == null?(

                                <Image style={styles.img_user} source={{ uri: `${config.Foto_usuario_nulo}` }} />

                            ):(

                                <Image style={styles.img_user} source={{ uri: `${config.URL_inicial_API}${item.foto_url}` }} />

                            )}

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

                </View>

            ))}

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