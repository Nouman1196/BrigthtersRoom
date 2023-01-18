import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, StatusBar, Platform, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import FastImage from "react-native-fast-image";
import { InstructionCheck, NavBackArrow } from "../../assets/svgIcons";
import { Btn } from "../../components/btn";
import { SocialBtn } from "../../components/SocialButton";
import Color from "../../theme/color";
import Theme from "../../theme/theme";
import Fontisto from 'react-native-vector-icons/Fontisto'
import { GraphRequest, GraphRequestManager } from "react-native-fbsdk-next";
import { onFacebookButtonPress as FbLogin } from "../../utilies/FbLogin";
import { onPressAppleLogin } from "../../utilies/appleSignup/appleSignup";
import GoogleLogin from "../../utilies/GoogleLogin";
import { Cred } from '../../constants/DoorKeeper';
import { SocialLogin } from "../../utilies/api/apiController";
import { save_data } from "../../utilies/AsyncStorage/AsyncStorage";
import { getAllGrades } from "../../utilies/api/apiCalls";
import { useDispatch } from "react-redux";
import Toast from 'react-native-simple-toast'
import DeviceInfo from 'react-native-device-info';
import Loader from "../../components/Loader";


const Sign_up_instruction = ({ navigation }) => {

    const { height, width } = Dimensions.get('window')
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false);

    const Details = [
        "Syncing of data access devices.",
        "Never Lose your data (Bookmarks + Notes) even if changing your device.",
        "Contact Brighters Room through Whatsapp for support and marketing.",
        "Seemless experience through app."
    ]

    const goBack = () => {
        navigation.goBack()
    }
    const social = async (params) => {

        try {
            setLoading(true)
            let user = ''
            let resp = await SocialLogin({ user, navigation, params }) // Same Route
            if (resp?.status == 200) {
                await save_data('@user_data', resp.data)
                getAllGrades({ navigation, dispatch })
                setTimeout(() => {
                    Toast.show('Login successfully', Toast.SHORT)
                    navigation.replace('Home')
                }, 150)
            }
            else {
                let error = resp?.response?.data?.error?.toString()
                setTimeout(() => {
                    Toast.show(error ? error : "Something Went wrong", Toast.SHORT)
                }, 150)
            }
            setLoading(false)
        } catch (error) {
            console.log(error, "error");
        }

    }
    const onGoogleButtonPress = async () => {

        let response = await GoogleLogin();
        let uniqueID = await DeviceInfo.getUniqueId()

        if (!response.error) {
            let params = {
                client_id: Cred.clientId,
                client_secret: Cred.clientSecret,
                grant_type: 'assertion',
                assertion: response?.response,
                provider: 'google',
                device_token: uniqueID
            }
            social(params)
        }
    };

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
                const responseInfoCallback = (error, result) => {
                    if (error) {
                        alert('Error fetching data: ' + error.toString());
                    } else {

                        let params = {
                            client_id: Cred.clientId,
                            client_secret: Cred.clientSecret,
                            grant_type: 'assertion',
                            assertion: authToken,
                            provider: 'facebook',
                            email: result?.email,
                            device_token: uniqueID
                        }
                        social(params)
                    }
                }
            }

        } catch (error) {

            console.log(error);
        }

    };

    const onAppleButtonPress = async () => {

        let response = await onPressAppleLogin()
        let uniqueID = await DeviceInfo.getUniqueId()

        if (!response.error) {
            let user = response?.response

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
                identity_token: user?.identityToken,
                nonce: user?.nonce,
                user: user?.user
            }
            // console.log("paramsssss", params);
            social(params)

        }

    }

    return (
        <SafeAreaView style={Theme.whiteContainer}>
            <Loader animating={loading} />
            <StatusBar barStyle={'dark-content'} backgroundColor={Color.headerColor} />
            <FastImage resizeMode='cover' style={{ height: height, width: width, marginTop: 25, paddingHorizontal: 20 }} source={require('../../assets/loginInstructions.png')}>
                <View style={styles.topContainer}>
                    <TouchableOpacity onPress={goBack}>
                        <NavBackArrow />
                    </TouchableOpacity>
                    <Text onPress={goBack} style={styles.skip}>Skip</Text>
                </View>
                <View style={styles.container}>
                    <ScrollView style={{ flexGrow: 0 }}>
                        <Text style={styles.Heading}>Login and Avail</Text>
                        {Details.map((item, index) => (
                            <View key={index} style={styles.Instructions}>
                                <InstructionCheck />
                                <Text style={styles.title}>{item}</Text>
                            </View>
                        ))}

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Btn
                                text="Login"
                                containerStyle={styles.btn}
                                textStyle={styles.btnText}
                                onPress={() => {
                                    navigation.navigate('login')
                                }}
                            />

                            <Btn
                                text="Sign Up"
                                containerStyle={styles.btn}
                                textStyle={styles.btnText}
                                onPress={() => {
                                    navigation.navigate('SignUp')
                                }}
                            />
                        </View>

                        {/* <View style={styles.seprator}>
                            <Text style={styles.sepratorLine}>Or Sign up with</Text>
                        </View>

                        <SocialBtn newDesign iconLib={Fontisto} iconColor={'#00549A'} iconSize={20} iconName={'facebook'} onPress={onFacebookButtonPress} text={'Continue with Facebook'} iconContainer={{ backgroundColor: Color.white, borderRadius: 0 }} textStyle={[Theme.SocialBtnTextstyle, { borderLeftWidth: 0 }]} containerStyle={[styles.socialBtn, { backgroundColor: '#00549A' }]} />
                        {Platform.OS == 'ios' ?
                            <SocialBtn newDesign iconLib={Fontisto} iconColor={Color.black} iconSize={20} iconName={'apple'} onPress={onAppleButtonPress} text={'Continue with Apple'} iconContainer={{ backgroundColor: Color.white, borderRadius: 0 }} textStyle={[Theme.SocialBtnTextstyle, { borderLeftWidth: 0 }]} containerStyle={[styles.socialBtn, { backgroundColor: Color.black }]} />
                            :
                            <SocialBtn newDesign iconLib={Fontisto} iconColor={'#D63504'} iconSize={20} iconName={'google'} onPress={onGoogleButtonPress} text={'Continue with Google'} iconContainer={{ backgroundColor: Color.white, borderRadius: 0 }} textStyle={[Theme.SocialBtnTextstyle, { borderLeftWidth: 0 }]} containerStyle={styles.socialBtn} />
                        } */}
                        <Text style={styles.bottomText}>By login you agree to <Text style={styles.decorationLine}>Privacy Policy</Text> and <Text style={styles.decoration}>Terms Of Use</Text></Text>


                    </ScrollView>
                </View>
            </FastImage>
        </SafeAreaView>
    )

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        marginTop: '10%'
    },
    Instructions: {
        marginTop: 24,
        flexDirection: 'row',
        alignItems: 'center',
    },
    Heading: {
        fontFamily: 'Gilroy-Extrabold',
        fontSize: 28,
        color: '#00549A',
        fontWeight: 'bold',
    },
    title: {
        fontSize: 16,
        color: '#00549A',
        marginLeft: 14,
        fontFamily: 'Gilroy-Light',
        width: '90%'
    },
    btn: {
        ...Theme.btnStyle,
        width: '44%',
        backgroundColor: '#2991E5',
        height: 45,
        borderColor: '#2991E5',
        marginHorizontal: 3
    },
    btnText: {
        ...Theme.btnTextstyle,
        fontFamily: 'Gilroy-ExtraBold',
        fontSize: 18,

    },
    seprator: {
        ...Theme.SocialSepratorLine,
        marginTop: 0,
        width: '100%',
        alignSelf: 'center'
    },
    sepratorLine: {
        ...Theme.SocialSepratorText,
        width: '50%',
        fontFamily: 'Gilroy-ExtraBold',
        fontSize: 17,
        color: '#000000'
    },
    socialBtn: {
        ...Theme.socialBtnStyle,
        backgroundColor: '#D63504',
        marginTop: 20,
        height: 49,
        width: '98%',
        alignSelf: 'center'
    },
    bottomText: {
        width: '90%',
        alignSelf: 'center',
        fontFamily: 'Gilroy-Light',
        color: '#00549A',
        fontSize: 15,
        marginTop: 12,
        marginHorizontal: 74
    },
    decoration: {
        fontFamily: 'Gilroy-ExtraBold'
    },
    decorationLine: {
        fontFamily: 'Gilroy-ExtraBold',
        textDecorationLine: 'underline'
    },
    skip: {
        // marginRight: 21,
        fontSize: 30,
        fontFamily: 'Gilroy-ExtraBold',
        color: '#2991E5'
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }

})

export default Sign_up_instruction;