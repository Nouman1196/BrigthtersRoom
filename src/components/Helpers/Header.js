import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, SafeAreaView, Platform, StyleSheet, TouchableOpacity } from 'react-native'
import { HomeBack, NavBackArrow, SoundEnable } from "../../assets/svgIcons";
import Color from "../../theme/color";
import fonts from "../../theme/fonts";
import Theme from "../../theme/theme";


export const HeaderMenu = ({ left, right, title, bgColor, navigation, dark }) => {

    const goToHome = () => {
        navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
    }

    return (
        <SafeAreaView style={[bgColor && { backgroundColor: bgColor }]}>
            <View style={styles.container}>
                <View style={styles.flexF}>
                    {left ? left : <HeaderLefts dark={dark} navigation={navigation} />}
                </View>
                <View style={[styles.flexF,{flex:2}]}>
                    <Text numberOfLines={1} style={[styles.title, dark && { color: 'white' }]}>{title}</Text>
                </View>
                <View style={[styles.flexF, styles.end]}>
                    {right ? right : <HeaderRight dark={dark} onPress={goToHome} />}
                </View>
            </View>
        </SafeAreaView>
    )

}


export const HeaderLefts = ({ bgColor, navigation, dark }) => {

    return (
        <TouchableOpacity style={{ width: 25, marginLeft: 20 }} activeOpacity={1} onPress={() => { navigation.goBack() }}>
            <NavBackArrow color={dark ? "white" : null} />
        </TouchableOpacity>
    )
}

const HeaderRight = (props) => (
    <HomeBack style={{ marginRight: 20 }} color={props?.dark ? "white" : '#2991E5'} {...props} />
)


const styles = StyleSheet.create({

    flexF: {
        flex: 1,
    },
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 62,
        alignItems: 'center',
    },
    end: {
        alignItems: 'flex-end'
    },
    title: {
        ...fonts.headerTitle,
        textAlign: 'center'
    }

})