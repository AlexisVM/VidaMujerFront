import {
		ScrollView,
		RefreshControl,
		ImageBackground,
		View,
		Share,
		Platform,
		Text,
		Alert,
		StyleSheet,
		TouchableOpacity,
		Image,
		ActivityIndicator,
		Modal,} 							from 'react-native';
import {
        widthPercentageToDP as wp,
        heightPercentageToDP as hp} 							from 'react-native-responsive-screen';
import React 						from 'react';
import styles 					from "./../style";
import { Video } 				from 'expo-av';
import * as Network 		from 'expo-network';
import { Config } 			from './../../config';
import VideoPlayer 			from 'expo-video-player';
import { FlatGrid } 		from 'react-native-super-grid';
import { Button, Icon } from 'react-native-elements';
import { BarIndicator } from 'react-native-indicators';
import axios 						from 'axios';
import { Linking } from 'expo';
import  './../../config';
import './../utils.js';

export default class MyCoursesScreen extends React.Component {

	static navigationOptions = {
		tabBarLabel:"Mis Cursos",
  };

	constructor(props){
		super(props);
		this.state = {
			isLoading :true,
			refreshing: false,
			dataSource: "",
			modalVisible: false,
			videoInfo: "",
			me:null,
			videos:"",
			aprobada:""
		}
	}

	componentDidMount (){
		me().then(data=>{
		 this.setState({me:data,isLoading:false,courses:data.compras});
		//this.state.courses.map(a => {console.log(a.paquete)});
		 console.log(data.compras)
	 });
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
				<ScrollView style={styles.background}
				refreshControl={
					<RefreshControl
						refreshing={this.state.refreshing}
						onRefresh={this._onRefresh}
					/>
				}>
					<Modal
								transparent={false}
								visible={this.state.modalVisible}
							>
								<View style={{ flex: 1 , backgroundColor:'#000000', alignItems:'center', justifyContent:'center',width:wp('100%')}}>

									<View style={{alignItems:'center', backgroundColor:'#000000', transform: [{ rotate: '90deg'}]}}>
														<VideoPlayer
																videoProps={{
																	shouldPlay: false,
																	resizeMode: Video.RESIZE_MODE_CONTAIN,
																	source: {
																		uri: this.state.videoInfo.video,
																	},
																}}
																inFullscreen={true}
																showControlsOnLoad={true}
																videoBackground='transparent'
																showFullscreenButton={true}
																height={wp('100%')}
																switchToPortrait={() => this.setState({modalVisible:false})}
															/>

									</View>

								</View>
					</Modal>

					<View style={styles.headerContainer}>
						<Text style={[styles.h1, {textAlign: 'center'}]}>
							Contratado
						</Text>
					</View>

					<View style={styles.bodyContainer}>
						<FlatGrid
							itemDimension={wp('100%')}
							items={this.state.courses?this.state.courses:[]}
							style={styles.gridView}
							renderItem={({ item, index }) => (
								<View style={styles.textItemGridContainer}>
									<View style={[styles.postCards,{width: wp('92')}]} >
										<ImageBackground source={require('./../../assets/back.jpg')} style={{width:'100%'}}>
												<View style={{marginTop:40}}>
												</View>
												<View style={{backgroundColor:  '#00000070', color:'#FFFFFF'}}>
													<Text style={[styles.h2, {marginLeft: 10, textAlign: 'center', color:'#FFFFFF'}]}>
														{item.paquete.titulo}
													</Text>
												</View>
												{!item.aprobada &&
												<View style={{ backgroundColor: '#00000090', color: '#FFFFFF' }}>
													<Text style={[styles.h3, { marginLeft: 10, textAlign: 'center', color: '#FFFFFF' }]}>
														Cuando realices tu pago, podrás ver tus videos.
													</Text>
												</View>
												}
										</ImageBackground>
									</View>
									{item.aprobada &&
									<View>
										<FlatGrid
										itemDimension={wp('100%')}
										items={item.paquete.videos?item.paquete.videos:[]}
										style={styles.gridView}
										renderItem={({ item, index }) => (
											<View style={{alignItems:'center'}}>
												<VideoPlayer
											      videoProps={{
											        shouldPlay: false,
											        resizeMode: Video.RESIZE_MODE_CONTAIN,
											        source: {
											          uri: item.video,
											        },
											      }}
											      inFullscreen={true}
											      showControlsOnLoad={true}
														videoBackground='transparent'
											      showFullscreenButton={false}
														height={170}
														width={300}
														switchToPortrait={() => {this.openModal(item); ;}}
											    />
											</View>
										)}
									/>
									{item.paquete.consulta &&
											<TouchableOpacity onPress={() => { Linking.openURL('whatsapp://send?text=Hola, ya pagué y me gustaría agendar una consulta, mi nombre es '+this.state.me.first_name+' '+this.state.me.last_name+'&phone=524422192605'); }}>
										<View style={[styles.postCards,{width: wp('85')}]}>
											<Text style={styles.h2}>Consulta</Text>
											<Text style={[styles.h4,{textAlign:'center'}]}>Agenda tu consulta aqui</Text>
										</View>
										</TouchableOpacity>
									}
									</View>
							}

								</View>
							)}
						/>
					</View>
				</ScrollView>
			);
		}
	}

	openModal(info) {
		this.setState({modalVisible:true, videoInfo:info});
	}

	_onRefresh = () => {
		this.setState({refreshing:true});
		me().then(data=>{
		 this.setState({me:data,refreshing:false,courses:data.compras});
	 });
  }

};
