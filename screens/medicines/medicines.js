import React from 'react';
import {
		ScrollView,
		RefreshControl,
		View,
		Text,
		TouchableOpacity,
		Image,
		} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import {BarIndicator} from 'react-native-indicators';
import styles from "./../style";
import {
        widthPercentageToDP as wp,
	  } from 'react-native-responsive-screen';
import { Linking } from 'expo';
import { showLocation } from "react-native-map-link";



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
				return (
          <ScrollView>
            <FlatGrid
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
                />
              }
              itemDimension={wp("100%")}
              items={this.state.dataSource ? this.state.dataSource : []}
              renderItem={({ item, index }) => (
                <View style={styles.textItemGridContainer}>
                  <View style={[styles.postCards, { alignItems: "center" }]}>
                    <View>
                      <Image
                        style={{
                          height: wp("40%"),
                          width: wp("40%"),
                          marginTop: 10
                        }}
                        source={{ uri: item.photo_thumbnail }}
                      />
                    </View>
                    <View>
                      <Text
                        style={[
                          styles.h2,
                          { marginLeft: 10, textAlign: "center" }
                        ]}
                      >
                        {item.nombre}
                      </Text>
                      <Text
                        style={[
                          styles.h3,
                          { marginLeft: 10, textAlign: "center" }
                        ]}
                      >
                        {item.desc}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={[
                          styles.h2,
                          { marginLeft: 10, textAlign: "center" }
                        ]}
                      >
                        $ {item.costo}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:52 442 881 0036`);
              }}
            >
              <View
                style={[
                  styles.postCards,
                  { width: wp("96") }
                ]}
              >
                <Text style={styles.h2}>Contáctanos</Text>
                <Text style={[styles.h4, { textAlign: "center" }]}>
                  Realiza una llamada telefónica para obtener más información
                  sobre los medicamentos
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                showLocation({
                  latitude: 20.6285536,
                  longitude: -100.4064983,
                  //title: "Farmacia Vida Mujer", // optional
                  googleForceLatLon: false, // optionally force GoogleMaps to use the latlon for the query instead of the title
                  alwaysIncludeGoogle: true, // optional, true will always add Google Maps to iOS and open in Safari, even if app is not installed (default: false)
                  dialogTitle: "Abrir en maps", // optional (default: 'Open in Maps')
                  dialogMessage: "", // optional (default: 'What app would you like to use?')
                  cancelText: "This is the cancel button text", // optional (default: 'Cancel')
                  appsWhiteList: ["google-maps"] // optionally you can set which apps to show (default: will show all supported apps installed on device)
                  // appTitles: { 'google-maps': 'My custom Google Maps title' } // optionally you can override default app titles
                  // app: 'uber'  // optionally specify specific app to use
                });
              }}
            >
              <View
                style={[
                  styles.postCards,
                  { width: wp("96"), marginBottom: 30 }
                ]}
              >
                <Text style={styles.h2}>Ubícanos</Text>
                <Text style={[styles.h4, { textAlign: "center" }]}>
                  Identifícanos en el mapa
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        );
			}

}

};
