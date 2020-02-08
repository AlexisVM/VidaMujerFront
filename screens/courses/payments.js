import React 						from 'react';
import axios 						from 'axios';
import styles 					from "./../style";
import {Config}					from './../../config';
import {FlatGrid} 			from 'react-native-super-grid';
import * as Network 		from 'expo-network';
import {BarIndicator} 	from 'react-native-indicators';
import { Button, Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import {
        widthPercentageToDP as wp,
        heightPercentageToDP as hp
      } 								from 'react-native-responsive-screen';
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
			}									from 'react-native';
import  './../../config';
import './../utils.js';


export default class PaymentsScreen extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			isLoading :true,
			refreshing: false,
			photo:null,
			modalVisible: false,
			course: "",
			compraid:'',
			costo:'',
		}
	}

	componentDidMount (){
		me().then(data=>{
		 this.setState({isLoading:false,courses:data.compras});
		 console.log(data.compras);
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
			let { photo } = this.state;
			let imageUri = photo ? `data:image/jpg;base64,${photo.base64}` : null;
			return(
				<ScrollView style={styles.background}
					refreshControl={
						<RefreshControl
							refreshing={this.state.refreshing}
							onRefresh={this._onRefresh}
						/>
					}>
					<Modal transparent={true} visible={this.state.modalVisible}>
							<View style={{ flex: 1 , backgroundColor: 'rgba(0,0,0,0.7)'}}>

								<View style={{
												height:30,
												width:70,
												alignSelf: 'flex-end',
												alignItems: 'center',
												borderWidth: 2,
												backgroundColor:'#ffffff',
												borderColor:'transparent',
												borderRadius:35}}>

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

								<View style={{backgroundColor:  '#00000070', color:'#FFFFFF',justifyContent:'center',width:'100%'}}>
									<Text style={[styles.h2, {marginLeft: 10, textAlign: 'center', color:'#FFFFFF'}]}>
											Costo: ${this.state.costo}
									</Text>

									<Button
	                	buttonStyle={[styles.loginButton, {justifyContent: "flex-start", borderWidth: 2, borderColor: '#8c8c8c', backgroundColor:'transparent'}]}
	                  onPress={this._pickImage}
	                  icon = {{
	                              name: "image",
	                              type: 'material',
	                              size: hp('4.2%'),
	                              color: "white"
	                            }}
                    title="Agregar foto"
                    titleStyle={styles.p}
                  />

                  {photo &&
												<View>
	                      <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, alignSelf: 'center' }} />
												<TouchableOpacity onPress={this._upload} style={{backgroundColor: '#E188AE'}}>
													<Text style={[styles.h3, { color:'#FFFFFF', textAlign:'center'}]}>
														Subir
													</Text>
												</TouchableOpacity>
												</View>
	                    }

								</View>

							</View>
					</Modal>

					<View style={styles.headerContainer}>
						<Text style={[styles.h1, {textAlign: 'center'}]}>
							Pagos
						</Text>
					</View>

					<View style={styles.bodyContainer}>
						<FlatGrid
							itemDimension={wp('100%')}
							items={this.state.courses?this.state.courses:[]}
							style={styles.gridView}
							renderItem={({ item, index }) => (
								<View style={styles.textItemGridContainer}>
									<View style={[styles.postCards,{width: wp('96')}]} >
										<ImageBackground source={require('./../../assets/back.jpg')} style={{width:'100%'}}>
												<View style={{marginTop:40}}>
												</View>
												<View style={{backgroundColor:  '#00000070', color:'#FFFFFF'}}>
													<Text style={[styles.h2, { color:'#FFFFFF'}]}>
														{item.paquete.titulo}
													</Text>
													<Text style={[styles.h2, { color:'#FFFFFF'}]}>
														${item.paquete.costo}
													</Text>

												</View>
												{item.uri &&
												<View style={[(item.uri === 0)  ? {height:0}:{height:200, backgroundColor:'#00000090'}]}>

													<Image style={{height: 200, resizeMode: 'contain'}} source={{uri: item.uri}}/>
													<TouchableOpacity onPress={()=>{this._payclick(item.id, item.paquete.costo);}} style={{backgroundColor: '#E188AE'}}>
														<Text style={[styles.h3, { color:'#FFFFFF', textAlign:'center'}]}>
															Modificar Comprobante
														</Text>
													</TouchableOpacity>
												</View>
												}
												{!item.uri &&
												<TouchableOpacity onPress={()=>{this._payclick(item.id, item.paquete.costo);}} style={{backgroundColor: '#E188AE'}}>
													<Text style={[styles.h3, { color:'#FFFFFF', textAlign:'center'}]}>
														Subir Comprobante
													</Text>
												</TouchableOpacity>
											}
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

	_payclick (id, costo) {
		this.setState({compraid:id, costo:costo, modalVisible:true});
  }

	_upload = async () =>{
	 let self = this;
	 axios.patch(global.host+'/api/compras/'+this.state.compraid + '/', {
		 id: this.state.compraid,
     uri:this.state.photo.base64

	 }).then(function (response) {
     alert('Comprobante enviado');
		 this.setState({modalVisible:false});
	 }).catch(function (error) {
		 //console.log(error);
	 });

 }

	_pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        base64: true,
        allowsEditing: false,
        quality: 1
      });
        this.setState({ photo:result });
    };

	_onRefresh = () => {
		this.setState({refreshing:true});
		me().then(data=>{
			this.setState({me:data,refreshing:false,courses:data.compras});
	 	});
  }

};
