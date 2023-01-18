import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, StatusBar, FlatList, StyleSheet, Image, Animated, View } from "react-native";
import Color from "../theme/color";
import { HomeBtnGridIcon } from "../components/HomeButton";
import Theme from "../theme/theme";
import { useDispatch, useSelector } from 'react-redux'
import FastImage from "react-native-fast-image";
import { NavSound } from "../components/Helpers/NavSound";
import { baseURL } from "../utilies/api/instance";
import { getAllGrades } from "../utilies/api/apiCalls";
import { HeaderMenu } from "../components/Helpers/Header";
import { setBackgroundMusic } from "../redux/MainSlice";

const Subjects = ({ navigation, route }) => {

    const dispatch = useDispatch()

    const { title, grade, cover, bgMusic } = route.params;

    const [HeaderBG, setHeaderBG] = useState('transparent')

    const translationIcon = useRef(new Animated.Value(0)).current;

    const GradesData = useSelector(state => state.main.grades)
    const AppMusic = useSelector(state => state.main.appMusic)

    const [activeData, setActiveData] = useState([])

    const findSubjects = () => {

        for (let index = 0; index < GradesData.length; index++) {

            if (GradesData[index].id === grade) {
                setActiveData(GradesData[index].subjects)
                return GradesData[index].subjects
            }

        }

    }

    const goToLesson = (item) => {

        AppMusic && NavSound()
        navigation.navigate('Lessons', { title: item?.title, id: item.id, cover: item?.cover_image_url, bgMusic: item?.background_music_url });

    }

    const startAnimate = () => {

        Animated.timing(translationIcon, {
            toValue: -10,
            duration: 1000,
            useNativeDriver: true
        }).start(() => {
            Animated.timing(translationIcon, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true
            }).start(() => {
                startAnimate()
            })
        });

    };

    const changeHeaderColor = (event) => {

        if (event.nativeEvent.contentOffset.y <= 200) {
            HeaderBG != 'transparent' && setHeaderBG('transparent')
        } else {
            HeaderBG != '#2991E5' && setHeaderBG('#2991E5')
        }

    }

    useEffect(() => {

        findSubjects()
        // bgMusic && dispatch(setBackgroundMusic(bgMusic))

        // return () => {
        //     dispatch(setBackgroundMusic(''))
        // }

    }, [GradesData])

    React.useLayoutEffect(() => {

        let dark = HeaderBG == '#2991E5' ? true : false

        navigation.setOptions({

            header: () => (
                <HeaderMenu navigation={navigation} bgColor={dark ? '#2991E5' : HeaderBG} dark={dark} title={title} />
            )

        });
    }, [navigation, HeaderBG]);


    const renderHeader = () => {

        let path = cover ? { uri: baseURL + cover } : require('../assets/homeBck1.png')

        return <FastImage resizeMode="cover" source={path} style={Theme.HomeScreenTopImage} />
    }

    const renderListFun = ({ index, item }) => (
        <View style={Theme.Xcenter}>
            <HomeBtnGridIcon showBar translationIcon={translationIcon} onPress={goToLesson.bind(this, item)} item={item} index={index} />
        </View>
    )

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            getAllGrades({ navigation, dispatch })
        });

        return unsubscribe;

    }, [navigation])



    useEffect(() => {
        startAnimate()
    }, [])


    return (
        <SafeAreaView style={styles.container}>
            <View style={Theme.whiteContainer}>
                <StatusBar backgroundColor={Color.headerColor} />

                <FlatList
                    ListHeaderComponent={renderHeader}
                    numColumns={2}
                    data={activeData}
                    renderItem={renderListFun}
                    style={{ flexGrow: 0 }}
                    onScroll={changeHeaderColor}
                />

            </View>
        </SafeAreaView>
    )

};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Color.headerColor
    }

});

export default Subjects;