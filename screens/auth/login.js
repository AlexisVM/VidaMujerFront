//Components, styles
import React, { Component }             from "react";
import styles                           from './../style.js';
import { Button  }                      from 'react-native-elements';
//Authentication
import axios                            from 'axios';
import {
        ImageBackground,
        Text,
        Image,
        ScrollView,
        View,
        TextInput,
        KeyboardAvoidingView,
        AsyncStorage,
    }                                   from 'react-native';
//Global host
import  './../../config';

export default class LoginScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			error: '',
		};
  }

  static navigationOptions = {
    headerShown: false,
  };

  render() {
    return (
      <ImageBackground style={styles.imageBackground} source={require('./../../assets/back.jpg')}>
        <ScrollView>
          <KeyboardAvoidingView  behavior="padding" enabled>
            <View style={styles.headerContainer}>
              <View style={styles.logoBackground}>
                <Image
                  style={styles.logoIconBackground}
                  source={require('./../../assets/icon.png')}
                />
              </View>
            </View>
            <View style={styles.loginContainer}>

              <View style={styles.inputFormContainer /*Username*/}>

                <View style={styles.inputContainer}>
                  <TextInput name="username" /*autoFocus = {true}*/ placeholder="Usuario" placeholderTextColor="#00000090"
                    style={styles.formTextInput} onChangeText={(text) => this.setState({username:text})} value={this.state.username}
                  />
                </View>
              </View>
              <View style={styles.inputFormContainer /*Password*/}>
                <View style={styles.inputContainer}>
                  <TextInput name="password"  placeholder="Contraseña" placeholderTextColor="#00000090" style={styles.formTextInput}
                    secureTextEntry={true} onChangeText={(text) => this.setState({password:text})} value={this.state.password}
                  />
                </View>
              </View>
              <View style={[styles.viewOpacity,{opacity: this.state.error ? 100 : 0}]}>
                <Text style={styles.errorText}>
                  {this.state.error}
                </Text>
              </View>
              <Button
                buttonStyle={styles.loginButton}
                onPress={this._onLoginPress}
                title="Entrar"
                titleStyle={[styles.p],{color:'#FFFFFF'}}
              />
              <View style={styles.lowOpacityContainer}>
                {/*
                <Text style={styles.subtitle_center}>
                  ¿Olvidaste tu contraseña?
                </Text>
                <Text style={styles.hyperlinkText} onPress={() => this.onForgetPress()}>
                  Recuperala aquí
                </Text>
                */}
                <Text style={styles.subtitle_center}>
                  ¿No tienes cuenta aún?
                </Text>
                <Text style={styles.hyperlinkText} onPress={() => this.onSignUpPress()}>
                  Regístrate aquí
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </ImageBackground>
    );
  }

  componentDidMount = async () => {
    await AsyncStorage.clear();
  };

  componentWillUnmount() {}

  _onLoginPress = async () =>  {
    axios.post(global.host+'/api/auth/login/', {
			  username: this.state.username,
			  password: this.state.password,
      }).then((response) => {
			  if(response.status==200){
          token=response.data.auth_token;
          console.log(token);
				  AsyncStorage.setItem('auth_token', token);
          this.props.navigation.navigate('AuthLoading');
			  }
		  }, (error) => {
			  this.setState({  error:"Usuario o contraseña inválida" });
		  });
	  let token = null;
  }

  onSignUpPress(){
	  this.props.navigation.navigate('SignUp', {})
  }

}
