import React, {useState, useEffect, useContext, useCallback, useLayoutEffect} from "react"
import { View, Text, StyleSheet, TextInput, useWindowDimensions, TouchableNativeFeedback, StatusBar, Image, TouchableWithoutFeedback, Button, Alert, Modal} from "react-native"
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
    const { atualizar_nome_local } = useContext(UserContext);

    const [DATA, setData] = useState([]);
    const [db, setDbLocal] = useState(null);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalSenhaVisible, setModalSenhaVisible] = useState(false);
    const [modalApagarVisible, setModalApagarVisible] = useState(false);
    const [input, onChangeInput] = useState();
    const [senha_atual, onChaneSenhaAtual] = useState();
    const [nova_senha_1, onChangeNovaSenha1] = useState();
    const [nova_senha_2, onChangeNovaSenha2] = useState();

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
            atualiza_foto(data.data[0].foto_url);
            hideMessage();
        })
        .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
        });
        
    }, [])

    function atualiza_foto(url){

        atualizar_foto_local(url);

    }

    function atualiza_nome(novo_nome){

        const formData = new URLSearchParams();
        formData.append('novo_nome', novo_nome);
  
        fetch(`${config.URL_inicial_API}${DATAUser[0].id}/altera_nome`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
        })
        .then(response => response.json())
        .then(data => {
  
          atualizar_nome_local(novo_nome);
          carregar_API();
          setModalVisible(false);
    
        })
        .catch(errors => {
        console.error('Erro ao enviar solicitação:', errors);
        });
  
    }

    const selectImage = async () => {

        // Pedir permissão para acessar a galeria
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
        if (permissionResult.granted === false) {
          alert('Para acessar a galeria de imagens do seu aparelho, precisamos da permissão!');
          return;
        }else{

            setTimeout(()=>{

                mostrar_loading_img();

            }, 1000)

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
        }else{

            hideMessage();

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

    function remover_img(){

        fetch(`${config.URL_inicial_API}${DATAUser[0].id}/remover_img_user`)
        .then(response => response.json())
        .then(data => {

            atualiza_foto(null);

            carregar_API();
        })
        .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
        });

    };

    const btn_apagar = () => {
    
        Alert.alert(
            "Remover foto",
            `Deseja mesmo, remover sua foto de perfil?`,
            [
                {
                text: "Cancelar",
                onPress: () => console.log("Cancelado"),
                style: "cancel"
                },
                {
                text: "Sim",
                onPress: () => {

                    // Ação de exclusão
                    
                    remover_img();

                }
                }
            ],
            { cancelable: false }
        );

    }

    function mostrar_loading_img(){

        showMessage({
            message: "",
            type: "info", // ou "danger", "info", etc.
            icon: "none",
            duration: 0,
            renderCustomContent: () => (
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: -25 }}>
                    <Image
                        source={require("../img/carregando.gif")}
                        style={{width: 40, height: 40}}
                    />
                    <Text style={{ marginLeft: 8, color: "#fff", fontSize: 16 }}>
                        Fazendo o upload da imagem...
                    </Text>
                </View>
            ),
        });

    }

    const alterar_senha = () => {

        if(senha_atual.trim() == "" || nova_senha_1.trim() == "" || nova_senha_2.trim() == ""){

            showMessage({
                message: "Preencha todos os campos",
                type: "danger", // ou "danger", "info", etc.
                icon: "danger",
                duration: 3000
            });

            return false

        }

        if(nova_senha_1 != nova_senha_2){

            showMessage({
                message: "Nova senha e confirmação, não conferem!",
                type: "danger", // ou "danger", "info", etc.
                icon: "danger",
                duration: 3000
            });

            return false

        }

        const formData = new URLSearchParams();
        formData.append('email', DATA[0].email);
        formData.append('senha', senha_atual);
        formData.append('nova_senha_1', nova_senha_1);
        formData.append('nova_senha_2', nova_senha_2);

        fetch(`${config.URL_inicial_API}${DATAUser[0].id}/altera_senha`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
        })
        .then(response => response.json())
        .then(data => {

            if(data.msg == "Sucesso"){

                showMessage({
                    message: "Sua senha foi alterada com sucesso",
                    type: "success", // ou "danger", "info", etc.
                    icon: "success",
                    duration: 3000
                });

                setModalSenhaVisible(false);

            }else{

                showMessage({
                    message: `${data.msg}`,
                    type: "danger", // ou "danger", "info", etc.
                    icon: "danger",
                    duration: 3000
                });

            }
        })
        .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
        });

    }
   
    useFocusEffect(

        useCallback(() => {

            carregar_API();
    
            return () => {

            setData([]);

            };
            
        }, [])

    );

    function confirma_exclusao(){

        Alert.alert(
            "Excluir conta",
            "Tem certeza de que deseja excluir sua conta? Essa ação é irreversível e todos os seus dados serão apagados.",
            [
            {
                text: "Cancelar",
                onPress: () => console.log("Cancelado"),
                style: "cancel"
            },
            {
                text: "Sim",
                onPress: () => {
    
                // Ação de exclusão

                setModalApagarVisible(true);
    
                }
            }
            ],
            { cancelable: false }
        );

    }

    return(

        <View style={styles.container}>

            <Modal
                animationType="fade" // ou 'fade', 'none'
                transparent={true}    // Define se o fundo será transparente
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)} // Fechar modal ao clicar no botão 'voltar'
            >

                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>

                <View style={styles.centeredView}>

                    <View style={styles.modalView}>

                      <View style={styles.corpoModal}>

                        <View>

                          <Text>

                            Alterar nome

                          </Text>

                        </View>

                        <View>

                          <TextInput style={[styles.input]}
                            onChangeText={onChangeInput}
                            value={input}
                            keyboardType="default"
                            maxLength={25}
                          />

                        </View>

                        <View style={styles.AreaBtnConfirmar}>

                            <Button onPress={()=> atualiza_nome(input)} color={config.cor2} title="Alterar  ->"/>

                        </View>

                      </View>
                      
                    </View>

                </View>

                </TouchableWithoutFeedback>

            </Modal>

            <Modal
                animationType="fade" // ou 'fade', 'none'
                transparent={true}    // Define se o fundo será transparente
                visible={modalSenhaVisible}
                onRequestClose={() => setModalSenhaVisible(false)} // Fechar modal ao clicar no botão 'voltar'
            >

                <TouchableWithoutFeedback onPress={() => setModalSenhaVisible(false)}>

                <View style={styles.centeredView}>

                    <View style={styles.modalView}>

                      <View style={styles.corpoModal}>

                        <View>

                          <Text>

                            Alterar senha

                          </Text>

                        </View>

                        <View>

                          <TextInput style={[styles.input]}
                            onChangeText={onChaneSenhaAtual}
                            value={senha_atual}
                            keyboardType="default"
                            maxLength={25}
                            placeholder="Senha atual"
                            required
                            secureTextEntry={true}
                          />

                        </View>

                        <View>

                          <TextInput style={[styles.input]}
                            onChangeText={onChangeNovaSenha1}
                            value={nova_senha_1}
                            keyboardType="default"
                            maxLength={25}
                            placeholder="Nova senha"
                            required
                            secureTextEntry={true}
                          />

                        </View>

                        <View>

                          <TextInput style={[styles.input]}
                            onChangeText={onChangeNovaSenha2}
                            value={nova_senha_2}
                            keyboardType="default"
                            maxLength={25}
                            placeholder="Confirmar nova senha"
                            required
                            secureTextEntry={true}
                          />

                        </View>

                        <View style={styles.AreaBtnConfirmar}>

                            <Button onPress={()=> alterar_senha()} color={config.cor2} title="Alterar  ->"/>

                        </View>

                      </View>
                      
                    </View>

                </View>

                </TouchableWithoutFeedback>

            </Modal>

            <Modal
                animationType="fade" // ou 'fade', 'none'
                transparent={true}    // Define se o fundo será transparente
                visible={modalApagarVisible}
                onRequestClose={() => setModalApagarVisible(false)} // Fechar modal ao clicar no botão 'voltar'
            >

                <TouchableWithoutFeedback onPress={() => setModalApagarVisible(false)}>

                <View style={styles.centeredView}>

                    <View style={styles.modalView}>

                      <View style={styles.corpoModal}>

                        <View>

                          <Text>

                            Por favor, informe sua senha, para confirmar a exclusão dessa conta.

                          </Text>

                        </View>

                        <View>

                          <TextInput style={[styles.input]}
                            onChangeText={onChaneSenhaAtual}
                            value={senha_atual}
                            keyboardType="default"
                            placeholder="Digite sua senha"
                            required
                            secureTextEntry={true}
                          />

                        </View>

                        <View style={styles.AreaBtnConfirmar}>

                            <Button onPress={()=> alterar_senha()} color={config.cor2} title="Excluir minha conta"/>

                        </View>

                      </View>
                      
                    </View>

                </View>

                </TouchableWithoutFeedback>

            </Modal>

            {DATA.map(item=>(

                <View style={{flex: 1}} key={item.nome}>

                    <View style={styles.area_foto}>

                        <View>

                            <TouchableWithoutFeedback on onPress={()=> selectImage()}>

                                {item.foto_url == null?(

                                    <Image style={styles.img_user} source={{ uri: `${config.Foto_usuario_nulo}` }} />

                                ):(

                                    <Image style={styles.img_user} source={{ uri: `${config.URL_inicial_API}${item.foto_url}` }} />

                                )}

                            </TouchableWithoutFeedback>

                        </View>

                        {item.foto_url != null && (

                            <View style={{flexDirection: "row", marginTop: -35}}>
                                
                                <Button color={config.cor2} style={styles.btn_remover} title="Remover" onPress={()=>btn_apagar()} />

                            </View>

                        )}

                    </View>

                    <View style={styles.informacoes}>

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

                                <TouchableWithoutFeedback onPress={()=>[onChangeInput(item.nome) ,setModalVisible(true)]}>

                                    <Icon
                                        name="pencil-box"
                                        size={28}
                                        color={config.cor2}
                                    />

                                </TouchableWithoutFeedback> 

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

                                {/* <Icon
                                    name="pencil-box"
                                    size={28}
                                    color={config.cor2}
                                /> */}

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

                                <TouchableWithoutFeedback onPress={()=> setModalSenhaVisible(true)}>

                                    <Icon
                                        name="pencil-box"
                                        size={28}
                                        color={config.cor2}
                                    />

                                </TouchableWithoutFeedback>

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

                    <View style={styles.area_excluir}>

                        <TouchableWithoutFeedback onPress={()=> confirma_exclusao()}>

                            <Text style={styles.txt_excluir}>

                                Excluir minha conta

                            </Text>

                        </TouchableWithoutFeedback>

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

        flex: 3,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"

    },

    img_user:{

        width: 230,
        height: 230,
        borderRadius: 150

    },

    informacoes:{

        flex: 4

    },

    area_inf:{

        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 8

    },

    area_excluir:{

        flex: 1,
        justifyContent: "center"

    },

    txt_excluir:{

        textAlign: "center",
        color: "red"

    },

    col_1:{

        flex: 2

    },

    col_2:{

        flex: 5

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

    icon_loading:{

        width: 50,
        height: 50,
        marginTop: -100

    },

    /* Modal */

    centeredView: {

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', // Fundo semitransparente

      },

      modalView: {

        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,

        },

        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

      },

      input:{

        borderBottomWidth: 1,
        borderBottomColor: "#CCC",
        marginTop: 20,
        fontSize: config.tamanhoTextosInputs,
        color: "#777",

      },

      corpoModal:{

        flexDirection: "column"

      },

      AreaBtnConfirmar:{

        marginTop: 20

    },

    /* ***** */

})