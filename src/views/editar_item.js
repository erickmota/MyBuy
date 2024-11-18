import React, {useState, useContext, useEffect, useLayoutEffect} from "react";
import { Alert, View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, TouchableOpacity, ScrollView, Image } from "react-native";
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/user';
import FlashMessage from 'react-native-flash-message';
import { showMessage, hideMessage } from 'react-native-flash-message';

import IconeCorreto from "../componentes/botaoCorreto"
import config from "../config";

export default function EditarItem({route}){

    /* Contexto */
    const { DATAUser } = useContext(UserContext);
    const [DATA, setData] = useState([]);
    const [DATA_PRODUTOS_EXEMPLO, setDataProdutosExemplo] = useState([]);

    const {id_lista} = route.params;

    const {id_produto} = route.params;
    const {nome_produto} = route.params;
    const {qtd_produto} = route.params;
    const {id_foto} = route.params;
    const {url} = route.params;
    const {tipo_exibicao} = route.params;
    const {valor_prod} = route.params;
    const {obs} = route.params;
    const {categoria} = route.params;
    const {carrinho} = route.params;

    const navigation = useNavigation();

    /* Estados */

    const [campo_nome, onChangecampo_nome] = useState(nome_produto);
    const [qtd, onChangeQtd] = useState(qtd_produto);
    const [valor, onChangeValor] = useState(valor_prod);
    const [selectedTipo, setSelectedTipo] = useState(tipo_exibicao);
    const [selectedCategoria, setSelectedCategoria] = useState(categoria);
    const [observacao, setObservacao] = useState(obs);

    const [CheckBox, setCheckBox] = useState();
    const [corCarrinho, setCorCarrinho] = useState();

    const [placeObrigatorio, setPlaceObrigatorio] = useState("");

    const [dataFiltrada, setDataFiltrada] = useState([]);
    const [focusLista, setFocusLista] = useState(false);

    const [foto, setFoto] = useState([id_foto, url]);

    /* Função responsável por setar o estado correto da foto inicial */
    const seta_foto = () => {

        if(id_foto == null){

            setFoto([0, config.Foto_prod_nulo]);

        }else{

            setFoto([id_foto, url]);

        }

    }

    /* Função responsável por setar o estado correto do carrinho */
    useEffect(()=>{

        if(carrinho == 1){

            setCheckBox(true);
            setCorCarrinho("#21bf31");

        }else{

            setCheckBox(false);
            setCorCarrinho("#AAA");

        }

    }, [])

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

    /* Recebendo dados das categorias */
    useEffect(() => {

        fetch(`${config.URL_inicial_API}${DATAUser[0].id}/categorias`)
        .then(response => response.json())
        .then(data => {
            setData(data.data.categorias);
        })
        .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
        });

        /* Recebendo dados dos produtos de exemplo */
        fetch(`${config.URL_inicial_API}/${DATAUser[0].id}/produtos_exemplo_usuario`)
        .then(response => response.json())
        .then(data => {
            setDataProdutosExemplo(data.data);
        })
        .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
        });

        seta_foto();

    }, [DATA]);

    const editar_produto = () => {

        /* Validação dos inputs */

        if(campo_nome.trim() === ""){

            setPlaceObrigatorio("*");

            setTimeout(() => {

                setPlaceObrigatorio("");

            }, 3000)

            hideMessage();

        }else{

            /* Verificando se o checkbox do carrinho está ativo */

            let carrinho_set = 0;

            if(CheckBox == true){

                carrinho_set = 1;

            }else{

                carrinho_set = 0;

            }

            const formData = new URLSearchParams();
            formData.append('id_produto', id_produto);
            formData.append('nome_produto', campo_nome);
            formData.append('tipo_exibicao', selectedTipo);
            formData.append('qtd', qtd);
            formData.append('id_categorias', selectedCategoria);
            formData.append('id_fotos', foto[0]);
            formData.append('carrinho', carrinho_set);
            formData.append('valor', valor);
            formData.append('obs', observacao);
    
            fetch(`${config.URL_inicial_API}${DATAUser[0].id}/edita_produto`, {
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

    function AlterCheckBox(){

        if(CheckBox == false){

            setCheckBox(true);
            setCorCarrinho("#21bf31");

        }else{

            setCheckBox(false);
            setCorCarrinho("#AAA");

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

    /* Controla quando a lista está com foco ou não. */

    function focus_lista(ativacao){

        if(ativacao == true){

            setFocusLista(true);

        }else{

            setFocusLista(false);

        }

    }

    /* Função responsável por alterar os dados do produto,
    quando selecionado da lista de exexmplo */

    function altera_dados(foto_id, foto_url, nome, tipo){

        focus_lista(false);

        if(foto_id == null){

            setFoto([0, config.Foto_prod_nulo]);

        }else{

            setFoto([foto_id, foto_url]);

        }
        
        onChangecampo_nome(nome);
        setSelectedTipo(tipo);

    }

    /* Função responsável por remover a foto do produto */

    const altera_foto = () => {

        if(foto[0] != 0){

            /* setFoto([0, config.Foto_prod_nulo]); */

        }else{

            /* Nenhuma ação */

        }

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
                        Alterando item...
                    </Text>
                </View>
            ),
        });

    }

    function btn_inserir(){

        mostrar_alerta();
        editar_produto();

    }

    return(

        <View style={styles.container}>

            <ScrollView>

                <View>

                    <View>

                        <Text style={styles.titulo}>

                            Nome do item

                        </Text>

                    </View>

                    <View style={styles.espacoNome}>

                        <View style={styles.espacoInputNome}>

                            <TextInput style={[styles.input]}
                            onChangeText={filtrar_busca}
                            value={campo_nome}
                            keyboardType="default"
                            placeholder={placeObrigatorio}
                            placeholderTextColor={"red"}
                            onFocus={()=> focus_lista(true)}
                            />

                            {/* Lista de exemplo */}

                            {dataFiltrada.length > 0 && focusLista == true && (<View style={styles.listaExemplo}>

                            {dataFiltrada.slice(0, config.qtd_itens_pesquisa).map((item)=>(

                                <TouchableOpacity activeOpacity={0.7} key={item.id} onPress={()=> altera_dados(item.id_foto, item.url, item.nome, item.tipo_exibicao)}>

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

                            <TouchableWithoutFeedback onPress={()=>focus_lista(false)}>

                                <View style={{alignItems: "center", backgroundColor: config.cor2, justifyContent: "center"}}>

                                    <Text style={{color: "white"}}>

                                        X

                                    </Text>

                                </View>

                            </TouchableWithoutFeedback>

                            </View>)}

                        </View>

                        <TouchableWithoutFeedback onPress={()=> altera_foto()}>

                            <View style={styles.espacoFoto}>

                                <Image style={styles.imgProdutoNome} source={{ uri: `${foto[1]}` }} />
                                
                            </View>

                        </TouchableWithoutFeedback>

                    </View>

                </View>

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

                        {categoria == "nulo" ? (

                            <View>

                                <Text style={[styles.titulo, {opacity: 0.3}]}>

                                    Categoria

                                </Text>

                                <View style={[styles.campoSelect, {opacity: 0.3}]}>
                                    <Picker
                                        selectedValue={parseInt(selectedCategoria)}
                                        onValueChange={(itemValue) => setSelectedCategoria(itemValue)}
                                        enabled={false}
                                    >

                                    <Picker.Item key={false} label="Categoria compartilhada" value={false} />

                                    </Picker>
                                </View>

                            </View>

                        ):(

                            <View>

                                <Text style={styles.titulo}>

                                        Categoria

                                </Text>

                                <View style={styles.campoSelect}>
                                    <Picker
                                        selectedValue={parseInt(selectedCategoria)}
                                        onValueChange={(itemValue) => setSelectedCategoria(itemValue)}
                                        enabled={true}
                                    >

                                        {DATA.map((item) => (

                                            <Picker.Item key={item.id} label={item.nome} value={item.id} />

                                        ))}

                                    </Picker>
                                </View>

                            </View>
                            
                        )}

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

            <IconeCorreto funcao={() => btn_inserir()}/>

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

        position: "absolute",
        zIndex: 1,
        backgroundColor: "white",
        right: 15,
        left: 15,
        top: 48,
        borderBottomWidth: 1,
        borderColor: config.cor2

    },

    itemPesquisa:{

        paddingVertical: 5,
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

    imgProdutoNome:{

        width: 45,
        height: 45,
        borderRadius: 50,

    },

    itemPesquisaNome:{

        fontSize: 14,
        top: 6,
        left: 15,
        color: "#666"

    },

    espacoNome:{

        flexDirection: "row"

    },

    espacoInputNome:{

        flex: 10

    },

    espacoFoto:{

        flex: 2,
        alignItems: "flex-end",
        right: 15

    }

})