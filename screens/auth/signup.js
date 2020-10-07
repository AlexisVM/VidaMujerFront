import React, { Component } from "react";
import styles from "./../style";
import  './../../config';
import {
        Keyboard,
        Text,
        View,
        TextInput,
        TouchableWithoutFeedback,
        KeyboardAvoidingView,
        ScrollView,
        AsyncStorage
      } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import axios from 'axios';

export default class SignUpScreen extends Component {
  constructor(props){
		super(props);
		this.state = {
      username:null,
      first_name: '',
      last_name: '',
      email:null,
      password:null,
      password_confirmation:null,
      formSubmitted:false,
		}
  };

	render() {
	  return (
      <ScrollView style={styles.background}>

        <KeyboardAvoidingView style={styles.containerView} keyboardVerticalOffset={85} behavior="padding">
              
                <View style={styles.headerContainer}>
                </View>
                <View style={styles.bodyContainer}>

                  { (!this.state.username && this.state.formSubmitted)? //*Username error*
                    <View style={styles.errorContainer}>
                      <Text style={{color:'red'}}>Nombre de usuario obligatorio</Text>
                    </View>:<View/>
                  }
                  <View style={styles.inputFormContainer} /*Username*/>
                    <View style={styles.iconBackgroundContainer}>
                      <View style={styles.iconBackground}>
                        <Icon name='person' type='material' color='#E188AE' size={40}/>
                      </View>
                    </View>
                    <View style={styles.inputContainer}>
                      <TextInput name="username" placeholder="Nombre de usuario" placeholderTextColor="#00000090"
                        style={(!this.state.username && this.state.formSubmitted)?styles.formTextInput2:styles.formTextInput}
                        onChangeText={(text) => this.setState({username:text})}
                	      value={this.state.username}
                      />
                    </View>
                  </View>

                  { (!this.state.first_name && this.state.formSubmitted)? //*First_name error*
                    <View style={styles.errorContainer}>
                      <Text style={{color:'red'}}>Nombre obligatorio</Text>
                    </View>:<View/>
                  }
                  <View style={styles.inputFormContainer} /*First_name*/>
                    <View style={styles.iconBackgroundContainer}>
                      <View style={styles.iconBackground}>
                        <Icon name='person' type='material' color='#E188AE' size={40}/>
                      </View>
                    </View>
                    <View style={styles.inputContainer}>
                      <TextInput name="first_name" placeholder="Nombre(s)" placeholderTextColor="#00000090"
                        style={(!this.state.first_name && this.state.formSubmitted)?styles.formTextInput2:styles.formTextInput}
                        onChangeText={(text) => this.setState({first_name:text})}
                	      value={this.state.first_name}
                      />
                    </View>
                  </View>

                  { (!this.state.last_name && this.state.formSubmitted)? //*Last_name error*
                    <View style={styles.errorContainer}>
                      <Text style={{color:'red'}}>Apellido obligatorio</Text>
                    </View>:<View/>
                  }
                  <View style={styles.inputFormContainer} /*Last_name*/>
                    <View style={styles.iconBackgroundContainer}>
                      <View style={styles.iconBackground}>
                        <Icon name='person' type='material' color='#E188AE' size={40}/>
                      </View>
                    </View>
                    <View style={styles.inputContainer}>
                      <TextInput name="last_name" placeholder="Apellido(s)" placeholderTextColor="#00000090"
                        style={(!this.state.last_name && this.state.formSubmitted)?styles.formTextInput2:styles.formTextInput}
                        onChangeText={(text) => this.setState({last_name:text})}
                	      value={this.state.last_name}
                      />
                    </View>
                  </View>

                  { (!this.verifyMail(this.state.email) && this.state.formSubmitted)? //*Email error*
                    <View style={styles.errorContainer}>
                      <Text style={{color:'red'}}>Correo inválido</Text>
                    </View>:<View/>
                  }
                  <View style={styles.inputFormContainer} /*Email*/>
                    <View style={styles.iconBackgroundContainer}>
                      <View style={styles.iconBackground}>
                        <Icon name='email' type='material' color='#E188AE' size={40}/>
                      </View>
                    </View>
                    <View style={styles.inputContainer}>
                      <TextInput name="email" placeholder="Correo" placeholderTextColor="#00000090"
                        style={(!this.verifyMail(this.state.email) && this.state.formSubmitted)?styles.formTextInput2:styles.formTextInput}
                        keyboardType={"email-address"} onChangeText={(text) => this.setState({email:text})} value={this.state.email}
                      />
                    </View>
                  </View>

                  { (this.state.password!==this.state.password_confirmation && this.state.formSubmitted)? //*Password error*
                    <View style={styles.errorContainer}>
                      <Text style={{color:'red'}}>Las contraseñas no coinciden</Text>
                    </View>
                    : (!this.state.password && this.state.formSubmitted)?
                    <View style={styles.errorContainer}>
                      <Text style={{color:'red'}}>Contraseña obligatoria</Text>
                    </View> : <View/>
                  }
                  <View style={styles.inputFormContainer}/*Password*/>
                    <View style={styles.iconBackgroundContainer}>
                      <View style={styles.iconBackground}>
                        <Icon name="vpn-key" type='material' color='#E188AE' size={40}/>
                      </View>
                    </View>
                    <View style={styles.inputContainer}>
                      <TextInput name="password" placeholder="Contraseña" placeholderTextColor="#00000090"
                        style={(this.state.password!==this.state.password_confirmation && this.state.formSubmitted)?styles.formTextInput2:styles.formTextInput}
                        secureTextEntry={true} onChangeText={(text) => this.setState({password:text})} value={this.state.password}
                      />
                    </View>
                  </View>

                  <View style={styles.inputFormContainer} /*Password_confirmation*/>
                    <View style={styles.iconBackgroundContainer}>
                      <View style={styles.iconBackground}>
                        <Icon name='vpn-key' type='material' color='#E188AE' size={40}/>
                      </View>
                    </View>
                    <View style={styles.inputContainer}>
                      <TextInput name="password_confirmation" placeholder="Confirma tu contraseña" placeholderTextColor="#00000090"
                        style={styles.formTextInput} secureTextEntry={true}
                        onChangeText={(text) => this.setState({password_confirmation:text})} value={this.state.password_confirmation}
                      />
                    </View>
                  </View>
                  <View style={{flexDirection: 'row'} /*Registration_button*/}>
                    <View style={{flex:1}}>
                      <Button
                        buttonStyle={styles.loginButton}
                        onPress={() => this.verifyInputs()}
                        title="Registrarme"
                      />
                    </View>
                  </View>

                  <View style={styles.lowOpacityContainer}>
                    <Text style={styles.subtitle_center}>
                      ¿Deseas conocer nuestras políticas de uso y privacidad?
                    </Text>
                    <Text style={styles.hyperlinkText} onPress={() => this.onPrivacyTermsPress()}>
                      Ver políticas uso y privacidad
                    </Text>
                  </View>
                </View>
              
      </KeyboardAvoidingView>
      </ScrollView>


    );
  }

