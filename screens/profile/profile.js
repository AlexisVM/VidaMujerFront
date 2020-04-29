import React from 'react';
import {
	ScrollView,
    Text,
    View,
    AsyncStorage,
    Image,
	} from 'react-native';
import styles from "./../style";
import './../utils.js';
import {BarIndicator} from 'react-native-indicators';
import { Button, Icon } from 'react-native-elements';

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
					<BarIndicator  color='#E188AE' />
				</View>
				</ScrollView>
			);
		} else{
			return(
        		<ScrollView style={{ height: '100%'}}>	
					<View style={[styles.bodyContainer]}>
						<View style={[styles.postCards,{marginBottom:30}]}>
						<View style={[styles.imageContainer,{marginBottom: 30}]}>
							<Image style={{height: 120, width: 120}} source={require('./../../assets/icon.png')}/>
						</View>
						
						<View >
							<Text style={[styles.h4, { fontWeight: 'bold', textAlign: 'center', color:'#000000' }]}>
								Usuario
							</Text>
							<Text style={[styles.h2, {marginBottom: 30}]}>
							@{this.state.me?this.state.me.username:''}
							</Text>
							<Text style={[styles.h4, { fontWeight: 'bold', textAlign: 'center', color: '#000000' }]}>
								Nombre
							</Text>
							<Text style={[styles.h1, { textAlign: 'center', marginBottom: 30}]}>
							{this.state.me?this.state.me.first_name:''}{" "}{this.state.me?this.state.me.last_name:''}
							</Text>
							<Text style={[styles.h4, { fontWeight: 'bold', textAlign: 'center', color: '#000000' }]}>
								Correo
							</Text>
							<Text style={[styles.h2, { marginBottom: 30}]}>
								{this.state.me?this.state.me.email:''}
							</Text>
							<Button
				                 buttonStyle={styles.logoutButton}
				                 onPress={this._signOut}
				                 title="Cerrar sesión"
				                 titleStyle={[styles.p,{color:'#FFFFFF'}]}
				               />
							</View>
							</View>
					</View>
				</ScrollView>
			);
		}
	}

	async componentDidMount() {
	  me().then(data=>{
      this.setState({me:data,isLoading:false});
    });

  }
	_signOut = async () => {
		await AsyncStorage.clear();
		this.props.navigation.navigate('Auth');
	};
  	componentWillUnmount() {}
};
