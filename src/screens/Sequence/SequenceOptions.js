import React, { useState, useEffect } from 'react'
import { View, Text, StatusBar, ImageBackground, SafeAreaView, FlatList, StyleSheet } from 'react-native'
import { HomeBtn } from '../../components/HomeButton'
import Theme from '../../theme/theme'
import Color from '../../theme/color'
import { ItemAndSOundBg, SeqMissingAlphabetsSeq, SeqFillInTheBlankSeq,SeqMissingUrduSeq, SeqRearrangeSeq, SeqNumbersMissing, SeqNumbersFIB, SeqNumbersReArrange } from '../../assets/svgIcons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ItemSoundBG from '../../components/ItemSoundBG'

const SequenceOptions = ({ navigation, route }) => {

    const { title } = route.params;

    const [ListData, setListData] = useState([])

    const PGEnglish = [
        {
            title: 'Missing Letters',
            Image: SeqMissingAlphabetsSeq,
            screen: 'MissingAlphabet1',
            option: 'PGEnglishAlphabets'
        }
    ]

    const PGUrdu = [
        {
            title: 'Missing Haroofs',
            Image: SeqMissingUrduSeq,
            screen: 'MissingAlphabet1',
            option: 'PGUrduHaroof'
        }
    ]

    const PGAlhphabet = [
        {
            title: 'Missing Alphabets',
            Image: SeqMissingAlphabetsSeq,
            screen: 'MissingAlphabet1',
            option: 'PGAlphabets'
        },
        {
            title: 'Fill the blanks',
            Image: SeqFillInTheBlankSeq,
            screen: 'MissingAlphabet2',
            option: 'PGAlphabets'
        },
        {
            title: 'Rearrange',
            Image: SeqRearrangeSeq,
            screen: 'ReArrange',
            option: 'ReArrangeAlphabets'
        }
    ]

    const PGNumber = [
        {
            title: 'Missing Numbers',
            Image: SeqNumbersMissing,
            screen: 'MissingAlphabet1',
            option: 'PGMathNumbers'
        }
    ]

    useEffect(() => {

        if (title === 'SequenceAlphabet') { // check and delete
            setListData(PGAlhphabet)
        } else if (title === 'SequencePGNum') { // working
            setListData(PGNumber)
        } else if (title === 'SequencePGEnglish') { // working 
            setListData(PGEnglish)
        } else if (title === 'SequencePGUrdu') { // working 
            setListData(PGUrdu)
        }

    }, [])

    const RenderMainList = ({ index, item }) => (
        <HomeBtn onPress={() => { navigation.navigate('Sequence', { title: item.title, Screen: item.screen, option: item?.option }) }} text={item.title} containerStyle={styles.homeBtnContainer} >
            <item.Image resizeMode={'cover'} Color={item.imageColor} style={{ marginBottom: 40 }} />
            <Text style={[styles.homeBtnText]}>{item?.title}</Text>
        </HomeBtn>
    )

    return (
        <SafeAreaView style={Theme.whiteContainer}>
            <StatusBar backgroundColor={Color.headerColor} />
            <ItemSoundBG style={{ justifyContent: 'center' }}>
                <FlatList
                    style={{ flexGrow: 0 }}
                    contentContainerStyle={Theme.centerItem}
                    data={ListData}
                    renderItem={RenderMainList}
                />
            </ItemSoundBG>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    imageSizes: { margin: 100 },
    homeBtnContainer: [Theme.HomeButton1, { margin: 20, alignItems: 'center', height: wp('50%'), width: wp('60%') }],
    homeBtnText: [Theme.HomeButton2Txt, { fontSize: wp('4%') }]
})

export default SequenceOptions