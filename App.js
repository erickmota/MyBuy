import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Mercado',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Mecânico',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Escola',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d722',
    title: 'Condomínio',
  },
];

const Item = ({title}) => (
  <View style={styles.itemLista}>
    <Text style={styles.titleLista}>{title}</Text>
  </View>
);

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

          <FlatList
          data={DATA}
          renderItem={({item}) => <Item title={item.title} />}
          keyExtractor={item => item.id}
          />

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

    flex: 7,

  },

  itemLista: {

    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#CCC"

  },

  titleLista: {

    fontSize: 25,
    
  },

});
