import React from 'react';
//Styles
import { Button, Icon } from 'react-native-elements';
import { Container, Content, Header, Body } from 'native-base';
import { StyleSheet, Image, Text, View, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
//Navigation
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { DrawerActions, createDrawerNavigator, DrawerItems, } from 'react-navigation-drawer';
import { createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation-tabs';
//screens
import ExperiencesScreen from './screens/social/experiences.js';
import TipsScreen from './screens/social/tips.js';
import MedicinesScreen from './screens/medicines/medicines.js';
import ConfigScreen from './screens/configuration/config.js';
import MyCoursesScreen from './screens/courses/myCourses.js';
import LoginScreen from './screens/auth/login.js';
import AuthLoadingScreen from './screens/auth/authLoading.js';


const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
  },
});
const SocialTopNavigator = createMaterialTopTabNavigator({
  Experiencias:{
    screen: ExperiencesScreen,
    navigationOptions: {
            tabBarIcon:({ tintColor }) => (
                <Icon name='supervisor-account' type='material' color={tintColor} size={30}/>
            ),
            tintColor: '#517fa4',
        }
  },
  Tips:{
    screen: TipsScreen,
    navigationOptions: {
            tabBarIcon:({ tintColor }) => (
              <Icon name='stars' type='material' color={tintColor} size={25}/>
            )
    }
  },
},{
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    style: {
      backgroundColor: '#E2ACC3',
    },
  },
  navigationOptions: ({ navigation }) => {
    return ({
        headerStyle: {
          backgroundColor: '#E188AE',
        },
        headerTintColor: '#FFFFFF',
        title: navigation.state.routes[navigation.state.index].routeName,
    })
  }
});
const CustomMenuComponent = (props) =>(

  <Container>
    <Content>
      <DrawerItems {...props} />
    </Content>
  </Container>
)
const HomeSideNavigation = createDrawerNavigator({
  Inicio: {
    screen: SocialTopNavigator,
    navigationOptions: {
      drawerLabel: 'Inicio',

      title: 'Inicio',
      drawerIcon: (
        <Icon name='home' type='material' color='#000000' />
      )
    }
  },
  Medicinas: {
    screen: MedicinesScreen,
    navigationOptions: {
      drawerIcon: (
        <Icon name='healing' type='material' color='#000000' />
      ),
    }
  },
  Ajustes: {
    screen: ConfigScreen,
    navigationOptions: {
      drawerLabel: 'Ajustes',
      title: 'Ajustes',
      drawerIcon: (
        <Icon name='settings-applications' type='material' color='#000000' />
      )
    }
  },
  Cursos: {
    screen: MyCoursesScreen,
    navigationOptions: {
      drawerLabel: 'Mis cursos',
      title: 'Mis cursos',
      drawerIcon: (
        <Icon name='dashboard' type='material' color='#000000' />
      )
    }
  },



},{
  contentComponent: CustomMenuComponent,
  navigationOptions: ({ navigation }) => {
    return ({
        headerLeft: () => <View style={{marginLeft:10}}>
                            <TouchableOpacity>
                              <Icon name='menu' type='material' color='#E188AE'onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()) }}/>
                            </TouchableOpacity>
                          </View>,
        headerStyle: {
          backgroundColor: 'transparent',
          height:60,
        },
        headerTintColor: '#FFFFFF',

        title: /*navigation.state.routes[navigation.state.index].routeName*/'',
    })
  }
});
const AppStack = createStackNavigator({
  Home: HomeSideNavigation,
  Social: SocialTopNavigator,
});

export default createAppContainer(
  createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    App: AppStack,
    },{
      initialRouteName: 'App',
  })
);
