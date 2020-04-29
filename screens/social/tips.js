import React from 'react';
import {
		ScrollView,
		RefreshControl,
		ImageBackground,
		View,
		Text,
		TouchableOpacity,
		Modal
		} from 'react-native';

import { Icon } from 'react-native-elements';
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
			modalVisible: false,
			course: '',
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

	openModal(info) {
			this.setState({modalVisible:true, course:info});
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
								transparent={true}
								visible={this.state.modalVisible}
							>
							<ScrollView style={{ flex: 1 , backgroundColor: 'rgba(0,0,0,0.7)'}}>
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
										<Text style={[styles.h3, {marginLeft: 10, fontWeight: 'normal', color:'#FFFFFF'}]}>
											{this.state.course.desc}
										</Text>
									</View>
									</ImageBackground>
									<View style={{backgroundColor: 'rgba(0,0,0,0.7)', height: wp('2%')}}>
									</View>
								</View>
							</ScrollView>
					</Modal>

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

};
