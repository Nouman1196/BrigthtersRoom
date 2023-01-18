import React, { useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Image } from 'react-native'
import { launchImageLibrary } from "react-native-image-picker";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../components/Avatar";
import { Btn } from "../../components/btn";
import { FormInput } from "../../components/FormInput";
import Color from "../../theme/color";
import Theme from "../../theme/theme";
import { updateUserProfile } from "../../utilies/api/apiCalls";
import { ProfileValidation } from "../../utilies/validation";
import Loader from "../../components/Loader";


const EditProfile = ({
    navigation,
}) => {

    const dispatch = useDispatch()
    const Profile = useSelector(state => state.main.profile)
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState({
        first_name: Profile?.first_name,
        last_name: Profile?.last_name,
        new_password: "",
        confirm_password: "",
        image: "",
    })

    const [errortext, setErrortext] = useState('');

    const launchGallery = async () => {

        let option = {
            mediaType: 'photo',
            quality: 1,
            includeBase64: true
        }

        const result = await launchImageLibrary(option);

        if (result.didCancel) {
            setUserData(data => ({
                ...data,
                image: ''
            }))
        } else {
            setUserData(data => ({
                ...data,
                image: result
            }))
        }


    }


    const submit = async () => {

        let validate = ProfileValidation(userData)

        if (validate.valid == false) {
            setErrortext(validate.errors);
        } else {

            setErrortext('')
            setLoading(true)
            await updateUserProfile({ navigation, dispatch, data: userData })
            setLoading(false)

        }

    }



    return (
        <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
            <Loader animating={loading} />
            <KeyboardAvoidingView
                style={{ flex: 1, justifyContent: 'center' }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View style={styles.image}>
                    <Avatar Image={userData?.image} style={{ width: 100, height: 100 }} edit={true} onPress={launchGallery} />
                </View>
                <Text style={styles.email}>{Profile?.email}</Text>
                <FormInput
                    placeholder="First Name"
                    onChangeText={(text) => { setUserData(data => ({ ...data, first_name: text })) }}
                    textInputContainerStyle={Theme.InputView}
                    iconColor="black"
                    predefineTextStyle={Theme.inputLabel}
                    style={[Theme.TextInputStyle, { fontSize: 18 }]}
                    containerStyle={styles.Input}
                    placeholderTextColor={Color.AuthInputsPlaceholder}
                    value={userData?.first_name}
                    error={errortext === 'First Name is Required' ? 'First Name is Required' : null}
                />

                <FormInput
                    placeholder="Last Name"
                    onChangeText={(text) => { setUserData(data => ({ ...data, last_name: text })) }}
                    textInputContainerStyle={Theme.InputView}
                    iconColor="black"
                    predefineTextStyle={Theme.inputLabel}
                    style={[Theme.TextInputStyle, { fontSize: 18 }]}
                    containerStyle={styles.Input}
                    placeholderTextColor={Color.AuthInputsPlaceholder}
                    value={userData?.last_name}
                    error={errortext === 'Last Name is Required' ? 'Last Name is Required' : null}
                />

                <FormInput
                    placeholder="New Password"
                    onChangeText={(text) => { setUserData(data => ({ ...data, new_password: text })) }}
                    textInputContainerStyle={Theme.InputView}
                    iconColor="black"
                    predefineTextStyle={Theme.inputLabel}
                    style={[Theme.TextInputStyle, { fontSize: 18 }]}
                    containerStyle={styles.Input}
                    placeholderTextColor={Color.AuthInputsPlaceholder}
                    value={userData?.new_password}
                    error={errortext === 'Please enter your New Password' ? 'Please enter your New Password' : null}
                />

                <FormInput
                    placeholder="Confirm Password"
                    onChangeText={(text) => { setUserData(data => ({ ...data, confirm_password: text })) }}
                    textInputContainerStyle={Theme.InputView}
                    iconColor="black"
                    predefineTextStyle={Theme.inputLabel}
                    style={[Theme.TextInputStyle, { fontSize: 18 }]}
                    containerStyle={styles.Input}
                    placeholderTextColor={Color.AuthInputsPlaceholder}
                    value={userData?.confirm_password}
                    error={errortext === 'Please enter your Confirm Password' ? 'Please enter your Confirm Password' : errortext === 'Password & Confirm Password Does not Match' ? 'Password & Confirm Password Does not Match' : null}
                />
                
                <Btn
                    onPress={submit}
                    text="Update User"
                    containerStyle={styles.btn}
                    textStyle={[Theme.btnTextstyle, styles.btnText]}
                />
            </KeyboardAvoidingView>
        </View>
    )

}

const styles = StyleSheet.create({
    image: {
        alignSelf: 'center',
        marginTop: '-10%'
    },
    Input: {
        marginBottom: '2%',
        marginHorizontal: '10%',
    },
    email: {
        color: 'black',
        textAlign: 'center',
        color: Color.headerColor,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: '5%'
    },
    btn: {
        ...Theme.btnStyle,
        width: '45%',
        marginTop: '10%',
        backgroundColor: Color.themeColorOne

    },
    btnText:{
        fontSize:16,
    }

})

export default EditProfile;