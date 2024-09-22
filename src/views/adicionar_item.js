import React, {useState, useContext, useEffect} from "react";
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, TouchableOpacity, ScrollView, Image } from "react-native";
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/user';

import IconeCorreto from "../componentes/botaoCorreto"
import config from "../config";

export default function AddItem({route}){

    /* Contexto */
    const { DATAUser } = useContext(UserContext);
    const [DATA, setData] = useState([]);
    const [DATA_PRODUTOS_EXEMPLO, setDataProdutosExemplo] = useState([]);

    const {id_lista} = route.params;

    const navigation = useNavigation();

    const [campo_nome, onChangecampo_nome] = React.useState('');
    const [qtd, onChangeQtd] = React.useState('');
    const [valor, onChangeValor] = React.useState('');
    const [selectedTipo, setSelectedTipo] = useState("1");
    const [selectedCategoria, setSelectedCategoria] = useState("option1");
    const [observacao, setObservacao] = useState("");

    const [CheckBox, setCheckBox] = useState(false);
    const [corCarrinho, setCorCarrinho] = useState("#AAA");

    const [placeObrigatorio, setPlaceObrigatorio] = useState("");

    const [dataFiltrada, setDataFiltrada] = useState([]);
    const [focusLista, setFocusLista] = useState(false);

    /* Recebendo dados das categorias */
    useEffect(() => {
        fetch(`${config.URL_inicial_API}${DATAUser[0].id}/categorias`)
        .then(response => response.json())
        .then(data => {
            setData(data.data);
        })
        .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
        });

        fetch(`${config.URL_inicial_API}produtos_exemplo`)
        .then(response => response.json())
        .then(data => {
            setDataProdutosExemplo(data.data);
        })
        .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
        });
    }, []);

    function AlterCheckBox(){

        if(CheckBox == false){

            setCheckBox(true);
            setCorCarrinho("#21bf31");

        }else{

            setCheckBox(false);
            setCorCarrinho("#AAA");

        }

    }

    function adiciona_item(

        nome_produto,
        tipo_exibicao,
        qtd,
        categoria,
        lista,
        foto,
        valor,
        obs

    ){

        /* Validação dos inputs */
        if(nome_produto.trim() === ""){

            setPlaceObrigatorio("*");

            setTimeout(() => {

                setPlaceObrigatorio("");

            }, 3000)

        }else{

            if(CheckBox == true){

                carrinho = 1;

            }else{

                carrinho = 0;

            }

            const formData = new URLSearchParams();
            formData.append('nome_produto', nome_produto);
            formData.append('tipo_exibicao', tipo_exibicao);
            formData.append('qtd', qtd);
            formData.append('categoria', categoria);
            formData.append('lista', lista);
            formData.append('foto', foto);
            formData.append('carrinho', carrinho);
            formData.append('valor', valor);
            formData.append('obs', obs);

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

    }

    /* Filtrando o texto de busca retornada da API */

    const filtrar_busca = (texto) => {

        onChangecampo_nome(texto);

        if(texto){

            const resultado = DATA_PRODUTOS_EXEMPLO.filter(

                (item) => item.nome.toLowerCase().includes(texto.toLowerCase())

            )

            setDataFiltrada(resultado)

        }else{

            setDataFiltrada([])

        }

    }

    function focus_lista(ativacao){

        if(ativacao == true){

            setFocusLista(true);

        }else{

            setTimeout(()=>{

                setFocusLista(false);

            }, 200)
        }

    }

    return(

        <View style={styles.container}>

            <ScrollView>

                <Text style={styles.titulo}>

                    Nome do item

                </Text>

                <TextInput style={[styles.input]}
                    onChangeText={filtrar_busca}
                    value={campo_nome}
                    keyboardType="default"
                    placeholder={placeObrigatorio}
                    placeholderTextColor={"red"}
                    onFocus={()=> focus_lista(true)}
                    onBlur={()=> focus_lista(false)}
                    />

                {/* Lista de exemplo */}

                {dataFiltrada.length > 0 && focusLista == true && (<View style={styles.listaExemplo}>

                    {dataFiltrada.slice(0, config.qtd_itens_pesquisa).map((item)=>(

                        <TouchableOpacity key={item.id}>

                        <View style={styles.itemPesquisa}>

                            <View>

                                <Image style={styles.imgProduto} source={{ uri: `${item.url}` }} />

                            </View>

                            <View>

                                <Text style={styles.itemPesquisaNome}>

                                    {item.nome}

                                </Text>
                                
                            </View>

                        </View>

                        </TouchableOpacity>

                    ))}

                </View>)}

                <View style={styles.espacoQtd}>

                    <View style={{flex: 5}}>

                        <Text style={styles.titulo}>

                            Tipo

                        </Text>

                        <View style={styles.campoSelect}>
                            <Picker
                                selectedValue={selectedTipo}
                                onValueChange={(itemValue) => setSelectedTipo(itemValue)}
                            >
                                <Picker.Item label="Un" value="1" />
                                <Picker.Item label="Kg" value="2" />
                                <Picker.Item label="g" value="3" />
                                <Picker.Item label="L" value="4" />
                                <Picker.Item label="ml" value="5" />
                                <Picker.Item label="dz" value="6" />
                                <Picker.Item label="Caixa" value="7" />
                                <Picker.Item label="Pacote" value="8" />
                                <Picker.Item label="Garrafa" value="9" />
                                <Picker.Item label="Lata" value="10" />
                                <Picker.Item label="Embalagem" value="11" />
                                
                            </Picker>
                        </View>

                    </View>

                    <View style={[styles.campoSelect, {flex: 5}]}>

                        <Text style={styles.titulo}>

                            Quantidade

                        </Text>

                        <TextInput style={[styles.inputQtd]}
                            onChangeText={text =>{

                                const replaceNumero = text.replace(/[^0-9.]/g, '');
                                const replacePonto = replaceNumero.replace(/(\..*)\./g, '$1');
                                onChangeQtd(replacePonto);

                            }}
                            value={qtd}
                            keyboardType="numeric"
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
                        onChangeText={text =>{

                            const replaceNumero = text.replace(/[^0-9.]/g, '');
                            const replacePonto = replaceNumero.replace(/(\..*)\./g, '$1');
                            onChangeValor(replacePonto);

                        }}
                            value={valor}
                            keyboardType="numeric"
                            placeholder="0.00"
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
                                    color={corCarrinho}
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
                                selectedValue={selectedCategoria}
                                onValueChange={(itemValue) => setSelectedCategoria(itemValue)}
                            >

                                {DATA.map((item) => (

                                    <Picker.Item key={item.id} label={item.nome} value={item.id} />

                                ))}

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

                <Text style={styles.titulo}>

                    Observação

                </Text>

                <TextInput style={[styles.input, styles.inputFinal]}
                    onChangeText={setObservacao}
                    value={observacao}
                    keyboardType="default"
                    placeholder="Ex: Comprar apenas da marca x"
                    />

            </ScrollView>

            <IconeCorreto funcao={() => adiciona_item(campo_nome, selectedTipo, qtd, selectedCategoria, id_lista, 1, valor, observacao)}/>

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

    inputFinal:{

        marginBottom: 90

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

    },

    /* Lista de exemplo */

    listaExemplo:{

        position: 'absolute',
        zIndex: 1,
        backgroundColor: "white",
        right: 15,
        left: 15,
        top: 100,
        borderBottomWidth: 1,
        borderColor: config.cor2

    },

    itemPesquisa:{

        paddingVertical: 10,
        paddingHorizontal: 10,
        borderColor: config.cor2,
        borderTopWidth: 1,
        flexDirection: "row"

    },

    imgProduto:{

        width: 35,
        height: 35,
        borderRadius: 50,

    },

    itemPesquisaNome:{

        fontSize: 14,
        top: 6,
        left: 15,
        color: "#666"

    }

})