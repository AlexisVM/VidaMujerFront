import React, { Component } from "react";
import styles from "./../style";
import  './../../config';
import {
        Text,
        View,
        TextInput,
        KeyboardAvoidingView,
        ScrollView,
      	Image
      } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Button } from 'react-native-elements';
import {BarIndicator} from 'react-native-indicators';

import axios from 'axios';
import './../utils.js';
import {
        widthPercentageToDP as wp,
        heightPercentageToDP as hp
      } from 'react-native-responsive-screen';


export default class PostExperienceScreen extends Component {

  constructor(props){
    super(props);
      this.state = {
        isLoading: true,
        me: null,
        desc:null,
        first:"null",
        last:"null",
        photo:null,
        photos:[],
        idExp:1
          }
  };

  static navigationOptions = {
    title: ' ',
    headerStyle: {
      backgroundColor: 'transparent',
      height:60,
    },
      headerTintColor: '#E188AE',
  };

	render() {
    if (this.state.isLoading){
			return (
				<ScrollView >
				<View >
					<Text>{"\n\n\n\n\n"}</Text>
					<BarIndicator  color='#E188AE' />
				</View>
				</ScrollView>
			);
		} else{
    let { photo } = this.state;
    let imageUri = photo ? `data:image/jpg;base64,${photo.base64}` : null;
    //imageUri && console.log({uri: imageUri.slice(0, 100)});
	  return(
      <ScrollView style={styles.background}>
        <KeyboardAvoidingView style={styles.containerView} keyboardVerticalOffset={85} behavior="padding">
          <View style={styles.headerContainer}>
          </View>

          <View style={styles.bodyContainer}>
            <View style={{flexDirection: 'row', height: wp('10%'), width: wp('80%'), alignSelf: 'center', marginBottom: 30 }}>
                      <Image style={{height: wp('10%'), width: wp('10%')}} source={require('./../../assets/icon.png')}/>
                      <View style={{height: wp('10%'), flexDirection: 'column', justifyContent: 'center'}}>
                        <Text style={[styles.h3, {marginLeft: 10}]}>
                          {this.state.first} {this.state.last}
                        </Text>
                      </View>
            </View>

            <View style={styles.inputFormContainer} /*Publicacion*/>
                      <View style={styles.inputContainer}>
                        <TextInput multiline maxLength={250} name="post" placeholder="¡Comparte tu experiencia!" placeholderTextColor="#00000090"
                          numberOfLines={4} style={[styles.formTextInput]} onChangeText={(text) => this.setState({desc:text})}
                  	      value={this.state.name}
                        />
                      </View>
            </View>

            <View style={{flexDirection: 'row', paddingTop: Constants.statusBarHeight,} /*Add_photo_button*/}>
                    <View style={{flex:1}}>
                      <Button
                  buttonStyle={[styles.loginButton, { justifyContent: "flex-start", borderWidth: 2, borderColor: '#E188AE', backgroundColor:'transparent'}]}
                        onPress={this._pickImage}
                        icon = {{
                                name: "image",
                                type: 'material',
                                size: hp('4.2%'),
                                color: "#E188AE"
                              }}
                        title="Agregar foto"
                        titleStyle={styles.p}
                      />
                      {photo &&
                        <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, alignSelf: 'center' }} />
                      }
                    </View>
            </View>

            <View style={{flexDirection: 'row'} /*Registration_button*/}>
                    <View style={{flex:1}}>
                      <Button
                        buttonStyle={styles.loginButton}
                        onPress={this._post}
                        title="Publicar"
                        titleStyle={[styles.p,{color:'#FFFFFF'}]}
                      />
                    </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
    }
  }

  componentDidMount() {
	  me().then(data=>{
      this.setState({me:data,isLoading:false,first:data.first_name, last:data.last_name});
    });
    this.getPermissionAsync();
  }

  componentWillUnmount(){};

  getPermissionAsync = async () => {
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    }

  _pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        base64: true,
        allowsEditing: false,
        quality: 1
      });


        this.setState({ photo:result });
        //console.log(this.state.photo);
    };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

 _post = async () =>{
	 let self = this;

	 axios.post(global.host+'/api/experiencias/', {
		 usuario: this.state.me.id,
		 titulo: this.state.me.id,
     desc: this.state.desc,
	 }).then(function (response) {
        alert('Publicacion enviada');
         let expId = response.data.id;
         console.log(self.state.photo);
         axios.post(global.host+'/api/fotos/', {
             experiencia: expId,
             uri:self.state.photo.base64
          }).then(function (response) {
            this.props.navigation.navigate('Perfil');
          }).catch(function (error) {
            //console.log("error en post de fotos" + error);
          });
          this.props.navigation.navigate('Perfil');
	 }).catch(function (error) {
		 //console.log("error en post de experiencias" +error);
	 });

 }
}
