import React from 'react'
import { Text, TouchableOpacity } from 'react-native'


const Btn = ({rightIcon,disabled,containerStyle,onPress,text,textStyle})=>{


        return (
            <TouchableOpacity activeOpacity={0.7} disabled = {disabled}  style={containerStyle} onPress={onPress}>
                <Text style={[{ color: 'white', textAlign: 'center' }, textStyle ]}>{text}</Text>
                {rightIcon && <rightIcon.Family style={{marginLeft:10}} name={rightIcon.Name} color={rightIcon.Color} size={rightIcon.Size} />}
            </TouchableOpacity>
        )
    
}

export { Btn }