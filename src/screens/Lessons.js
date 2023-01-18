import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, StatusBar, Text, Animated, FlatList, StyleSheet, Image, ActivityIndicator, View, Modal } from "react-native";
import Color from "../theme/color";
import { HomeBtnGridIcon } from "../components/HomeButton";
import Theme from "../theme/theme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LessonsApi, LecturesApi, SignUpApi } from "../utilies/api/apiController";
import ItemSoundBG from "../components/ItemSoundBG";
import Toast from "react-native-simple-toast";
import FastImage from "react-native-fast-image";
import { useDispatch, useSelector } from "react-redux";
import { NavSound } from "../components/Helpers/NavSound";
import { baseURL } from "../utilies/api/instance";
import { get_data, save_data } from "../utilies/AsyncStorage/AsyncStorage";
import DeviceInfo from 'react-native-device-info';
import { Cred } from "../constants/DoorKeeper";
import { HeaderMenu } from "../components/Helpers/Header";
import { setUserData } from "../redux/MainSlice";


const Lessons = ({ navigation, route }) => {

    const dispatch = useDispatch()

    const { title, id, LessonData, Lesson_type, cover, ChildID } = route.params;

    const translationIcon = useRef(new Animated.Value(0)).current;

    const AppMusic = useSelector(state => state.main.appMusic)

    const [activeList, setActiveList] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadData, setLoadData] = useState(false)
    const [storedSound, setStoredSound] = useState([])
    const [HeaderBG, setHeaderBG] = useState('transparent')

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

    const swapData = (data) => {

        let actualData = [...data]
        let swap = ''

        for (let index = 0; index < actualData.length - 1; index = index + 2) {

            swap = actualData[index]
            actualData[index] = actualData[index + 1]
            actualData[index + 1] = swap

        }

        return actualData
    }

    const swapDataSeq = (data) => {

        let actualData = [...data]
        let swap = ''

        for (let index = 0; index < actualData.length - 1; index = index + 3) {

            if (actualData[index + 2] != undefined) {

                swap = actualData[index]
                actualData[index] = actualData[index + 2]
                actualData[index + 2] = swap

            } else {
                swap = actualData[index]
                actualData[index] = actualData[index + 1]
                actualData[index + 1] = swap
            }


        }

        return actualData

    }

    const getSubjectLessons = async () => {

        let resp = await LessonsApi(navigation, id)

        if (resp?.status == 200) {

            setActiveList(resp?.data?.lessons)
            setLoading(false)


        } else {

            setLoading(false)
            let error = resp?.response?.data?.error?.toString()
            Toast.show(error ? error : "Something Went wrong", Toast.SHORT)
            resp?.response?.status == 401 && navigation.goBack()

        }

    }

    const getLessons = async (item, index) => {

        let resp = await LecturesApi(navigation, item?.id)
      
        if (resp?.status == 200) {

            let result = resp?.data
            let lessonLength = result?.lectures?.length || 0
            let contentLength = result?.contents?.length || 0

            let finalData;

            if (lessonLength != 0) {

                setLoadData(false)
                navigation.push('Lessons', { title: item?.title, LessonData: result?.lectures, Lesson_type: result?.lesson_type, ChildID: item?.id})
                return

            }


            if (contentLength != 0) {

                switch (result?.lesson_content_type) {
                    case "learning":

                        finalData = result?.lesson_type?.split('_')[1] == 'urdu' ? swapData(result?.contents) : result?.contents
                        navigation.navigate('ItemAndSound', { Content: finalData, title: result?.title, description: result?.description, OrignalContent: result?.contents, lang: result?.lesson_type?.split('_')[1] })
                        setLoadData(false)
                        break;

                    case "sound":

                        finalData = result?.lesson_type?.split('_')[1] == 'urdu' ? swapData(result?.contents) : result?.contents
                        navigation.navigate('ItemAndSound', { Content: finalData, title: result?.title, noTitle: true, OrignalContent: result?.contents, lang: result?.lesson_type?.split('_')[1] })
                        setLoadData(false)
                        break;

                    case "cvc_word":

                        navigation.navigate('WordSound', { Content: result?.contents, title: result?.title, description: result?.description, noTitle: true })
                        setLoadData(false)
                        break;

                    case "matching":

                        navigation.navigate('Matching', { data: result?.contents, parent_ID: result?.id, title: result?.title })
                        setLoadData(false)
                        break;

                    case "measurement":

                        navigation.navigate('ContentList', { parent_ID: result?.id,title: item?.title, data: result?.contents })
                        setLoadData(false)
                        break;

                    case "missing_letters":

                        finalData = result?.lesson_type?.split('_')[1] == 'urdu' ? swapDataSeq(result?.contents) : result?.contents
                        navigation.navigate('Sequence', { parent_ID: result?.id, title: item?.title, Screen: result?.lesson_content_type, data: finalData, lang: result?.lesson_type?.split('_')[1] })
                        setLoadData(false)
                        break;

                    case "blanks":

                        finalData = result?.lesson_type?.split('_')[1] == 'urdu' ? swapDataSeq(result?.contents) : result?.contents
                        navigation.navigate('Sequence', { title: item?.title, Screen: result?.lesson_content_type, data: finalData, lang: result?.lesson_type?.split('_')[1] })
                        setLoadData(false)
                        break;

                    case "tracing":

                        finalData = result?.lesson_type?.split('_')[1] == 'urdu' ? swapData(result?.contents) : result?.contents
                        navigation.navigate('ItemAndSound', { Content: finalData, title: result?.title, type: 'tracing', lang: result?.lesson_type?.split('_')[1], OrignalContent: result?.contents })
                        setLoadData(false)
                        break;

                    default:

                        Toast.show("No Data", Toast.SHORT)
                        setLoadData(false)
                        break;
                }

            } else {

                if (result?.lesson_content_type == 'rhyme') {

                    if (LessonData != undefined) {
                        navigation.navigate('PlayList', { title: item?.title, index: index, listData: LessonData })
                    }

                    setLoadData(false)
                }
                else {

                    lessonLength == 0 && Toast.show("No Lecture Content", Toast.SHORT)
                    setLoadData(false)
                }


            }



        } else {
            let error = resp?.response?.data?.error?.toString()
            Toast.show(error ? error : "Something Went wrong", Toast.SHORT)
            setLoadData(false)
        }

    }

    const goToLesson = async (item, index) => {

        setLoadData(true)

        AppMusic && NavSound()

        let token = await get_data('@user_data')

        if (token == null) {

            let uniqueID = await DeviceInfo.getUniqueId()

            let user = {
                client_id: Cred.clientId,
                device_token: uniqueID
            }

            const resp = await SignUpApi(user, navigation)
   
            if (resp?.status == 200) {
            
                await save_data('@user_data', resp?.data)
                dispatch(setUserData(resp?.data))
                getLessons(item, index)

            }

            setLoadData(false)

        } else {
   
            getLessons(item, index)
        }


    }

    const getLectures = async () => {
        
        let resp = await LecturesApi(navigation, ChildID)

        if(resp?.status == 200){
            setActiveList(resp?.data?.lectures)
        }

    }

    const renderListItem = ({ index, item }) => (
        activeList.length > 0 ?
            <View style={Theme.Xcenter}>
                <HomeBtnGridIcon showBar translationIcon={translationIcon} Lesson_type={Lesson_type} onPress={goToLesson.bind(this, item, index)} item={item} index={index} />
            </View>
            :
            <Loader />
    )

    const renderHeader = () => {

        let path = cover ? { uri: baseURL + cover } : require('../assets/homeBck1.png')

        return <FastImage resizeMode="cover" source={path} style={Theme.HomeScreenTopImage} />

    }

    const Loader = ({ bg }) => (
        <View style={[styles.loaderCenter, bg && { backgroundColor: bg }]}>
            <ActivityIndicator />
        </View>
    )

    const ModalLoader = () => (
        <Modal visible={loadData} transparent>
            <View style={styles.LoadDataStyle}>
                <Image resizeMode="contain" source={require('../assets/pingpongloader.gif')} style={{ alignSelf: 'center', flex: 1, width: 400 }} />
            </View>
        </Modal>
    )

    const changeHeaderColor = (event) => {

        if (event.nativeEvent.contentOffset.y <= 200) {

            HeaderBG != 'transparent' && setHeaderBG('transparent')

        } else {

            HeaderBG != '#2991E5' && setHeaderBG('#2991E5')

        }

    }


    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {

            ChildID ? getLectures() : id ? getSubjectLessons() : setActiveList(LessonData)

        });

        return unsubscribe;

    }, [navigation])

    React.useLayoutEffect(() => {

        let dark = (Lesson_type == 'list_english' || Lesson_type == 'list_urdu' || Lesson_type == 'list' || HeaderBG == '#2991E5') ? true : false

        navigation.setOptions({

            header: () => (
                <HeaderMenu navigation={navigation} bgColor={dark ? '#2991E5' : HeaderBG} dark={dark} title={title} />
            ),
            headerTransparent: (Lesson_type == 'list_english' || Lesson_type == 'list_urdu' || Lesson_type == 'list') ? false : true,

        });
    }, [navigation, HeaderBG]);

    useEffect(() => {
        startAnimate()
    }, [])




    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={Color.headerColor} />
            <View style={Theme.whiteContainer}>
                {
                    Lesson_type && (Lesson_type == 'list_english' || Lesson_type == 'list_urdu' || Lesson_type == 'list') ?
                        <ItemSoundBG>
                            <FlatList
                                data={activeList}
                                renderItem={renderListItem}
                                onScroll={changeHeaderColor}
                                style={{ marginTop: '5%' }}
                            />
                        </ItemSoundBG>
                        :
                        <FlatList
                            numColumns={2}
                            data={activeList.length > 0 ? activeList : [1]}
                            renderItem={renderListItem}
                            ListHeaderComponent={renderHeader}
                            onScroll={changeHeaderColor}
                        />
                }
            </View>
            <ModalLoader />
        </SafeAreaView>
    )

};

const styles = StyleSheet.create({

    homeBtn: {
        ...Theme.HomeButton1,
        margin: 20,
        alignItems: 'center'
    },
    bigCard: {
        height: wp('60%'),
        width: wp('65%')
    },
    loaderCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    LoadDataStyle: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    container: {
        flex: 1,
        backgroundColor: Color.headerColor
    }

});

export default Lessons;