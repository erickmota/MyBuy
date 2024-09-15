import React, {useState, useContext} from "react";
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/user';

import IconeCorreto from "../componentes/botaoCorreto"
import config from "../config";

export default function AddItem({route}){

    /* Contexto */
    const { DATAUser } = useContext(UserContext);

    const {id_lista} = route.params;

    const navigation = useNavigation();

    const [campo_nome, onChangecampo_nome] = React.useState('');
    const [qtd, onChangeQtd] = React.useState('');
    const [selectedValue, setSelectedValue] = useState("option1");

    const [CheckBox, setCheckBox] = useState(false);

    function AlterCheckBox(){

        if(CheckBox == false){

            setCheckBox(true);

        }else{

            setCheckBox(false);

        }

    }

    function adiciona_item(

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

    }

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

                <View style={{flex: 5}}>

                    <Text style={styles.titulo}>

                        Tipo

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

            <View style={styles.espacoValor}>

                <View style={{flex: 6}}>

                    <Text style={styles.titulo}>

                        Valor

                    </Text>

                    <View style={styles.campoSelect}>
                        
                    <TextInput style={styles.inputQtd}
                        onChangeText={onChangeQtd}
                        value={qtd}
                        keyboardType="default"
                        />

                    </View>

                </View>

                <View style={{flex: 5}}>

                    <Text style={styles.titulo}>

                        Carrinho?

                    </Text>

                    <View style={{flexDirection: "row", top: 5}}>

                        <View style={styles.espacoIconCarrinho}>

                            <Icon
                                name="cart-variant"
                                size={35}
                                style={styles.iconCarrinho}
                                color={"#AAA"}
                            />

                        </View>

                        <View style={styles.espacoCheckBox}>

                            <TouchableOpacity

                            activeOpacity={0.3}
                            onPress={AlterCheckBox}                    

                            >

                                <View style={styles.corpoCheck}>

                                    <View>

                                        {CheckBox && <Text style={styles.xCarrinho}>

                                            ✓

                                        </Text>}

                                    </View>

                                </View>

                            </TouchableOpacity>

                        </View>

                    </View>

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

            <IconeCorreto funcao={() => adiciona_item(campo_nome, 0, qtd, 1, id_lista, 1)}/>

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

    espacoValor:{

        flexDirection: "row",

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


    },

    /* CheckBox */

    espacoIconCarrinho:{

        flex:5,
        alignItems: "flex-end"

    },

    espacoCheckBox:{

        flex:5,
        alignItems: "flex-start"

    },

    iconCarrinho:{

        right: 20

    },

    corpoCheck:{

        width:20,
        height: 20,
        borderWidth: 1,
        borderColor: "#777",
        borderRadius: 6,
        top: 8,
        right: 10

    },

    xCarrinho:{

        flexDirection: "row",
        textAlign: "center",
        fontSize: 15,
        top: -3,
        color: "#21bf31"

    }

})