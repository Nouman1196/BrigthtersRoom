import React, { useState } from 'react';
import { View, Text, StatusBar, Dimensions, SafeAreaView, ImageBackground, StyleSheet, Platform, KeyboardAvoidingView, Keyboard } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FastImage from 'react-native-fast-image';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-simple-toast';
import { useDispatch } from 'react-redux';
import { GraphRequest, GraphRequestManager } from "react-native-fbsdk-next";
import { FormInput } from '../../components/FormInput';
import Color from '../../theme/color';
import { Btn } from '../../components/btn';
import Theme from '../../theme/theme';
import { loginValidation } from '../../utilies/validation';
import { LoginApi, SocialLogin } from '../../utilies/api/apiController'
import { save_data } from "../../utilies/AsyncStorage/AsyncStorage";
import Loader from '../../components/Loader';
import { SocialBtn } from '../../components/SocialButton';
import { onFacebookButtonPress as FbLogin } from "../../utilies/FbLogin";
import GoogleLogin from "../../utilies/GoogleLogin";
import { Cred } from '../../constants/DoorKeeper';
import { getAllGrades } from '../../utilies/api/apiCalls';
import { onPressAppleLogin } from '../../utilies/appleSignup/appleSignup';
import BG from '../../assets/finalAuthBackground.png'


