import React, {useState, useContext, useLayoutEffect, useEffect, useCallback} from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Alert, Image, TouchableWithoutFeedback, Modal, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/user';
import { useFocusEffect } from '@react-navigation/native';

import config from '../config';

export default function Minhas_compras_itens({route}){

    /* Dados da lista */

    const {id_compra} = route.params;
    const {data} = route.params;
    const {horas} = route.params;
    const {valor_total} = route.params;
    const {mercado} = route.params;

    /* Contexto */
    const { DATAUser } = useContext(UserContext);

    /* Estados */
    const [DATA, setData] = useState([]);

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

    },[])

    const apagar_compra = () => {

        const formData = new URLSearchParams();
        formData.append('id_compra', id_compra);

        fetch(`${config.URL_inicial_API}${DATAUser[0].id}/apaga_compra`, {
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
        });

    }

    const btn_apagar = () => {

        Alert.alert(
            "Excluir compra",
            `A compra será excluida do histórico e desespesas. Deseja continuar?`,
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
                  
                  apagar_compra();

                }
              }
            ],
            { cancelable: false }
        );

    }

    /* Conexão com a API da página compras */
    const carregar_API = useCallback(() => {

        fetch(`${config.URL_inicial_API}${DATAUser[0].id}/produtos_compra/${id_compra}`)
        .then(response => response.json())
        .then(data => {
            setData(data.data);
        })
        .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
        });

    }, []);

    useFocusEffect(
        useCallback(() => {

            carregar_API();
    
          return () => {

          };
          
        }, [])
    );

    return(

        <View style={styles.container}>

            <View style={styles.areaData}>

                <Text>{data} - {horas}</Text>

            </View>

            <View style={styles.areaMercado}>

                {mercado == null ? (

                    <Text>Indisponível</Text>

                ):(

                    <Text>{mercado}</Text>
                    
                )}

            </View>

            <View style={styles.corpoTable}>

                <View style={styles.colunaItem}>

                    <Text style={styles.colunaTitle}>

                        Item

                    </Text>

                </View>

                <View style={styles.colunaQtd}>

                    <Text style={styles.colunaTitle}>

                        Qtd

                    </Text>

                </View>

                <View style={styles.colunaValor}>

                    <Text style={styles.colunaTitle}>

                        Valor

                    </Text>

                </View>

            </View>

            <ScrollView>

                {DATA.map(item => (

                    <View key={item.id} style={[styles.corpoTable, styles.itemTable]}>

                        <View style={styles.colunaItem}>

                            <Text>

                                {item.nome_produto}

                            </Text>

                        </View>

                        <View style={styles.colunaQtd}>

                            <Text>

                                {item.qtd} {item.tipo_exibicao}

                            </Text>

                        </View>

                        <View style={styles.colunaValor}>

                            <Text>

                                R${item.preco_produto}

                            </Text>

                        </View>

                    </View>

                ))}

                <View style={[styles.corpoTable, styles.areaTotal]}>

                    <Text style={styles.textTotal}>

                        Total:

                    </Text>

                    <Text style={styles.textValor}>

                        R${valor_total}

                    </Text>

                </View>

            </ScrollView>

        </View>

    )

}

const styles = StyleSheet.create({

    container: {

        flex:1,
    
    },

    areaData:{

        justifyContent: "center",
        alignItems: "center",
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: "#CCC"

    },

    areaMercado:{

        justifyContent: "center",
        alignItems: "center",
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: "#CCC"

    },

    /* Tabela */

    corpoTable:{

        flexDirection: "row"

    },

    areaTotal:{

        padding: 10,
        marginTop: 10,
        alignItems: "flex-end",
        justifyContent: "flex-end"

    },

    textTotal:{

        top: -3,
        color: config.corTextoSecundario

    },

    textValor:{

        fontSize: 22,
        fontWeight: "500",
        marginLeft: 10
        
    },

    itemTable:{

        borderBottomWidth: 1,
        borderBottomColor: "#CCC"

    },

    colunaTitle:{

        fontWeight: "900"

    },

    colunaItem:{

        flex: 3,
        padding: 10

    },

    colunaQtd:{

        flex: 1,
        padding: 10
        
    },

    colunaValor:{

        flex: 1,
        padding: 10
        
    },

    /* ***** */

})