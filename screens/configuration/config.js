import React, { Component } from "react";
import styles from "./../style";
import {
        ScrollView,
        Text,
        View,
        TouchableOpacity,
        AsyncStorage,
        Image,
      } from 'react-native';
import { Icon } from 'react-native-elements';
import { FlatGrid } from 'react-native-super-grid';
import './../utils.js';

export default class HomeScreen extends Component {
  constructor(props) {
		super(props);
		this.state = {
			me: null,
			isLoading: true,
		};
  }

  static navigationOptions = {
    drawerIcon: (
        <Icon name='exit-to-app' type='material' color='#000000'/>
      )
  };

  render() {
    const items = [
      //{ name: 'ÁRBOLES',  code: '#A6D8E3', onPress: this._treesMenu,          icon:require('../assets/icons/forest.png') },
      //{ name: 'REPORTAR PROBLEMA',  code: '#A6D8E3', onPress: this._makeReport,          icon:require('../assets/icons/book.png') },
      //{ name: 'MURO',     code: '#A6D8E3', onPress: this._news,             icon:require('../assets/icons/news.png') },
      //{ name: 'EVENTOS',  code: '#A6D8E3', onPress: this._events,           icon:require('../assets/icons/calendar.png') },
      //{ name: 'COMPRAS',  code: '#A6D8E3', onPress: this._shopping,         icon:require('../assets/icons/add-cart.png')},
      //{ name: 'PREMIOS',  code: '#A6D8E3', onPress: this._rewards,          icon:require('../assets/icons/gift.png') },
      //{ name: 'COMUNIDAD',code: '#A6D8E3', onPress: this._community,        icon:require('../assets/icons/group.png') },
      //{ name: 'SOPORTE',  code: '#A6D8E3', onPress: this._support,          icon:require('../assets/icons/support.png')},
      //{ name: 'AUTORIDADES',  code: '#A6D8E3', onPress: this._authoritiesContact, icon:require('../assets/icons/forest.png') },
      { name: 'Perfil',code: '#A6D8E3', onPress: this._profile,      icon:require('../../assets/icon.png') },
      { name: 'SALIR',    code: '#F0716C', onPress: this._signOut,            icon:require('../../assets/icon.png')},
      ]; //Logout option original color --> #e67e22
      //Dan's color #B8ECD7



    return (

        <ScrollView style={styles.background}>

          <View style={styles.headerContainer}>
            <Text style={styles.h2}>
              Vuelve pronto {this.state.me?this.state.me.username:''}
            </Text>
          </View>

          <View style={styles.bodyContainer}>
            <FlatGrid
              itemDimension={330}
              items={items}
              style={styles.gridView}
              // staticDimension={300}
              // fixed
              // spacing={20}
              renderItem={({ item, index }) => (
                <TouchableOpacity style={[styles.touchableContainer, { backgroundColor: item.code }]} onPress={item.onPress}>

                  <View style={styles.itemGridContainer}>
                    <View style={styles.iconItemGridContainer}>
                      <Image
                        source={item.icon}
                        style={styles.imageIconItemGridContainer}
                      />
                    </View>
                    <View style={styles.textItemGridContainer}>
                      <Text style={styles.itemName}>
                        {item.name}
                      </Text>
                    </View>
                  </View>

                </TouchableOpacity>
              )}
            />
          </View>

        </ScrollView>

    );
  }

  async componentDidMount() {
	   me().then(data=>{
      this.setState({me:data,isLoading:false});
    });
    //this.props.navigation.navigate('Auth');

  }
  componentWillUnmount() {
  }

  _profile = () => {
    this.props.navigation.navigate('Perfil');
  };

  _makeReport = () => {
    this.props.navigation.navigate('MakeReport');
  };

  _about = () => {
    this.props.navigation.navigate('About');
  };

  _treesMenu = () => {
    this.props.navigation.navigate('TreesMenu');
  };

  _qrScannerMenu = () => {
    this.props.navigation.navigate('QrScannerMenu');
  };

  _news = () => {
    this.props.navigation.navigate('News');
  };

  _events = () => {
    this.props.navigation.navigate('Events');
  };

  _shopping = () => {
    this.props.navigation.navigate('Shopping');
  };

  _rewards = () => {
    this.props.navigation.navigate('Rewards');
  };

  _community = () => {
    this.props.navigation.navigate('Community');
  };

  _settings = () => {
    this.props.navigation.navigate('Settings');
  };

  _support = () => {
    this.props.navigation.navigate('SupportMenu');
  };

  _authoritiesContact = () => {
    this.props.navigation.navigate('AuthoritiesContact');
  };

  _signOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}
