import React from 'react'
import { View, Text, StyleSheet } from 'react-native'


const UrduEnglishTabs = ({ activeIndex, setActiveIndex,enable, setSelectedItem }) => {


    return (
        <>
        {enable && 
        <View style={{ flexDirection: 'row' }}>
            <Text onPress={()=>{setActiveIndex(0);setSelectedItem&&setSelectedItem('')}} style={[styles.common, activeIndex == 0 ? styles.active : styles.Inactive]}>English</Text>
            <Text onPress={()=>{setActiveIndex(1);setSelectedItem&&setSelectedItem('')}} style={[styles.common, activeIndex == 1 ? styles.active : styles.Inactive, { fontWeight: 'bold' }]}>اردو</Text>
        </View>
        }
        </>
    )

};


const styles = StyleSheet.create({

    common: {
        fontFamily: 'Gilroy-ExtraBold',
        fontSize: 30,
        paddingVertical: '2%',
        textAlign: 'center',
    },
    active: {


        flex: 1,
        color: '#FDCF09',
        backgroundColor: '#00549A',

    },
    Inactive: {
        flex: 1,
        color: '#FFFFFF',
        backgroundColor: '#0060B1',


    }

});


export default UrduEnglishTabs;