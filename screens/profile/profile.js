import React from 'react';
import {Config} from './../../config';
import {
		StyleSheet,
		Modal,
		TouchableHighlight,
		ScrollView,
    Keyboard,
    ImageBackground,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Alert,
    KeyboardAvoidingView,
    AsyncStorage,
    Image,
		ActivityIndicator
		} from 'react-native';
import styles from "./../style";
import axios from 'axios';
import './../utils.js';
import {BarIndicator} from 'react-native-indicators';
import { Button, Icon } from 'react-native-elements';

import {
        widthPercentageToDP as wp,
        heightPercentageToDP as hp
      } from 'react-native-responsive-screen';

export default class ProfileScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			photo: null,
			me: null,
			isLoading: true,
		};
  }
	static navigationOptions = {
		drawerIcon: (
		    <Icon name='person' type='material' color='#000000'/>
		  )
	};


	render(){
		if (this.state.isLoading){
			return (
				<ScrollView style={styles.background}>
				<View style={styles.background}>
					<Text>{"\n\n\n\n\n"}</Text>
					<BarIndicator  color='#B1E001' />
				</View>
				</ScrollView>
			);
		} else{
			return(
					<ScrollView style={styles.background}>

						<View style={[styles.profileHeaderContainer,{marginLeft:0, marginRight:0, width:'100%'}]}>
							<View style={styles.imageContainer}>
								<Image style={{height: 140, width: 140}} source={{uri:'https://i.pinimg.com/originals/d0/04/28/d00428efa0bf27b9edd37eac32dfd2c1.png'}}/>
							</View>
							<View>
								<Text style={[styles.h1, {textAlign: 'center'}]}>
									{this.state.me?this.state.me.first_name:''}{" "}{this.state.me?this.state.me.last_name:''}
								</Text>
							</View>
						</View>
						<View style={styles.bodyContainer}>
							<View style={[styles.bigBodyCards,{borderColor:'transparent'}]}>
								<Text style={[styles.h2, {marginBottom: 25}]}>
									Usuario: {this.state.me?this.state.me.username:''}
								</Text>
								<Text style={[styles.h2, {marginBottom: 25}]}>
									Nombre: {this.state.me?this.state.me.first_name:''}
								</Text>
								<Text style={[styles.h2, {marginBottom: 25}]}>
									Apellido: {this.state.me?this.state.me.last_name:''}
								</Text>
								<Text style={[styles.h2, {marginBottom: 25}]}>
									País: México
								</Text>
								<Text style={styles.h2}>
									Correo: {this.state.me?this.state.me.email:''}
								</Text>
								{/*
								<Button
				                  buttonStyle={styles.loginButton}
				                  //onPress={this._onLoginPress}
				                  title="Editar"
				                  titleStyle={styles.p}
				                />
				            	*/}
							</View>
						</View>

					</ScrollView>
			);
		}
	}

	async componentDidMount() {
	  me().then(data=>{
      this.setState({me:data,isLoading:false});
			//this.setState({photo: global.host});
			//let dataStorage = [this.state.photo, ...data.info.photo]
			//dataStorage = ["'",dataStorage,"'"]
			//this.setState({photo:dataStorage});
    });

  }
  	componentWillUnmount() {}
};
