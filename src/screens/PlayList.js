import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions, Platform } from 'react-native'
import Theme from "../theme/theme";
import { baseURL } from "../utilies/api/instance";
import { HP, WP } from "../utilies/responsives/responsive";
import Video from 'react-native-video';
import Color from "../theme/color";
import WebView from "react-native-webview";
import { ProgressUpdate } from '../utilies/api/apiController'

const PlayList = ({ navigation, route }) => {

    const { listData, index } = route?.params;

    const [dataList, setDataList] = useState(listData)
    const [selected, setSelected] = useState(listData[index])
    const [runningIndex, setRunningIndex] = useState(index)
    const [loading, setLoading] = useState(true)
    const [videoUrl, setVideoUrl] = useState('')


    useEffect(() => {
        ProgressUpdate({
            lesson_id: selected?.id,
            content_type: "lesson"
        }, navigation)
            .then((resp) => {
            })
            .catch((err) => {
                console.log(err, "err")
            })

        setVideoUrl(baseURL + selected?.video_url)
    }, [selected])

    useEffect(() => {

        loading && setTimeout(() => {
            setLoading(false)
        }, 4000);

    }, [loading])

    return (
        <SafeAreaView style={Theme.whiteContainer}>

            <View style={styles.Top}>

                {
                    videoUrl != '' && (

                        Platform.OS == 'ios' ?
                            <WebView

                                style={styles.backgroundVideo}
                                mediaPlaybackRequiresUserAction={true}
                                allowsFullscreenVideo={false}
                                source={{ uri: videoUrl }}

                            /> :
                            <Video
                                onLoad={() => setLoading(false)}
                                source={{ uri: videoUrl }}
                                style={styles.backgroundVideo}
                                paused={true}
                                controls={true}
                            />

                    )
                }


                {loading && <Image source={require('../assets/videoLoader.gif')} style={{ position: 'absolute', width: '100%', height: '100%' }} />}
                <Text style={Theme.PlayListHeadingText}>{selected?.title}</Text>
            </View>


            <FlatList
                style={{ marginTop: '3%', flexGrow: 0 }}
                data={dataList}
                renderItem={({ index, item }) => (
                    <TouchableOpacity onPress={() => { setSelected(dataList[index]); setRunningIndex(index); setLoading(true) }} style={[Theme.PlayListContainer, runningIndex == index && { borderColor: Color.themeColorOne, borderWidth: 1 }]}>
                        <View style={{ height: 70, flex: 0.4 }}>
                            <Image style={{ flex: 1, height: null, width: null, borderRadius: 5, }} resizeMode='contain' source={item?.image_url != null ? { uri: baseURL + item?.image_url } : require('../assets/noImage.jpeg')} />
                        </View>
                        <Text style={{ textAlign: 'center', fontFamily: 'Gilroy-ExtraBold', fontSize: 15, alignSelf: 'center', flex: 1 }}>{item?.title}</Text>
                    </TouchableOpacity>
                )}

            />


        </SafeAreaView>
    )


}


const styles = StyleSheet.create({
    Top: {
        height: HP('40%'),
    },
    backgroundVideo: {
        flex: 1,
        backgroundColor: 'black'
    },

})

export default PlayList;