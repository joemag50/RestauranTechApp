import React from 'react';
import { StyleSheet,
         Text,
         View,
         TouchableOpacity,
         ImageBackground,
         FlatList,
         Alert,
         ScrollView } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll_container: {
    marginVertical: 5,
    backgroundColor: '#DADEE2DD',
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
    color: '#000',
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

class ProductosCategoriaScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    this.list_products();
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  list_products = () => {
    URL_token = URL + 'api/products_category?id='+ category_id;
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
        this.setState({ products: response.object })
      }
    })
    .catch(error => console.log('fallo la sesion') );
    return;
  }


  new_product = (product_id) => {
    URL_token = URL + 'api/new_order_product/?order_product[order_id]='+ order_id +
                                            '&order_product[product_id]=' + product_id;
    console.log(URL_token);
    fetch(URL_token, {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then((response) => {
      if (this.isUnmounted) { return; }
    })
    .catch(error => console.log('fallo la sesion') );
    return;
  }

  FlatListItemSeparator = () => {
    return (
      <View style={{height: 0.5, width: '100%', backgroundColor: '#111'}}/>
    );
  }

  go_to_categorias = () => {
    this.props.navigation.navigate('Categorias');
  }

  GetItem(item) {
    Alert.alert('Opciones', 'Producto: ' + item.name,
    [
      {
        text: 'Añadir a Orden',
        onPress: () => {
          this.new_product(item.id);
        }
      },
      {
        text: 'Cancelar',
        onPress: () => {

        },
        style: 'cancel',
      },
    ]);
  }

  render() {
    return (
      <ImageBackground style={ styles.container } source={require('../app/assets/grupomenu.png')} >
        <ScrollView style={ styles.scroll_container }>
          <FlatList
            data={this.state.products}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            renderItem={({ item }) => (
              <View>
                <Text
                  style={styles.item}
                  onPress={this.GetItem.bind(this, item)}>
                  {item.name}
                </Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>

        <View style={styles.button_container} >
          <TouchableOpacity style={styles.button}
                            onPress={this.go_to_categorias}>
          <Text style={styles.button_text} >REGRESAR</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

export default ProductosCategoriaScreen
