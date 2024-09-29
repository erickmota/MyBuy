import React, {useState, useContext, useLayoutEffect, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Alert,Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/user';

import IconeCorreto from "../componentes/botaoCorreto"
import config from '../config';

export default function Editar_lista({route}){

    /* Dados da lista */

    const {TituloLista} = route.params;
    const {id_lista} = route.params;

    /* Resultado do input */

    const [number, onChangeNumber] = useState(TituloLista);

    /* Contexto */

    const { DATAUser } = useContext(UserContext);

    /* Estado para o controle do retorno do dono */

    const [DATA_dono, setDataDono] = useState({});

    /* Estado para controle das confirmações retornadas da API */

    const [DATA_confirmacoes, setDataConfirmacoes] = useState({});
    const [DATA_membros, setDataMembros] = useState([]);

    const navigation = useNavigation();

    useLayoutEffect(()=>{

        navigation.setOptions({
            
            headerRight: () => (
                <Icon
                  name="delete-sweep"
                  size={22}
                  color={"white"}
                  style={{marginRight: 10}}
                  onPress={()=>{
  
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
                    
                  }}
                  />
              ),

        })

    },[navigation])

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

    }, [DATA_membros]);

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

            navigation.navigate("Listas");
    
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

    return(

        <View style={styles.container}>

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

                        <View style={styles.BtnIconShare}>

                            <Icon
                                name="share-variant"
                                size={17}
                                color={"white"}
                                style={styles.iconShare}
                            />

                        </View>

                    </View>

                </View>

                <View style={styles.areaListaParticipantes}>

                    <View style={styles.participante}>

                        <View style={styles.areaImg}>

                            <Image style={styles.imgUsuario} source={{ uri: `https://pessoaepessoa.com.br/wp-content/uploads/2023/04/Roberto_Pessoa.png` }} />

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

                                <Image style={styles.imgUsuario} source={{ uri: `https://www.designi.com.br/images/preview/12161378.jpg` }} />

                            </View>

                            <View style={styles.areaNome}>

                                <Text style={styles.nomeUsuario}>

                                    {membros.nome}

                                </Text>

                            </View>

                            <View style={styles.areaBtn}>

                                {DATA_confirmacoes.dono_lista == true && (

                                    <Text style={styles.textRemover}>

                                        REMOVER

                                    </Text>

                                )}

                            </View>

                        </View>

                    ))}

                </View>

            </View>

                {DATA_confirmacoes.dono_lista == true && (

                    <IconeCorreto funcao={() => salvar_nome(number)}/>

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
        borderRadius: 50

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

    }

})