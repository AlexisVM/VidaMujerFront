const React = require("react-native");
const { StyleSheet } = React;
const VMGray = '#8c8c8c';
const VMPink = '#E188AE';
import {
        widthPercentageToDP as wp,
        heightPercentageToDP as hp
      } from 'react-native-responsive-screen';

export default StyleSheet.create({
  //B  u  t  t  o  n  s
  loginButton: {
    backgroundColor: VMPink,
    borderRadius: 5,
    height: hp('5%'),
    width: wp('80%'),
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  logoutButton: {
    backgroundColor: VMPink,
    borderRadius: 5,
    height: hp('5%'),
    width: wp('80%'),
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  publishButton: {
    backgroundColor: VMPink,
    borderRadius: 5,
    height: hp('5%'),
    width: wp('80%'),
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  fotoPagoButton: {
    backgroundColor: 'transparent',
    borderColor: VMGray,
    borderWidth: 2,
    borderRadius: 5,
    height: hp('5%'),
    width: wp('80%'),
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
    justifyContent: "flex-start"
  },
  fotoExperienciaButton: {
    backgroundColor: 'transparent',
    borderColor: '#E188AE',
    borderWidth: 2,
    borderRadius: 5,
    height: hp('5%'),
    width: wp('80%'),
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
    justifyContent: "flex-start",
  },
  addCourseButton: {
    backgroundColor: VMPink,
    height: hp('7%'),
    width: wp('93%'),
  },
  postButton: {
    backgroundColor: 'transparent',
    borderRadius: hp('4%'),
    width: wp('70%'),
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: VMGray
  },
  shareButton: {
    height: hp('5%'),
    width: wp('92%'),
    marginBottom: 5,
    alignSelf: 'center',
    backgroundColor: VMPink,
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
    fontSize: hp('1.7%'),
    color: '#828282', //#c4c3cb
    fontFamily: 'sans-serif-light'
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
    fontSize: hp('4%'),
    textAlign: 'center',
    fontFamily: 'sans-serif-thin'
  },
  h2:{
    color: '#828282',
    fontWeight: 'bold',
    fontSize: hp('3%'),
    textAlign: 'center',
    fontFamily: 'sans-serif-light'
  },
  h3:{
    color: '#828282',
    fontWeight: 'bold',
    fontSize: hp('2.5%'),
    fontFamily: 'sans-serif-light',
  },
  paymentText:{
    fontWeight: 'bold',
    fontSize: hp('2.5%'),
    fontFamily: 'sans-serif-light',
    marginLeft: 10, 
    marginTop: 10,
    textAlign: 'center', 
    color: '#FFFFFF'
  },
  h4:{
    color: '#828282',
    fontWeight: 'bold',
    fontSize: hp('2%'),
    fontFamily: 'sans-serif-light'
  },
  itemName: {
    textAlign: 'center',
    fontSize: hp('3%'),
    color: '#000',
  },
  containerView: {
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
  headerContainer:{
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
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
  imageContainer:{
    margin: 5,
    alignItems: 'center',
  },
  postCards:{
    width: wp('97%'),
    borderWidth: 2,
    borderColor: VMGray,
    marginTop: 30,
    borderRadius:5,
    backgroundColor:'#FFFFFF',
    //padding: 5,
    alignSelf: 'center',
  },
  //C O N T A I N E R S
  imageBackground:{
    height: '100%', 
    width: '100%'
  }
});
