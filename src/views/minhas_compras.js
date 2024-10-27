import React, {useState, useContext, useLayoutEffect, useEffect, useCallback} from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Alert, Image, TouchableWithoutFeedback, Modal, Button, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/user';
import { useFocusEffect } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Menu } from 'react-native-paper';

import config from '../config';

export default function Minhas_compras(){

    const navigation = useNavigation();

    /* Contexto */
    const { DATAUser } = useContext(UserContext);

    /* Estados */
    const [DATA, setData] = useState([]);
    const [URL_API, setURL_API] = useState("mes_atual");
    const [load_API, setLoadApi] = useState();

    /* DataPicker */
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [date2, setDate2] = useState(new Date());
    const [open2, setOpen2] = useState(false);

    /* Menu popup */
    const [visible, setVisible] = useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    /* Modal */
    const [modalVisible, setModalVisible] = useState(false);
    const [datas_selecionadas, setDatasSelecionadas] = useState([

        "1996-10-16",
        "2024-10-27"

    ]);

    /* Conexão com a API da página compras */
    const carregar_API = useCallback(() => {

        setLoadApi(true);
        fetch(`${config.URL_inicial_API}${DATAUser[0].id}/compras/${URL_API}`)
        .then(response => response.json())
        .then(data => {
            setData(data.data);
            setVisible(false);
            setModalVisible(false);
            setLoadApi(false);
        })
        .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
        });

    }, [URL_API]);

    useFocusEffect(

        useCallback(() => {

            carregar_API();
    
          return () => {

          };
          
        }, [URL_API])

    );

    useLayoutEffect(()=>{

        navigation.setOptions({
            
            headerRight: () => (
                    <View style={{ flexDirection: 'row' }}>
                        <Menu
                            visible={visible}
                            onDismiss={closeMenu}
                            anchor={
                                <Icon
                                    name="filter-variant-plus"
                                    size={25}
                                    color={"white"}
                                    style={{ marginRight: 10 }}
                                    onPress={openMenu}
                                />
                            }
                        >
                            <Menu.Item style={URL_API == "mes_atual" ? {backgroundColor: config.cor2} : null} onPress={() => set_URL_API("mes_atual")} title={<View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon
                                    name="sort-calendar-descending"
                                    size={30}
                                    color={URL_API == "mes_atual" ? "white": "#444"}
                                    style={{ marginRight: 10 }}
                                    onPress={openMenu}
                                />
                                <Text style={URL_API == "mes_atual" ? {marginLeft: 0, color: "white"}:{marginLeft: 0, color: "#444"}}>Mês atual</Text>
                            </View>} />

                            <Menu.Item style={URL_API == "mes_passado" ? {backgroundColor: config.cor2} : null} onPress={() => set_URL_API("mes_passado")} title={<View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon
                                    name="sort-calendar-ascending"
                                    size={30}
                                    color={URL_API == "mes_passado" ? "white": "#444"}
                                    style={{ marginRight: 10 }}
                                    onPress={openMenu}
                                />
                                <Text style={URL_API == "mes_passado" ? {marginLeft: 0, color: "white"}:{marginLeft: 0, color: "#444"}}>Mês passado</Text>
                            </View>} />

                            <Menu.Item style={divide_url(URL_API) == "escolher_datas" ? {backgroundColor: config.cor2} : null} onPress={() => {setModalVisible(true)}} title={<View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon
                                    name="calendar-range"
                                    size={28}
                                    color={divide_url(URL_API) == "escolher_datas" ? "white": "#444"}
                                    style={{ marginLeft: -3 }}
                                    onPress={openMenu}
                                />
                                <Text style={divide_url(URL_API) == "escolher_datas" ? {marginLeft: 14, color: "white"}:{marginLeft: 14, color: "#444"}}>Selecionar datas</Text>
                            </View>} />

                        </Menu>
                    </View>
              ),

        })

    },[visible, URL_API])

    const set_URL_API = (tipo) => {

        switch(tipo){

            case "mes_atual":

                setURL_API("mes_atual");

            break;

            case "mes_passado":

                setURL_API("mes_passado");

            break;

            case "escolher_datas":

                setURL_API(`escolher_datas/${formatDate(date, "banco")}/${formatDate(date2, "banco")}`);

            break;

        }

    }

    const formatDate = (date, tipo) => {

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // +1 porque os meses começam em 0
        const year = date.getFullYear();

        switch(tipo){

            case "exibicao":

                data_formatada = `${day}/${month}/${year}`;

            break;

            case "banco":

                data_formatada = `${year}-${month}-${day}`;

            break;

        }

        return data_formatada;

    };

    const divide_url = (url) => {

        url_inicial = url.split("/");

        return url_inicial[0]

    }

    return(

        <View style={styles.container}>

            {/* DataPicker */}
            {open && (
            <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                setOpen(false);
                setDate(selectedDate || date);
                }}
            />
            )}

            {/* DataPicker 2 */}
            {open2 && (
            <DateTimePicker
                value={date2}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                setOpen2(false);
                setDate2(selectedDate || date2);
                }}
            />
            )}

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

                            <View style={styles.viewData1}>

                                <TouchableWithoutFeedback onPress={()=> setOpen(true) }>

                                    <View style={{alignItems: "center"}}>

                                        <Icon
                                            name="sort-calendar-ascending"
                                            size={40}
                                            color={"#888"}
                                        />

                                        <Text>

                                            {formatDate(date, "exibicao")}

                                        </Text>

                                    </View>

                                </TouchableWithoutFeedback>

                            </View>

                            <View>

                                <Text style={{color: "#DDD"}}>

                                    ATÉ

                                </Text>

                            </View>

                            <View style={styles.viewData1}>

                            <TouchableWithoutFeedback onPress={()=> setOpen2(true) }>

                                <View style={{alignItems: "center"}}>

                                    <Icon
                                        name="sort-calendar-descending"
                                        size={40}
                                        color={"#888"}
                                    />

                                    <Text>

                                        {formatDate(date2, "exibicao")}

                                    </Text>

                                </View>

                                </TouchableWithoutFeedback>

                            </View>

                        </View>

                        <View style={styles.viewBtn}>

                            <Button onPress={()=> set_URL_API("escolher_datas")} title='Filtrar' color={config.cor2} />

                        </View>
                      
                    </View>

                </View>

                </TouchableWithoutFeedback>

            </Modal>

            {load_API == true ? (

                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>

                    <Text style={{color: config.corTextoSecundario}}>

                        Recuperando suas compras...

                    </Text>

                </View>

            ):(

                (DATA == false)?(

                    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>

                        <Text style={{color: config.corTextoSecundario}}>

                            Nenhuma compra disponível

                        </Text>

                    </View>

                ):(

                <ScrollView>

                {DATA.map((item, index, array) => (

                    <View key={item.id}>

                        <TouchableWithoutFeedback
                        
                            onPress={()=> navigation.navigate("Minhas_compras_itens", {
                                id_compra: item.id,
                                data: item.data,
                                horas: item.horas,
                                valor_total: item.valor_compra,
                                mercado: item.nome_mercado
                            })}
                        
                        >

                            <View style={styles.boxCompra}>

                                <View style={styles.fundoData}>

                                    <Icon
                                        name="calendar-blank-outline"
                                        size={25}
                                        style={styles.iconCalendar}
                                    />

                                    <Text style={styles.textoData}>

                                        {item.data}

                                    </Text>

                                    <Icon
                                        name="clock-time-eight-outline"
                                        size={24}
                                        style={styles.iconTime}
                                    />

                                    <Text style={styles.textoData}>

                                        {item.horas}

                                    </Text>

                                </View>

                                <View style={styles.contentBox}>

                                    <View style={styles.areaQtd}>

                                        <Icon
                                            name="shopping-outline"
                                            size={30}
                                            style={styles.iconBag}
                                        />

                                        <Text style={styles.textBag}>

                                            {item.qtd_itens} Itens

                                        </Text>

                                    </View>

                                    <View style={styles.areaValor}>

                                        <Icon
                                            name="cash-register"
                                            size={30}
                                            style={styles.iconCash}
                                        />

                                        <Text style={styles.textValor}>

                                            R${item.valor_compra}

                                        </Text>

                                    </View>

                                </View>

                                <View style={styles.areaMercado}>

                                    <Icon
                                        name="map-marker-outline"
                                        size={25}
                                        style={styles.iconLocal}
                                    />

                                    <Text style={styles.textoMercado}>

                                        {item.nome_mercado}

                                    </Text>

                                </View>

                            </View>

                        </TouchableWithoutFeedback>

                        {index !== array.length - 1 && (

                            <View style={styles.areaRisco}>

                                <Icon
                                    name="timeline-text-outline"
                                    size={30}
                                    style={styles.iconDivisor}
                                />

                            </View>

                        )}

                    </View>

                ))}

                </ScrollView>

                )

            )}

        </View>

    )

}

