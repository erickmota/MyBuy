import React, {useLayoutEffect, useState} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import config from '../../config';

export default function Categorias(){

    const navigation = useNavigation();

     /* Menu popup */
     const [visible, setVisible] = useState(false);
     const openMenu = () => setVisible(true);
     const closeMenu = () => setVisible(false);

     const [URL_API, setURL_API] = useState("mes_passado");

    useLayoutEffect(()=>{

        const parent = navigation.getParent();

        if(parent){

            parent.setOptions({
            
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
                            <Menu.Item style={URL_API == "mes_atual" ? {backgroundColor: config.cor2} : null} onPress={() => {}} title={<View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon
                                    name="sort-calendar-descending"
                                    size={30}
                                    color={URL_API == "mes_atual" ? "white": "#444"}
                                    style={{ marginRight: 10 }}
                                />
                                <Text style={URL_API == "mes_atual" ? {marginLeft: 0, color: "white"}:{marginLeft: 0, color: "#444"}}>Mês atual</Text>
                            </View>} />

                            <Menu.Item style={URL_API == "mes_passado" ? {backgroundColor: config.cor2} : null} onPress={() => {}} title={<View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon
                                    name="sort-calendar-ascending"
                                    size={30}
                                    color={URL_API == "mes_passado" ? "white": "#444"}
                                    style={{ marginRight: 10 }}
                                />
                                <Text style={URL_API == "mes_passado" ? {marginLeft: 0, color: "white"}:{marginLeft: 0, color: "#444"}}>Mês passado</Text>
                            </View>} />

                            <Menu.Item style={divide_url(URL_API) == "escolher_datas" ? {backgroundColor: config.cor2} : null} onPress={() => {{}}} title={<View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
              ),

        })

    }

    },[navigation, URL_API, visible])

    const divide_url = (url) => {

        url_inicial = url.split("/");

        return url_inicial[0]

    }

    return(

        <View style={styles.container}>

            <Text>

                PG categorias

            </Text>

        </View>

    )

}

const styles = StyleSheet.create({

    container: {

        flex:1
    
    },

})