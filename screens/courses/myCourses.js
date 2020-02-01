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


export default class MyCoursesScreen extends React.Component {

	render(){
				return(
					<ScrollView >
						<View >
							<Text >
								Courses
							</Text>
						</View>
					</ScrollView>
				);

}

};
