import React, {useState, useContext, useLayoutEffect} from "react";
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, Alert } from "react-native";
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/user';

import IconeCorreto from "../componentes/botaoCorreto"
import config from "../config";

export default function AddItem({route}){

    /* Contexto */
    const { DATAUser } = useContext(UserContext);

    const {id_produto} = route.params;
    const {nome_produto} = route.params;
    const {qtd_produto} = route.params;

    const navigation = useNavigation();

    const [campo_nome, onChangecampo_nome] = React.useState(nome_produto);
    const [qtd, onChangeQtd] = React.useState(qtd_produto);
    const [selectedValue, setSelectedValue] = useState("option1");

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
                      "Excluir produto",
                      `Tem certeza que deseja excluir o item "${nome_produto}"?`,
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
                            console.log("Lista excluída");
                            
                            apagar_item();

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

    /* Função responsável por apagar o item */
    const apagar_item = () => {

        const formData = new URLSearchParams();
        formData.append('id_produto', id_produto);

        fetch(`${config.URL_inicial_API}${DATAUser[0].id}/deleta_produto`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
        })
        .then(response => response.json())
        .then(data => {

            navigation.goBack();
    
        })
        .catch(errors => {
        console.error('Erro ao enviar solicitação:', errors);
        });

    }

    /* function adiciona_item(

        nome_produto,
        tipo_exibicao,
        qtd,
        categoria,
        lista,
        foto

    ){

        const formData = new URLSearchParams();
        formData.append('nome_produto', nome_produto);
        formData.append('tipo_exibicao', tipo_exibicao);
        formData.append('qtd', qtd);
        formData.append('categoria', categoria);
        formData.append('lista', lista);
        formData.append('foto', foto);

        fetch(`${config.URL_inicial_API}${DATAUser[0].id}/adiciona_produto`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
        })
        .then(response => response.json())
        .then(data => {

            navigation.goBack();
    
        })
        .catch(errors => {
        console.error('Erro ao enviar solicitação:', errors);
        });

    } */

    return(

        <View style={styles.container}>

            <Text style={styles.titulo}>

                Nome do item

            </Text>

            <TextInput style={styles.input}
                onChangeText={onChangecampo_nome}
                value={campo_nome}
                keyboardType="default"
                />

            <View style={styles.espacoQtd}>

                <View style={{flex: 4}}>

                    <Text style={styles.titulo}>

                        Unidade

                    </Text>

                    <View style={styles.campoSelect}>
                        <Picker
                            selectedValue={selectedValue}
                            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                        >
                            <Picker.Item label="Caixa" value="option1" />
                            <Picker.Item label="Pacote" value="option2" />
                            <Picker.Item label="Garrafa" value="option4" />
                            <Picker.Item label="Lata" value="option5" />
                            <Picker.Item label="Un" value="option6" />
                            <Picker.Item label="Kg" value="option7" />
                            <Picker.Item label="g" value="option8" />
                            <Picker.Item label="ml" value="option9" />
                            <Picker.Item label="dz" value="option10" />
                            
                        </Picker>
                    </View>

                </View>

                <View style={[styles.campoSelect, {flex: 5}]}>

                    <Text style={styles.titulo}>

                        Quantidade

                    </Text>

                    <TextInput style={styles.inputQtd}
                        onChangeText={onChangeQtd}
                        value={qtd}
                        keyboardType="default"
                        />

                </View>

            </View>

            <View style={{flexDirection: "row"}}>

                <View style={{flex: 5}}>

                    <Text style={styles.titulo}>

                        Categoria

                    </Text>

                    <View style={styles.campoSelect}>
                        <Picker
                            selectedValue={selectedValue}
                            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                        >
                            <Picker.Item label="Opção 1" value="option1" />
                            <Picker.Item label="Opção 2" value="option2" />
                            <Picker.Item label="Opção 3" value="option3" />
                            <Picker.Item label="Opção 4" value="option4" />
                        </Picker>
                    </View>

                </View>

                <TouchableWithoutFeedback onPress={() => navigation.navigate('Categorias')}>

                    <View style={{flex: 1, justifyContent: "flex-end", alignItems: "flex-end"}}>

                        <Icon
                            name="playlist-edit"
                            size={40}
                            color={"white"}
                            style={styles.iconEdit}
                            />

                    </View>

                </TouchableWithoutFeedback>

            </View>

            <IconeCorreto funcao={() => adiciona_item(campo_nome, 0, qtd, 1, id_produto, 1)}/>

        </View>

    )

}

const styles = StyleSheet.create({

    container:{

        flex: 1,

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

    inputQtd:{

        marginTop: 20,
        fontSize: config.tamanhoTextosInputs,
        color: "#777"

    },

    espacoQtd:{

        flexDirection: "row"

    },

    campoSelect:{

        borderBottomWidth: 1,
        borderColor: "#CCC",
        marginHorizontal: 15

    },

    iconEdit:{

        backgroundColor: config.cor2,
        width:50,
        height: 50,
        borderRadius: 10,
        elevation: 5,
        marginRight: 15,
        textAlign: "center",
        paddingTop: 4


    }

})