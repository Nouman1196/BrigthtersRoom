import React, { useEffect, useState, useRef } from 'react'
import { View, SafeAreaView, Modal, ImageBackground, FlatList, StyleSheet, Image } from 'react-native'
import Theme from '../../theme/theme'
import CardWithCross from '../../components/CardWithCross'
import { ImageContainer, TextContainer, LinkedContainer, LeftImageContainer } from '../../components/MatchingContainers'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SuccessErrorSeq from '../../components/SuccessErrorSeq'
import ItemSoundBG from '../../components/ItemSoundBG'
import { ProgressUpdate } from '../../utilies/api/apiController'


export default Matching = ({ navigation, route }) => {

    const { data, parent_ID } = route.params;

    const [selectedText, setSelectedText] = useState('')
    const [selectedAsset, setSelectedAsset] = useState('')
    const [textIndex, setTextIndex] = useState(-1)
    const [assetIndex, setAssetIndex] = useState(-1)
    const [openModal, setOpenModal] = useState(false)
    const [answered, setAnswerd] = useState([])
    const [assetsArray, setAssetsArray] = useState([])
    const [textsArray, setTextsArray] = useState([])
    const [ok, setOk] = useState(false)


    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    const checkAnswer = () => {

        if (selectedText.id == selectedAsset.id) {

            let assets = assetsArray
            let texts = textsArray


            setOpenModal(true)
            setAnswerd([...answered, { "Asset": selectedAsset, "Text": selectedText }])
            assets.splice(assetIndex, 1)
            texts.splice(textIndex, 1)

            if (assets.length == 0) {
                ProgressUpdate({
                    lesson_id: parent_ID,
                    content_type: "lesson"
                }, navigation)
                    .then((resp) => {
                    })
                    .catch((err) => {
                        console.log(err, "err")
                    })
                setOk('done')
            } else {
                setOk(false)
            }


            setAssetsArray(assets)
            setTextsArray(texts)

            setTimeout(() => {

                setOpenModal(false)
                clearInputs()

            }, 1500);
            return;
        } else {
            setOk(true)
            setOpenModal(true)
            setTimeout(() => {

                setOpenModal(false)
                clearInputs()
            }, 1500);
            return;
        }


    }

    const clearInputs = () => {

        setSelectedText('')
        setSelectedAsset('')
        setTextIndex(-1)
        setAssetIndex(-1)
        setOk(false)

    }

    const copyData = () => {


        let assets = data.map(i => ({ "id": i.id, "img": i?.multi_images[0]?.position == 1 ? i?.multi_images[0]?.image_url : i?.multi_images[1]?.image_url }))
        let texts = data.map(i => ({ "id": i.id, "titleimg": i?.multi_images[0]?.position == 2 ? i?.multi_images[1]?.image_url : i?.multi_images[0]?.image_url, "title": i?.title }))
        shuffle(texts)
        shuffle(texts)
        shuffle(texts)

        setAssetsArray(assets)
        setTextsArray(texts)

    }

    useEffect(() => {

        if (selectedAsset != '' && selectedText != '') {
            checkAnswer()
        }

    }, [selectedAsset, selectedText])


    useEffect(() => {

        if (assetsArray.length == 0 && textsArray.length == 0) {

            copyData()

        }



    }, [])


    return (
        <SafeAreaView style={Theme.whiteContainer}>
            <ItemSoundBG>
                <CardWithCross background navigation={navigation}>

                    <FlatList
                        style={{ flexGrow: 0, alignSelf: 'center' }}
                        data={answered}
                        renderItem={({ index, item }) => (
                            <LinkedContainer style={{ marginTop: '5%' }} ok={true} selectedAsset={item.Asset} selectedText={item.Text} />
                        )}
                    />

                    <View style={{ flex: 1, flexDirection: 'row' }}>

                        <FlatList
                            contentContainerStyle={styles.ListTextStyle}
                            data={textsArray}
                            renderItem={({ index, item }) => (
                                <LeftImageContainer item={item} textIndex={textIndex} index={index} onPress={() => { setSelectedText(item); setTextIndex(index) }} />
                                // <TextContainer item={item} textIndex={textIndex} index={index} onPress={() => { setSelectedText(item); setTextIndex(index) }} />
                            )}

                        />

                        <FlatList
                            contentContainerStyle={styles.ListTextStyle}
                            data={assetsArray}
                            renderItem={({ index, item }) => (
                                <ImageContainer index={index} assetIndex={assetIndex} item={item} onPress={() => { setSelectedAsset(item); setAssetIndex(index) }} />
                            )}

                        />


                        <Modal
                            transparent={true}
                            visible={openModal}
                        >
                            <View style={styles.modalMainView}>
                                <LinkedContainer ok={!(ok != 'done' ? ok : false)} selectedAsset={selectedAsset} selectedText={selectedText} />
                                <SuccessErrorSeq MainStyle={{ position: 'relative', marginTop: '-20%' }} successError={ok} modal={false} />
                            </View>
                        </Modal>

                    </View>
                </CardWithCross>
            </ItemSoundBG>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({

    ListTextStyle: {
        alignSelf: 'center', justifyContent: 'center', flex: 1
    },
    modalMainView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' },
    rowCenter: { flexDirection: 'row', justifyContent: 'center', alignItems: "center" },
    modalImage: { width: wp('50%'), height: wp('50%'), marginTop: '30%' },

})


