import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import Color from '../theme/color'
import FeatureListItem from './FeatureListItem';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';


const FeatureList = ({ data, hideHeader, dark, colorSel, iconSize, style }) => {

    const TopRender = () => {
        return (

            <View style={{ marginTop: '3%', marginBottom: '4%' }}>
                <Text style={[styles.headerTopHeading, dark && { color: '#241049' }]}>Features & Highlights</Text>
                <Text style={styles.headerTopTitle}>What makes BrightersRoom an awesome E-Learning Platform</Text>
            </View>
        )
    }

    return (
        <SafeAreaView>
            {!hideHeader && TopRender()}
            <View style={style}>
                {data.map((item) => {
                    return <FeatureListItem data={item} color={colorSel} iconSize={iconSize} />
                })}
            </View>
        </SafeAreaView>
    )

};

const styles = StyleSheet.create({
    headerTopHeading: { fontFamily: 'Lato-Bold', color: '#FFFFFF', fontSize: wp('7%'), textAlign: 'center' },
    headerTopTitle: { fontFamily: 'Lato-Regular', color: 'white', textAlign: 'center', fontSize: wp('3.5%'), marginHorizontal: '17%', marginTop: '3%' }
})

export default FeatureList;
