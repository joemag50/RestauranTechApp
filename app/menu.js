import React from 'react';
import { StyleSheet, Text,
         View, Image, TextInput,
         KeyboardAvoidingView, Button } from 'react-native';

global.URL = 'https://moviserv-web.herokuapp.com/';

class MenuScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  validate = () => {
    //this.props.navigation.navigate('Menu');
    //return;
    
    const { email, password }  = this.state ;
    if (email.length == 0) {
      alert("Favor de colocar un email válido");
      return;
    }
    if (password.length == 0) {
      alert("Favor de colocar la contraseña");
      return;
    }
    //Consulta

    URL_token = URL + '/api/login/?user[email]=' + email +
                            '&user[password]=' + password;
    fetch(URL_token, {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then((response) => {
      if (response.result)
      {
        global.email = email;
        global.password = password;
        global.id = response.object.id;

        this.props.navigation.navigate('Menu');
      } else {
        alert("Correo o contraseña incorrectos");
      }
    })
    .catch(error => console.log('fallo la sesion') );
    return;
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" >
        <TextInput placeholder="Email" style={styles.input}
                   onChangeText={(email) => this.setState({email})}
                   value={this.state.email}
                   keyboardType="email-address"/>
        <TextInput placeholder="Password" style={styles.input}
                   onChangeText={(password) => this.setState({password})}
                   value={this.state.password} secureTextEntry={true} />
        <View style={styles.button} >
          <Button onPress={this.validate} title="Iniciar sesión" color="#846997ff"
            accessibilityLabel="Learn more about this purple button" />
        </View>
        <View style={styles.button} >
          <Button onPress={() => { this.props.navigation.navigate('CreateAccount'); }} title="Crear Cuenta" color="#846997ff"
            accessibilityLabel="Learn more about this purple button" />
        </View>
        <View style={{ height: 60 }} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4b69a7ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 3,
    width: 300,
    resizeMode: 'contain'
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 5,
    // paddingVertical: 5,
    paddingHorizontal: 15,
    width: '90%',
  },
  button: {
    marginVertical: 5,
    width: '90%',
  }
});

export default MenuScreen