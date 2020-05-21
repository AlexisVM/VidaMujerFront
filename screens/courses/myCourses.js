import {
	ScrollView,
	RefreshControl,
	ImageBackground,
	View,
	Text,
	TouchableOpacity,
	Modal,
	Dimensions,
	Image,
	Slider,
	StyleSheet,
	TouchableHighlight,
} 							from 'react-native';
import {
        widthPercentageToDP as wp,
        heightPercentageToDP as hp} 							from 'react-native-responsive-screen';
import React 						from 'react';
import styles					from "./../style";
import { Video, Audio } 				from 'expo-av';
import { Asset } 				from "expo-asset";
import VideoPlayer 				from 'expo-video-player';
import { FlatGrid } 			from 'react-native-super-grid';
import { BarIndicator } 		from 'react-native-indicators';
import { Linking } 				from 'expo';
import * as Font from "expo-font";
import { MaterialIcons } from "@expo/vector-icons";


import  './../../config';
import './../utils.js';

const estilos = [styles, styles2];

class Icon {
	constructor(module, width, height) {
		this.module = module;
		this.width = width;
		this.height = height;
		Asset.fromModule(this.module).downloadAsync();
	}
}

class PlaylistItem {
	constructor(name, uri, isVideo) {
		this.name = name;
		this.uri = uri;
		this.isVideo = isVideo;
	}
}



const ICON_THROUGH_EARPIECE = "speaker-phone";
const ICON_THROUGH_SPEAKER = "speaker";

const ICON_PLAY_BUTTON = new Icon(
	require("./../../assets/images/play_button.png"),
	34,
	51
);
const ICON_PAUSE_BUTTON = new Icon(
	require("./../../assets/images/pause_button.png"),
	34,
	51
);
const ICON_STOP_BUTTON = new Icon(
	require("./../../assets/images/stop_button.png"),
	22,
	22
);
const ICON_FORWARD_BUTTON = new Icon(
	require("./../../assets/images/forward_button.png"),
	33,
	25
);
const ICON_BACK_BUTTON = new Icon(
	require("./../../assets/images/back_button.png"),
	33,
	25
);

const ICON_LOOP_ALL_BUTTON = new Icon(
	require("./../../assets/images/loop_all_button.png"),
	77,
	35
);
const ICON_LOOP_ONE_BUTTON = new Icon(
	require("./../../assets/images/loop_one_button.png"),
	77,
	35
);

const ICON_MUTED_BUTTON = new Icon(
	require("./../../assets/images/muted_button.png"),
	67,
	58
);
const ICON_UNMUTED_BUTTON = new Icon(
	require("./../../assets/images/unmuted_button.png"),
	67,
	58
);

const ICON_TRACK_1 = new Icon(require("./../../assets/images/track_1.png"), 166, 5);
const ICON_THUMB_1 = new Icon(require("./../../assets/images/thumb_1.png"), 18, 19);
const ICON_THUMB_2 = new Icon(require("./../../assets/images/thumb_2.png"), 15, 19);

const LOOPING_TYPE_ALL = 0;
const LOOPING_TYPE_ONE = 1;
const LOOPING_TYPE_ICONS = { 0: ICON_LOOP_ALL_BUTTON, 1: ICON_LOOP_ONE_BUTTON };

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");
const BACKGROUND_COLOR = "#FFF8ED";
const DISABLED_OPACITY = 0.5;
const FONT_SIZE = 14;
const LOADING_STRING = "... Cargando ...";
const BUFFERING_STRING = "...Cargando buffer...";
const RATE_SCALE = 3.0;
const VIDEO_CONTAINER_HEIGHT = (DEVICE_HEIGHT * 2.0) / 5.0 - FONT_SIZE * 2;



export default class MyCoursesScreen extends React.Component {

	static navigationOptions = {
		tabBarLabel:"Mis Cursos",
  };

