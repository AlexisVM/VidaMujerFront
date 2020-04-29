import React from 'react';
import {
		ScrollView,
		RefreshControl,
		ImageBackground,
		View,
		Text,
		Alert,
		TouchableOpacity,
		Modal,
		} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import styles from "./../style";
import {BarIndicator} from 'react-native-indicators';
import {AsyncStorage} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import {
        widthPercentageToDP as wp,
        heightPercentageToDP as hp
      } from 'react-native-responsive-screen';
import axios from 'axios';
import  './../../config';
import './../utils.js';

export default class AddCourseScreen extends React.Component {

	static navigationOptions = {
		tabBarLabel:"Paquetes",
	};

	constructor(props){
		super(props);
		this.state = {
			isLoading :true,
			refreshing: false,
			dataSource: null,
			modalVisible: false,
			course: "",
			me:null,
		}
	}

	componentDidMount (){
		me().then(data=>{
		 this.setState({me:data,isLoading:false});
	 });
		this._authget();
	}

	render(){
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
				return(
					<ScrollView style={styles.background} refreshControl={
						<RefreshControl
							refreshing={this.state.refreshing}
							onRefresh={this._onRefresh}
						/>
					}>
					<Modal
								transparent={true}
								visible={this.state.modalVisible}
							>
							<View style={{ flex: 1 }}>
								<View style={[styles.postCards,{marginTop:70}]}>
									<View style={{
													height:30,
													width:70,
													alignSelf: 'flex-end',
													alignItems: 'center',
													borderWidth: 2,
													backgroundColor:'#ffffff',
													borderColor:'transparent',
													borderRadius:35}}
												>
													<Icon
														name='close'
														type='material'
														color='black'
														size={30}
														onPress={() => {
														this.setState({modalVisible:false});
													}}
													/>
									</View>
									<ImageBackground source={{uri: this.state.course.imagen}} style={{  height: wp('60%'), width: wp('96%')}}>
									<View style={{backgroundColor:  '#00000070', color:'#FFFFFF',bottom:0,position: 'absolute',width:'100%'}}>
										<Text style={[styles.h2, {marginLeft: 10, textAlign: 'center', color:'#FFFFFF'}]}>
											{this.state.course.titulo}
										</Text>
										<Text style={[styles.h2, {marginLeft: 10, textAlign: 'center', color:'#FFFFFF'}]}>
											${this.state.course.costo}
										</Text>
										<Text style={[styles.h3, {marginLeft: 10, fontWeight: 'normal', color:'#FFFFFF'}]}>
											{this.state.course.desc}
										</Text>
									</View>
									</ImageBackground>
									<Button
	                  buttonStyle={styles.courseButton}
	                  onPress={this._post}
	                  title="Contratar"
	                  titleStyle={[styles.p,{color:'#FFFFFF'}]}
	                />
								</View>
							</View>
					</Modal>

						<View style={styles.headerContainer}>
							<Text style={[styles.h1, {textAlign: 'center'}]}>
								PaquetesDisponibles
							</Text>
						</View>

						<View style={styles.bodyContainer}>
							<FlatGrid
								itemDimension={wp('100%')}
								items={this.state.dataSource?this.state.dataSource:[]}
								style={styles.gridView}
								renderItem={({ item, index }) => (
									<View style={styles.textItemGridContainer}>
										<View style={[styles.postCards,{width: wp('70%')}]} >
										<TouchableOpacity onPress={() => {this.openModal(item); ;}}>
											<ImageBackground source={{uri: item.imagen}} style={{  height:'100%', width:'100%'}}>
													<View style={{marginTop:100}}>
													</View>
													<View style={{backgroundColor:  '#00000070', color:'#FFFFFF'}}>
														<Text style={[styles.h2, {marginLeft: 10, textAlign: 'center', color:'#FFFFFF'}]}>
															{item.titulo}
														</Text>
													</View>
											</ImageBackground>
										</TouchableOpacity>
										</View>
									</View>
								)}
							/>
						</View>
					</ScrollView>
				);
		}
	}

	openModal(info) {
		this.setState({modalVisible:true, course:info});
	}

	_onRefresh = () => {
		me().then(data=>{
		 this.setState({me:data,isLoading:false});
	 });
		this._authget();
  }

	_authget = async () => {
	const token = await AsyncStorage.getItem('auth_token');
	return axios.get(global.host+'/api/paquetes/',
	                  {
	                          headers: {
	                                  'Content-Type': 'application/json',
	                                  'Authorization': 'Token ' + token

	                          },
			  }).then((response) => {
					this.setState({
					isLoading:false,
					dataSource:response.data,
				})
				})
			.catch((error) => {
				console.log(error);
				console.log(global.host + '/api/paquetes/error');
			});
	};

	_post = async () =>{
 	 	let self = this;
	 	Alert.alert(
		  'Contratar curso',
		  'Para pagar, dirigirse a la sección "Pagos" en donde estará un estatus del pago',

		  [
		    {
		      text: 'Cancelar',
		      style: 'cancel',
		    },
		    {text: 'OK', onPress: () => {axios.post(global.host+'/api/compras/', {
		  		 usuario: this.state.me.id,
		  		 paquete: this.state.course.id
		  	 }).then(function (response) {
					 Alert.alert('Curso Contratado', '', [{text: 'OK'},],);
					 this._onRefresh
		  	 }).catch(function (error) {
		  		 console.log(error.response.data);
		  	 }); }},
		  ],
		  {cancelable: false},
		);
		this.setState({modalVisible:false});

  }

};
