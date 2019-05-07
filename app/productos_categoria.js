import React from 'react';
import { StyleSheet,
         Text,
         View,
         TouchableOpacity,
         FlatList,
         Alert,
         ScrollView,
         Image,
         Modal,
         ToastAndroid } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: pizza3,
  },
  scroll_container: {
    marginVertical: 5,
    backgroundColor: '#DADEE2DD',
    width: '90%',
    flex: 1,
    borderRadius: 20,
  },
  button_container: {
    marginVertical: 20,
    width: '90%',
  },
  button_container_column: {
    width: '100%',
    flex: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_agregar: {
    backgroundColor: pizza2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 90,
    marginVertical: 5,
    width: '90%',
  },
  button_cerrar: {
    backgroundColor: pizza5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 90,
    marginVertical: 5,
    width: '90%',
  },
  button_regresar: {
    backgroundColor: pizza5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 90,
    marginVertical: 5,
    width: '100%',
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
  price: {
    color: '#000',
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  modal: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: pizza3,
     padding: 5,
  },
  text: {
     color: '#000',
     marginTop: 10,
  },
  buttons_container: {
    flexDirection: 'row',
    width: '90%'
  },
});

class ProductosCategoriaScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      products: [],
      selected: ''
    };
  }

  _toastWithDurationHandler = (toast) => {
    //function to make Toast With Duration
    ToastAndroid.show(toast, ToastAndroid.SHORT);
  }

  _toastWithDurationGravityHandler = (toast) => {
    //function to make Toast With Duration And Gravity
   ToastAndroid.showWithGravity(
      toast,
      ToastAndroid.SHORT, //can be SHORT, LONG
      ToastAndroid.CENTER //can be TOP, BOTTON, CENTER
    );
  }

  _toastWithDurationGravityOffsetHandler = (toast) => {
    //function to make Toast With Duration, Gravity And Offset
     ToastAndroid.showWithGravityAndOffset(
      toast,
      ToastAndroid.LONG, //can be SHORT, LONG
      ToastAndroid.BOTTOM, //can be TOP, BOTTON, CENTER
      25, //xOffset
      50 //yOffset
    );
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

      this._toastWithDurationGravityHandler('Producto agregado');
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
      <View style={ styles.container } >
        <View>
          <Modal animationType={"slide"}
                 transparent={false}
                 visible={this.state.isVisible}
                 onRequestClose={() => {
                     console.log("Modal has been closed.")
                   }
                 }>
            <View style={styles.modal}>
              <View style={styles.buttons_container}>
                <View style={styles.button_container_column}>
                  <Text style={styles.text}>Producto: {this.state.selected.name}</Text>
                  <Text style={styles.text}>Precio: {this.state.selected.price}</Text>
                  <Text style={styles.text}>Descripcion: {this.state.selected.description}</Text>
                </View>
                <View style={styles.button_container_column}>
                  <Image 
                      source={{uri: this.state.selected.image}}
                      style={{width: 200, height: 200}}
                  />
                </View>
              </View>

              <TouchableOpacity style={styles.button_agregar}
                    onPress={() => {
                      this.new_product(this.state.selected.id);
                      this.setState({ isVisible:!this.state.isVisible});
                      return;
                    } }>
                <Text style={styles.button_text} >AGREGAR</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button_cerrar}
                    onPress={() => {this.setState({ isVisible:!this.state.isVisible})} }>
                <Text style={styles.button_text} >CERRAR</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>

        <ScrollView style={ styles.scroll_container }>
          <FlatList
            data={this.state.products}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            renderItem={({ item }) => (
              <View>
                <Text
                  style={styles.item}
                  onPress={() => {
                    this.setState({ isVisible: true});
                    this.setState({ selected: item });
                  }}>
                  {item.name}
                </Text>
                <Text
                  style={styles.price} >
                  {item.price}
                </Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>

        <View style={styles.button_container} >
          <TouchableOpacity style={styles.button_regresar}
                            onPress={this.go_to_categorias}>
          <Text style={styles.button_text} >REGRESAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ProductosCategoriaScreen