	constructor(props){
		super(props);
		this.index = 0;
		this.isSeeking = false;
		this.shouldPlayAtEndOfSeek = false;
		this.playbackInstance = null;
		this.state = {
			videosPlaylist : [],
			isLoaded :true,
			refreshing: false,
			dataSource: "",
			modalVisible: false,
			videoInfo: "",
			me:null,
			videos:"",
			aprobada:"",
			showVideo: false,
			playbackInstanceName: LOADING_STRING,
			loopingType: LOOPING_TYPE_ALL,
			muted: false,
			playbackInstancePosition: null,
			playbackInstanceDuration: null,
			shouldPlay: false,
			isPlaying: false,
			isBuffering: false,
			isLoading: true,
			fontLoaded: false,
			shouldCorrectPitch: true,
			volume: 1.0,
			rate: 1.0,
			videoWidth: DEVICE_WIDTH,
			videoHeight: VIDEO_CONTAINER_HEIGHT,
			poster: false,
			useNativeControls: true,
			fullscreen: false,
			throughEarpiece: false
		}
	}

	componentDidMount (){
		me().then(data=>{

		 data.compras.map( compra => {
			 compra.paquete.videos.map(video => 
				{
					let newPlay = this.state.videosPlaylist;
					newPlay.push( new PlaylistItem(
						video.titulo,
						video.video,
						true
					))
					this.setState({videosPlaylist:newPlay})
				}
				)
		 }
		 );
		 this.setState({me:data,isLoaded:false,courses:data.compras});
		 //console.log(this.state.videosPlaylist)
	 });
		Audio.setAudioModeAsync({
			allowsRecordingIOS: false,
			staysActiveInBackground: false,
			interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
			playsInSilentModeIOS: true,
			shouldDuckAndroid: true,
			interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
			playThroughEarpieceAndroid: false
		});

	}

	async _loadNewPlaybackInstance(playing) {
		if (this.playbackInstance != null) {
			await this.playbackInstance.unloadAsync();
			// this.playbackInstance.setOnPlaybackStatusUpdate(null);
			this.playbackInstance = null;
		}

		const source = { uri: this.state.videosPlaylist[this.index].uri };
		const initialStatus = {
			shouldPlay: playing,
			rate: this.state.rate,
			shouldCorrectPitch: this.state.shouldCorrectPitch,
			volume: this.state.volume,
			isMuted: this.state.muted,
			isLooping: this.state.loopingType === LOOPING_TYPE_ONE
			// // UNCOMMENT THIS TO TEST THE OLD androidImplementation:
			// androidImplementation: 'MediaPlayer',
		};

		if (this.state.videosPlaylist[this.index].isVideo) {
			//console.log(this._onPlaybackStatusUpdate);
			//console.log(this._video);
			
			await this._video.loadAsync(source, initialStatus);
			// this._video.onPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
			this.playbackInstance = this._video;
			const status = await this._video.getStatusAsync();
		} else {
			const { sound, status } = await Audio.Sound.createAsync(
				source,
				initialStatus,
				this._onPlaybackStatusUpdate
			);
			this.playbackInstance = sound;
		}

		this._updateScreenForLoading(false);
	}

	_mountVideo = component => {
		this._video = component;
		this._loadNewPlaybackInstance(false);
	};

	_updateScreenForLoading(isLoading) {
		if (isLoading) {
			this.setState({
				showVideo: false,
				isPlaying: false,
				playbackInstanceName: LOADING_STRING,
				playbackInstanceDuration: null,
				playbackInstancePosition: null,
				isLoading: true
			});
		} else {
			this.setState({
				playbackInstanceName: this.state.videosPlaylist[this.index].name,
				showVideo: this.state.videosPlaylist[this.index].isVideo,
				isLoading: false
			});
		}
	}

	_onPlaybackStatusUpdate = status => {
		if (status.isLoaded) {
			this.setState({
				playbackInstancePosition: status.positionMillis,
				playbackInstanceDuration: status.durationMillis,
				shouldPlay: status.shouldPlay,
				isPlaying: status.isPlaying,
				isBuffering: status.isBuffering,
				rate: status.rate,
				muted: status.isMuted,
				volume: status.volume,
				loopingType: status.isLooping ? LOOPING_TYPE_ONE : LOOPING_TYPE_ALL,
				shouldCorrectPitch: status.shouldCorrectPitch
			});
			if (status.didJustFinish && !status.isLooping) {
				this._advanceIndex(true);
				this._updatePlaybackInstanceForIndex(true);
			}
		} else {
			if (status.error) {
				console.log(`FATAL PLAYER ERROR: ${status.error}`);
			}
		}
	};

