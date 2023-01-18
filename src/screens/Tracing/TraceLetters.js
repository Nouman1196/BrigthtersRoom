import React, { useEffect, useState, useRef } from 'react'
import { PanResponder, View, Text, SafeAreaView, Dimensions, StyleSheet, TouchableOpacity, Modal, StatusBar, Animated, Image, FlatList, ImageBackground } from 'react-native'
import { HomeBtn } from '../../components/HomeButton'
import Color from '../../theme/color';
import { ItemAndSOundBg, ISVPotato, TracingUpperWave, TracingLowerWave } from '../../assets/svgIcons'
import Theme from '../../theme/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Btn } from '../../components/btn';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import { Svg, Line } from 'react-native-svg'


const { height, width } = Dimensions.get('screen');
let _setInterval = null;
let panValue = { x: 0, y: 0 };
const ballWidth = 20
const offset = 150; // set this to 0 if you are using full screen

const TraceLetters = ({ route }) => {

    const { title } = route.params;

    let APoints = [
        {
            x: 27,
            y: 370
        },
        {
            x: 145,
            y: 55
        },
        {
            x: 260,
            y: 360
        },
        {
            x: 65,
            y: 275
        },
        {
            x: 230,
            y: 275
        },
    ]

    const pan1 = useRef(new Animated.ValueXY(APoints[0])).current;
    const pan2 = useRef(new Animated.ValueXY(APoints[1])).current;
    const pan3 = useRef(new Animated.ValueXY(APoints[2])).current;
    const pan4 = useRef(new Animated.ValueXY(APoints[3])).current;
    const pan5 = useRef(new Animated.ValueXY(APoints[4])).current;




    let indexRun = 0

    const [runningIndex, setRunningIndex] = useState(0)

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={Color.headerColor} />
            <ImageBackground style={{ flex: 1 }} resizeMode='stretch' source={ItemAndSOundBg}>
                <View style={{ flex: 1 }}
                    onStartShouldSetResponder={() => true}
                    onResponderMove={(e) => {


                        let touchX = e.nativeEvent.locationX
                        let touchY = e.nativeEvent.locationY

                        indexRun =  runningIndex
                        
                        if (indexRun < APoints.length) {

                            const x = APoints[indexRun].x
                            const y = APoints[indexRun].y

                            differenceX = x - touchX
                            differenceY = y - touchY


                            differenceX = differenceX < 0 ? differenceX * -1 : differenceX
                            differenceY = differenceY < 0 ? differenceY * -1 : differenceY


                            if ((differenceX < 15) && (differenceY < 15)) {
                                indexRun += 1
                                setRunningIndex(indexRun)
                                if (APoints.length == indexRun) {
                                    alert("All DOne")
                                }


                            }

                        }

                    }}
                >
                    <View style={{ backgroundColor: 'white', elevation: 5, flex: 1, marginHorizontal: '8%', marginVertical: '15%' }}>

                        {(runningIndex > 1) &&
                            <Svg height={'100%'} width={'100%'} style={{ position: 'absolute' }}>
                                <Line x1={APoints[0].x} y1={APoints[0].y} x2={APoints[1].x} y2={APoints[1].y} stroke="red" strokeWidth="10" />
                            </Svg>
                        }
                        {(runningIndex > 2) &&
                            <Svg height={'100%'} width={'100%'} style={{ position: 'absolute' }}>
                                <Line x1={APoints[1].x} y1={APoints[1].y} x2={APoints[2].x} y2={APoints[2].y} stroke="red" strokeWidth="10" />
                            </Svg>
                        }
                        {(runningIndex > 3) &&
                            <Svg height={'100%'} width={'100%'} style={{ position: 'absolute' }}>
                                <Line x1={APoints[3].x} y1={APoints[3].y} x2={APoints[4].x} y2={APoints[4].y} stroke="red" strokeWidth="10" />
                            </Svg>
                        }
                        <Text>{runningIndex}</Text>

                        <Animated.View style={[styles.star, { transform: pan1.getTranslateTransform() }]} />
                        <Animated.View style={[styles.star, { transform: pan2.getTranslateTransform() }]} />
                        <Animated.View style={[styles.star, { transform: pan3.getTranslateTransform() }]} />
                        <Animated.View style={[styles.star, { transform: pan4.getTranslateTransform() }]} />
                        <Animated.View style={[styles.star, { transform: pan5.getTranslateTransform() }]} />

                        <Text style={styles.HomeButtonText}>A</Text>


                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>

    )

};

const styles = StyleSheet.create({

    container: Theme.whiteContainer,
    HomeButtonText: { fontFamily: 'QuicksandDash-Regular', fontSize: 450, textAlign: 'center', textAlignVertical: 'center', zIndex: -1, position: 'absolute' },
    ball: {
        height: ballWidth,
        width: ballWidth,
        borderRadius: ballWidth,
        backgroundColor: 'red',
        position: 'absolute',
        elevation: 5
    },
    star: {
        height: 10,
        width: 10,
        borderRadius: ballWidth,
        backgroundColor: 'orange',
        position: 'absolute',
        left: -5,
        top: -5
        // elevation: 5,
    },
    bottom: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    joystick: {
        height: 70,
        width: 70,
        borderRadius: 50,
        backgroundColor: '#aaa',
        borderWidth: 5,
        borderColor: '#888',
        alignItems: 'center',
        justifyContent: 'center'
    },
    joystickOrigin: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#aaa',
        position: 'absolute'
    },
    joystickTxt: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18
    }


});

export default TraceLetters;
