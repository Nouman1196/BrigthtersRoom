import React, { useState, useEffect } from "react";
import { SafeAreaView, StatusBar, ImageBackground, StyleSheet, Image } from "react-native";
import Color from "../theme/color";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import FeatureList from "../components/FeatureList";
import { Btn } from "../components/btn";
import Theme from "../theme/theme";
import PersonUsageList from "../components/PersonUsageList";

const Home = ({ navigation }) => {

    const [bckColor, setBckColor] = useState('transparent')

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerLeft: () => (
                <TouchableWithoutFeedback style={{ marginLeft: '20%', marginTop: '40%', backgroundColor: bckColor }} onPress={() => { navigation.openDrawer() }}>
                    <Image source={require('../assets/menu.png')} />
                </TouchableWithoutFeedback>
            ),
        });
    }, [bckColor]);

    
    const FeatureList_Data = [
        {
            img: require('../assets/remoteaccess.png'),
            heading: 'Remote Access',
            title: 'You can easily access your dashboard and use it from anywhere.'
        },
        {
            img: require('../assets/easy-to-use.png'),
            heading: 'Easy of Use',
            title: 'Very simple and intuitive user interface which makes it easy to use for everyone'
        },
        {
            img: require('../assets/Organizationmanagement.png'),
            heading: 'Organization Management',
            title: 'Easily manage your organization or institution and get effective results.'
        },
    ]

    const BrightersRoomUsageData = [
        {
            "title": "Organizations",
            "data": [
                {
                    "img": require('../assets/freeRegistryWUB.png'),
                    "heading": 'Free registration',
                    "title": 'Register with Brighter’s Room and increase productivity and engagement.'
                },
                {
                    "img": require('../assets/ManageMaximizeResWUB.png'),
                    "heading": 'Manage and maximize resources',
                    "title": 'Expand your capabilities and offerings by utilizing this remote learning platform.'
                },
                {
                    "img": require('../assets/learningImprovementWUB.png'),
                    "heading": 'Learning Improvement',
                    "title": 'Provide better learning experience to your team and boost productivity.'
                }
            ]
        },
        {
            "title": "Instructors",
            "data": [
                {
                    "img": require('../assets/freeRegistryWUB.png'),
                    "heading": 'Easy sign up',
                    "title": 'Your instructors can easily sign up with Brighter’s Room and start delivering online lectures and increase engagement of your students.'
                },
                {
                    "img": require('../assets/createNewSessionWUB.png'),
                    "heading": 'Create new course & lessons',
                    "title": 'Your instructors can create new courses, upload them and manage them from their dashboard'
                },
                {
                    "img": require('../assets/learningImprovementWUB.png'),
                    "heading": 'Learning Improvement',
                    "title": 'With Brighter’s Room your instructors can conduct online quizzes for your students and enhance their learning experience and provide fast results to them.'
                }
            ]
        },
        {
            "title": "Students",
            "data": [
                {
                    "img": require('../assets/courseSelectionWUB.png'),
                    "heading": 'Course selection',
                    "title": 'Brighter’s Room provides a way by which your students can easily select any course according to their needs and enroll themselves.'
                },
                {
                    "img": require('../assets/freeRegistryWUB.png'),
                    "heading": 'Easy access on lectures',
                    "title": 'Now your students can easily get any lecture and they don’t need to worry about any missing lecture because Brighter’s Room is providing you a platform from where your students can revise or take any lesson at any time and increase productivity'
                },
                {
                    "img": require('../assets/learningImprovementWUB.png'),
                    "heading": 'Learning Improvement',
                    "title": "With Brighter’s Room organizations can increase their students' learning and participation in classes with live chats and discussions."
                }
            ]
        }
    ]

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={"#7FB5E3"} />
            <ScrollView
                onScroll={(event) => {
                    if(event.nativeEvent.contentOffset.y > 400)
                    {
                        if(bckColor !== 'white'){
                            setBckColor('white')
                        }
                    }
                    else{
                        if(bckColor !== 'transparent'){
                            setBckColor('transparent')
                        }
                    }
                }
                }
            >
                <ImageBackground style={{ width: wp('100%'), height: hp('58%') }} resizeMode="cover" source={require('../assets/HomeBackground.png')} />
                <LinearGradient style={styles.mainContainer} colors={[Color.themeColorOne, Color.themeColorTwo]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} >
                    <FeatureList style={{ marginHorizontal: '5%' }} colorSel={'white'} iconSize={50} data={FeatureList_Data} />
                    <Btn onPress={()=>{setBckColor('white')}} text="See More" containerStyle={[Theme.btnStyle, { width: wp('30%'), borderRadius: 8, marginTop: '3%' }]} textStyle={Theme.btnTextstyle} />
                    <PersonUsageList style={{ marginBottom: '10%', marginTop: '5%' }} data={BrightersRoomUsageData} />
                </LinearGradient>
            </ScrollView>
        </SafeAreaView>
    )

};

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        marginTop: '-9%'
    },
    carouselStyling: { marginHorizontal: '5%', marginVertical: '10%', height: hp('22%'), marginTop: '-20%' },

});

export default Home;