import React from 'react';
import {
		ScrollView,
		RefreshControl,
		ImageBackground,
		View,
		Share,
		Platform,
		Text,
		StyleSheet,
		TouchableOpacity,
		Image,
		ActivityIndicator
		} from 'react-native';
import * as Network from 'expo-network';
import {Config} from './../../config';
import styles from "./../style";
import {BarIndicator} from 'react-native-indicators';
import { FlatGrid } from 'react-native-super-grid';
import {
        widthPercentageToDP as wp,
        heightPercentageToDP as hp
      } from 'react-native-responsive-screen';



export default class TipsScreen extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			isLoading :true,
			refreshing: false,
			dataSource: null,
		}
	}
	_onRefresh = () => {

			this.setState({refreshing: true});
			return fetch(global.host + '/api/tips/')
				.then((response) => response.json())
				.then((responseJson) => {

					this.setState({
						refreshing:false,
						dataSource:responseJson,
					})
				})
			.catch((error) => {
				  console.log(error);
			});
  }
	componentDidMount (){
		return fetch(global.host + '/api/tips/')
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					isLoading:false,
					dataSource:responseJson,
				})
			})
		.catch((error) => {
			  console.log(error);
				console.log(global.host + '/api/tips/');
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
							Tips
						</Text>
					</View>

					<View style={styles.bodyContainer}>
						<FlatGrid
							itemDimension={wp('100%')}
							items={this.state.dataSource?this.state.dataSource:[]}
							style={styles.gridView}
							renderItem={({ item, index }) => (
								<View style={styles.textItemGridContainer}>
									<View style={styles.postCards}>
										<ImageBackground source={{uri: item.imagen}} style={{  height:'100%', width:'100%'}}>
												<View style={{marginTop:100}}>
												</View>
												<View style={{backgroundColor:  '#00000070', color:'#FFFFFF'}}>
													<Text style={[styles.h2, {marginLeft: 10, textAlign: 'center', color:'#FFFFFF'}]}>
														{item.titulo}
													</Text>
													<Text style={[styles.h3, {marginLeft: 10, fontWeight: 'normal', color:'#FFFFFF'}]}>
														{item.desc}
													</Text>
												</View>
									</ImageBackground>
									</View>
								</View>
							)}
						/>
					</View>
				</ScrollView>
			);
			}

}

};
