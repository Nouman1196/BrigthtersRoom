import React from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
const PhoneInput = (data) => {
    let { error,countryCode, NumberPress,containerStyle, leftIconStyle, errorStyle, iconColor, leftIconName, textInputContainerStyle, title, predefineContainer, predefineTextStyle, LeftIconFamily } = data
    return (
        <View style={[containerStyle]} >
            <View style={predefineContainer}>
                {title &&
                    <Text style={predefineTextStyle}>{title}</Text>
                }
                <View style={textInputContainerStyle}>
                    {
                        NumberPress && 
                            <Text onPress={NumberPress} style={{fontSize:24,textAlign:'center',textAlignVertical:'center',borderRightColor:'lightgrey',borderRightWidth:1,height:'100%',width:'30%',color:'#8B8B8B',fontFamily:'Gilroy-Light'}}>{countryCode.flag + ' ' + countryCode.dial_code}</Text>
                    }
                    {leftIconName &&
                        <LeftIconFamily style={leftIconStyle} color={iconColor} size={18} name={leftIconName} />
                    }
                    <TextInput
                        {...data}
                        autoCapitalize="none"
                    />

                </View>
            </View>
            {error && <Text style={[{ color: "#ffe033", marginLeft: '4.5%' }, errorStyle]} >{error}</Text>
            }


        </View>
    );
}
export { PhoneInput }