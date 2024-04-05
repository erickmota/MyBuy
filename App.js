import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function App() {
  
  return (

    <View style={styles.container}>

      <StatusBar style="auto" />

      <View style={styles.espacoVerde}>

        <Text style={styles.textInicio}>

          Olá Erick Mota. Atualmente na sua região, o mercado mais vantajoso
          para comprar é o <Text style={styles.nomeMercado}>Comercial Esperança, Votorantim-SP</Text>.

        </Text>

      </View>

      <View style={styles.espacoListas}>

        <View style={styles.areaTituloListas}>

          <Text style={styles.tituloListas}>

            MINHAS LISTAS

          </Text>

        </View>

        <View style={styles.areaListas}>



        </View>

      </View>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {

    flex:1,

  },

  espacoVerde: {

    backgroundColor: "#65bbbb",
    flex:1,
    justifyContent: "center",

  },

  textInicio: {

    textAlign: "center",
    color: "#747474",
    paddingHorizontal: 30,

  },

  nomeMercado:{

    color: "#000",

  },

  espacoListas: {

    backgroundColor: "#FFF",
    flex:5,

  },

  areaTituloListas:{

    flex: 1,
    justifyContent: "center",

  },

  tituloListas: {

    color: "#747474",
    fontSize: 17,
    paddingHorizontal: 10

  },

  areaListas:{

    backgroundColor: "#DDD",
    flex: 7,

  },

});
