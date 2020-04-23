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
import ExperiencesScreen    from './screens/social/experiences.js';
import TipsScreen           from './screens/social/tips.js';
import PostExperienceScreen from './screens/social/postExperience.js';
import MyCoursesScreen      from './screens/courses/myCourses.js';
import AddCourseScreen      from './screens/courses/addCourse.js';
import PaymentsScreen       from './screens/courses/payments.js';
import MedicinesScreen      from './screens/medicines/medicines.js';
import ConfigScreen         from './screens/configuration/config.js';
import LoginScreen          from './screens/auth/login.js';
import AuthLoadingScreen    from './screens/auth/authLoading.js';
import SignUpScreen         from './screens/auth/signup.js';
import ProfileScreen        from './screens/profile/profile.js';



const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: {
      title: '',
      headerStyle: {
        backgroundColor: 'transparent',
        height:60,
      },
        headerTintColor: '#E188AE',
    },
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
              <Icon name='light-bulb' type='octicon' color={tintColor} size={25}/>
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
const CoursesBottomNavigator = createBottomTabNavigator({
  Paquetes: {
    screen: AddCourseScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name='plus' type='font-awesome' color={tintColor} size={25} />
      ),

    }
  },
  Cursos:{
    screen: MyCoursesScreen,
    navigationOptions: {
            tabBarIcon:({ tintColor }) => (
              <Icon name='video-library' type='material' color={tintColor} size={25}/>
            )
    }
  },
  Pagos:{
    screen: PaymentsScreen,
    navigationOptions: {
            tabBarIcon:({ tintColor }) => (
              <Icon name='attach-money' type='material' color={tintColor} size={25}/>
            )
    }
  },
},{
  tabBarOptions: {
    showIcon: true,
    activeTintColor: '#FFFFFF',
    labelStyle: {
      fontSize: 12,
    },
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
        <Icon name='medkit' type='font-awesome' color='#000000' />
      ),
    }
  },
  Perfil: {
    screen: ProfileScreen,
    navigationOptions: {
      drawerLabel: 'Perfil',
      title: 'Perfil',
      drawerIcon: (
        <Icon name='account-circle' type='material' color='#000000' />
      )
    }
  },
  Cursos: {
    screen: CoursesBottomNavigator,
    navigationOptions: {
      drawerLabel: 'Mis cursos',
      title: 'Mis cursos',
      drawerIcon: (
        <Icon name='library-books' type='material' color='#000000' />
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
  Perfil: ProfileScreen,
  newExperience: PostExperienceScreen,
});

export default createAppContainer(
  createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    App: AppStack,
    },{
      initialRouteName: 'AuthLoading',
  })
);
