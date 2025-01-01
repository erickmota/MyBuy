import React, {useState, useContext, useLayoutEffect, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Image, TouchableWithoutFeedback, Modal, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/user';
import FlashMessage from 'react-native-flash-message';
import { showMessage, hideMessage } from 'react-native-flash-message';

import IconeCorreto from "../componentes/botaoCorreto"
import config from '../config';

export default function Editar_lista({route}){

    /* Dados da lista */

    const {TituloLista} = route.params;
    const {id_lista} = route.params;
    const {origem} = route.params;

    /* Resultado do input */

    const [number, onChangeNumber] = useState(TituloLista);

    /* Contexto */

    const { DATAUser } = useContext(UserContext);

    /* Estado para o controle do retorno do dono */

    const [DATA_dono, setDataDono] = useState({});

    /* Estado para controle das confirmações retornadas da API */

    const [DATA_confirmacoes, setDataConfirmacoes] = useState({});
    const [DATA_membros, setDataMembros] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [valorEmail, setEmail] = useState("");
    const [loadView, setLoad] = useState(false);

    const navigation = useNavigation();

    useLayoutEffect(()=>{

        navigation.setOptions({
            
            headerRight: () => (
                <Icon
                  name="delete-sweep"
                  size={22}
                  color={"white"}
                  style={{marginRight: 10}}
                  onPress={()=>

                    btn_apagar()
                    
                  }
                  />
              ),

        })

    },[DATA_confirmacoes])

    /* Conexão com a API para retornar os membros da lista */

    useEffect(() => {

        fetch(`${config.URL_inicial_API}${DATAUser[0].id}/usuarios_lista/${id_lista}`)
        .then(response => response.json())
        .then(data => {
            setDataDono(data.data.Dono);
            setDataMembros(data.data.Membros);
            setDataConfirmacoes(data.data.Confirmacoes);
        })
        .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
        });

    }, [loadView, DATAUser]);

    /* Função responsável por atualizar o nome da Lista
    via API.
    Ela está sendo chamada via componente */

    function salvar_nome(novo_nome){

        const formData = new URLSearchParams();
        formData.append('id_lista', id_lista);
        formData.append('novo_nome', novo_nome);

        fetch(`${config.URL_inicial_API}${DATAUser[0].id}/atualiza_lista`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
        })
        .then(response => response.json())
        .then(data => {

            if(origem == "listas"){

                navigation.navigate("Listas");

            }else if(origem == "item"){

                navigation.navigate("ListaItem", {TituloLista: novo_nome, id_lista: id_lista});

            }
    
        })
        .catch(errors => {
        console.error('Erro ao enviar solicitação:', errors);
        });

    }

    /* Função responsável por apagar a lista */

    const apagar_lista = () => {

        const formData = new URLSearchParams();
        formData.append('id_lista', id_lista);

        fetch(`${config.URL_inicial_API}${DATAUser[0].id}/deletar_lista`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
        })
        .then(response => response.json())
        .then(data => {

            navigation.navigate("Listas");
    
        })
        .catch(errors => {
        console.error('Erro ao enviar solicitação:', errors);
        });

    }

    /* Adiciona um novo usuário a lista */

    const adicionar_usuario = ()=> {

        if(DATA_confirmacoes.dono_lista == true){

            const formData = new URLSearchParams();
            formData.append('id_lista', id_lista);
            formData.append('email_usuario', valorEmail);
    
            fetch(`${config.URL_inicial_API}${DATAUser[0].id}/adicionar_usuario_lista`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString()
            })
            .then(response => response.json())
            .then(data => {
    
                if(loadView == false){
    
                    setLoad(true);
    
                }else{
    
                    setLoad(false);
    
                }
    
                setModalVisible(false)
        
            })
            .catch(errors => {
            console.error('Erro ao enviar solicitação:', errors);
            });

        }

    }

    /* Remove um usuário da lista */

    const remover_usuario = (id_usuario) => {

        console.log(DATAUser[0].id);

        const formData = new URLSearchParams();
        formData.append('id_lista', id_lista);
        formData.append('id_usuario', id_usuario);

        fetch(`${config.URL_inicial_API}${DATAUser[0].id}/remover_usuario_lista`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
        })
        .then(response => response.json())
        .then(data => {

            if(DATA_confirmacoes.dono_lista == true){

                if(loadView == false){

                    setLoad(true);
    
                }else{
    
                    setLoad(false);
    
                }

            }else{

                navigation.navigate("Listas");

            }
    
        })
        .catch(errors => {
        console.error('Erro ao enviar solicitação:', errors);
        });

    }

    const btn_apagar = () => {

        if(DATA_confirmacoes.dono_lista == true){

            Alert.alert(
                "Excluir lista",
                `A lista "${TituloLista}" e todos os produtos relacionados a ela serão excluidos. Deseja continuar?`,
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
                      
                      apagar_lista();

                    }
                  }
                ],
                { cancelable: false }
            );

        }else{

            Alert.alert(
                "Sair da lista",
                `Deseja mesmo sair da lista "${TituloLista}"? Os produtos compartilhados por você, `+
                "ainda continuaram disponíveis, para os outros participantes.",
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
                      
                      remover_usuario(DATAUser[0].id);

                    }
                  }
                ],
                { cancelable: false }
            );

        }

        console.log(DATA_confirmacoes.dono_lista);

    }

    function mostrar_alerta(){

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
                        Aleterando lista...
                    </Text>
                </View>
            ),
        });

    }

    function btn_inserir(){

        mostrar_alerta();
        salvar_nome(number);

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

                        <View style={styles.corpoInputs}>

                            <Text style={styles.tituloModal}>

                                Adicionar

                            </Text>

                            <TextInput style={[styles.inputModal]}
                            onChangeText={setEmail}
                                value={valorEmail}
                                keyboardType="default"
                                placeholder="Insira o e-mail do usuário"
                            />                          

                        </View>

                        <View style={styles.AreaBtnConfirmar}>

                            <Button onPress={()=>adicionar_usuario()} color={config.cor2} title="Adicionar usuário  ->"/>

                        </View>

                    </View>

                </View>

                </TouchableWithoutFeedback>

            </Modal>

            <View>

                <Text style={styles.titulo}>

                    Editar nome

                </Text>

                <TextInput style={styles.input}
                    onChangeText={onChangeNumber}
                    value={number}
                    keyboardType="default"
                    editable={DATA_confirmacoes.dono_lista}
                />

            </View>

            <View style={styles.areaCompartilhar}>

                <View style={styles.areaTituloCompartilhar}>

                    <View style={styles.areaTxtTitulo}>

                        <Text style={styles.titulo}>

                            Participantes da lista

                        </Text>

                    </View>

                    <View style={styles.areaIcon}>

                        {DATA_confirmacoes.dono_lista == true && (

                            <TouchableWithoutFeedback onPress={()=> setModalVisible(true)}>

                            <View style={styles.BtnIconShare}>

                                <Text style={{color: "#FFF"}}>

                                    Adicionar

                                </Text>

                            </View>

                            </TouchableWithoutFeedback>

                        )}

                    </View>

                </View>

                <View style={styles.areaListaParticipantes}>

                    <View style={styles.participante}>

                        <View style={styles.areaImg}>

                            {DATA_dono.foto_url != null ? (

                                <Image style={styles.imgUsuario} source={{ uri: `${config.URL_inicial_API}${DATA_dono.foto_url}` }} />

                            ):(

                                <Image style={styles.imgUsuario} source={{ uri: `${config.Foto_usuario_nulo}` }} />

                            )}

                        </View>

                        <View style={styles.areaNome}>

                            <Text style={styles.nomeUsuario}>

                                {DATA_dono.nome}

                            </Text>

                        </View>

                        <View style={styles.areaBtn}>

                            <Text style={styles.textDono}>

                                DONO

                            </Text>

                        </View>

                    </View>

                    {DATA_membros.map(membros=>(

                        <View key={membros.id} style={styles.participante}>

                            <View style={styles.areaImg}>

                                {membros.foto_url != null ? (

                                    <Image style={styles.imgUsuario} source={{ uri: `${config.URL_inicial_API}${membros.foto_url}` }} />

                                ):(

                                    <Image style={styles.imgUsuario} source={{ uri: `${config.Foto_usuario_nulo}` }} />

                                )}

                            </View>

                            <View style={styles.areaNome}>

                                <Text style={styles.nomeUsuario}>

                                    {membros.nome}

                                </Text>

                            </View>

                            <View style={styles.areaBtn}>

                                {DATA_confirmacoes.dono_lista == true && (

                                    <TouchableWithoutFeedback onPress={()=> {

                                            Alert.alert(
                                                `Remover membro`,
                                                `O usuário "${membros.nome}" será removido dessa lista. Deseja continuar?`,
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
                                                    
                                                    remover_usuario(membros.id);
                        
                                                    }
                                                }
                                                ],
                                                { cancelable: false }
                                            );
                                        
                                        }}>

                                        <Text style={styles.textRemover}>

                                            REMOVER

                                        </Text>

                                    </TouchableWithoutFeedback>

                                )}

                            </View>

                        </View>

                    ))}

                </View>

            </View>

                {DATA_confirmacoes.dono_lista && DATA_confirmacoes.dono_lista == true && (

                    <IconeCorreto funcao={() => btn_inserir()}/>

                )}

        </View>

    )

}