	_onLoadStart = () => {
		console.log(`ON LOAD START`);
	};

	_onLoad = status => {
		console.log(`ON LOAD : ${JSON.stringify(status)}`);
	};

	_onError = error => {
		console.log(`ON ERROR : ${error}`);
	};

	_onReadyForDisplay = event => {
		const widestHeight =
			(DEVICE_WIDTH * event.naturalSize.height) / event.naturalSize.width;
		if (widestHeight > VIDEO_CONTAINER_HEIGHT) {
			this.setState({
				videoWidth:
					(VIDEO_CONTAINER_HEIGHT * event.naturalSize.width) /
					event.naturalSize.height,
				videoHeight: VIDEO_CONTAINER_HEIGHT
			});
		} else {
			this.setState({
				videoWidth: DEVICE_WIDTH,
				videoHeight:
					(DEVICE_WIDTH * event.naturalSize.height) / event.naturalSize.width
			});
		}
	};

	_onFullscreenUpdate = event => {
		console.log(
			`FULLSCREEN UPDATE : ${JSON.stringify(event.fullscreenUpdate)}`
		);
	};

	_advanceIndex(forward) {
		this.index =
			(this.index + (forward ? 1 : this.state.videosPlaylist.length - 1)) % this.state.videosPlaylist.length;
	}

	async _updatePlaybackInstanceForIndex(playing) {
		this._updateScreenForLoading(true);

		this.setState({
			videoWidth: DEVICE_WIDTH,
			videoHeight: VIDEO_CONTAINER_HEIGHT
		});

		this._loadNewPlaybackInstance(playing);
	}

	_onPlayPausePressed = () => {
		if (this.playbackInstance != null) {
			if (this.state.isPlaying) {
				this.playbackInstance.pauseAsync();
			} else {
				this.playbackInstance.playAsync();
			}
		}
	};

	_onStopPressed = () => {
		if (this.playbackInstance != null) {
			this.playbackInstance.stopAsync();
		}
	};

	_onForwardPressed = () => {
		if (this.playbackInstance != null) {
			this._advanceIndex(true);
			this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
		}
	};

	_onBackPressed = () => {
		if (this.playbackInstance != null) {
			this._advanceIndex(false);
			this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
		}
	};

	_onMutePressed = () => {
		if (this.playbackInstance != null) {
			this.playbackInstance.setIsMutedAsync(!this.state.muted);
		}
	};

	_onLoopPressed = () => {
		if (this.playbackInstance != null) {
			this.playbackInstance.setIsLoopingAsync(
				this.state.loopingType !== LOOPING_TYPE_ONE
			);
		}
	};

	_onVolumeSliderValueChange = value => {
		if (this.playbackInstance != null) {
			this.playbackInstance.setVolumeAsync(value);
		}
	};

	_trySetRate = async (rate, shouldCorrectPitch) => {
		if (this.playbackInstance != null) {
			try {
				await this.playbackInstance.setRateAsync(rate, shouldCorrectPitch);
			} catch (error) {
				// Rate changing could not be performed, possibly because the client's Android API is too old.
			}
		}
	};

	_onRateSliderSlidingComplete = async value => {
		this._trySetRate(value * RATE_SCALE, this.state.shouldCorrectPitch);
	};

	_onPitchCorrectionPressed = async value => {
		this._trySetRate(this.state.rate, !this.state.shouldCorrectPitch);
	};

	_onSeekSliderValueChange = value => {
		if (this.playbackInstance != null && !this.isSeeking) {
			this.isSeeking = true;
			this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
			this.playbackInstance.pauseAsync();
		}
	};

	_onSeekSliderSlidingComplete = async value => {
		if (this.playbackInstance != null) {
			this.isSeeking = false;
			const seekPosition = value * this.state.playbackInstanceDuration;
			if (this.shouldPlayAtEndOfSeek) {
				this.playbackInstance.playFromPositionAsync(seekPosition);
			} else {
				this.playbackInstance.setPositionAsync(seekPosition);
			}
		}
	};

