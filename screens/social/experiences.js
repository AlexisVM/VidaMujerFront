import React from 'react';
import {
		ScrollView,
		RefreshControl,
		View,
		Text,
		Platform,
		Image,
		Share,
		Modal,
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
import './../utils.js';
import PageList from "react-native-page-list";

export default class ExperiencesScreen extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			isLoading :true,
			me:null,
			refreshing: false,
			dataSource: null,
			modalVisible: false,
			images: [],
		}
	}
	_onRefresh = () => {
		this.setState({refreshing: true});
		return fetch(global.host + '/api/experiencias/?ordering=-fecha')
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
	opengallery(images) {
  		this.setState({modalVisible:true, images:images});
  	}
	componentDidMount (){
		me().then(data=>{
		 this.setState({me:data,isLoading:false});
	 });
		return fetch(global.host + '/api/experiencias/?ordering=-fecha')
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
				return(

					<ScrollView style={styles.background}
					refreshControl={
						<RefreshControl
							refreshing={this.state.refreshing}
							onRefresh={this._onRefresh}
						/>
					}>
					<Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
              >
             <View style={{ flex: 1 }}>
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

                     <PageList
            data={this.state.images}
            renderItem={({ item, index }) => {
                return (
                    <View key={index} style={{flex: 1, backgroundColor: "#000"}}>
                        <Image
                            source={{ uri: item }}
                            style={{flex: 1}}
                            resizeMode="contain"
                        />
                    </View>
                );
            }}
        />

             </View>
             </Modal>
						<View style={styles.headerContainer}>
								<View style={{flexDirection: 'column', justifyContent: 'center', marginTop:10 }}>
									<View style={[styles.inputFormContainer, {width: wp('100%'), height: wp('10%'),  }]}>
										<View style={{height: wp('10%'), width: wp('10%'),}}>
											<Image style={{height: wp('10%'), width: wp('10%')}} source={require('./../../assets/icon.png')}/>
										</View>
										<View style={{width: wp('70%'), alignSelf:'flex-end',
										flexDirection: 'column', justifyContent: 'center'}}>
											<Button
												buttonStyle={[styles.postButton, {justifyContent: "flex-start",}]}
												onPress={this._newpost}
												title="Comparte algo.."
												titleStyle={[styles.h1],{ marginLeft: 10,  color: '#828282'}}
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
											<View style={{ flexDirection: 'row', marginRight: 20}}>
												<Image style={{height: hp('7%'), width: hp('7%')}} source={require('./../../assets/icon.png')}/>
												<View>
													<Text style={[styles.h3, { marginLeft: 10, marginRight: 10}]}>
														{item.username}
													</Text>
													<Text style={[styles.p, {marginLeft: 10, fontWeight: 'normal', marginRight: 20}]}>
														{item.desc}
													</Text>
												</View>
											</View>
											<View style={[(item.fotos.length === 0)  ? {height:0}:{height:200}]}>
												<FbGrid
													images={
														item.fotos
													}
													onPress={() => this.opengallery(item.fotos)}
												/>


											</View>
											<Button buttonStyle={styles.fbLoginButton}
												onPress={()=>{this._onShare(item.desc);}}
												title="Compartir"
												titleStyle={[styles.p, { color: '#FFFFFF' }]} >
												<Text>
													Compartir
												</Text>
											</Button>
										</View>
									</View>
								)}
							/>
						</View>
					</ScrollView>
				);
		}
	}
	_newpost = () => {
		this.props.navigation.navigate('newExperience');
	};
	_onShare = async (texto) => {
		try {
			const result = await Share.share({
				message:
					'"' + texto + '"  ' + 'https://www.facebook.com/ginecologaisabelosorio/',
				title: "| Vida Mujer | "
			});

			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					// shared with activity type of result.activityType
				} else {
					// shared
				}
			} else if (result.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (error) {
			alert(error.message);
		}
	};
};
