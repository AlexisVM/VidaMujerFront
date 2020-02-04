const React = require("react-native");
const { StyleSheet } = React;
import {Dimensions} from 'react-native';

import {
        widthPercentageToDP as wp,
        heightPercentageToDP as hp
      } from 'react-native-responsive-screen';

export default StyleSheet.create({
  //B  u  t  t  o  n  s
  loginButton: {
    backgroundColor: '#E188AE',
    borderRadius: 5,
    height: hp('5%'),
    width: wp('80%'),
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  courseButton: {
    backgroundColor: '#E188AE',
    height: hp('7%'),
    width: wp('96%'),
  },
  postButton: {
    backgroundColor: 'transparent',
    borderRadius: hp('3.5%'),
    height: wp('10%'),
    width: wp('70%'),
    //marginTop: 30,
    //marginBottom: 10,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#8c8c8c',
  },
  fbLoginButton: {
    borderRadius: 5,
    height: hp('5%'),
    width: wp('80%'),
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: '#3b5998',
  },
  // I  n  p  u  t  s
  formTextInput: {
    height: hp('5%'),
    width: '100%',
    fontSize: hp('2%'),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 5,
    borderWidth: 2,
  },
  formTextInput2: {
    height: hp('5%'),
    width: '100%',
    fontSize: hp('2%'),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 5,
    borderWidth: 2,
  },
  longTextContainer: {
    borderColor: 'white',
    borderWidth: 1,
    color:'white',
    padding: 10
  },
  // L  a  b  e  l  s
  hyperlinkText: {
    color: '#000000',
    fontSize: hp('2.1%'),
    textAlign: 'center',
  },
  p:{
    fontWeight: 'bold',
    fontSize: hp('2.1%'),
      color: '#828282', //#c4c3cb
  },
  subtitle_center:{
    textAlign: 'center',
    fontSize: hp('2.4%'),
    color: '#828282',
  },
  errorText:{
    color: '#FF0000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: hp('2.4%'),
  },
  h1:{
    color: '#828282',
    fontWeight: 'bold',
    fontSize: hp('6%'),
    textAlign: 'center'
  },
  h2:{
    color: '#828282',
    fontWeight: 'bold',
    fontSize: hp('4%'),
    textAlign: 'center'
  },
  h3:{
    color: '#828282',
    fontWeight: 'bold',
    fontSize: hp('3%'),
  },
  h4:{
    color: '#828282',
    fontWeight: 'bold',
    fontSize: hp('2.5%'),
  },
  itemName: {
    textAlign: 'center',
    fontSize: hp('3%'),
    color: '#000',
  },
  aboutNameText:{
    textAlign: 'center',
    //fontWeight: 'bold',
    marginTop: 20,
    fontSize: hp('2.4%'),
    color: '#828282',
  },
  aboutEmailText:{
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    fontSize: hp('2.4%'),
    color: '#828282',
  },
  bodyCardsHeader:{
    textAlign: 'center',
    //fontWeight: 'bold',
    fontSize: hp('2.3%'),
    color: '#828282',
  },
  bodyCardsContent:{
    textAlign: 'center',
    //fontWeight: 'bold',
    fontSize: hp('6%'),
    color: '#828282',
  },
  bodyCardsFooter:{
    textAlign: 'center',
    //fontWeight: 'bold',
    fontSize: hp('2.1%'),
    color: '#828282',
  },
  //C  o  n  t  a  i  n  e  r  s
  containerView: {
    flex: 1,
  },
  screenContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  lowOpacityContainer:{
    marginTop: 20,
    marginBottom: 20,
    width: wp('80%'),
    backgroundColor: '#FFFFFF45',
    borderRadius: 5,
    alignSelf: 'center',
  },
  singleTitleContainer:{
    marginTop: 125,
    marginBottom: 35,
  },
  inputFormContainer:{
    marginTop: 5,
    marginBottom: 5,
    alignSelf: 'center',
    height: hp('7%'),
    width: wp('80%'),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  errorContainer:{
    alignSelf: 'center',
    height: hp('5%'),
    width: wp('80%'),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inputContainer:{
    flex:10,
    alignSelf: 'flex-end',
  },
  iconBackgroundContainer:{
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: 5,
  },
  iconBackground:{
    alignItems: 'center',
    marginRight: 5,
  },
  background:{
    backgroundColor: '#F7F7F7',
    padding: 5,
  },
  loginBackground:{
    backgroundColor: '#FFFFFF',
  },
  logoBackground:{
    marginTop: 70,
    width: 200,
    height: 200,
    /*backgroundColor:'#fafafa',*/
    borderRadius: 400/ 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIconBackground:{
    width: 150,
    height: 150,
  },
  backgroundImage:{
    width: '100%',
    height: '100%',
  },
  headerContainer:{
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileHeaderContainer:{
    backgroundColor:'#E188AE',
    height:90,
    marginBottom:-80,
  },
  bodyContainer:{
    width: '100%',
    height: '100%',
  },
  loginContainer:{
    width: '100%',
    height: '100%',
    marginTop: 10,
    marginBottom: 10,

    alignItems: 'center',


  },
  gridView: {
    flex: 1,
  },
  touchableContainer: {
    borderRadius: 5,
    height: 130,
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
  },
  itemGridContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  iconItemGridContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textItemGridContainer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  imageIconItemGridContainer: {
    width: 65,
    height: 65,
  },
  toggleButtonRow: {
    margin: 15,
  },
  toggleContainer: {
    alignSelf: 'flex-end',
  },
  imageContainer:{
    margin: 5,
    alignItems: 'center',
  },
  bodyCardsContainer:{
    alignItems: 'center',
    margin: 20,
  },
  bodyCards:{
    width: hp('38%'),
    height: wp('38%'),
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#B1E001',
    borderRadius:10,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  bigBodyCards:{
    borderWidth: 2,
    borderColor: '#B1E001',
    margin: 30,
    borderRadius:10,
    padding: 5,
  },
  bigBodyCardsAbout:{
    width: hp('48%'),
    height: wp('48%'),
    borderWidth: 2,
    borderColor: '#B1E001',
    margin: 30,
    borderRadius:10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postCards:{
    width: wp('97%'),
    borderWidth: 2,
    borderColor: '#8c8c8c',
    marginTop: 30,
    borderRadius:10,
    backgroundColor:'#FFFFFF',
    //padding: 5,
    alignSelf: 'center',
  },
  countriesModal: {
    width: 100,
    height: 100,
  },
  //I  c  o  n  s
  fbLoginButtonIcon: {
    /* name: "facebook",
    type: 'zocial',
    size: hp('1.9%'), */
    color: "white"
  },
  /*inputIcons:{
    size: hp('1.9%'),
  },*/
  //I  m  a  g  e  s
  headerImage:{
    width: 200,
    height: 200,
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/2,
  },
  //R e p o r t s  s t y l e s
  profileImage:{
    width: 150,
    height: 150,
  },
});