	_getSeekSliderPosition() {
		if (
			this.playbackInstance != null &&
			this.state.playbackInstancePosition != null &&
			this.state.playbackInstanceDuration != null
		) {
			return (
				this.state.playbackInstancePosition /
				this.state.playbackInstanceDuration
			);
		}
		return 0;
	}

	_getMMSSFromMillis(millis) {
		const totalSeconds = millis / 1000;
		const seconds = Math.floor(totalSeconds % 60);
		const minutes = Math.floor(totalSeconds / 60);

		const padWithZero = number => {
			const string = number.toString();
			if (number < 10) {
				return "0" + string;
			}
			return string;
		};
		return padWithZero(minutes) + ":" + padWithZero(seconds);
	}

	_getTimestamp() {
		if (
			this.playbackInstance != null &&
			this.state.playbackInstancePosition != null &&
			this.state.playbackInstanceDuration != null
		) {
			return `${this._getMMSSFromMillis(
				this.state.playbackInstancePosition
			)} / ${this._getMMSSFromMillis(this.state.playbackInstanceDuration)}`;
		}
		return "";
	}

	_onPosterPressed = () => {
		this.setState({ poster: !this.state.poster });
	};

	_onUseNativeControlsPressed = () => {
		this.setState({ useNativeControls: !this.state.useNativeControls });
	};

	_onFullscreenPressed = () => {
		try {
			this._video.presentFullscreenPlayer();
		} catch (error) {
			console.log(error.toString());
		}
	};

	_onSpeakerPressed = () => {
		this.setState(
			state => {
				return { throughEarpiece: !state.throughEarpiece };
			},
			({ throughEarpiece }) =>
				Audio.setAudioModeAsync({
					allowsRecordingIOS: false,
					interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
					playsInSilentModeIOS: true,
					shouldDuckAndroid: true,
					interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
					playThroughEarpieceAndroid: throughEarpiece
				})
		);
	};

