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
		TouchableOpacity,
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
import Video from 'react-native-video';


export default class MyCoursesScreen extends React.Component {
	static navigationOptions = {
		tabBarLabel:"Mis Cursos",
  };
	constructor(props){
		super(props);
		this.state = {
			isLoading :true,
			refreshing: false,
			dataSource: null,
			modalVisible: false,
			courses: "",
			me:null,
			videos:"",
		}
	}

	_onRefresh = () => {
		this.setState({refreshing:true});
		me().then(data=>{
		 this.setState({me:data,refreshing:false,courses:data.compras});
	 });
  }

	componentDidMount (){
		me().then(data=>{
		 this.setState({me:data,isLoading:false,courses:data.compras});
	 });
	 return fetch(global.host + '/api/paquetes/')
		 .then((response) => response.json())
		 .then((responseJson) => {
			 this.setState({dataSource:responseJson})
		 }).then(()=>{console.log(this.state.dataSource);})
	 .catch((error) => {
			 console.log(error);
			 console.log(global.host + '/api/paquetes/');
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
									<View style={[styles.postCards,{width: wp('70%')}]} >
												<View style={{marginTop:40}}>
												</View>
												<View style={{backgroundColor:  '#00000070', color:'#FFFFFF'}}>
													<Text style={[styles.h2, {marginLeft: 10, textAlign: 'center', color:'#FFFFFF'}]}>
														Paquete {item.paquete}
													</Text>
												</View>
									</View>
									<Video
    onEnd={this.onEnd}
    onLoad={this.onLoad}
    onLoadStart={this.onLoadStart}
    onProgress={this.onProgress}
    paused={this.state.paused}
    ref={videoPlayer => (this.videoPlayer = videoPlayer)}
    resizeMode={this.state.screenType}
    onFullScreen={this.state.isFullScreen}
    source={{ uri: 'https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4' }}
    volume={10}
/>
								</View>
							)}
						/>
					</View>
				</ScrollView>
			);
			}

}

};