const styles = StyleSheet.create({

    container: {

        flex:1,
    
    },

    titulo:{

        marginTop: 30,
        fontSize: config.tamanhoTextosInputs,
        paddingHorizontal: 15

    },

    input:{

        borderBottomWidth: 1,
        borderBottomColor: "#CCC",
        marginTop: 20,
        fontSize: config.tamanhoTextosInputs,
        marginHorizontal: 15,
        color: "#777"

    },

    /* Lista compartilhada */

    areaTituloCompartilhar:{

        flexDirection: "row"

    },

    areaTxtTitulo:{

        flex: 4

    },

    areaIcon:{

        flex: 1,
        top: 30,
        alignItems: "flex-end",
        right: 15,

    },

    BtnIconShare:{

        backgroundColor: config.cor2,
        padding: 5,
        borderRadius: 8

    },

    areaListaParticipantes:{

        paddingHorizontal: 15,
        marginTop: 10

    },

    participante:{

        flexDirection: "row",
        marginTop: 15

    },

    areaImg:{

        flex: 1

    },

    areaNome:{

        flex: 4,
        alignItems: "flex-start"

    },

    areaBtn:{

        flex: 2,
        alignItems: "flex-end",


    },

    textDono:{

        fontSize: 12,
        top: 11,
        color: "#AAA"

    },

    textRemover:{

        fontSize: 12,
        top: 11,
        color: "red"

    },

    imgUsuario:{

        width: 40,
        height: 40,
        borderRadius: 50,

    },

    nomeUsuario:{

        fontSize: 17,
        top: 6,
        color: "#666"

    },

    areaBtnCompartilhar:{

        alignItems: "center",
        top: 50

    },

    iconShare:{

        right: 1

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
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,

        },

        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

      },

      inputModal:{

        borderBottomWidth: 1,
        borderBottomColor: "#CCC",
        marginTop: 15,
        fontSize: config.tamanhoTextosInputs,
        color: "#777"

    },

    AreaBtnConfirmar:{

        marginTop: 20

    },


})