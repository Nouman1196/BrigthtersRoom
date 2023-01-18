import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useSelector } from "react-redux";
import { baseURL } from "../utilies/api/instance";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FastImage from "react-native-fast-image";
import { USERSVG } from "../assets/svgIcons";
import Theme from "../theme/theme";

const Avatar = ({
    onPress,
    edit,
    style,
    Image
}) => {

    const userData = useSelector(state => state.main.userData)

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
            {(userData?.avatar_url && userData?.avatar_url != '' || Image?.assets) ? (

                <View style={[styles.imageWrapper, style]}>
                    {(Image && Image?.assets !== undefined) ? (
                        <FastImage
                            style={styles.avatar}
                            resizeMode='contain'
                            source={{ uri: 'data:image/jpg;base64,' + Image?.assets[0]?.base64 }}
                        />
                    ) : (
                        <FastImage
                            source={{ uri: baseURL + userData?.avatar_url }}
                            style={styles.avatar}
                            resizeMode='contain'
                        />
                    )}

                </View>
            ) : (
                <View style={[styles.svg, style]}>
                    <USERSVG width={style?.width} height={style?.height} />
                </View>
            )}
            {edit ? (
                <View style={styles.editContainer}>
                    <MaterialIcons color='#00549A' size={15} name='mode-edit' />
                </View>
            ) : null}
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({

    editContainer: {
        width: 22,
        height: 22,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.8)',
        position: 'absolute',
        bottom: 3,
        right: 3,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageWrapper: {
        height: 80,
        width: 80,
        backgroundColor: 'white',
        borderRadius: 80,
        padding: 5,
        elevation: 3,
        zIndex: -1,
        ...Theme.IOSShadow
    },
    avatar: {
        flex: 1,
        borderRadius: 80,
        backgroundColor: 'white'
    },
    svg: {
        backgroundColor: 'white',
        elevation: 3,
        width: 80,
        height: 80,
        borderRadius: 80,
        ...Theme.IOSShadow
    }

})

export default Avatar;