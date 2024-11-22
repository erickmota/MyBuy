import React, {useLayoutEffect, useState, useCallback, useContext} from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, Image, TouchableWithoutFeedback, Modal, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { BarChart } from 'react-native-chart-kit';
import { PieChart } from 'react-native-chart-kit';
import { LineChart } from 'react-native-chart-kit';
import { useFocusEffect } from '@react-navigation/native';
import { UserContext } from '../../context/user';
import DateTimePicker from '@react-native-community/datetimepicker';

import config from '../../config';

export default function Categorias(){

    /* Contexto */
    const { DATAUser } = useContext(UserContext);

    /* Estados */
    const [DATA, setData] = useState([]);
    const [URL_API, setURL_API] = useState("mes_atual");
    const [load_API, set_loadAPI] = useState(true);
    const [filtro, set_filtro] = useState("valor_total");

    /* Menu popup */
    const [visible, setVisible] = useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    /* Modal */
    const [modalVisible, setModalVisible] = useState(false);

    /* DataPicker */
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [date2, setDate2] = useState(new Date());
    const [open2, setOpen2] = useState(false);

    /* Conexão com a API da página compras */
    const carregar_API = useCallback(() => {

        const fetchData = async () => {

            try{

                const [resposta_1] = await Promise.all([

                    fetch(`${config.URL_inicial_API}${DATAUser[0].id}/graficos/categorias/${URL_API}`)

                ]);

                const [data_1] = await Promise.all([

                    resposta_1.json()

                ])

                setData(data_1.data);

                set_loadAPI(false);
                closeMenu();
    
            }catch(error){
    
                console.error('Erro ao buscar dados da API:', error);
    
            }

        }

        fetchData();

    }, [URL_API, DATAUser])

    useFocusEffect(

        useCallback(() => {

            carregar_API();
    
          return () => {

            setData([]);
            set_loadAPI(true);

          };
          
        }, [URL_API, DATAUser])

    );

    const navigation = useNavigation();

    /* const data = [
        {
          name: "Bebidas",
          population: 5000000,
          color: "rgba(131, 167, 234, 1)",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Mistura de café",
          population: 2800000,
          color: "#F00",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Beijing",
          population: 527612,
          color: "red",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "New York",
          population: 8538000,
          color: "#CCC",
          legendFontColor: "#000",
          legendFontSize: 13
        },
        {
          name: "Moscow",
          population: 11920000,
          color: "rgb(0, 4, 255)",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
            name: "Moscow",
            population: 11920000,
            color: "rgb(0, 150, 255)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
          },
          {
            name: "Moscow",
            population: 11920000,
            color: "rgb(55, 0, 255)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
          },
          {
            name: "Moscow",
            population: 11920000,
            color: "rgb(79, 0, 255)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
          },
          {
            name: "Moscow",
            population: 11920000,
            color: "rgb(128, 50, 255)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
          },
          {
            name: "Moscow",
            population: 0,
            color: "rgb(80, 0, 255)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
          }
      ]; */

      const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#FFF",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(128, 0, 128, ${opacity})`,
        strokeWidth: 1, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };

      const organiza_dados_grafico = () => {

        if(DATA != false){

            if(filtro == "valor_total"){

                DATA.sort((a, b)=> b.valor_total - a.valor_total);

            }else if(filtro == "quantidade"){

                DATA.sort((a, b)=> b.quantidade - a.quantidade);

            }

            var valores = DATA;
            var valores_9 = valores.slice(0, 9);

            var i = 0;

            var valor_total_itens = 0;
            var quantidade_total = 0;

            const valoresCopia = valores.map(elemento => ({ ...elemento }));

            valoresCopia.forEach(elemento => {

                if(elemento["name"].length > 15){

                    elemento["name"] = elemento["name"].slice(0, 15)+"..."

                }
                
            });

            valoresCopia.forEach((elemento, index) => {

                if(index > 8){

                    valor_total_itens += elemento["valor_total"];
                    quantidade_total += elemento["quantidade"];

                }

                i++;
                
            });

            if(valoresCopia.length > 10){

                valores_9.push({

                    id: 0,
                    name: "Outros",
                    quantidade: quantidade_total,
                    valor_total: valor_total_itens,
                    color: "#7986CB",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 13
    
                })

                return valores_9;

            }else{

                return valoresCopia;

            }

        }else{

            return false;

        }

      }

      const organiza_dados_legenda = () => {

        if(DATA != false){

            var valores = DATA;

            const valoresCopiaLegenda = valores.map(elemento => ({ ...elemento }));

            valoresCopiaLegenda.forEach((elemento, index) => {

                if(index > 8){

                    elemento["color"] = "#7986CB";

                }
                
            });

            return valoresCopiaLegenda;

        }else{

            return false;
            
        }

      }

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

                setModalVisible(false);

            break;

        }

    }

    const divide_url = (url) => {

        url_inicial = url.split("/");

        return url_inicial[0]

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

    return(

        <View style={styles.container}>

            {load_API == true ? (

                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>

                    <Image style={styles.gif_load} source={require("../../img/carregando.gif")} />

                </View>

            ):(

                <ScrollView>

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

                <View style={[styles.barraPeriodo]}>

                    <View>

                        <Menu
                            visible={visible}
                            onDismiss={closeMenu}
                            anchor={

                            <TouchableWithoutFeedback onPress={openMenu}>

                                    {URL_API == "mes_atual" ? (

                                        <Text style={styles.txtPeriodo}>

                                            Mês atual

                                        </Text>

                                    )
                                    
                                    : URL_API == "mes_passado"
                                    
                                    ? (

                                        <Text style={styles.txtPeriodo}>

                                            Mês passado

                                        </Text>

                                    ): (

                                        <Text style={styles.txtPeriodo}>

                                            {formatDate(date, "exibicao")} - {formatDate(date2, "exibicao")}

                                        </Text>

                                    )}

                            </TouchableWithoutFeedback>

                        }

                        >

                            <Menu.Item style={URL_API == "mes_atual" ? {backgroundColor: config.cor2} : null} onPress={() => set_URL_API("mes_atual")} title={<View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon
                                    name="sort-calendar-descending"
                                    size={30}
                                    color={URL_API == "mes_atual" ? "white": "#444"}
                                    style={{ marginRight: 10 }}
                                />
                                <Text style={URL_API == "mes_atual" ? {marginLeft: 0, color: "white"}:{marginLeft: 0, color: "#444"}}>Mês atual</Text>
                            </View>} />

                            <Menu.Item style={URL_API == "mes_passado" ? {backgroundColor: config.cor2} : null} onPress={() => set_URL_API("mes_passado")} title={<View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon
                                    name="sort-calendar-ascending"
                                    size={30}
                                    color={URL_API == "mes_passado" ? "white": "#444"}
                                    style={{ marginRight: 10 }}
                                />
                                <Text style={URL_API == "mes_passado" ? {marginLeft: 0, color: "white"}:{marginLeft: 0, color: "#444"}}>Mês passado</Text>
                            </View>} />

                            <Menu.Item style={divide_url(URL_API) == "escolher_datas" ? {backgroundColor: config.cor2} : null} onPress={() => {setModalVisible(true)}} title={<View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon
                                    name="calendar-range"
                                    size={28}
                                    color={divide_url(URL_API) == "escolher_datas" ? "white": "#444"}
                                    style={{ marginLeft: -3 }}
                                />
                                <Text style={divide_url(URL_API) == "escolher_datas" ? {marginLeft: 14, color: "white"}:{marginLeft: 14, color: "#444"}}>Selecionar datas</Text>
                            </View>} />

                        </Menu>

                    </View>

                </View>

                <View style={[styles.container_padrao, styles.container_grafico]}>

                    <ScrollView
                    
                    horizontal

                    >

                        {organiza_dados_grafico() == false ? (

                            <View style={{paddingVertical: 90}}>

                                <Text style={{color: config.corTextoSecundario}}>

                                    Nenhum dado para exibir

                                </Text>

                            </View>

                        ):(

                            <PieChart
                                data={organiza_dados_grafico()}
                                width={Dimensions.get('window').width - 10}
                                height={250}
                                chartConfig={chartConfig}
                                accessor={filtro}
                                backgroundColor={"transparent"}
                                paddingLeft={"10"}
                                center={[0, 10]}
                                absolute={false}
                                hasLegend={true}
                                avoidFalseZero={false}
                            />

                        )}

                    </ScrollView>

                    <Text style={{color: config.corTextoSecundario}}>

                        Categorias

                    </Text>

                </View>

                <View style={[styles.container_padrao, styles.container_abaixo, styles.container_nomes]}>

                    {organiza_dados_legenda() != false ? (

                        <View style={styles.linha_nomes_legendas}>

                            <View style={{flex: 1}}>

                                <View>

                                    {/* Ícones de cor */}

                                </View>

                            </View>

                            <View style={{flex: 3}}>

                                <Text>

                                    

                                </Text>

                            </View>

                            <View style={{flex: 1, justifyContent: "center"}}>

                                <TouchableWithoutFeedback onPress={()=>{

                                    set_filtro("quantidade");
                                    DATA.sort((a, b)=> b.quantidade - a.quantidade);

                                }}>

                                    <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>

                                        {filtro == "quantidade" ? (

                                            <Icon
                                                name="chevron-down"
                                                size={20}
                                                color={"#555"}
                                            />

                                        ):null}

                                        <Text style={filtro == "quantidade" ? {textAlign: "center", color: "#555", fontSize: 11, fontWeight: "bold"}:{textAlign: "center", color: "#888", fontSize: 11}}>

                                            Compras efetuadas

                                        </Text>

                                    </View>

                                </TouchableWithoutFeedback>

                            </View>

                            <View style={{flex: 2, justifyContent: "center"}}>

                                <TouchableWithoutFeedback onPress={()=>{

                                    set_filtro("valor_total");
                                    DATA.sort((a, b)=> b.valor_total - a.valor_total);

                                }}>

                                    <View style={{flexDirection: "row", justifyContent: "flex-end", alignItems: "center"}}>

                                        {filtro == "valor_total" ? (

                                            <Icon
                                                name="chevron-down"
                                                size={20}
                                                color={"#555"}
                                            />

                                        ):null}

                                        <Text style={filtro == "valor_total" ? {textAlign: "right", color: "#555", fontSize: 11, marginEnd: 5, fontWeight: "bold"}:{textAlign: "right", color: "#888", fontSize: 11, marginEnd: 5}}>

                                            Valor total

                                        </Text>

                                    </View>

                                </TouchableWithoutFeedback>

                            </View>

                        </View>

                    ):null}

                    {organiza_dados_legenda() == false ? (

                        <View style={{paddingVertical: 40}}>

                            <Text style={{color: config.corTextoSecundario, textAlign: "center"}}>

                                Nenhuma categoria encontrada

                            </Text>

                        </View>

                    ):(

                        organiza_dados_legenda().map(item=>(

                            <View key={item.id} style={styles.linha_nomes}>

                                <View style={{flex: 1}}>

                                    <View style={[styles.cor_nome, {backgroundColor: item.color}]}>

                                        {/* Ícones de cor */}

                                    </View>

                                </View>

                                <View style={[styles.linha_padrao, {flex: 3}]}>

                                    <Text style={{color: "#222"}}>

                                        {item.name}

                                    </Text>

                                </View>

                                <View style={[styles.linha_padrao, {flex: 1}]}>

                                    <Text style={{textAlign: "center", color: "#222"}}>

                                        {item.quantidade}

                                    </Text>

                                </View>

                                <View style={[styles.linha_padrao, {flex: 2}]}>

                                    <Text style={{textAlign: "right", paddingRight: 5, color: "#222"}}>

                                        R${item.valor_total.toFixed(2)}

                                    </Text>

                                </View>

                            </View>

                        ))

                    )}

                </View>

                </ScrollView>

            )}

        </View>

    )

}

