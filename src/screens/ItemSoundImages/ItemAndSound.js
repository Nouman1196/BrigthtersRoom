import React, { useEffect, useState, useRef } from 'react'
import { View, Text, Platform, SafeAreaView, StyleSheet, BackHandler, TouchableOpacity, Modal, StatusBar, Animated, Image, FlatList, ImageBackground } from 'react-native'
import { HomeBtn, HomeBtnBot, HomeBtnGridIcon } from '../../components/HomeButton'
import Color from '../../theme/color';
import { BackButtonISD, BackButtonISE, ForwordButtonISE, ForwordButtonISD, AlphabetABCSONG } from '../../assets/svgIcons'
import Theme from '../../theme/theme';
import Feather from 'react-native-vector-icons/Feather'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Mp3Sound from './mp3Sound';
import AntDesign from 'react-native-vector-icons/AntDesign'
import ItemSoundBG from '../../components/ItemSoundBG';
import Sound from 'react-native-sound'
import { get_data } from '../../utilies/AsyncStorage/AsyncStorage';
import { baseURL } from '../../utilies/api/instance';
import FastImage from 'react-native-fast-image';
import DescriptionCard from '../../components/DescriptionCard';
import SubContentLearning from '../../components/SubContentLearning';
import { SoundCache } from '../../components/Helpers/CacheSounds';
import { PlaySound } from '../../components/Helpers/PlaySound';
import { ProgressUpdate } from '../../utilies/api/apiController';
import { HeaderMenu } from '../../components/Helpers/Header';



const ItemAndSound = ({ navigation, route }) => {

    const { Content, type, noTitle, description, OrignalContent, lang, title } = route.params;

    const [itemModal, setItemModal] = useState(false)
    const [indexItem, setIndexItem] = useState(-1)
    const [gotBack, setGotBack] = useState(false)
    const [soundError, setSoundError] = useState(false)
    const [storedSound, setStoredSound] = useState([])


    const handleButtonVoice = async ({ item, index }) => {

        ProgressUpdate({
            content_id: item?.id,
            content_type: "content"
        }, navigation)
            .then((resp) => {
            })
            .catch((err) => {
                console.log(err, "err")
            })


        if (lang == 'urdu') {
            index = (index % 2 == 0) ? index + 1 : index - 1
        }

        await PlaySound(item?.item_sound_url, storedSound)
        setIndexItem(index)
        setItemModal(true)

    }

    const handleTracing = (item, index) => {

        ProgressUpdate({
            content_id: item?.id,
            content_type: "content"
        }, navigation)
            .then((resp) => {
            })
            .catch((err) => {
                console.log(err, "err")
            })

        if (lang == 'urdu') {
            index = (index % 2 == 0) ? index + 1 : index - 1
        }

        navigation.navigate('Tracing', { title: item?.title, data: OrignalContent ? OrignalContent : Content, index: index })

    }

    const loadSounds = async (params) => {

        let loaded = await SoundCache(params)
        setStoredSound(loaded)

    }

    useEffect(() => {

        navigation.setOptions({
            header: () => (
                <HeaderMenu navigation={navigation} title={title} bgColor={'#2991E5'} dark={true} />
            )
        })


    }, [navigation, gotBack])


    useEffect(() => {

        loadSounds(Content)

    }, [])




    const RenderMainList = ({ index, item }) => (

        type && type == 'tracing' ?

            <HomeBtnBot
                txtStyle={styles.dashedText}
                imageColor={item?.color_code}
                onPress={handleTracing.bind(this, item, index)}
                text={item.title}
                image={item?.multi_images.length > 1 && item?.multi_images[0]?.position == 2 ? item?.multi_images[0]?.image_url : item?.multi_images[1]?.image_url}
            />

            :

            <HomeBtnGridIcon
                item={item}
                index={index}
                noTitle={noTitle}
                onPress={handleButtonVoice.bind(this, { index, item })}
            />



    )



    return (
        <SafeAreaView style={Theme.whiteContainer}>
            <StatusBar backgroundColor={Color.headerColor} />

            <ItemSoundBG>

                {indexItem == -1 ?
                    <View style={{ flex: 1, marginTop: '10%' }}>

                        <FlatList
                            style={{ flexGrow: 0, zIndex: 1 }}
                            numColumns={2}
                            ListHeaderComponent={() => description ? <DescriptionCard sentence={description} /> : null}
                            ListHeaderComponentStyle={{ flex: 1, alignItems: 'center' }}
                            contentContainerStyle={Theme.centerItem}
                            data={Content}
                            renderItem={RenderMainList}
                        />
                    </View> :
                    <SubContentLearning
                        noTitle={noTitle}
                        navigation={navigation}
                        data={OrignalContent ? OrignalContent : Content}
                        run={indexItem}
                        setIndexItem={setIndexItem}
                        setGotBack={setGotBack}
                        gotBack={gotBack}
                        sounds={storedSound}
                    />
                }
            </ItemSoundBG>


        </SafeAreaView>
    )

};

const styles = StyleSheet.create({

    iconSizes: { width: wp('20%'), height: wp('20%'), marginBottom: '20%' },
    dummyViewMusic: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 15, zIndex: 1, justifyContent: 'center', alignItems: 'center' },
    ABCSongView: { height: 200, width: 400 },
    dashedText: { fontSize: wp('16%'), fontFamily: 'QuicksandDash-Regular' }

});

export default ItemAndSound;
