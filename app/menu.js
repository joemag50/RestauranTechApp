import React from 'react';
import { StyleSheet,
         Text,
         View,
         TextInput,
         TouchableOpacity,
         ImageBackground,
         Alert } from 'react-native';

global.URL = 'https://restaurantech-web.herokuapp.com/';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 15,
    width: '60%',
    borderRadius: 90,
  },
  button_container: {
    width: '50%',
    flex: 1,
  },
  button_red: {
    marginVertical: 20,
    backgroundColor: '#FF5000',
    borderRadius: 90,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_text: {
    color: '#FFF',
    fontSize: 30,
  }
});

class MenuScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client_name: '',
      table_name: '',
    };
  }

  validate = () => {
    const { client_name, table_name }  = this.state ;
    if (client_name.length == 0) {
      Alert.alert("Error", "Favor de colocar nombre de cliente");
      return;
    }
    if (table_name.length == 0) {
      Alert.alert("Error", "Favor de colocar nombre de mesa");
      return;
    }
    var new_client_name = client_name.replace(' ', '+')
    var new_table_name = table_name.replace(' ', '+')
    //Consulta
    URL_token = URL + 'api/new_order/?order[client_name]='+ new_client_name +
                      '&order[table]=' + new_table_name ;
    
    console.log(URL_token);
    fetch(URL_token, {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then((response) => {
      if (response.result)
      {
        global.order_id = response.object.id;
        global.client_name = response.object.client_name;
        global.table_name = response.object.table;

        this.props.navigation.navigate('Orden');
      }
    })
    .catch(error => console.log('fallo la sesion') );
    return;
  }

  render() {
    return (
      <ImageBackground style={ styles.container } source={require('../app/assets/plato.jpg')} >
        <TextInput placeholder="Nombre de cliente" style={styles.input}
                   onChangeText={(client_name) => this.setState({client_name})}
                   value={this.state.client_name} />
        <TextInput placeholder="Numero de mesa" style={styles.input}
                   onChangeText={(table_name) => this.setState({table_name})}
                   value={this.state.table_name} />
        <View style={styles.button_container} >
          <TouchableOpacity style={styles.button_red}
                            onPress={this.validate}>
            <Text style={styles.button_text} >ORDENAR</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

export default MenuScreen
