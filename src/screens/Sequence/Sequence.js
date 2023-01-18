import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import Theme from '../../theme/theme'
import CardWithCross from '../../components/CardWithCross'
import MissingAlphabet1 from './MissingAlphabet1'
import MissingAlphabet2 from './MissingAlphabet2'
import ReArrange from './ReArrange'
import ItemSoundBG from '../../components/ItemSoundBG'



export default Sequence = ({ navigation, route }) => {

    const { Screen, data, lang, parent_ID } = route.params;

    return (
        <SafeAreaView style={Theme.whiteContainer}>
            <ItemSoundBG>
                <CardWithCross background navigation={navigation}>
                    {
                        Screen == 'missing_letters' ? <MissingAlphabet1 data={data} lang={lang} parent_ID={parent_ID} navigation={navigation} /> :
                            Screen == 'blanks' ? <MissingAlphabet2 data={data} lang={lang} parent_ID={parent_ID} navigation={navigation} /> :
                                Screen == 'ReArrange' ? <ReArrange parent_ID={parent_ID} navigation={navigation} /> :
                                    null
                    }
                </CardWithCross>
            </ItemSoundBG>
        </SafeAreaView>
    )

}