const styles = StyleSheet.create({

    container: {

        flex:1,
        backgroundColor: "#EEE"
    
    },

    /* Barra inicial de períodos */

    barraPeriodo:{

        padding: 10,
        justifyContent: "center",
        alignItems: "center"

    },

    barraPadrao:{

        height: 40,
        justifyContent: "center",
        alignItems: "center"

    },

    barra_baixo:{

        marginTop: 10

    },

    txtPeriodo:{

        color: "#FFF",
        paddingVertical: 7,
        paddingHorizontal: 20,
        backgroundColor: config.cor2,
        borderRadius: 20,

    },

    txtPadrao:{

        color: "#777",

    },

    container_padrao:{

        backgroundColor: "#FFF",
        marginHorizontal: 5,
        borderRadius: 2,
        elevation: 5,

    },

    container_abaixo:{

        marginTop: 15

    },

    container_grafico:{

        paddingBottom: 22,
        justifyContent: "center",
        alignItems: "center",

    },

    container_total:{
        
        justifyContent: "center",
        alignItems: "center",
        height: 50

    },

    linha_padrao:{

        justifyContent: "center"

    },

    cor_nome:{

        width: 30,
        height: 30,
        borderRadius: 10,
        marginLeft: 5

    },

    linha_nomes:{

        flexDirection: "row",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#DDD",

    },

    container_nomes:{

        minHeight: 150

    },

    gif_load:{

        width: 70,
        height: 70

    },

    linha_nomes_legendas:{

        flexDirection: "row",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#DDD",


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

    },

    /* ***** */

})