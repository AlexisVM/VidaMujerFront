import React from 'react';
import {
	ScrollView,
    Text,
    View,
    AsyncStorage,
    Image,
	} from 'react-native';
import styles from "../style";
import '../utils.js';
import {BarIndicator} from 'react-native-indicators';
import { Button, Icon } from 'react-native-elements';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from 'react-native-responsive-screen';

export default class AboutMeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			imgWidth: 0,
			imgHeight: 0,
			isLoading: true,
		};
  	}
	static navigationOptions = {
		drawerIcon: (
		    <Icon name='person' type='material' color='#000000'/>
		  )
	};


	render(){
		const { imgWidth, imgHeight } = this.state;
		if (this.state.isLoading){
			return (
				<ScrollView style={styles.background}>
				<View style={styles.background}>
					<Text>{"\n\n\n\n\n"}</Text>
					<BarIndicator  color='#E188AE' />
				</View>
				</ScrollView>
			);
		} else{
			return(
        		<ScrollView style={{ height: '100%'}}>	
					<View>
						<Image style={{ width: imgWidth, height: imgHeight }}
							 source={require('./../../assets/images/about-me.jpg')} />
					</View>
				</ScrollView>
			);
		}
	}

	async componentDidMount() {
		Image.getSize(this.props.imageUrl, (width, height) => {
			// calculate image width and height 
			const screenWidth = Dimensions.get('window').width
			const scaleFactor = width / screenWidth
			const imageHeight = height / scaleFactor
			this.setState({ imgWidth: screenWidth, imgHeight: imageHeight })
		})
  	}
	_signOut = async () => {
		await AsyncStorage.clear();
		this.props.navigation.navigate('Auth');
	};
  	componentWillUnmount() {}
};
