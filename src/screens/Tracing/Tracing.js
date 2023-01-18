import React, { useEffect, useState, useRef } from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, StatusBar, Image } from 'react-native'
import Color from '../../theme/color';
import { ForwordButtonISE, ForwordButtonISD, BackButtonISE, BackButtonISD } from '../../assets/svgIcons'
import Theme from '../../theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp, widthPercentageToDP } from 'react-native-responsive-screen';
import ItemSoundBG from '../../components/ItemSoundBG';
import CardWithCross from '../../components/CardWithCross';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import { baseURL } from '../../utilies/api/instance'
import FastImage from 'react-native-fast-image';
import { ProgressUpdate } from '../../utilies/api/apiController';

const Tracing = ({ route, navigation }) => {


    const [running, setRunning] = useState(route?.params?.index)
    const [choosed, setChoosed] = useState(route?.params?.data[route?.params?.index])
    const canvasScreen = useRef()

    useEffect(() => {

        route?.params?.index != running && ProgressUpdate({
            content_id: choosed?.id,
            content_type: "content"
        }, navigation)
            .then((resp) => {
            })
            .catch((err) => {
                console.log(err, "err")
            })

        canvasScreen.current.clear()
    }, [choosed])


    return (
        <SafeAreaView style={Theme.whiteContainer}>
            <StatusBar backgroundColor={Color.headerColor} />
            <ItemSoundBG>

                <CardWithCross ImagePath={require('../../assets/tracingBg.png')} navigation={navigation}>
                    <TouchableOpacity disabled={running != 0 ? false : true} style={styles.backBtn} onPress={() => { running != 0 && (setRunning(running - 1), setChoosed(route?.params?.data[running - 1])) }}>
                        {running == 0 ? <BackButtonISD /> : <BackButtonISE />}
                    </TouchableOpacity>

                    <View style={Theme.TracingTOpCircle}>
                        <FastImage source={{ uri: baseURL + ((choosed?.multi_images[0]?.position == 1) ? choosed?.multi_images[0]?.image_url : choosed?.multi_images[0]?.image_url) }} resizeMode='contain' style={{ flex: 1, margin: 30 }} />
                    </View>

                    <SketchCanvas
                        ref={canvasScreen}
                        style={Theme.CanvasBoard}
                        strokeColor={Color.headerColor}
                        strokeWidth={7}
                    />

                    <View style={styles.TextImageCOntainer}>
                        {
                            choosed?.multi_images.length > 1 ?
                                <FastImage source={{ uri: baseURL + ((choosed?.multi_images[0]?.position == 2) ? choosed?.multi_images[0]?.image_url : choosed?.multi_images[1]?.image_url) }} resizeMode='contain' style={{ width: wp('37%'), height: hp('27%') }} /> :
                                <Text style={styles.TracingFont}>{choosed?.title}</Text>
                        }
                    </View>



                    <Ionicons onPress={() => canvasScreen.current.undo()} name='md-arrow-undo-sharp' size={25} color={'black'} style={Theme.tracingBackArrow} />


                    <TouchableOpacity disabled={running < route?.params?.data.length - 1 ? false : true} style={styles.forwordBtn} onPress={() => { running < route?.params?.data.length - 1 && (setRunning(running + 1), setChoosed(route?.params?.data[running + 1])) }}>
                        {(running !== route?.params?.data.length - 1) ? <ForwordButtonISE /> : <ForwordButtonISD />}
                    </TouchableOpacity>

                </CardWithCross>
            </ItemSoundBG>
        </SafeAreaView>
    )

};

const styles = StyleSheet.create({

    backBtn: { position: 'absolute', left: -12, top: '50%' },
    forwordBtn: { position: 'absolute', right: -12, top: '50%' },
    TextImageCOntainer: { position: 'absolute', top: '50%', width: '100%', alignSelf: 'center', alignItems: 'center', },
    TracingFont: { fontFamily: 'QuicksandDash-Regular', fontSize: hp('30%'), textAlign: 'center', color: '#B2B2B2' }

});

export default Tracing;
