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
    borderRadius: 20,
  },
  column: {
    width: '90%',
    flex: 5,
    flexDirection: 'column',
  },
  button_menu: {
    backgroundColor: '#E66E12',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 90,
    marginVertical: 5,
  },
  button_cancel: {
    backgroundColor: '#FF5000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 90,
    marginVertical: 5,
  },
  button_enviar: {
    backgroundColor: '#12E640',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 90,
    marginVertical: 5,
  },
  button_total: {
    backgroundColor: '#00000000',
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
  two_columns_container: {
    flexDirection: 'row',
    width: '90%'
  },
});

class OrdenScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: '',
      order_products: [],
    };
  }

  componentDidMount() {
    this.list_order();
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  list_order = () => {
    URL_token = URL + 'api/order/?id='+ order_id;
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
        this.setState({ total: response.object.total })
        this.setState({ order_products: response.object.order_products })
      }
    })
    .catch(error => console.log('fallo la sesion') );
    return;
  }

  cancel_order = () => {
    URL_token = URL + 'api/cancel_order/?id='+ order_id;
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
        global.order_id    = '';
        global.client_name = '';
        global.table_name  = '';

        this.props.navigation.navigate('Menu');
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

      this.list_order();
    })
    .catch(error => console.log('fallo la sesion') );
    return;
  }

  destroy_product = (product_id) => {
    URL_token = URL + 'api/destroy_order_product/?order_product[order_id]='+ order_id +
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

      this.list_order();
    })
    .catch(error => console.log('fallo la sesion') );
    return;
  }

  FlatListItemSeparator = () => {
    return (
      <View style={{height: 0.5, width: '100%', backgroundColor: '#111'}}/>
    );
  }

  go_to_menu = () => {
    this.props.navigation.navigate('Categorias');
  }

  enviar_orden = () => {
    console.log(this.state.order_products.length)
    if (this.state.order_products.length == 0) {
      Alert.alert('Error', 'Favor de seleccionar algo del menu');
      return;
    }
    
    Alert.alert('Felicidades!', 'En un momento le llevaran su pedido');
    this.props.navigation.navigate('Cuenta');
  }

  GetItem(item) {
    Alert.alert('Opciones', 'Producto: ' + item.name,
    [
      {
        text: 'Añadir uno igual',
        onPress: () => {
          this.new_product(item.product_id);
        }
      },
      {
        text: 'Borrar producto',
        onPress: () => {
          this.destroy_product(item.product_id);
        },
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => console.log('OK Pressed')
      },
    ]);
  }

  render() {
    return (
      <ImageBackground style={ styles.container } source={require('../app/assets/grupomenu.png')} >
        <ScrollView style={ styles.scroll_container }>
          <FlatList
            data={this.state.order_products}
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

        <View style={styles.two_columns_container}>
          <View style={styles.column}>
            <TouchableOpacity style={styles.button_menu}
                              onPress={this.go_to_menu}>
              <Text style={styles.button_text} >MENU</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button_cancel}
                              onPress={this.cancel_order}>
            <Text style={styles.button_text} >CANCELAR</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.column}>
            <TouchableOpacity style={styles.button_total} >
              <Text style={styles.button_text} >Total: {this.state.total}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button_enviar}
                              onPress={this.enviar_orden}>
              <Text style={styles.button_text} >ENVIAR ORDEN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default OrdenScreen
