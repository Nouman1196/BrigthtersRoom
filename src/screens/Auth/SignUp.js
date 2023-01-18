import React, { useState } from 'react';
import { View, Text, StatusBar, Dimensions, SafeAreaView, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import Toast from 'react-native-simple-toast';
import Color from '../../theme/color';
import { Btn } from '../../components/btn';
import Theme from '../../theme/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import { FormInput } from '../../components/FormInput';
import { loginValidation, Signup_validation } from '../../utilies/validation';
import { SignUpApi, } from '../../utilies/api/apiController'
import { save_data, } from "../../utilies/AsyncStorage/AsyncStorage";
import Loader from '../../components/Loader';
import { Cred } from '../../constants/DoorKeeper'
import FastImage from 'react-native-fast-image';
import { getAllGrades } from '../../utilies/api/apiCalls';
import { useDispatch } from 'react-redux';
import { NavBackArrow } from '../../assets/svgIcons';
import DeviceInfo from 'react-native-device-info';
import BG from '../../assets/finalAuthBackground.png'


const SignUp = ({ navigation }) => {

  const dispatch = useDispatch()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [secure, setSecure] = useState(true)

  const { height, width } = Dimensions.get('window')


  const checkErrors = (emailField, passwordField, fistNameField, lastNameField) => {

    let selectEmail = emailField ? emailField : email
    let selectPass = passwordField ? passwordField : password
    let selectFirst = fistNameField ? fistNameField : firstName
    let selectLast = lastNameField ? lastNameField : lastName

    let validate = Signup_validation({ email: selectEmail, password: selectPass, firstName: selectFirst, lastName: selectLast })
    if (validate.valid == false) {
      setErrortext(validate.errors);
    } else {
      setErrortext('');
    }

  }

  const submit = async () => {

    let uniqueID = await DeviceInfo.getUniqueId()

    let validate = Signup_validation({ email, password, firstName, lastName })
    if (validate.valid == false) {
      setErrortext(validate.errors);
    } else {
      setErrortext('');
      setLoading(true)

      let user = ''

      let params = {
        password: password,
        email: email,
        client_id: Cred.clientId,
        device_token: uniqueID,
        first_name: firstName,
        last_name: lastName
      }

      let resp = await SignUpApi(user, navigation, params)

      if (resp.status == 200) {

        await save_data('@user_data', resp.data)
        getAllGrades({ navigation, dispatch })
        setTimeout(() => {
          Toast.show('Login successfully', Toast.SHORT)
        }, 150)
        setLoading(false)
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }]
        })


      } else {

        if (resp?.response?.status == 403) {
          setTimeout(() => {
            Toast.showWithGravity("Email is already Taken", Toast.LONG, Toast.BOTTOM);
          }, 800);
        }

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

              <TouchableOpacity onPress={() => {
                navigation.goBack()
              }}
                style={{ position: 'absolute', top: 20, left: -10 }}
              >
                <NavBackArrow />
              </TouchableOpacity>
              <Text style={Theme.heading}>Sign Up</Text>

              <FormInput
                placeholder="Enter First Name"
                onChangeText={(data) => { setFirstName(data), checkErrors(false, false, data, false) }}
                textInputContainerStyle={Theme.InputView}
                iconColor="black"
                predefineTextStyle={Theme.inputLabel}
                style={Theme.TextInputStyle}
                placeholderTextColor={Color.AuthInputsPlaceholder}
                value={firstName}
                onContentSizeChange={() => checkErrors()}
                error={errortext === 'First Name is Required' ? 'First Name is Required' : null}
              />

              <FormInput
                placeholder="Enter Last Name"
                onChangeText={(data) => { setLastName(data), checkErrors(false, false, false, data) }}
                textInputContainerStyle={Theme.InputView}
                iconColor="black"
                predefineTextStyle={Theme.inputLabel}
                style={Theme.TextInputStyle}
                placeholderTextColor={Color.AuthInputsPlaceholder}
                value={lastName}
                onContentSizeChange={() => checkErrors()}
                error={errortext === 'Last Name is Required' ? 'Last Name is Required' : null}
              />

              <FormInput
                placeholder="Enter Your Email"
                onChangeText={(data) => { setemail(data), checkErrors(data, false) }}
                textInputContainerStyle={Theme.InputView}
                iconColor="black"
                predefineTextStyle={Theme.inputLabel}
                style={Theme.TextInputStyle}
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
                error={errortext === 'Password is too short (minimum is 6 characters)' ? 'Password is too short (minimum is 6 characters)' : null}
              />

              <Btn
                disabled={(email != '' && password != '' && errortext == '') ? false : true}
                onPress={() => submit()}
                text="Continue"
                containerStyle={[Theme.btnStyle, (email != '' && password != '' && errortext == '') && { backgroundColor: Color.headerColor }]}
                textStyle={Theme.btnTextstyle}
              />

            </View>
          </View>
        </KeyboardAvoidingView>

      </SafeAreaView>
    </FastImage>

  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1
  },
  SignUpText: {
    textAlign: 'right',
    color: '#00549A',
    fontWeight: '600',
    marginTop: 5
  },

})



export default SignUp;
