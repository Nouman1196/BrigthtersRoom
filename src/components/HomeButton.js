import React, { useEffect, useRef, useState } from 'react'
import { Text, TouchableOpacity, Image, Animated, View, StyleSheet, ActivityIndicator, Platform } from 'react-native'
import { HomeButtonBottom } from '../assets/svgIcons'
import Theme from '../theme/theme'
import { baseURL } from '../utilies/api/instance'
import { capitalizeSentence } from '../utilies/Capitalize'
import { WP } from '../utilies/responsives/responsive'
import FastImage from "react-native-fast-image";
import Tts from 'react-native-tts'
import Color from '../theme/color'

export const HomeBtn = (props) => {



    return (
        <TouchableOpacity activeOpacity={0.5} style={props?.containerStyle}  {...props}>
            {props?.children ? props?.children : null}
        </TouchableOpacity>
    )

}

export const HomeBtnGridIcon = ({ showBar, ...props }) => {

    const [loading, setLoading] = useState(true)
    const [image, setImage] = useState(props?.item?.image_url || null)
    const progress = props?.item?.progress <= 100 ? props?.item?.progress : 100

    return (
        <HomeBtn containerStyle={[Theme.HomeButton1, (props?.Lesson_type == 'list_english' || props?.Lesson_type == 'list_urdu' || props?.Lesson_type == 'list') && styles.bigCard]}  {...props}>

            <Animated.View style={[Theme.FullFLexXYCenter, styles.topLeftRight, props?.translationIcon && { transform: [(props?.index % 2 != 0) ? { translateX: props?.translationIcon } : { translateY: props?.translationIcon }] }]}>
                <FastImage onLoadEnd={() => setLoading(false)} style={[{ height: WP('15%'), width: WP('15%') }, (props?.Lesson_type == 'list_english' || props?.Lesson_type == 'list_urdu' || props?.Lesson_type == 'list') && { height: WP('33%'), width: WP('33%') }]} resizeMode='contain' source={image != null ? { uri: baseURL + image } : require('../assets/noImage.jpeg')} />
                <ActivityIndicator style={{ position: 'absolute' }} animating={loading} />
            </Animated.View>
            {showBar && <View style={styles.progressBar} >
                <View style={[styles.InternalProgress, progress && { width: `${progress}%` }]} />
            </View>}
            {!props?.noTitle &&
                <View style={[Theme.HomeButton2View, props?.item?.color_code && { backgroundColor: props?.item?.color_code }]}>
                    <Text style={Theme.HomeButton2Txt}>{props?.item?.title}</Text>
                </View>
            }

        </HomeBtn>
    )


}

export const HomeBtnBot = (props) => {

    const [loading, setLoading] = useState(true)

    return (
        <HomeBtn containerStyle={[Theme.HomeButton1, props?.container]}  {...props}>

            {
                props?.image == undefined ?
                    <Text style={[Theme.HomeButton1Txt, props?.txtStyle]}>{props?.text}</Text> :
                    <>
                        <FastImage onLoadEnd={() => setLoading(false)} resizeMode='contain' source={{ uri: baseURL + props?.image }} style={{ height: WP('17%'), width: WP('17%'), alignSelf: 'center' }} />
                        <ActivityIndicator style={{ position: 'absolute', alignSelf: 'center' }} animating={loading} />
                    </>
            }

            <HomeButtonBottom color={props?.imageColor} style={{ position: 'absolute', bottom: '-15%' }} width={'100%'} height={'50%'} />
        </HomeBtn>
    )

}


export const HomeListBtn = (props) => {

    return (
        <TouchableOpacity activeOpacity={0.7} style={styles.listMain} {...props}>
            <View style={styles.listImgContainer}>
                <FastImage source={{uri:baseURL + props?.image }} resizeMode='contain' style={styles.listImg} />
            </View>
            <View style={styles.listprogress}>
                <View style={[styles.listInternalProgress,props?.progress && {height:`${props?.progress <= 100 ? props?.progress : 100}%`}]} />
            </View>
            <View style={styles.listText}>
                <Text style={styles.listTxt}>{props?.text}</Text>
            </View>
        </TouchableOpacity>
    )

}


const styles = StyleSheet.create({
    bigCard: { height: WP('55%'), width: WP('70%') },
    topLeftRight: { borderTopLeftRadius: 15, borderTopRightRadius: 15 },
    progressBar: {
        height: 12,
        width: '100%',
        backgroundColor: 'lightgrey',
    },
    InternalProgress: {
        height: '100%',
        backgroundColor: "lightgreen",
        width: 0
    },
    listMain: {
        flex: 1,
        height: 100,
        backgroundColor: 'white',
        marginHorizontal: 40,
        borderRadius: 10,
        ...Theme.IOSShadow,
        elevation: 4,
        marginBottom: 25,
        overflow: Platform.OS == 'ios' ? null : "hidden",
        flexDirection: 'row',
        
    },
    listImgContainer: {
        width: 100,
        height: 100,
        padding:20
    },
    listprogress: {
        backgroundColor: '#B7B7B7',
        width: 10,
        justifyContent:'flex-end'
    },
    listText: {
        backgroundColor: '#00549A',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius:10,
        borderBottomRightRadius:10
    },
    listTxt: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'Gilroy-ExtraBold',
    },
    listImg: {
        flex: 1,
        width: null,
        height: null
    },
    listInternalProgress:{
        backgroundColor:'#95DE3F',
        width:'100%',
        height:0,
    }
})
