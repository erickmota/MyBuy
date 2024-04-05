import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList,TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
      <View style={{flex: 1}}>

        <Text style={styles.titleLista}>{title}</Text>

      </View>

      <View style={styles.iconeLista}>

        <Icon
          name="note-edit-outline"
          size={25}
          color={"#65bbbb"}
          />

      </View>
  </View>
);

export default function App() {
  
  return (

    <View style={styles.container}>

      <StatusBar style="auto" />

      <View style={styles.espacoVerde}>

        <Text style={styles.textInicio}>

          Olá Erick Mota. Atualmente na sua região, o mercado mais vantajoso
          para comprar é o{'\n'}

          <Icon
          name="map-marker"
          size={20}
          color={"#FFF"}
          />
          
          <Text style={styles.nomeMercado}> Comercial Esperança, Votorantim-SP</Text>

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

      <View style={styles.areaIconeMais}>

          <TouchableWithoutFeedback>

            <View style={styles.iconeMais}>

              <Text style={styles.mais}>

                +

              </Text>

            </View>

          </TouchableWithoutFeedback>

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
    flex:3,
    justifyContent: "center",

  },

  textInicio: {

    textAlign: "center",
    color: "#FFF",
    paddingHorizontal: 30,

  },

  nomeMercado:{

    color: "#000",

  },

  espacoListas: {

    backgroundColor: "#FFF",
    flex: 9,

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

    flex: 8,

  },

  itemLista: {

    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#CCC",
    flexDirection: "row"

  },

  titleLista: {

    fontSize: 25,
    
  },

  iconeLista: {

    alignItems: "flex-end",
    flex: 1,
    justifyContent: "center"

  },

  areaIconeMais: {

    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end"

  },

  iconeMais: {

    borderRadius: 50,
    backgroundColor: "#65bbbb",
    width: 60,
    height: 60,
    justifyContent: "center",
    marginBottom: 15,
    marginRight: 15,
    flexDirection: "row",
    alignItems: "center"

  },

  mais: {

    textAlign: "center",
    color: "#FFF",
    fontSize: 50,
    marginBottom: 10

  }

});
