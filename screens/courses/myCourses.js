import React from 'react';
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
		Image,
		ActivityIndicator,
		Modal,
		} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import * as Network from 'expo-network';
import {Config} from './../../config';
import styles from "./../style";
import {BarIndicator} from 'react-native-indicators';
import { FlatGrid } from 'react-native-super-grid';
import {
        widthPercentageToDP as wp,
        heightPercentageToDP as hp
      } from 'react-native-responsive-screen';
import axios from 'axios';
import  './../../config';
import './../utils.js';
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player';


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
		}
	}

	componentDidMount (){
		me().then(data=>{
		 this.setState({me:data,isLoading:false,courses:data.compras});
		//this.state.courses.map(a => {console.log(a.paquete)});
		 //console.log(data.compras)
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
													{!item.aprobada &&
													<Text style={[styles.p, {marginLeft: 10, textAlign: 'center', color:'#FFFFFF'}]}>
														(Pago no aprobado aún)
													</Text>
													}
												</View>
										</ImageBackground>
									</View>
									<View>
									{item.aprobada &&
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
									}
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
		this.setState({modalVisible:true, videoInfo:info});
	}

	_onRefresh = () => {
		this.setState({refreshing:true});
		me().then(data=>{
		 this.setState({me:data,refreshing:false,courses:data.compras});
	 });
  }

};
