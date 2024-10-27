import React, {useState, useEffect, useContext, useCallback} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableWithoutFeedback, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/user';
import { useFocusEffect } from '@react-navigation/native';
import * as SQLite from "expo-sqlite"

import config from "../config"

export default function Despesas() {

  /* Contexto */
  const { DATAUser } = useContext(UserContext);
  
  return (

    <View style={styles.container}>

      <StatusBar backgroundColor={config.cor1} style="light" />

      <Text>

        PG Despesas

      </Text>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {

    flex:1,

  },

});