const Login = ({ navigation }) => {

  const dispatch = useDispatch()

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [secure, setSecure] = useState(true)

  const { height, width } = Dimensions.get('window')

  const onFacebookButtonPress = async () => {
    try {
      let resp = await FbLogin();
      let uniqueID = await DeviceInfo.getUniqueId()
      let authToken = resp.response.accessToken
      if (!resp.error) {
        const infoRequest = new GraphRequest(
          '/me',
          {
            accessToken: resp.response.accessToken,
            parameters: {
              fields: {
                string: 'email,name,first_name,middle_name,last_name'
              }
            }
          },
          (error, user) => { responseInfoCallback(error, user) }
        );

        new GraphRequestManager().addRequest(infoRequest).start()
        const responseInfoCallback = async (error, result) => {
          if (error) {
            alert('Error fetching data: ' + error.toString());
          } else {
            setLoading(true)
            let params = {
              client_id: Cred.clientId,
              client_secret: Cred.clientSecret,
              grant_type: 'assertion',
              assertion: authToken,
              provider: 'facebook',
              email: result?.email,
              device_token: uniqueID
            }

            await social(params)
          }
        }
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error);
    }

  };

  const onGoogleButtonPress = async () => {

    setLoading(true);
    let uniqueID = await DeviceInfo.getUniqueId()
    let response = await GoogleLogin();

    if (!response.error) {
      let params = {
        client_id: Cred.clientId,
        client_secret: Cred.clientSecret,
        grant_type: 'assertion',
        assertion: response?.response,
        provider: 'google',
        device_token: uniqueID
      }
      await social(params)
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const onAppleButtonPress = async () => {

    let response = await onPressAppleLogin()
    let uniqueID = await DeviceInfo.getUniqueId()

    if (!response.error) {
      let user = response?.response
      setLoading(true)
      let params = {
        grant_type: "assertion",
        provider: "apple",
        client_id: Cred.clientId,
        client_secret: Cred.clientSecret,
        device_token: uniqueID,
        first_name: user?.fullName?.givenName,
        last_name: user?.fullName?.familyName,
        email: user?.email,
        authorization_code: user?.authorizationCode,
        identityToken: user?.identityToken,
        nonce: user?.nonce,
        user: user?.user
      }

      await social(params)
      setLoading(false)
    }

  }

  const social = async (params) => {
    let user = ''
    let resp = await SocialLogin({ user, navigation, params }) // Same Route
    if (resp?.status == 200) {
      await save_data('@user_data', resp.data)
      getAllGrades({ navigation, dispatch })
      setTimeout(() => {
        Toast.show('Login successfully', Toast.SHORT)
      }, 150)
      navigation.replace('Home')
    }
    else {
      let error = resp?.response?.data?.error?.toString()
      setTimeout(() => {
        Toast.show(error ? error : "Something Went wrong", Toast.LONG)
      }, 800)
    }
  }


  const checkErrors = (emailField, passwordField) => {

    let selectEmail = emailField ? emailField : email
    let selectPass = passwordField ? passwordField : password

    let validate = loginValidation({ email: selectEmail, password: selectPass })
    if (validate.valid == false) {
      setErrortext(validate.errors);
    } else {
      setErrortext('');
    }

  }

  const submit = async () => {

    Keyboard.dismiss()

    let validate = loginValidation({ email, password })
    if (validate.valid == false) {
      setErrortext(validate.errors);
    } else {
      setErrortext('');
      setLoading(true)
      let uniqueID = await DeviceInfo.getUniqueId()
      let user = ''

      let params = {
        client_id: Cred.clientId,
        client_secret: Cred.clientSecret,
        password: password,
        email: email,
        grant_type: 'password',
        device_token: uniqueID
      }

      let resp = await LoginApi(user, navigation, params)
      if (resp.status == 200) {
        await save_data('@user_data', resp.data)
        getAllGrades({ navigation, dispatch })
        setTimeout(() => {
          Toast.show('Login successfully', Toast.SHORT)
        }, 150)
        setLoading(false)
        navigation.replace('Home')

      } else {
        let error = resp?.response?.data?.error?.toString()
        setTimeout(() => {
          Toast.showWithGravity(error ? error : "Something Went wrong", Toast.LONG, Toast.BOTTOM);
        }, 800);
      }

      setLoading(false)
    }
  }


  return (
    <FastImage resizeMode='stretch' style={{ height: height, width: width }} source={BG}>
      <SafeAreaView style={styles.container}>
        <Loader animating={loading} />
        <StatusBar barStyle={'dark-content'} backgroundColor={Color.headerColor} />

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={[Theme.loginMainContainer]}>
            <View style={Theme.AuthContainer}>
              <Text style={Theme.heading}>Login</Text>

              <FormInput
                placeholder="Enter Your Email"
                onChangeText={(data) => { setemail(data), checkErrors(data, false) }}
                textInputContainerStyle={Theme.InputView}
                iconColor="black"
                predefineTextStyle={Theme.inputLabel}
                style={Theme.TextInputStyle}
                containerStyle={{ marginTop: '5%' }}
                placeholderTextColor={Color.AuthInputsPlaceholder}
                value={email}
                onContentSizeChange={() => checkErrors()}
                error={errortext === 'Email format is invalid' ? 'Email format is invalid' : null}
              />

              <FormInput
                placeholder="Password"
                onPressIcon={() => { setSecure(!secure) }}
                onChangeText={(data) => { setpassword(data), checkErrors(false, data) }}
                textInputContainerStyle={Theme.InputView}
                iconColor="#8B8B8B"
                RightIconFamily={Entypo}
                secureTextEntry={secure}
                rightIconName={secure ? "eye-with-line" : "eye"}
                predefineTextStyle={Theme.inputLabel}
                style={Theme.TextInputStyle}
                placeholderTextColor={Color.AuthInputsPlaceholder}
                value={password}
                onContentSizeChange={() => checkErrors()}
              />

              <Btn
                disabled={(email != '' && password != '' && errortext == '') ? false : true}
                onPress={() => submit()}
                text="Continue"
                containerStyle={[Theme.btnStyle, (email != '' && password != '' && errortext == '') && { backgroundColor: Color.headerColor }]}
                textStyle={Theme.btnTextstyle}
              />

              <Text onPress={() => navigation.navigate('SignUp')} style={styles.SignUpText}>Sign Up</Text>
              {/* <View style={Theme.SocialSepratorLine}>
                <Text style={Theme.SocialSepratorText}>Or Sign up with</Text>
              </View>

              <SocialBtn onPress={onFacebookButtonPress} iconLib={Fontisto} iconColor={'white'} iconSize={20} iconName={'facebook'} text={'Continue with Facebook'} textStyle={Theme.SocialBtnTextstyle} containerStyle={[Theme.socialBtnStyle, { backgroundColor: '#00549A' }]} />
              {Platform.OS == "android" ?
                <SocialBtn onPress={onGoogleButtonPress} iconLib={Fontisto} iconColor={'white'} iconSize={20} iconName={'google'} text={'Continue with Google'} textStyle={Theme.SocialBtnTextstyle} containerStyle={[Theme.socialBtnStyle, { backgroundColor: '#D63504', marginTop: '8%' }]} />
                :
                <SocialBtn iconLib={Fontisto} iconColor={Color.white} iconSize={20} iconName={'apple'} onPress={onAppleButtonPress} text={'Continue with Apple'} textStyle={Theme.SocialBtnTextstyle} containerStyle={[Theme.socialBtnStyle, { backgroundColor: Color.black }]} />
              } */}
            </View>
          </View>
        </KeyboardAvoidingView>

      </SafeAreaView>
    </FastImage>

  );
};

const styles = StyleSheet.create({

  SignUpText: {
    textAlign: 'right',
    color: '#00549A',
    fontWeight: '600',
    marginTop: 5
  },
  container: {
    flex: 1
  }

})



export default Login;
