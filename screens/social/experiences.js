import React from 'react';
import {
		ScrollView,
		RefreshControl,
		View,
		Share,
		Platform,
		Text,
		StyleSheet,
		TouchableOpacity,
		Image,
		ActivityIndicator
		} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import {
        widthPercentageToDP as wp,
        heightPercentageToDP as hp
      } from 'react-native-responsive-screen';
import styles from "./../style";
import { FlatGrid } from 'react-native-super-grid';
import {BarIndicator} from 'react-native-indicators';
import FbGrid from "react-native-fb-image-grid";
import Gallery from 'react-native-image-gallery';



export default class ExperiencesScreen extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			isLoading :true,
			refreshing: false,
			dataSource: null,
			visible: false,
			images: [
				'https://cdn.pixabay.com/photo/2017/06/09/09/39/adler-2386314_960_720.jpg',
  			'https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029_960_720.jpg',
  			'https://cdn.pixabay.com/photo/2016/08/12/22/34/apple-1589869_960_720.jpg'
			],
		}
	}
	_onRefresh = () => {
		this.setState({refreshing: true});
		return fetch(global.host + '/api/experiencias/')
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
		return fetch(global.host + '/api/experiencias/')
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					isLoading:false,
					dataSource:responseJson,
				})
					//console.log(responseJson.map(a => { a.fotos.map( k => { k.photo_thumbnail})    }))
			})
		.catch((error) => {
			  console.log(error);
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
			if (this.state.visible){
				return(
					<View>
						<Gallery
							style={{ flex: 1, backgroundColor: 'black' }}
							images={[
								{ source: { uri: 'http://i.imgur.com/XP2BE7q.jpg' } },
								{ source: { uri: 'http://i.imgur.com/5nltiUd.jpg' } },
								{ source: { uri: 'http://i.imgur.com/6vOahbP.jpg' } },
								{ source: { uri: 'http://i.imgur.com/kj5VXtG.jpg' } }
							]}
						/>
					</View>
				);
			}else{
				return(
					<ScrollView style={styles.background}>
						<View style={styles.headerContainer}>
								<View style={{flexDirection: 'column', justifyContent: 'center', }}>
									<View style={[styles.inputFormContainer, {width: wp('100%'), height: wp('10%'),  }]}>
										<View style={{height: wp('10%'), width: wp('10%'),}}>
											<Image style={{height: wp('10%'), width: wp('10%')}} source={require('./../../assets/images/profile_default2.png')}/>
										</View>
										<View style={{height: wp('10%'), width: wp('70%'), alignSelf:'flex-end',
										flexDirection: 'column', justifyContent: 'center'}}>
											<Button
												buttonStyle={[styles.postButton, {justifyContent: "flex-start",}]}
												onPress={this._newpost}
												title="Comparte tu experiencia"
												titleStyle={[styles.p],{ marginLeft: 10, fontWeight: 'normal', color: '#828282'}}
											/>
										</View>
									</View>
								</View>
						</View>
						<View style={styles.bodyContainer}>
							<FlatGrid
								itemDimension={wp('90%')}
								items={this.state.dataSource?this.state.dataSource:[]}
								style={styles.gridView}
								renderItem={({ item, index }) => (
									<View style={styles.textItemGridContainer}>

										<View style={styles.postCards}>
											<View style={{flexDirection: 'row'}}>
												<Image style={{height: hp('7%'), width: hp('7%')}} source={require('./../../assets/images/profile_default2.png')}/>
												<View>
													<Text style={[styles.h3, {marginLeft: 10}]}>
														{item.username}
													</Text>
													<Text style={[styles.h4, {marginLeft: 10, fontWeight: 'normal'}]}>
														{item.desc}
													</Text>
												</View>
											</View>
											<View style={[(item.fotos.length === 0)  ? {height:0}:{height:200}]}>
												<FbGrid
													images={
														item.fotos
													}
													onPress={() => {this.setState({visible:true});}}
												/>


											</View>
										</View>
									</View>
								)}
							/>
						</View>
					</ScrollView>
				);
			}
		}
}

};
