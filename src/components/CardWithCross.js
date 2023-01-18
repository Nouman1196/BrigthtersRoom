import React from 'react'
import { View, StyleSheet, ImageBackground, Image } from 'react-native'
import Theme from '../theme/theme'
import Entypo from 'react-native-vector-icons/Entypo'


export default CardWithCross = ({ navigation, background, back, ImagePath, ...props }) => {

    return (
        <View style={Theme.CardWithCrossContainer}>
            <View style={styles.imageContainer}>
                <Image source={ImagePath} resizeMode='contain' style={{ flex: 1, height: null, width: null }} />
            </View>
            <ImageBackground resizeMode='cover' source={background ? require('../assets/cardCrossBackground.png') : {}} style={styles.backgroundImage}>

                <Entypo onPress={back ? back : () => navigation.goBack()} style={styles.iconStyle} color={'black'} size={26} name={'circle-with-cross'} />
                {props.children}

            </ImageBackground>
        </View>
    )

}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        paddingVertical: '5%',
        paddingHorizontal: '4%'
    },
    iconStyle: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex:1
    },
    imageContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '40%'
    }
})