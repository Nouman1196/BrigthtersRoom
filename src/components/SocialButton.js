import React from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'

const SocialBtn = (props) => {

    return (
        <TouchableOpacity disabled={props.disabled} style={props.containerStyle} onPress={props.onPress}>
            <View style={[styles.iconContainer,props?.iconContainer]}>
                <props.iconLib name={props.iconName} size={props.iconSize} color={props.iconColor} />
            </View>
            <Text style={[styles.text, props.textStyle]}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    iconContainer: {
        textAlign: 'center',
        borderRadius: 5,
        width: 55,
        height: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        flex: 1,
        textAlign: 'center',
        borderLeftWidth: 0.5
    }

})

export { SocialBtn }