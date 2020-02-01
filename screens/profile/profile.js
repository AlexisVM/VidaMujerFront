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
        <ImageBackground source={require('./../../assets/back.jpg')} style={{ height: '100%', width:'100%'}}>
        <ScrollView style={{ height: '100%'}}>
						<View style={styles.profileHeaderContainer}>
						</View>
						<View style={styles.bodyContainer}>
              <View style={styles.imageContainer}>
                <Image style={{height: 150, width: 150}} source={require('./../../assets/images/profile_default2.png')}/>
              </View>
							<View >
                <Text style={[styles.h2, {marginBottom: 25}]}>
                  @{this.state.me?this.state.me.username:''}
                </Text>
                <Text style={[styles.h1, {textAlign: 'center'}]}>
                  {this.state.me?this.state.me.first_name:''}{" "}{this.state.me?this.state.me.last_name:''}
                </Text>
								<Text style={styles.h2}>
									{this.state.me?this.state.me.email:''}
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
        </ImageBackground>
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
      console.log(data)
    });

  }
  	componentWillUnmount() {}
};
