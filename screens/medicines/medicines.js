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
import { FlatGrid } from 'react-native-super-grid';
import { SectionGrid } from 'react-native-super-grid';
import {BarIndicator} from 'react-native-indicators';
import styles from "./../style";
import {
        widthPercentageToDP as wp,
        heightPercentageToDP as hp
      } from 'react-native-responsive-screen';

export default class MedicinesScreen extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			dataSource: [
				{
				titulo: 'Genoprazol',
				precio: '$1000',
				descripcion:'20mg',
        photo_thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT-_d0xv-uHKtVkxTFt1yxkDvVNnFoU23_5P9fFRNRBIjGenavL',
			},{
				titulo: "Treda",
				precio: '$1000',
				descripcion:'20 tabletas',
        photo_thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSm45m8GiBI3Tf9h8Q60s6L-Nq3cBkLDTW552TnakVqy5AltCz8",
			}
		],
			isLoading :true,
			refreshing:false,
	}
}
	componentDidMount (){
		return fetch(global.host + '/api/meds/')
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					isLoading:false,
					dataSource:responseJson,
				})
			})
		.catch((error) => {
				console.log(error);
				console.log(global.host + '/api/meds/');
		});
	}
	_onRefresh = () => {

		this.setState({refreshing: true});
		return fetch(global.host + '/api/meds/')
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
						<FlatGrid
							refreshControl={<RefreshControl
									refreshing={this.state.refreshing}
									onRefresh={this._onRefresh}
								/>}
							itemDimension={wp('100%')}
							items={this.state.dataSource?this.state.dataSource:[]}
							renderItem={({ item, index }) => (
								<View style={styles.textItemGridContainer}>
									<View style={[styles.postCards,{alignItems: 'center'}]}>
											<View>
												<Image style={{height: wp('40%'), width: wp('40%'), marginTop:10}} source={{uri: item.photo_thumbnail}}/>
											</View>
											<View>
												<Text style={[styles.h2, {marginLeft: 10, textAlign: 'center'}]}>
													{item.nombre}
												</Text>
												<Text style={[styles.h3, {marginLeft: 10, textAlign: 'center'}]}>
													{item.desc}
												</Text>
											</View>
											<View>
												<Text style={[styles.h2, {marginLeft: 10, textAlign: 'center'}]}>
													$ {item.costo}
												</Text>
											</View>
									</View>
								</View>
							)}
							/>

				);
			}

}

};
