import React, {useState} from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import IconeCorreto from "../componentes/botaoCorreto"
import config from "../config";

export default function AddItem(){

    const [number, onChangeNumber] = React.useState('');
    const [selectedValue, setSelectedValue] = useState("option1");

    return(

        <View style={styles.container}>

            <Text style={styles.titulo}>

                Nome do item

            </Text>

            <TextInput style={styles.input}
                onChangeText={onChangeNumber}
                value={number}
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
                        onChangeText={onChangeNumber}
                        value={number}
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

                <View style={{flex: 1, justifyContent: "flex-end", alignItems: "flex-end"}}>

                    <Icon
                        name="playlist-edit"
                        size={40}
                        color={"white"}
                        style={styles.iconEdit}
                        />

                </View>

            </View>

            <IconeCorreto/>

        </View>

    )

}

const styles = StyleSheet.create({

    container:{

        flex: 1,

    },

    titulo:{

        marginTop: 30,
        fontSize: 20,
        paddingHorizontal: 15

    },

    input:{

        borderBottomWidth: 1,
        borderBottomColor: "#CCC",
        marginTop: 20,
        fontSize: 20,
        marginHorizontal: 15,
        color: "#777"

    },

    inputQtd:{

        marginTop: 20,
        fontSize: 20,
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