const styles = StyleSheet.create({

    container: {

        flex:1
    
    },

    /* Box */

    boxCompra:{

        height: 200,
        borderWidth: 1,
        borderColor: "#CCC",
        margin: 10,
        backgroundColor: "#FFF",
        borderRadius: 5,
        elevation: 7,

    },

    fundoData:{

        flex: 1,
        flexDirection: "row",
        backgroundColor: config.cor2,
        alignItems: "center",
        justifyContent: "center",
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5

    },

    iconCalendar:{

        color: "#FFF",
        marginRight: 5

    },

    iconTime:{

        color: "#FFF",
        marginLeft: 30,
        marginRight: 5

    },

    textoData:{

        color: "white",
        fontSize: 14,
        fontWeight: "600"

    },

    contentBox:{

        flex: 2,
        flexDirection: "row",

    },

    iconBag:{

        color: config.corObs

    },

    textBag:{

        color: config.corTextoSecundario,
        fontSize: 15,
        marginHorizontal: 5

    },

    textValor:{

        color: config.corTextoSecundario,
        fontSize: 22,
        marginHorizontal: 5,
        fontWeight: "500"

    },

    iconCash:{

        color: "#6ec0fa"

    },

    areaMercado:{

        flexDirection: "row",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderTopWidth: 1,
        borderColor: "#CCC",
        borderStyle: "dotted"

    },

    iconLocal:{

        color: "#CCC"

    },

    areaQtd:{

        flex: 5,
        flexDirection: "row",
        borderRightWidth: 1,
        borderColor: "#CCC",
        borderStyle: "dotted",
        justifyContent: "center",
        alignItems: "center",

    },

    areaValor:{

        flex: 7,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"

    },

    /* ***** */

    /* Risco icone */

    areaRisco:{

        alignItems: "center",
        marginVertical: 10

    },

    textoMercado:{

        color: config.corTextoSecundario

    },

    iconDivisor:{

        color: "#BBB"

    },

    /* ***** */

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

    corpoModal:{

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"

    },

    viewData1:{

        alignItems: "center",
        marginHorizontal: 25

    },

    viewBtn:{

        marginTop: 30

    }

    /* ***** */

})