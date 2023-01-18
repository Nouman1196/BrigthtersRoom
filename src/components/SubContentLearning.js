import React, { useState, useEffect } from "react";
import { View, Text, BackHandler, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import Theme from "../theme/theme";
import CardWithCross from "./CardWithCross";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FastImage from "react-native-fast-image";
import { BackButtonISD, BackButtonISE, ForwordButtonISD, ForwordButtonISE, NavBackArrow } from "../assets/svgIcons";
import DescriptionCard from "./DescriptionCard";
import { baseURL } from "../utilies/api/instance";
import { PlaySound } from "./Helpers/PlaySound";
import { SoundCache } from "./Helpers/CacheSounds";
import { ProgressUpdate } from "../utilies/api/apiController";
import { HeaderMenu } from "./Helpers/Header";
import Fontisto from 'react-native-vector-icons/Fontisto'

const SubContentLearning = ({ navigation, data, run, setIndexItem, setGotBack, gotBack, subContents, noTitle, OrignalContent, sounds }) => {

    const [running, setRunning] = useState(run)
    const [choosed, setChoosed] = useState(data[running])
    const [storedSound, setStoredSound] = useState([])

    const playSubcontent = async (item) => {
        await PlaySound(item?.item_sound_url, storedSound)
    }

    const playSound = async () => {
        await PlaySound(choosed?.item_sound_url, sounds)
    }

    const loadSounds = async (params) => {

        let loaded = await SoundCache(params)
        setStoredSound(loaded)

    }

    const HeaderLeft = () => (

        <TouchableOpacity activeOpacity={1} onPress={() => { setIndexItem(-1) }}>
            <NavBackArrow color={'white'} style={{ marginLeft: 20 }} />
        </TouchableOpacity>

    )

    useEffect(() => {

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                setIndexItem(-1)
                return true;
            }
        );

        return () => backHandler.remove();
    }, []);

    useEffect(() => {

        // navigation.setOptions({
        //     header: () => (
        //         <HeaderMenu left={HeaderLeft()} navigation={navigation} title={choosed?.title} dark={true} bgColor={'#2991E5'} />
        //     )
        // })

        return () => (
            setGotBack(!gotBack)
        )


    }, [navigation, choosed])

    useEffect(() => {

        run != running && ProgressUpdate({
            content_id: data[running]?.id,
            content_type: "content"
        }, navigation)
            .catch((err) => {
                console.log(err, "err")
            })

        setChoosed(data[running])
    }, [running])

    useEffect(() => {
        choosed?.sub_contents?.length && loadSounds(choosed?.sub_contents)
    }, [choosed])


    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            {
                choosed?.sub_contents?.length > 0 ?

                    <CardWithCross back={() => setIndexItem(-1)}>

                        <TouchableOpacity disabled={running != 0 ? false : true} style={{ position: 'absolute', left: -12, top: '50%' }} onPress={() => { running != 0 && setRunning(running - 1) }}>
                            {running == 0 ? <BackButtonISD /> : <BackButtonISE />}
                        </TouchableOpacity>

                        <View style={styles.subContentContainer}>

                            {
                                choosed?.image_url ?
                                    <View style={styles.subContentImage}>
                                        <FastImage source={{ uri: baseURL + choosed?.image_url }} resizeMode='contain' style={{ flex: 1, width: null, height: null }} />
                                        <Text style={styles.subContentText}>{choosed?.title != '' ? choosed?.title : 'Sound'}</Text>
                                    </View> :
                                    <View style={Theme.TracingTOpCircle}>
                                        <Text style={styles.subContentText}>{choosed?.title != '' ? choosed?.title : 'Sound'}</Text>
                                    </View>
                            }


                            <View style={styles.bottomSubcontent}>
                                <FlatList
                                    style={{ flexGrow: 0 }}
                                    numColumns={2}
                                    data={choosed?.sub_contents.length > 4 ? choosed?.sub_contents.slice(0, 4) : choosed?.sub_contents}
                                    renderItem={(({ index, item }) => (
                                        <View style={[Theme.subContainerImage, !choosed?.image_url && { backgroundColor: '#00549A' }]}>
                                            <TouchableOpacity onPress={playSubcontent.bind(this, item)}>
                                                {
                                                    choosed?.image_url ?
                                                        <FastImage source={{ uri: baseURL + item?.image_url }} resizeMode='contain' style={styles.imageTextSize} /> :
                                                        <View style={{ ...styles.imageTextSize, justifyContent: 'center' }}>
                                                            <Text style={styles.CVCWordsText}>{item?.title}</Text>
                                                        </View>

                                                }
                                            </TouchableOpacity>
                                        </View>
                                    ))}

                                />
                            </View>

                        </View>

                        <TouchableOpacity disabled={(running != data.length - 1) ? false : true} style={{ position: 'absolute', right: -12, top: '50%' }} onPress={() => { (running != data.length - 1) && setRunning(running + 1) }}>
                            {(running != data.length - 1) ? <ForwordButtonISE /> : <ForwordButtonISD />}
                        </TouchableOpacity>

                    </CardWithCross>

                    :

                    <View style={{ flex: 0.7 }}>

                        {choosed?.description && <DescriptionCard sentence={choosed?.description} />}

                        <View style={Theme.ItemSoundImageM}>

                            <TouchableOpacity disabled={(running != 0) ? false : true} style={{ position: 'absolute', left: -10 }} onPress={() => { running != 0 && setRunning(running - 1) }}>
                                {running == 0 ? <BackButtonISD /> : <BackButtonISE />}
                            </TouchableOpacity>
                            {
                                choosed?.image_url ?
                                    <FastImage source={{ uri: baseURL + choosed?.image_url }} resizeMode='contain' style={{ height: wp('60%'), width: wp('60%') }} /> :
                                    <Text style={{ ...styles.subContentText, fontSize: 50 }}>{choosed?.title}</Text>
                            }


                            <TouchableOpacity disabled={running != data.length - 1 ? false : true} style={{ position: 'absolute', right: -10 }} onPress={() => { (running != data.length - 1) && setRunning(running + 1) }}>
                                {(running != data.length - 1) ? <ForwordButtonISE /> : <ForwordButtonISD />}
                            </TouchableOpacity>

                        </View>

                        {choosed?.title &&
                            <TouchableOpacity onPress={playSound} style={Theme.ItemSOundTextM}>
                                <Fontisto name="music-note" size={30} color="white" />
                                {!noTitle &&
                                    <Text style={Theme.ItemSOundTextT}>
                                    {choosed?.title}
                                </Text>
                                }
                            </TouchableOpacity>
                        }

                    </View>

            }
        </View>
    )


}


const styles = StyleSheet.create({
    subContentContainer: {
        flex: 1,
        marginTop: '10%',
        marginBottom: '8%'
    },
    subContentText: {
        textAlign: 'center',
        fontFamily: 'Gilroy-ExtraBold',
        fontSize: 22,
        color: 'black',
        marginTop: 5
    },
    subContentImage: {
        height: hp('22%'),
        width: hp('22%'),
        alignSelf: 'center'
    },
    CVCWordsText: {
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Gilroy-ExtraBold',
        fontSize: 34
    },
    imageTextSize: {
        width: hp('11'),
        height: hp('11')
    },
    bottomSubcontent: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 10,
        marginHorizontal: 5
    }
})

export default SubContentLearning;