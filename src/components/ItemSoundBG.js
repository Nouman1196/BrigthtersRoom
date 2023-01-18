import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import Theme from '../theme/theme'

const ItemSoundBG = (props) => {

    return (

        <View style={{ ...Theme.ITMSOUNDBG, ...props.style }}>
            <FastImage style={{ ...styles.Image, height: '18%', top: 0, }} resizeMode='stretch' source={require('../assets/itemSoundTopImage.png')} />

            {props.children}

            <FastImage style={{ ...styles.Image, height: '23%', bottom: 0, }} resizeMode='stretch' source={require('../assets/itemSoundBottomImage.png')} />
        </View>

    )

}

const styles = StyleSheet.create({
    Image: { position: 'absolute', width: '100%',zIndex:-1 }
})


export default ItemSoundBG;