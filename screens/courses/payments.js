import React 						from 'react';
import axios 						from 'axios';
import styles 					from "./../style";
import {FlatGrid} 			from 'react-native-super-grid';
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
					Text,
					TouchableOpacity,
					Image,
					Modal,
					Clipboard
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
			modalpago:false,
			course: "",
			compraid:'',
			costo:'',
			clabeCopiado:false,
			noCuenta: false,
			telefono: false,
			tarjetaCopiado:false,
		}
	}

	componentDidMount (){
		me().then(data=>{
		 this.setState({isLoading:false,courses:data.compras});
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
	                				buttonStyle={styles.fotoPagoButton}
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
					<Modal transparent={true} visible={this.state.modalpago}>
						<View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', borderColor: '#fffffff', borderTopWidth:30, borderBottomWidth:30}}>
							<View style={{
								height: 30,
								width: 70,
								alignSelf: 'flex-end',
								alignItems: 'center',
								borderWidth: 2,
								backgroundColor: '#ffffff',
								borderColor: 'transparent',
								borderRadius: 35
							}}>

								<Icon
									name='close'
									type='material'
									color='black'
									size={30}
									onPress={() => {
										this.setState({ modalpago: false });
									}}
								/>
							</View>

							<View style={{ backgroundColor: '#000000', color: '#FFFFFF', justifyContent: 'center', width: '100%', marginTop:80, marginBottom:80, borderColor:'#FFFFFF', borderWidth: 3}}>
								<Text style={[styles.h2, { marginLeft: 10, textAlign: 'center', color: '#FFFFFF', marginTop:20}]}>
									Banco: BBVA
								</Text>
								<TouchableOpacity onPress={() => { Clipboard.setString('2997857306'); this.setState({ noCuenta: true }); setTimeout(() => { this.setState({ noCuenta: false }); }, 1000); }}>
									<Text style={[styles.paymentText]}>
										Número de Cuenta: 299 785 7306
									</Text>
									{this.state.noCuenta && <Text style={[styles.h4, { textAlign: 'center', color: '#FFFFFF', marginTop: 5 }]}>¡Copiado!</Text>}
								</TouchableOpacity>
								<TouchableOpacity onPress={() => {Clipboard.setString('012680029978573061'); this.setState({ clabeCopiado: true }); setTimeout(() => {this.setState({clabeCopiado: false});}, 1000);}}>
									<Text style={[styles.paymentText]}>
										Cuenta CLABE: 012 680 029 978 573 061 
									</Text>
									{this.state.clabeCopiado && <Text style={[styles.h4, { textAlign: 'center', color: '#FFFFFF', marginTop: 5 }]}>¡Copiado!</Text>}
								</TouchableOpacity>
								<Text style={[styles.paymentText]}>
									Nombre: Ana Isabel Osorio
									</Text>
								<TouchableOpacity onPress={() => { Clipboard.setString('4152313495017480'); this.setState({ tarjetaCopiado: true }); setTimeout(() => { this.setState({ tarjetaCopiado: false }); }, 1000); }}>
									<Text style={[styles.paymentText]}>
										Número de Tarjeta: 4772 9130 5942 5423
									</Text>
									{this.state.tarjetaCopiado && <Text style={[styles.h4, { textAlign: 'center', color: '#FFFFFF', marginTop: 5 }]}>¡Copiado!</Text>}
								</TouchableOpacity>
								<TouchableOpacity onPress={() => { Clipboard.setString('4426684370'); this.setState({ telefono: true }); setTimeout(() => { this.setState({ telefono: false }); }, 1000); }}>
									<Text style={[styles.h4, { marginLeft: 10, textAlign: 'center', color: '#FFFFFF', marginTop: 10}]}>
										*Para más información sobre tu pago comunícate vía whatsapp al: +52 442 668 4370
									</Text>
									{this.state.telefono && <Text style={[styles.h4, { textAlign: 'center', color: '#FFFFFF', marginTop: 5 }]}>¡Número Copiado!</Text>}
								</TouchableOpacity>
								<Text style={{ marginBottom: 10}}></Text>
							</View>

						</View>
					</Modal>
	
					<View style={styles.headerContainer}>
						<Text style={styles.h1}>
							Pagos
						</Text>
					</View>

					<View style={styles.bodyContainer}>
						<View style={[styles.postCards, { width: wp('96'), textAlign:'center'}]} >
							<TouchableOpacity onPress={() => { this.setState({modalpago:true}) }}>
								<View style={{ backgroundColor: '#00000070', color: '#FFFFFF' }}>
									<Text style={[styles.h3, { color: '#FFFFFF',  textAlign:'center' }]}>
										Ver datos de pago
									</Text>
								</View>
							</TouchableOpacity>
						</View>

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
												<View style={[(item.uri === 0)  ? {height:0}:{height:190, backgroundColor:'#00000090'}]}>
													<Image style={{height: 190, resizeMode: 'contain'}} source={{uri: item.uri}}/>								
												</View>
												}
												{!item.aprobada && item.uri &&
												<View>
													<View style={{ backgroundColor: '#00000070', color: '#FFFFFF' }}>
														<Text style={[styles.h4, { color: '#FFFFFF', textAlign: 'center' }]}>
															Tu pago está siendo revisado.
														</Text>
													</View>
													<View>
														<TouchableOpacity onPress={() => { this._payclick(item.id, item.paquete.costo); }} style={{ backgroundColor: '#E188AE' }}>
															<Text style={[styles.h2, { color: '#FFFFFF', textAlign: 'center' }]}>
																Modificar Comprobante
															</Text>
														</TouchableOpacity>
													</View>
												</View>
												}
												{item.aprobada &&
													<View style={{ backgroundColor: '#00000070', color: '#FFFFFF' }}>
														<Text style={[styles.h4, { color: '#FFFFFF', textAlign: 'center' }]}>
															Pago aprobado.
														</Text>
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
		console.log(error);
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
