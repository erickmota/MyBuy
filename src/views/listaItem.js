import React, {useContext, useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableNativeFeedback, Image, TouchableOpacity, TouchableWithoutFeedback, Modal, Button, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserContext } from '../context/user';
import { useFocusEffect } from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import { showMessage } from 'react-native-flash-message';

import IconeAdd from "../componentes/botaoAdd"

import config from "../config";

export default function ListaItem({route, navigation}){

    const {id_lista} = route.params;

    /* Estados */

    const [DATA, setData] = useState([]);
    const [DATA_carrinho, setCarrinho] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalRegistrarVisible, setModalRegistrarVisible] = useState(false);
    const [DATA_confirmacoes, setDataConfirmacoes] = useState({});
    const [mercado, onChangeMercado] = useState("");
    const [DATA_mercados, setDataMercados] = useState([]);
    const [dataFiltradaMercados, setDataFiltradaMercados] = useState([]);
    const [focusLista, setFocusLista] = useState(false);

    /* Modal registrar compra */
    const [placeObrigatorio, setPlaceObrigatorio] = useState("Insira o nome do mercado");
    const [placeObrigatorioColor, setPlaceObrigatorioColor] = useState("#CCC");

    /* Modal adicionar ao carrinho */
    const [qtd, onChangeQtd] = useState();
    const [valor, onChangeValor] = useState();
    const [id_produto, setIdProduto] = useState();
    const [tipo, setTipo] = useState();

    let soma_carrinho = 0;

    /* Contexto */

    const { DATAUser } = useContext(UserContext);

    const carregar_API = useCallback(()=>{

        if(DATAUser){

            /* API produtos e categorias */
            
            fetch(`${config.URL_inicial_API}${DATAUser[0].id}/categorias`)
            .then(response => response.json())
            .then(async data => {
                
                let categoriesWithProducts = await Promise.all(data.data.categorias.map(async category => {
                    const response = await fetch(`${config.URL_inicial_API}${DATAUser[0].id}/produtos/${id_lista}/${category.id}`);
                    const productsData = await response.json();
                    return {
                        ...category,
                        produtos: productsData.data.Produtos  || []
                    };

                }));

                // Após buscar todas as categorias do usuário, busque todos os produtos
                const response = await fetch(`${config.URL_inicial_API}${DATAUser[0].id}/produtos/${id_lista}`);
                const allProductsData = await response.json();

                if(Array.isArray(allProductsData.data.Produtos) && allProductsData.data.Produtos.length > 0){

                    setDataConfirmacoes(allProductsData.data.Confirmacoes);

                    // Agora, adicione os produtos que não estão em nenhuma categoria do usuário
                    const uncategorizedProducts = allProductsData.data.Produtos.filter(product => {
                        return !categoriesWithProducts.some(category => 
                            category.produtos.some(prod => prod.id === product.id)
                        );
                    });

                    // Se houver produtos não categorizados, crie uma categoria "Genérica" para eles
                    if (uncategorizedProducts.length > 0) {
                        categoriesWithProducts.push({
                            id: "nulo", // Um ID genérico para a nova categoria
                            nome: 'Compartilhados', // Nome para a categoria "genérica"
                            produtos: uncategorizedProducts
                        });
                    }

                }

                console.log(categoriesWithProducts);
                console.log("FIM");

                setData(categoriesWithProducts);

            })
            .catch(error => {
                console.error('Erro ao buscar dados da API:', error);
            })

            /* API Produtos no carrinho */
            fetch(`${config.URL_inicial_API}${DATAUser[0].id}/produtos_carrinho/${id_lista}`)
            .then(response => response.json())
            .then(data => {
                setCarrinho(data.data.Produtos);
            })
            .catch(error => {
                console.error('Erro ao buscar dados da API dos carrinhos:', error);
            })

        }

    }, [DATAUser, id_lista])

    const atualiza_nome = ()=>{

        if(route.params){

            const {TituloLista} = route.params

            navigation.setOptions({ title: TituloLista });

        }else{

            navigation.setOptions({ title: "Mercado" });

        }

    }

    useFocusEffect(
        useCallback(() => {

            atualiza_nome();
            carregar_API();
    
          return () => {

            setData([]);
            setCarrinho([]);

          };
          
        }, [carregar_API])
    );

    function add_carrinho_modal(qtd, valor, id_produto, tipo){

        setIdProduto(id_produto);
        setTipo(tipo);
        onChangeQtd(qtd);
        onChangeValor(valor);
        setModalVisible(true);
        
    }

    const add_carrinho_API = () => {

        const formData = new URLSearchParams();
        formData.append('id_produto', id_produto);
        formData.append('qtd', qtd);
        formData.append('valor', valor);

        fetch(`${config.URL_inicial_API}${DATAUser[0].id}/adicionar_produto_carrinho`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
        })
        .then(response => response.json())
        .then(data => {

            setModalVisible(false);
            carregar_API();
    
        })
        .catch(errors => {
        console.error('Erro ao enviar solicitação:', errors);
        });

    }

    function remover_produto_carrinho(id_produto){

        const formData = new URLSearchParams();
        formData.append('id_produto', id_produto);

        fetch(`${config.URL_inicial_API}${DATAUser[0].id}/remover_produto_carrinho`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
        })
        .then(response => response.json())
        .then(data => {

            carregar_API();
    
        })
        .catch(errors => {
        console.error('Erro ao enviar solicitação:', errors);
        });

    }

    /* Registra a compra no histórico. API */
    const registrar_compra = () => {

        if(mercado.trim() === ""){

            setPlaceObrigatorioColor("red");
            setPlaceObrigatorio("*");

            setTimeout(() => {

                setPlaceObrigatorioColor("#CCC");
                setPlaceObrigatorio("Insira o nome do mercado");

            }, 2000)

        }else{

            const formData = new URLSearchParams();
            formData.append('nome_mercado', mercado);
            formData.append('id_lista', id_lista);
    
            fetch(`${config.URL_inicial_API}${DATAUser[0].id}/cadastrar_compra`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString()
            })
            .then(response => response.json())
            .then(data => {
    
                navigation.navigate("MinhasCompras");
        
            })
            .catch(errors => {
            console.error('Erro ao enviar solicitação:', errors);
            })

            .finally(()=>{

                onChangeMercado("");
                setData([]);
                setCarrinho([]);

            })

        }

    }

    /* Recebendo dados dos mercados de exemplo */
    useEffect(() => {
        
        fetch(`${config.URL_inicial_API}${DATAUser[0].id}/mercados`)
        .then(response => response.json())
        .then(data => {
            setDataMercados(data.data);
        })
        .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
        });

    }, []);
    
    const filtrar_busca_mercados = (texto) => {

        onChangeMercado(texto);

        if(texto && DATA_mercados.length > 0){

            const resultado = DATA_mercados.filter(

                (item) => item.nome.toLowerCase().includes(texto.toLowerCase())

            )

            setDataFiltradaMercados(resultado)

        }else{

            setDataFiltradaMercados([])

        }

    }

    function completar_nome_mercado(nome){

        onChangeMercado(nome);

        focus_lista(false);

    }

    /* Controla quando a lista está com foco ou não. */

    function focus_lista(ativacao){

        if(ativacao == true){

            setFocusLista(true);

        }else{

            setFocusLista(false);

        }

    }

    /* Função responsável a nomear os tipos de exibição
    de acordo com os números do banco:
    1 = Un
    2 = Kg
    3 = g
    4 = L
    5 = ml
    6 = dz
    7 = Caixa
    8 = Pacote
    9 = Garrafa
    10 = Lata
    11 = Embalagem */

    function verifica_exibicao(numero_exibicao, qtd, reduzido){

        switch (numero_exibicao) {

            case 1:

                return "Un";

            break;

            case 2:

                return "Kg";

            break;

            case 3:

                return "g";

            break;

            case 4:

                return "L";

            break;

            case 5:

                return "ml";

            break;

            case 6:

                return "dz";

            break;

            case 7:

                if(reduzido == 1){

                    return "Caixa";

                }else{

                    if(qtd > 1){

                        return "Caixas";
    
                    }else{
    
                        return "Caixa";
    
                    }

                }

            break;

            case 8:

                if(reduzido == 1){

                    return "Pacote"

                }else{

                    if(qtd > 1){

                        return "Pacotes";
    
                    }else{
    
                        return "Pacote";
    
                    }

                }

            break;

            case 9:

                if(reduzido == 1){

                    return "Garrafa";

                }else{

                    if(qtd > 1){

                        return "Garrafas";
    
                    }else{
    
                        return "Garrafa";
    
                    }

                }

            break;

            case 10:

                if(reduzido == 1){

                    return "Lata";

                }else{

                    if(qtd > 1){

                        return "Latas";
    
                    }else{
    
                        return "Lata";
    
                    }

                }

            break;

            case 11:

                if(reduzido == 1){

                    return "Embala";

                }else{

                    if(qtd > 1){

                        return "Embalagens";
    
                    }else{
    
                        return "Embalagem";
    
                    }

                }

            break;

        }

    }

    /* Ajusta o tamanho do texto de observação.
    Texto e temanho desejado passados por parâmetro */

    function ajusta_tamanho_obs(texto, tamanho){

        if(texto.length > tamanho){

            return texto.substring(0, tamanho)+"...";

        }else{

            return texto;

        }

    }

    /* 1 = Un
    2 = Kg
    3 = g
    4 = L
    5 = ml
    6 = dz
    7 = Caixa
    8 = Pacote
    9 = Garrafa
    10 = Lata
    11 = Embalagem */

    function soma_valor_quantidade(qtd, valor, tipo){

        let valor_real = 0;

        /* Se caso o tipo de exibição do produto for 3 (g) ou 5 (ml), o valor retornado como preço de exibição
        será mantido o mesmo, pois, em "ml" e "g" naõ será calculado pela quantidade. */

        if(tipo == 5 || tipo == 3){

            valor_real = valor;

        }else{

            valor_real = qtd * valor;

        }

        return valor_real;

    }

    /* Formata o valor para aparece corretamente nos itens do carrinho */

    function formatar_valor(valor){

        if(Number.isInteger(valor)){

            return valor+".00";

        }else{

            /* Retorna o valor com apenas duas casas decimais */

            const numString = valor.toString();

            const parte = numString.split(".");

            const inteiro = parte[0];

            const decimal = parte[1];

            if(decimal.length < 2){

                const decimal_atualizado = decimal.substring(0, 2);

                return parseFloat(inteiro+"."+decimal_atualizado+"0")

            }else{

                const decimal_atualizado = decimal.substring(0, 2);

                return parseFloat(inteiro+"."+decimal_atualizado)

            }
            
        }

    }

    const somar_carrinho = (valor) => {

        const novo_valor = soma_carrinho + valor;

        soma_carrinho = novo_valor;

    }

    function mostrar_alerta_permissao(){

        showMessage({
            message: "Impossível prosseguir!",
            description: "Apenas o administrador da lista, tem permissão para editar produtos compartilhados.",
            type: "warning", // ou "danger", "info", etc.
            icon: "auto",
            duration: 3500
        });

    }

    function mostrar_alerta_carrinho(){

        showMessage({
            message: "Carrinho não definido!",
            description: "Você precisa ter ao menos um produto no carrinho, para criar um registro de compra.",
            type: "info", // ou "danger", "info", etc.
            icon: "auto",
            duration: 3500
        });

    }

    const setar_modal_registro = () => {

        if(DATA_confirmacoes.produtos_carrinho < 1){

            mostrar_alerta_carrinho()

        }else{

            setModalRegistrarVisible(true);

        }
  
      }

    return(

        <View style={styles.container}>

            <StatusBar backgroundColor={config.cor1} style="light" />

            <FlashMessage position="top" />

            {/* Modal */}

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

                            <View style={styles.areaQtd}>

                                <Text style={styles.titulo}>

                                    Quantidade

                                </Text>

                                <View style={{flexDirection: "row"}}>

                                    <View style={styles.caixaTipo}>

                                        <Text style={{fontSize: 11, color: "white"}}>

                                            {verifica_exibicao(parseInt(tipo), false, 1)}

                                        </Text>

                                    </View>

                                    <TextInput style={[styles.input, {flex: 3}]}
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

                            <View style={styles.areaValor}>

                                <Text style={styles.titulo}>

                                    Valor

                                </Text>

                                <TextInput style={[styles.input]}
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

                        <View style={styles.AreaBtnConfirmar}>

                            <Button onPress={()=> add_carrinho_API()} color={config.cor2} title="Confirmar  ->"/>

                        </View>

                        {/* <Text style={styles.modalText}>Este é um modal!</Text>
                        <Button title="Fechar" onPress={() => setModalVisible(false)} /> */}

                    </View>

                </View>

                </TouchableWithoutFeedback>

            </Modal>

            <ScrollView>

                <View style={styles.areaListas}>

                    <View style={{backgroundColor: "#FFF"}}>

                        {DATA && DATA.length > 0 ? (

                            DATA.map(item=>(

                                Array.isArray(item.produtos) && item.produtos.length > 0 && (

                                    <View key={item.id}>

                                        <Text style={styles.tituloListas}>

                                            {item.nome}

                                        </Text>

                                        {

                                            item.produtos.map(prod=>(

                                                <View key={prod.id} style={styles.itemLista}>

                                                    <View style={styles.areaFoto}>

                                                        {prod.url !== null ? (

                                                            /* Foto que aparecerá caso o item tiver uma foto */
                                                            <Image style={styles.imgProduto} source={{ uri: `${prod.url}` }} />

                                                        ):(

                                                            /* Foto caso o item não tiver uma foto */
                                                            <Image style={styles.imgProduto} source={{ uri: `${config.Foto_prod_nulo}` }} />

                                                        )}

                                                        {item.id == "nulo" && (

                                                            prod.foto_dono == null ? (

                                                                <Image style={styles.imgUsuarios} source={{ uri: `${config.Foto_usuario_nulo}` }} />

                                                            ):(

                                                                <Image style={styles.imgUsuarios} source={{ uri: `${prod.foto_dono}` }} />

                                                            )

                                                        )}

                                                    </View>

                                                    <TouchableOpacity
                                                    
                                                        activeOpacity={config.opacity_btn}
                                                        onPress={() =>

                                                            {
                                                                
                                                                if(item.id != "nulo" || DATA_confirmacoes.dono_lista == true){

                                                                    if(item.id == "nulo"){

                                                                        navigation.navigate("Editar_item", {
                                                                
                                                                            id_produto: prod.id,
                                                                            nome_produto: prod.nome,
                                                                            qtd_produto: prod.qtd,
                                                                            id_foto: prod.id_foto,
                                                                            url: prod.url,
                                                                            tipo_exibicao: prod.tipo_exibicao,
                                                                            valor_prod: prod.valor,
                                                                            obs: prod.obs,
                                                                            categoria: "nulo",
                                                                            carrinho: prod.carrinho
                                                                    
                                                                        })

                                                                    }else{

                                                                        navigation.navigate("Editar_item", {
                                                                
                                                                            id_produto: prod.id,
                                                                            nome_produto: prod.nome,
                                                                            qtd_produto: prod.qtd,
                                                                            id_foto: prod.id_foto,
                                                                            url: prod.url,
                                                                            tipo_exibicao: prod.tipo_exibicao,
                                                                            valor_prod: prod.valor,
                                                                            obs: prod.obs,
                                                                            categoria: prod.id_categorias,
                                                                            carrinho: prod.carrinho
                                                                    
                                                                        })

                                                                    }

                                                                    console.log("Categoria: "+prod.id_categorias);

                                                                }else{

                                                                    mostrar_alerta_permissao();

                                                                }
                                                        
                                                        }
                                                    
                                                    }
                                                    
                                                    >

                                                        <View style={{flex: 3, flexDirection: "column"}}>

                                                            {prod.qtd > 0 || item.id == "nulo" || prod.obs != "" ? (

                                                                <Text style={styles.titleLista}>
                                                                                                                                
                                                                    {prod.nome}

                                                                </Text>

                                                            ):(

                                                                <Text style={[styles.titleLista, {marginTop: 10}]}>
                                                                    
                                                                    {prod.nome}
                                                                    
                                                                </Text>

                                                            )}

                                                            {prod.qtd > 0 || item.id == "nulo" ? (

                                                                <View style={{flexDirection: "row"}}>

                                                                    <Text style={styles.qtdItens}>
                                                                        
                                                                        {prod.qtd} {verifica_exibicao(parseInt(prod.tipo_exibicao), Math.ceil(prod.qtd), 0)}

                                                                        {prod.nome_dono != undefined ? (

                                                                            (" | ")

                                                                        ): null}
                                                                        
                                                                    </Text>

                                                                    <Text style={[styles.qtdItens, styles.nomeDonoProd]}>

                                                                        {prod.nome_dono != undefined ? (

                                                                            prod.nome_dono

                                                                        ): null}
                                                                        
                                                                    </Text>

                                                                </View>

                                                            ):null}

                                                            {prod.obs && <View style={{flexDirection: "row"}}>

                                                                    <Text style={styles.obs}>
                                                                        
                                                                        * {ajusta_tamanho_obs(prod.obs, 37)}
                                                                        
                                                                    </Text>

                                                                </View>

                                                            }

                                                        </View>

                                                    </TouchableOpacity>

                                                    <TouchableWithoutFeedback onPress={()=> add_carrinho_modal(prod.qtd, prod.valor, prod.id, prod.tipo_exibicao)}>

                                                        <View style={[styles.iconeLista, {flex:1}]}>

                                                            <Icon
                                                                name="cart-plus"
                                                                size={25}
                                                                color={"#0ee031"}
                                                                />

                                                        </View>

                                                    </TouchableWithoutFeedback >

                                                </View>

                                            ))

                                        }

                                    </View>

                                )

                            ))

                        ):(

                            <View style={styles.itemVazio}>

                                <Image style={styles.gif_load} source={require("../img/carregando.gif")} />

                            </View>

                        )}

                    </View>

                    {DATA_carrinho && DATA_carrinho.length > 0 ? (

                        <View style={styles.areaCarrinho}>

                            <View>

                                <Text style={[styles.tituloListas, styles.tituloListasCarrinho]}>

                                    <Icon
                                        name="cart-variant"
                                        size={19}
                                        color={config.cor1}
                                    /> Carrinho

                                </Text>

                            </View>

                            {/* Carrinho */}
                            {DATA_carrinho.map(item => (

                                <View key={item.id} style={styles.itemLista}>

                                    <View style={styles.areaFoto}>

                                        {item.url !== null ? (

                                            /* Foto que aparecerá caso o item tiver uma foto */
                                            <Image style={styles.imgProduto} source={{ uri: `${item.url}` }} />

                                        ):(

                                            /* Foto caso o item não tiver uma foto */
                                            <Image style={styles.imgProduto} source={{ uri: `${config.Foto_prod_nulo}` }} />

                                        )}

                                    </View>

                                    <TouchableOpacity
                                    
                                        activeOpacity={config.opacity_btn}
                                        onPress={() =>

                                            {
                                                
                                                if(item.id_dono == DATAUser[0].id || DATA_confirmacoes.dono_lista == true){

                                                    if(item.id_dono != DATAUser[0].id){

                                                        navigation.navigate("Editar_item", {
                                                                    
                                                            id_produto: item.id,
                                                            nome_produto: item.nome,
                                                            qtd_produto: item.qtd,
                                                            id_foto: item.id_foto,
                                                            url: item.url,
                                                            tipo_exibicao: item.tipo_exibicao,
                                                            valor_prod: item.valor,
                                                            obs: item.obs,
                                                            categoria: "nulo",
                                                            carrinho: item.carrinho
                                                    
                                                        })

                                                    }else{

                                                        navigation.navigate("Editar_item", {
                                                                    
                                                            id_produto: item.id,
                                                            nome_produto: item.nome,
                                                            qtd_produto: item.qtd,
                                                            id_foto: item.id_foto,
                                                            url: item.url,
                                                            tipo_exibicao: item.tipo_exibicao,
                                                            valor_prod: item.valor,
                                                            obs: item.obs,
                                                            categoria: item.id_categorias,
                                                            carrinho: item.carrinho
                                                    
                                                        })

                                                    }

                                                    console.log("Categoria: "+item.id_categorias);

                                                }else{

                                                    mostrar_alerta_permissao();

                                                }
                                        
                                            }
                                    
                                        }
                                    
                                    >

                                    <View style={{flex: 3, flexDirection: "column"}}>

                                        <Text style={[styles.titleLista, styles.itemMarcado]}>
                                            
                                            {item.nome}
                                            
                                        </Text>
                                        
                                        <View style={{flexDirection: "row"}}>

                                            <Text style={styles.qtdItens}>
                                                
                                            {item.qtd} {verifica_exibicao(parseInt(item.tipo_exibicao), Math.ceil(item.qtd), 0)}{" / "}
                                                
                                            </Text>

                                            <Text style={[styles.qtdItens, {color: "#6ec0fa"}]}>

                                                {/* Aqui existem 3 funções com funcionamento simultâneo (uma depende da outra para funcionar) */}
                                                
                                                {"R$"}{formatar_valor(soma_valor_quantidade(parseFloat(item.qtd), parseFloat(item.valor), parseInt(item.tipo_exibicao)))}

                                                {somar_carrinho(parseFloat(soma_valor_quantidade(parseFloat(item.qtd), parseFloat(item.valor), parseInt(item.tipo_exibicao))))}
                                                
                                            </Text>

                                        </View>

                                    </View>

                                    </TouchableOpacity>

                                    <TouchableWithoutFeedback onPress={()=> remover_produto_carrinho(item.id)}>

                                        <View style={[styles.iconeLista, {flex: 1}]}>

                                            <Icon
                                                name="cart-minus"
                                                size={25}
                                                color={"#FF0000"}
                                                />

                                        </View>

                                    </TouchableWithoutFeedback>

                                </View>

                            ))}

                        </View>

                    ):(

                        <View style={styles.itemVazio}>

                            <Text style={styles.textItemVazio}>

                                Nada encontrado!

                            </Text>

                        </View>

                    )}

                </View>

            </ScrollView>

            <View>

                <IconeAdd caminho={"AddItem"} id_lista={id_lista}/>

            </View>

            <TouchableNativeFeedback onPress={()=> setar_modal_registro()}>

            <View style={styles.containerBtnComprar}>

                <Icon
                    name="cart-arrow-right"
                    size={50}
                    color={"#FFF"}
                    />

                <Text style={styles.textBtnComprar}>

                    Registrar{"\n"}
                    <Text style={{fontSize: 20, fontWeight: "bold"}}>R${formatar_valor(soma_carrinho)}</Text>

                </Text>

            </View>

            </TouchableNativeFeedback>

            {/* Modal de registro em compras */}
            <Modal
            
              animationType="fade" // ou 'fade', 'none'
              transparent={true}    // Define se o fundo será transparente
              visible={modalRegistrarVisible}
              onRequestClose={() => setModalRegistrarVisible(false)} // Fechar modal ao clicar no botão 'voltar'

            >

              <TouchableWithoutFeedback onPress={() => setModalRegistrarVisible(false)}>

                <View style={styles.centeredView}>

                    <View style={styles.modalView}>

                      <View style={styles.corpoModal}>

                        <View style={{flexDirection: "row", justifyContent: "center", borderBottomWidth: 1, paddingBottom: 10, borderColor: "#CCC"}}>

                          <Text style={{fontWeight: "700"}}>

                            Valor total:{" "}

                          </Text>

                          <Text style={{fontWeight: "700", color: "#6ec0fa"}}>

                            R${formatar_valor(soma_carrinho)}

                          </Text>

                        </View>

                        <View style={{marginTop: 20}}>

                          <Text>

                            Em qual mercado você está efetuando essa compra?

                          </Text>

                        </View>

                        <View>

                            <TextInput style={[styles.input]}
                                onChangeText={filtrar_busca_mercados}
                                onFocus={() => focus_lista(true)}
                                onChange={() => focus_lista(true)}
                                value={mercado}
                                keyboardType="default"
                                maxLength={30}
                                placeholder={placeObrigatorio}
                                placeholderTextColor={placeObrigatorioColor}
                            />

                            {/* Espaço lista de exemplos, mercado */}

                            {dataFiltradaMercados.length > 0 && focusLista == true && (

                                <View style={styles.exemplosMercadosEspaco}>

                                    {dataFiltradaMercados.slice(0, 2).map((item)=>(

                                        <TouchableWithoutFeedback onPress={()=> completar_nome_mercado(item.nome)}>

                                            <View key={item.id} style={styles.itemExemplosMercados}>

                                                <Text style={styles.nomeMercadoExemplo}>

                                                    {item.nome}

                                                </Text>

                                            </View>

                                        </TouchableWithoutFeedback>

                                    ))}

                                </View>

                            )}

                            <Text style={{fontSize: 11, color: config.cor2, marginTop: 5, opacity: 0.7}}>

                            * Dica: dê o nome e o bairro do mercado. Exemplo: "Bom Lugar - Vila Pedroso"

                            </Text>

                        </View>

                        <View style={styles.AreaBtnConfirmar}>

                            <Button onPress={()=> registrar_compra()} color={config.cor2} title="Registrar compra  ->"/>

                        </View>

                      </View>
                      
                    </View>

                </View>

              </TouchableWithoutFeedback>

            </Modal>

        </View>

    )

}

