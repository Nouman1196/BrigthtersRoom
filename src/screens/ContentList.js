import React, { useEffect } from "react";
import { View, Text, StatusBar, FlatList, StyleSheet, Image } from 'react-native'
import CardWithCross from "../components/CardWithCross";
import ItemSoundBG from "../components/ItemSoundBG";
import Color from "../theme/color";
import Theme from "../theme/theme";
import { ProgressUpdate } from "../utilies/api/apiController";
import { baseURL } from "../utilies/api/instance";

const ImageTitleBox = ({ item }) => {



    return (
        <View style={Theme.ImageTitleBox}>
            <View style={Theme.ImageTitleBoxImgContainer}>
                <Image resizeMode='contain' style={{ flex: 1, margin: 20 }} source={{ uri: baseURL + item?.image_url }} />
            </View>
            <Text style={Theme.ImageTitleBoxText}>{item?.title}</Text>
        </View>
    )



}


const ContentList = ({ navigation, route }) => {

    const { data, parent_ID } = route.params

    const renderList = ({ item, index }) => (

        <View style={{ flexDirection: 'row' }}>
            {
                item?.sub_contents?.map((item) => <ImageTitleBox key={item?.title} item={item} />)
            }
        </View>

    )

    useEffect(() => {

        ProgressUpdate({
            lesson_id: parent_ID,
            content_type: "lesson"
        }, navigation)
            .then((resp) => {
            })
            .catch((err) => {
                console.log(err, "err")
            })

    }, [])

    return (

        <View style={Theme.whiteContainer}>
            <StatusBar backgroundColor={Color.headerColor} />
            <ItemSoundBG>
                <CardWithCross background navigation={navigation}>
                    <View style={{ flex: 1 }}>

                        <View style={Theme.Ycenter}>

                            <FlatList

                                style={styles.CenterBox}
                                data={data}
                                renderItem={renderList}

                            />

                        </View>

                    </View>
                </CardWithCross>
            </ItemSoundBG>
        </View>

    )


}

const styles = StyleSheet.create({
    CenterBox: { flexGrow: 0, alignSelf: 'center' },

})

export default ContentList;