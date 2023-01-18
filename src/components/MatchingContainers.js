import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import Theme from '../theme/theme'
import { baseURL } from '../utilies/api/instance'

export const LinkedContainer = ({ selectedText, selectedAsset, ok, style, ...props }) => {

    return (
        <View style={[styles.rowCenter, style]} {...props}>
            <LeftImageContainer ok={ok} style={[styles.LinkedImage, { marginRight: -10 }]} item={selectedText} />
            <View style={[Theme.MatchingLine, ok == false && { backgroundColor: 'red' }]} />
            <ImageContainer ok={ok} style={styles.LinkedImage} item={selectedAsset} />
        </View>
    )

}

export const TextContainer = ({ onPress, textIndex, index, item, style }) => {

    return (
        <Text onPress={onPress} style={[Theme.MatchingTextContainer, textIndex == index && { backgroundColor: '#129A00' }, style]}>{item?.text ? item?.text : item?.title ? item?.title : null}</Text>
    )

}

export const LeftImageContainer = ({ onPress, textIndex, index, item, style, ok }) => {
   
    return (

        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[Theme.MatchingImageContainer, style]}>
            <View style={[Theme.MatchingImageSubContainer, { borderWidth: 0, marginLeft: -10 }]}>
                <FastImage resizeMode='contain' style={Theme.MatchingImage} source={{ uri: baseURL + item?.titleimg }} />
            </View>
            <View style={[Theme.MatchingImageSelectBox, { right: '4%', left: null }, textIndex == index && { backgroundColor: '#129A00' }, ok == false && { backgroundColor: 'red' }]}></View>
        </TouchableOpacity>

    )

}

export const ImageContainer = ({ index, onPress, assetIndex, item, style, ok }) => {

    return (

        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[Theme.MatchingImageContainer, style]}>

            <View style={[Theme.MatchingImageSelectBox, (assetIndex == index || ok) && { backgroundColor: '#129A00' }, ok == false && { backgroundColor: 'red' }]}></View>
            <View style={[Theme.MatchingImageSubContainer, assetIndex == index && { borderColor: '#129A00' }]}>
                <FastImage resizeMode='contain' style={Theme.MatchingImage} source={{ uri: baseURL + item?.img }} />
            </View>

        </TouchableOpacity>

    )

}

const styles = StyleSheet.create({
    rowCenter: { flexDirection: 'row', justifyContent: 'center', alignItems: "center" },
    LinkedText: { marginTop: '2%', marginBottom: 0 },
    LinkedImage: { marginBottom: 0, marginLeft: 10 }
})