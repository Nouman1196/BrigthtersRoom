import React, { useState, useEffect, useRef } from 'react'
import { View, Text, SafeAreaView, StatusBar, ImageBackground, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import Color from '../../theme/color'
import Theme from '../../theme/theme'
import { ItemAndSOundBg, PGPoemsHumpty, PGPoemsJack, PGPoemsJohny, PGPoemsSheep, PGPoemsStar } from '../../assets/svgIcons'
import { HomeBtn } from '../../components/HomeButton'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Video from 'react-native-video'

export default ItemAndVideo = ({ route }) => {

    const { title } = route.params;

    const [poemsList, setPoemsList] = useState([])
    const playerRef = useRef().current

    const PGAlphabetPoems = [
        {
            id: 1,
            title: 'Baa Baa Black Sheep',
            video: '',
            image: PGPoemsSheep
        },
        {
            id: 2,
            title: 'Twinkle Twinkle Little Star',
            video: '',
            image: PGPoemsStar
        },
        {
            id: 3,
            title: 'Humpty Dumpty',
            video: '',
            image: PGPoemsHumpty
        },
        {
            id: 4,
            title: 'Jack and Jill',
            video: '',
            image: PGPoemsJack
        },
        {
            id: 5,
            title: 'Johny Johny Yes Papa',
            video: '',
            image: PGPoemsJohny
        }
    ]

    useEffect(() => {

        if (title == 'PGPoems') {
            setPoemsList(PGAlphabetPoems)
        }

    }, [])

    return (
        <SafeAreaView style={Theme.whiteContainer}>
            <StatusBar backgroundColor={Color.headerColor} />
            {/* <ImageBackground style={{ flex: 1 }} resizeMode='stretch' source={ItemAndSOundBg}>
                <FlatList
                    contentContainerStyle={{ alignItems: 'center' }}
                    data={poemsList}
                    renderItem={({ index, item }) => (

                        <TouchableOpacity activeOpacity={1} style={styles.ImageContainer}>
                            {item?.image && <item.image resizeMode='stretch' style={styles.image} />}
                            <Text style={styles.imageText}>{item.title}</Text>
                        </TouchableOpacity>

                    )}
                />
            </ImageBackground> */}
            <Video
                source={{ uri: 'http://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4?_=1' }}
                style={{ width: 300, height: 300,backgroundColor:'red' }}
                controls={true}
                ref={playerRef}
                paused={false}
                onBuffer={(e) => console.log(e,"Buffering")}                // Callback when remote video is buffering
                onError={(e) => console.log(JSON.stringify(e))}        

            />
        </SafeAreaView>
    )

}




const styles = StyleSheet.create({
    ImageContainer: {
        margin: 20,
        width: wp('65%'),
        height: wp('42%'),
        borderRadius: 15,
        elevation: 10,
        backgroundColor: 'white'
    },

    image: { flex: 1, height: null, width: null, borderTopLeftRadius: 15, borderTopRightRadius: 15 },

    imageText: { textAlign: "center", paddingVertical: '3%', backgroundColor: 'black', color: 'white', borderBottomLeftRadius: 15, borderBottomRightRadius: 15, fontFamily: 'Gilroy-ExtraBold', fontSize: wp('3.5%') },

    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
})