  verifyInputs = () => {
    this.setState({formSubmitted:true});
    var passwordIsValid = (this.state.password)?
                                  (this.state.password === this.state.password_confirmation) ? true : false 
                          : false;

    //verify all inputs
    if (this.state.username && this.state.first_name && this.state.last_name && passwordIsValid && this.verifyMail(this.state.email)){
          this.onSignUpPress();
        }
  }

  verifyMail = email => {
    const reg = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    var mailIsValid = (email)?
                          (reg.test(email))?  true : false
                      : false;
    return mailIsValid;
  }

  onSignUpPress = async () =>  {
    console.log('hola');
    try {
      const res = await axios.post(global.host+'/api/users/', {
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
          first_name: this.state.first_name,
          last_name: this.state.last_name,
      });
      if(res.status==201){
        console.log("exito");
        this._login();
      }
    } catch (error) {
      alert('El usuario ya existe, intenta uno diferente');
      console.log(error);
    }
  }

  _login = async () =>  {
    console.log(global.host);
    axios.post(global.host+'/api/auth/login/', {
			  username: this.state.username,
			  password: this.state.password,
		  }).then((response) => {
			  if(response.status==200){
				  token=response.data.auth_token;
				  AsyncStorage.setItem('auth_token', token);
				  axios.get(global.host+'/api/users/me/',
                  {
                          headers: {
                                  'Content-Type': 'application/json',
                                  'Authorization': 'Token ' + token

                          },
		  }).then((response) => {
			  if(response.status==200){
			 	AsyncStorage.setItem('me', JSON.stringify(response.data));
			  }
		  }, (error) => {
        this.setState({  error:"Usuario o contraseña inválida" });
      });

				  this.props.navigation.navigate('AuthLoading');
			  }
		  }, (error) => {
			  this.setState({  error:"Usuario o contraseña inválida" });
		  });
	  let token = null;
    console.log(this.state.username);
    console.log(this.state.password);
  }

  componentDidMount(){};

  componentWillUnmount(){};

  onPrivacyTermsPress(){
    this.props.navigation.navigate('PrivacyTerms', {})
  }


}
