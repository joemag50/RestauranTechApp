import React from 'react';
import { StyleSheet,
         Text,
         View,
         TouchableOpacity,
         ImageBackground,
         FlatList,
         ScrollView } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll_container: {
    marginVertical: 5,
    width: '90%',
    flex: 1,
  },
  button_container: {
    marginVertical: 20,
    width: '90%',
  },
  button_categorias: {
    backgroundColor: '#12E640',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 90,
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#FF5000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 90,
    marginVertical: 5,
  },
  button_text: {
    color: '#FFF',
    fontSize: 30,
  },
  item: {
    color: '#FFF',
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

class CategoriasScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.list_categories();
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  list_categories = () => {
    URL_token = URL + 'api/categories';
    console.log(URL_token);
    fetch(URL_token, {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then((response) => {
      if (this.isUnmounted) { return; }

      if (response.result) {
        this.setState({ categories: response.object })
      }
    })
    .catch(error => console.log('fallo la sesion') );
    return;
  }

  go_to_orden = () => {
    this.props.navigation.navigate('Orden');
  }

  render() {
    return (
      <ImageBackground style={ styles.container } source={require('../app/assets/pizarrafondo.png')} >
        <ScrollView style={ styles.scroll_container }>
          <FlatList
            data={this.state.categories}
            renderItem={({ item }) => (
              <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {}}>
                  <Text
                    style={styles.item}>
                  {item.name}
                  </Text>
                </TouchableOpacity>
              </View>

            )}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>

        <View style={styles.button_container} >
          <TouchableOpacity style={styles.button_categorias}
                            onPress={this.go_to_orden}>
          <Text style={styles.button_text} >ORDEN</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

export default CategoriasScreen
