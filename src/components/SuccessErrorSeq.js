import React from 'react'
import { View, Text, Image, Modal } from 'react-native'
import Theme from '../theme/theme'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const InsideContent = ({ successError, style }) => {

    return (
        <View style={[Theme.successErrorContainer, style]}>
            {
                successError == true ?
                    <Image resizeMode='contain' style={{ width: wp('50%'), height: wp('50%') }} source={require('../assets/error-img.gif')} /> :
                    successError == false ?
                        <Image resizeMode='contain' style={{ width: wp('50%'), height: wp('50%') }} source={require('../assets/success.gif')} /> :
                        successError === 'done' ?
                            <Image resizeMode='contain' style={{ width: wp('50%'), height: wp('50%') }} source={require('../assets/congrats.gif')} /> :
                            null
            }
        </View>
    )

}

export default SuccessErrorSeq = ({ successError, modal, MainStyle }) => {


    return (
        <>
            {
                modal == false ?
                    <InsideContent style={MainStyle} successError={successError} />
                    :
                    <Modal transparent={true}>
                        <InsideContent style={MainStyle} successError={successError} />
                    </Modal>

            }
        </>
    )

}