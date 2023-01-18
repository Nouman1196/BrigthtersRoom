import React from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import Color from '../theme/color'
const FormInput = (data) => {
    let { error, rightIconName, containerStyle,leftIconStyle,errorStyle, iconColor, onPressIcon, forgetPassword, forget, leftIconName, textInputContainerStyle, title, predefineContainer, predefineTextStyle, LeftIconFamily, RightIconFamily } = data
    return (
        <View style={[containerStyle]} >
            <View style={predefineContainer}>
                {title &&
                    <Text style={predefineTextStyle}>{title}</Text>
                }
                <View style={textInputContainerStyle}>
                    {leftIconName &&
                        <LeftIconFamily style={leftIconStyle} color={iconColor} size={18} name={leftIconName} />
                    }
                    <TextInput
                        {...data}
                        autoCapitalize="none"
                        
                        
                    />
                    {/* </View> */}
                    {rightIconName &&
                        <RightIconFamily style={{ textAlignVertical: 'center' }} color={iconColor} onPress={onPressIcon} size={20} name={rightIconName} />
                    }
                </View>
            </View>
            {error && <Text style={[{ color: Color.headerColor,marginTop:2,marginLeft:2},errorStyle]} >{error}</Text>
            }
            {forget &&
                <TouchableOpacity style={{ marginTop: 5,marginRight:'4.5%' }} onPress={forgetPassword}>
                    <Text style={{ textAlign: 'right', marginTop: 5, fontWeight:'500',color: 'white',fontFamily:'Lato-Black',fontSize:15 }}>Forget password?</Text>
                </TouchableOpacity>
            }
            
        </View>
    );
}
export { FormInput }