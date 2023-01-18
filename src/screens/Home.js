import React, { useEffect } from "react";
import { SafeAreaView, StatusBar, View, FlatList, StyleSheet, TouchableOpacity, Platform, AppState } from "react-native";
import Color from "../theme/color";
import { HomeListBtn } from "../components/HomeButton";
import Theme from "../theme/theme";
import { useDispatch, useSelector } from 'react-redux'
import FastImage from "react-native-fast-image";
import { NavSound } from "../components/Helpers/NavSound";
import { DisableSound, DrawerMenu, SoundEnable } from "../assets/svgIcons";
import { HeaderMenu } from "../components/Helpers/Header";
import { setAppMusic, setTopBanner } from "../redux/MainSlice";
import Sound from "react-native-sound";
import dingSound from '../assets/Sounds/BRBackground.mp3'

let BackgroundMusic = new Sound(dingSound, (error) => {

    BackgroundMusic.setVolume(0.2)
    BackgroundMusic.setNumberOfLoops(-1)

    if (error) {
        console.log('failed to load the sound', error);
        return;
    }

})

const Home = ({ navigation }) => {

    const dispatch = useDispatch()

    const GradesData = useSelector(state => state.main.grades)
    const AppMusic = useSelector(state => state.main.appMusic)

    React.useLayoutEffect(() => {
        navigation.setOptions({
            header: () => (
                <HeaderMenu title={'Kids'} left={HeaderLeft()} right={HeaderRight()} />
            ),
        });
    }, [navigation, AppMusic]);

    const goToScreen = async (item) => {

        AppMusic && NavSound()
        navigation.navigate('Subjects', { title: item.title, grade: item?.id, cover: item?.cover_image_url, bgMusic: item?.background_music_url })

    }

    const enableDisableSound = () => {
        dispatch(setAppMusic(!AppMusic))
    }

    const renderHeader = () => (
        <FastImage resizeMode={"cover"} source={require('../assets/GradeImg.png')} style={Theme.HomeScreenTopImage} />
    )

    const HeaderRight = () => (
        <View style={styles.topRightHeaeder}>
            <TouchableOpacity activeOpacity={0.5} onPress={enableDisableSound}>
                {AppMusic ? <SoundEnable /> : <DisableSound />}
            </TouchableOpacity>
        </View>
    )

    const HeaderLeft = () => (
        <TouchableOpacity style={{marginLeft: 21,width:25}} activeOpacity={0.5} onPress={() => { navigation.toggleDrawer() }}>
            <DrawerMenu />
        </TouchableOpacity>
    )

    useEffect(() => {
        dispatch(setTopBanner(true))
    }, [])

    useEffect(() => {

        const subscription = AppState.addEventListener('change', (state) => {

            if (state === 'background') {
                BackgroundMusic.stop()
            }
            else if (state === 'active' && AppMusic) {
                BackgroundMusic.play()
            }
        })

        return () => {
            subscription.remove()
        }

    }, [AppMusic])

    const playBgSound = () => {

        if (AppMusic) {
            BackgroundMusic.play()
        } else {
            BackgroundMusic.stop()
        }

    }

    useEffect(() => {

        playBgSound()

    }, [AppMusic])


    return (
        <SafeAreaView style={styles.container}>
            <View style={Theme.whiteContainer}>
                <StatusBar barStyle='light-content' backgroundColor={Color.headerColor} />

                <FlatList
                    ListHeaderComponent={renderHeader()}
                    data={GradesData}
                    renderItem={({ index, item }) => (
                        <HomeListBtn
                            text={item.title}
                            onPress={goToScreen.bind(this, item)}
                            image={item?.image_url}
                            progress={item?.progress}
                        />
                    )}
                    style={{ flexGrow: 0 }}
                />

            </View>
        </SafeAreaView>
    )

};

const styles = StyleSheet.create({
    homeText: {
        fontFamily: 'Gilroy-ExtraBold',
    },
    topRightHeaeder: {
        marginRight: 20,
    },
    container: {
        flex: 1,
        backgroundColor: Color.headerColor
    }

});

export default Home;