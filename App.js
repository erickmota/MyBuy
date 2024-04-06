import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DATA = [
  {
    id: '1',
    title: 'Mercado',
  },
  {
    id: '2',
    title: 'Mecânico',
  },
  {
    id: '3',
    title: 'Escola',
  },
  {
    id: '4',
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

      <StatusBar backgroundColor="#498989" style="light" />

      <View style={styles.espacoVerde}>

        <Text style={styles.textInicio}>

          Olá Erick Mota. Atualmente na sua região, os preços mais
          baixos, são do mercado:{'\n\n'}

          <Icon
          name="map-marker"
          size={20}
          color={"#FFF"}
          />
          
          <Text style={styles.nomeMercado}>Comercial Esperança, Votorantim-SP</Text>

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
    alignContent: "center",

  },

  textInicio: {

    textAlign: "center",
    color: "#FFF",
    paddingHorizontal: 30,
    marginTop: 30

  },

  nomeMercado:{

    fontSize: 17,
    fontWeight: "500",
    color: "#65bbbb",
    backgroundColor: "#FFF",
    paddingHorizontal: 7,
    marginLeft: 5,
    borderRadius: 10,
    paddingVertical: 5,

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
    paddingHorizontal: 15,

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

    fontSize: 20,
    
  },

  iconeLista: {

    alignItems: "flex-end",
    flex: 1,
    justifyContent: "center"

  },

  areaIconeMais: {

    ...StyleSheet.absoluteFillObject,
    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    pointerEvents: 'box-none',

  },

  iconeMais: {

    borderRadius: 50,
    backgroundColor: "#65bbbb",
    width: 65,
    height: 65,
    marginBottom: 15,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",

  },

  mais: {

    textAlign: "center",
    color: "#FFF",
    fontSize: 40,
    marginTop: -5

  }

});
