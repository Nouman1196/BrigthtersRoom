import React, { useState } from "react";
import { View, Text, SafeAreaView, StatusBar, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import DescriptionCard from "../../components/DescriptionCard";
import ItemSoundBG from "../../components/ItemSoundBG";
import Color from "../../theme/color";
import Theme from "../../theme/theme";
import Card from '../../components/card';
import SubContentLearning from "../../components/SubContentLearning";


const WordSound = ({ navigation, route }) => {

    const { Content, description, noTitle } = route.params;

    const [indexItem, setIndexItem] = useState(-1)
    const [gotBack, setGotBack] = useState(false)

    const RenderMainList = ({ index, item }) => (
        <View style={styles.card}>
            <TouchableOpacity onPress={() => setIndexItem(index)}>
                <Text style={styles.cardText}>{item?.title}</Text>
            </TouchableOpacity>
        </View>
    )

    return (
        <SafeAreaView style={Theme.whiteContainer}>

            <StatusBar backgroundColor={Color.headerColor} />

            <ItemSoundBG>

                {
                    indexItem == -1 ?
                        <FlatList
                            style={{ flexGrow: 0, zIndex: 1 }}
                            numColumns={4}
                            ListHeaderComponent={() => description ? <DescriptionCard sentence={description} /> : null}
                            ListHeaderComponentStyle={{ flex: 1, alignItems: 'center' }}
                            contentContainerStyle={Theme.centerItem}
                            data={Content}
                            renderItem={RenderMainList}
                        /> :
                        <SubContentLearning
                            noTitle={noTitle}
                            navigation={navigation}
                            data={Content}
                            run={indexItem}
                            setIndexItem={setIndexItem}
                            setGotBack={setGotBack}
                            gotBack={gotBack}
                        />
                }

            </ItemSoundBG>


        </SafeAreaView>
    )


}

const styles = StyleSheet.create({
    card: {
        padding: 10,
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 10,
        marginBottom: 10,
        marginHorizontal: 5,
        ...Theme.IOSShadow
    },
    cardText: {
        fontFamily: 'Gilroy-ExtraBold',
        color: 'black',
        fontSize: 20,
    }
})

export default WordSound;