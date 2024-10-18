import React, {useState, useEffect, useContext} from "react";
import { Text, View, StyleSheet, FlatList, TouchableWithoutFeedback, Alert, Modal,
  TextInput, Button, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import config from "../config"
import { UserContext } from '../context/user';

import IconeAdd from "../componentes/botaoAdd"

export default function Categorias(){

    const navigation = useNavigation();

    const [DATA, setData] = useState([]);
    const [DATA_confirm, setDataConfirm] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [input, onChangeInput] = useState();
    const [idCategoria, onChangeIdCategoria] = useState();

    /* Contexto */
    const { DATAUser } = useContext(UserContext);

    /* Conexão com a API */
    useEffect(() => {

    fetch(`${config.URL_inicial_API}${DATAUser[0].id}/categorias`)
    .then(response => response.json())
    .then(data => {
        setData(data.data);
        setDataConfirm(data.data.confirmacoes);
    })
    .catch(error => {
        console.error('Erro ao buscar dados da API:', error);
    });

    }, [DATA]);

    /* Apagar uma categoria */
    function apagar_categoria(categoria){

      const formData = new URLSearchParams();
        formData.append('id_categoria', categoria);

        fetch(`${config.URL_inicial_API}${DATAUser[0].id}/deletar_categoria`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
        })
        .then(response => response.json())
        .then(data => {

            navigation.navigate("Categorias");
    
        })
        .catch(errors => {
        console.error('Erro ao enviar solicitação:', errors);
        });

    }

    function confirma_apagar(categoria, nome_categoria){

      if(DATA_confirm.quantidade < 2){

        null

      }else{

        Alert.alert(
          "Apagar categoria",
          `Deseja mesmo apagar a categoria "${nome_categoria}"? Se ainda existir algum item vinculado a ela,`+
          " em alguma de suas listas, o item será exluído.",
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
                
                apagar_categoria(categoria);
  
              }
            }
          ],
          { cancelable: false }
        );

      }

    }

    function atualiza_nome(){

      const formData = new URLSearchParams();
      formData.append('id_categoria', idCategoria);
      formData.append('nome_categoria', input);

      fetch(`${config.URL_inicial_API}${DATAUser[0].id}/editar_categoria`, {
      method: "POST",
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString()
      })
      .then(response => response.json())
      .then(data => {

        setModalVisible(false);
  
      })
      .catch(errors => {
      console.error('Erro ao enviar solicitação:', errors);
      });

  }

    const setar_modal = (nome_categoria, id_categoria) => {

      onChangeInput(nome_categoria);
      onChangeIdCategoria(id_categoria);
      setModalVisible(true);

    }

    return (

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
                            maxLength={30}
                          />

                        </View>

                        <View style={styles.AreaBtnConfirmar}>

                            <Button onPress={()=> atualiza_nome()} color={config.cor2} title="Alterar  ->"/>

                        </View>

                      </View>
                      
                    </View>

                </View>

                </TouchableWithoutFeedback>

            </Modal>

            <FlatList
            data={DATA.categorias}
            renderItem={({item}) =>

            <View style={styles.itemLista}>

                <TouchableOpacity
                  onPress={() => setar_modal(item.nome, item.id)}
                  activeOpacity={config.opacity_btn}
                >

                <View style={{flex: 3, flexDirection: "column"}}>

                <Text style={styles.titleLista}>
                    
                    {item.nome}
                    
                </Text>

                </View>

                </TouchableOpacity>

                <View style={[styles.iconeLista, {flex:1}]}>

                <TouchableWithoutFeedback onPress={() => confirma_apagar(item.id, item.nome)}>

                    {DATA_confirm.quantidade < 2 ? (

                        <Icon
                          name="delete-sweep"
                          size={25}
                          color={"#BBB"}
                        />

                    ):(

                        <Icon
                          name="delete-sweep"
                          size={25}
                          color={config.cor2}
                        />

                    )}

                </TouchableWithoutFeedback>

                </View>

            </View>

            }
            keyExtractor={item => item.id}
            /> 

            <IconeAdd caminho={"Adicionar_categoria"}/>

        </View>

    )

}

const styles = StyleSheet.create({

    container:{

        flex: 1

    },

    itemLista: {

        marginHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: "#CCC",
        flexDirection: "row"
    
      },
    
      titleLista: {
    
        fontSize: config.tamanhoTextosInputs,
        
      },
    
      iconeLista: {
    
        alignItems: "flex-end",
        flex: 1,
        justifyContent: "center"
    
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

})