	render(){
		if (this.state.isLoaded){
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
				<ScrollView style={estilos.background}
				refreshControl={
					<RefreshControl
						refreshing={this.state.refreshing}
						onRefresh={this._onRefresh}
					/>
				}>

					<View style={estilos.headerContainer}>
						<Text style={estilos.h1}>
							Contratado
						</Text>
					</View>

					<View style={estilos.bodyContainer}>
						<View style={estilos.nameContainer}>
							<Text style={[estilos.text]}>
								{this.state.playbackInstanceName}
							</Text>
						</View>
						<View style={estilos.videoContainer}>
							<Video
								ref={this._mountVideo}
								style={[
									estilos.video,
									{
										opacity: this.state.showVideo ? 1.0 : 0.0,
										width: this.state.videoWidth,
										height: this.state.videoHeight
									}
								]}
								resizeMode={Video.RESIZE_MODE_CONTAIN}
								onPlaybackStatusUpdate={this._onPlaybackStatusUpdate}
								onLoadStart={this._onLoadStart}
								onLoad={this._onLoad}
								onError={this._onError}
								onFullscreenUpdate={this._onFullscreenUpdate}
								onReadyForDisplay={this._onReadyForDisplay}
								useNativeControls={this.state.useNativeControls}
							/>
						</View>
						<View
							style={[
								estilos.playbackContainer,
								{
									opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0
								}
							]}
						>
							<Slider
								style={estilos.playbackSlider}
								trackImage={ICON_TRACK_1.module}
								thumbImage={ICON_THUMB_1.module}
								value={this._getSeekSliderPosition()}
								onValueChange={this._onSeekSliderValueChange}
								onSlidingComplete={this._onSeekSliderSlidingComplete}
								disabled={this.state.isLoading}
							/>
							<View style={estilos.timestampRow}>
								<Text
									style={[
										estilos.text,
										estilos.buffering										
									]}
								>
									{this.state.isBuffering ? BUFFERING_STRING : ""}
								</Text>
								<Text
									style={[
										estilos.text,
										estilos.timestamp
									]}
								>
									{this._getTimestamp()}
								</Text>
							</View>
						</View>
						<View
							style={[
								estilos.buttonsContainerBase,
								estilos.buttonsContainerTopRow,
								{
									opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0
								}
							]}
						>
							<TouchableHighlight
								underlayColor={BACKGROUND_COLOR}
								style={estilos.wrapper}
								onPress={this._onBackPressed}
								disabled={this.state.isLoading}
							>
								<Image style={estilos.button} source={ICON_BACK_BUTTON.module} />
							</TouchableHighlight>
							<TouchableHighlight
								underlayColor={BACKGROUND_COLOR}
								style={estilos.wrapper}
								onPress={this._onPlayPausePressed}
								disabled={this.state.isLoading}
							>
								<Image
									style={estilos.button}
									source={
										this.state.isPlaying
											? ICON_PAUSE_BUTTON.module
											: ICON_PLAY_BUTTON.module
									}
								/>
							</TouchableHighlight>
							<TouchableHighlight
								underlayColor={BACKGROUND_COLOR}
								style={estilos.wrapper}
								onPress={this._onStopPressed}
								disabled={this.state.isLoading}
							>
								<Image style={estilos.button} source={ICON_STOP_BUTTON.module} />
							</TouchableHighlight>
							<TouchableHighlight
								underlayColor={BACKGROUND_COLOR}
								style={estilos.wrapper}
								onPress={this._onForwardPressed}
								disabled={this.state.isLoading}
							>
								<Image style={estilos.button} source={ICON_FORWARD_BUTTON.module} />
							</TouchableHighlight>
						</View>
					

						<View />
					</View>
				</ScrollView>
			);
		}
	}

	openModal(info) {
		this.setState({modalVisible:true, videoInfo:info});
	}

	_onRefresh = () => {
		this.setState({refreshing:true});
		me().then(data=>{
		 this.setState({me:data,refreshing:false,courses:data.compras});
	 });
  }

};
const styles2 = StyleSheet.create({
	emptyContainer: {
		alignSelf: "stretch",
		backgroundColor: BACKGROUND_COLOR
	},
	container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		alignSelf: "stretch",
		backgroundColor: BACKGROUND_COLOR
	},
	wrapper: {},
	nameContainer: {
		height: FONT_SIZE
	},
	space: {
		height: FONT_SIZE
	},
	videoContainer: {
		height: VIDEO_CONTAINER_HEIGHT
	},
	video: {
		maxWidth: DEVICE_WIDTH
	},
	playbackContainer: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		alignSelf: "stretch",
		minHeight: ICON_THUMB_1.height * 2.0,
		maxHeight: ICON_THUMB_1.height * 2.0
	},
	playbackSlider: {
		alignSelf: "stretch"
	},
	timestampRow: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		alignSelf: "stretch",
		minHeight: FONT_SIZE
	},
	text: {
		fontSize: FONT_SIZE,
		minHeight: FONT_SIZE
	},
	buffering: {
		textAlign: "left",
		paddingLeft: 20
	},
	timestamp: {
		textAlign: "right",
		paddingRight: 20
	},
	button: {
		backgroundColor: BACKGROUND_COLOR
	},
	buttonsContainerBase: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	buttonsContainerTopRow: {
		maxHeight: ICON_PLAY_BUTTON.height,
		minWidth: DEVICE_WIDTH / 2.0,
		maxWidth: DEVICE_WIDTH / 2.0
	},
	buttonsContainerMiddleRow: {
		maxHeight: ICON_MUTED_BUTTON.height,
		alignSelf: "stretch",
		paddingRight: 20
	},
	volumeContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		minWidth: DEVICE_WIDTH / 2.0,
		maxWidth: DEVICE_WIDTH / 2.0
	},
	volumeSlider: {
		width: DEVICE_WIDTH / 2.0 - ICON_MUTED_BUTTON.width
	},
	buttonsContainerBottomRow: {
		maxHeight: ICON_THUMB_1.height,
		alignSelf: "stretch",
		paddingRight: 20,
		paddingLeft: 20
	},
	rateSlider: {
		width: DEVICE_WIDTH / 2.0
	},
	buttonsContainerTextRow: {
		maxHeight: FONT_SIZE,
		alignItems: "center",
		paddingRight: 20,
		paddingLeft: 20,
		minWidth: DEVICE_WIDTH,
		maxWidth: DEVICE_WIDTH
	}
});