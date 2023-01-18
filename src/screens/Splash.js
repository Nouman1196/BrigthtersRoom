import React, { useEffect, useRef } from 'react'
import { View, SafeAreaView, Image, Animated, Text, StyleSheet, StatusBar } from 'react-native'
import Theme from '../theme/theme';
import { SunIcon, SpStar } from '../assets/svgIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { get_data, save_data } from "../utilies/AsyncStorage/AsyncStorage";
import { check_expiry } from '../utilies/api/check_token_expiry';
import { useDispatch } from 'react-redux'
import { getAllGrades } from '../utilies/api/apiCalls';
import Color from '../theme/color';
import { setTopBanner, setUserData } from '../redux/MainSlice';

const Splash = ({ navigation }) => {

    const dispatch = useDispatch()

    const translation = useRef(new Animated.Value(0)).current;
    const translationLogo = useRef(new Animated.Value(0)).current;

    const startAnimate = () => {

        Animated.timing(translationLogo, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true
        }).start();

        Animated.timing(translation, {
            toValue: 40,
            duration: 1000,
            useNativeDriver: true
        }).start(() => {
            Animated.timing(translation, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true
            }).start(() => {
                startAnimate()
            })
        });



    };

    const navigateTo = (screen) => {

        setTimeout(() => {
            navigation.replace(screen)
        }, 2000)

    }

    const removeUser = async () => {
        getAllGrades({ navigation, dispatch })
        await save_data('@user_data', null)
        dispatch(setUserData(''))
        navigateTo('Home')
    }

    const checkToken = async () => {

        let user_data = await get_data('@user_data')

        if (user_data !== null && user_data !== "") {

            try {

                let resp = await check_expiry(navigation)

                if (resp.error == false) {

                    navigateTo('Home')
                    getAllGrades({ navigation, dispatch })

                } else {
                    removeUser()
                }

            } catch (error) {
                removeUser()
            }

        } else {
            getAllGrades({ navigation, dispatch })
            navigateTo('Home')
        }

    };

    useEffect(() => {

        startAnimate()
        checkToken()


    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle={'dark-content'} backgroundColor={Color.headerColor} />
            <Animated.View style={{ transform: [{ translateY: translation }] }}>
                <SunIcon style={styles.sunIcon} width={hp('40%')} height={hp('40%')} />
            </Animated.View>
            <View style={styles.middleCOntainer}>
                <Image style={styles.WavesStyle} resizeMode='stretch' source={require('../assets/splashmid.png')} />
            </View>

            <Animated.Image style={[Theme.gif, { position: 'absolute', top: '47%', transform: [{ scale: translationLogo }] }]} resizeMode='contain' source={require('../assets/Brightersroom.png')} />

            <SpStar style={[styles.positionAb, { left: '20%', top: '3%' }]} width={25} height={25} />
            <SpStar style={[styles.positionAb, { left: '10%', top: '15%' }]} width={38} height={38} />
            <SpStar style={[styles.positionAb, { left: '50%', top: '27%' }]} width={38} height={38} />
            <SpStar style={[styles.positionAb, { left: '88%', top: '35%' }]} width={25} height={25} />
            <Image style={styles.splashBottom} resizeMode='stretch' source={require('../assets/splashBottom.png')} />
            <View style={styles.bottomWaterMark}>
                <Text style={styles.poweredBy}>Powered By: </Text>
                <Image style={styles.waterMarkImage} source={require('../assets/splashBottomLogo.png')} />
            </View>
        </SafeAreaView>
    )

};


const styles = StyleSheet.create({
    middleCOntainer: { width: '100%', height: '47%', position: 'absolute', top: hp('27%') },
    WavesStyle: { flex: 1, height: null, width: null },
    sunIcon: { position: 'absolute', right: -70, top: -100 },
    logoAnimationstyle: { position: 'absolute', top: '47%', alignSelf: 'center' },
    splashBottom: { position: 'absolute', bottom: 40, height: hp('20%'), width: wp('100%') },
    bottomWaterMark: { position: 'absolute', bottom: 10, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    poweredBy: { alignSelf: 'center', color: 'black', fontSize: 12 },
    waterMarkImage: [{ width: 114, height: 15 }],
    positionAb: { position: 'absolute' }
});

export default Splash;