const styles = StyleSheet.create({

    container:{

        flex: 1,
        backgroundColor: "#f8eaff"

    },

    tituloListas: {

        color: config.cor2,
        fontSize: 15,
        paddingHorizontal: 15,
        marginTop: 20,
        marginBottom: 5,
        fontWeight: "bold"
    
    },

    tituloListasSeguir:{

        marginTop: 35

    },
    
    tituloListasCarrinho:{

        fontSize: 18,
        color: config.cor1

    }, 

    areaListas:{

        flex: 9,
        paddingBottom: 80
    
    },

    itemLista: {

    marginHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#CCC",
    flexDirection: "row"

    },

    titleLista: {

        fontSize: 17,
        
    },

    itemMarcado:{

        textDecorationLine: "line-through",

    },

    qtdItens:{

        fontSize: 13,
        color: config.corTextoSecundario,
        alignContent: "center",
    
    },

    nomeDonoProd:{

        color: config.cor2,
        opacity: 0.8

    },

    obs:{

        fontSize: 13,
        color: config.corObs

    },

    iconeLista: {

        alignItems: "flex-end",
        flex: 1,
        justifyContent: "center"
    
    },

    areaCarrinho:{

        backgroundColor: "#f8eaff",
        borderTopWidth: 1,
        marginTop: -1,
        borderColor: config.cor1

    },

    containerInfo:{

        backgroundColor: config.cor2,
        height: 30,
        flexDirection: "row",

    },

    containerBtnComprar:{

        backgroundColor: config.cor1,
        height: 60,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center"

    },

    textBtnComprar:{

        color: "#FFF",
        fontWeight: "300",
        fontSize: 15,
        paddingRight: 5,
        textAlign: "center"

    },

    imgProduto:{

        width: 45,
        height: 45,
        borderRadius: 50,

    },

    areaFoto:{

        marginRight: 15

    },

    itemVazio:{

        borderTopWidth: 1,
        marginTop: -1,
        borderColor: config.cor1,
        paddingTop: 30,
        paddingVertical: 30,
        alignItems: "center"

    },

    textItemVazio:{

        fontSize: 15,
        color: "#BBB",
        textAlign: "center"

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

      modalText: {
        marginBottom: 15,
        textAlign: 'center',
        
      },

      input:{

        borderBottomWidth: 1,
        borderBottomColor: "#CCC",
        marginTop: 20,
        fontSize: config.tamanhoTextosInputs,
        color: "#777"

    },

    corpoInputs:{

        flexDirection: "row"

    },

    areaQtd:{

        flex: 1,
        marginRight: 15

    },

    areaValor:{

        flex: 1,
        marginLeft: 15

    },

    areaX:{

        position: "absolute",
        top: 3,
        left: 8

    },

    AreaBtnConfirmar:{

        marginTop: 20

    },

    caixaTipo:{

        marginTop: 20,
        flex: 2,
        borderWidth: 0,
        marginRight: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#BBB",
        borderRadius: 7

    },

    imgUsuarios:{

        width: 24,
        height: 24,
        borderRadius: 50,
        marginTop: -19,
        borderWidth: 2,
        borderColor: "white"

    },

    /* Espaço exemplos mercados */

    exemplosMercadosEspaco:{

        position: "absolute",
        zIndex: 1,
        backgroundColor: "#EEE",
        right: 0,
        left: 0,
        top: 48,

    },

    itemExemplosMercados:{

        paddingVertical: 2,
        borderBottomWidth: 1,
        borderColor: "#CCC"

    },

    nomeMercadoExemplo:{

        color: "#333"

    },

    gif_load:{

        width: 70,
        height: 70

    }

})