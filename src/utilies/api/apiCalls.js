import { setDeviceToken, setGrades, setUserData, setUserProfile } from "../../redux/MainSlice"
import Toast from "react-native-simple-toast"
import { deleteUserAccount, getProfileData, GradesApi, userProfileUpdate } from "./apiController"
import { get_data, save_data } from "../AsyncStorage/AsyncStorage"
import DeviceInfo from 'react-native-device-info';
import { onFaceBookLogout } from "../FbLogin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";


export const clearUserData = ({
    dispatch,
    navigation,
    message
}) => {

    onFaceBookLogout()
    AsyncStorage.getAllKeys()
        .then((keys) => AsyncStorage.multiRemove(keys))
        .then(async () => {
            navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
            dispatch(setUserData(''))
            getAllGrades({ navigation: navigation, dispatch })
            Toast.show(message, Toast.SHORT)

        });

}

export const logoutFunction = ({

    heading = "Logout",
    title = "Are you sure you want to logout?",
    navigation,
    dispatch,
    message,
    deleteUser = false,

}) => {
    Alert.alert(
        heading,
        title,
        [{
                text: "Cancel",
                onPress: () => { },
                style: "cancel"
            },
            {
                text: "OK", onPress: async() => {

                    try {

                        if(deleteUser){

                            const resp = await deleteUserAccount({navigation})
                            
                            if(resp?.status == 200){
                                clearUserData({
                                    dispatch,
                                    message,
                                    navigation
                                })
                            }
                            
                        }else{
                            clearUserData({
                                dispatch,
                                message,
                                navigation
                            })
                        }

                    } catch (error) {
                        console.log(error);
                    }
                }
            }])


}

export const getAllGrades = async ({ navigation, dispatch }) => {


    let userAvailable = await get_data('@user_data')
    let deviceToken = await DeviceInfo.getUniqueId()
    let resp = await GradesApi(navigation)


    dispatch(setDeviceToken(deviceToken))

    if (userAvailable != null)
        dispatch(setUserData(userAvailable))

    if (resp.status == 200) {

        dispatch(setGrades(resp.data))
        return 'abc'

    } else {
        let error = resp?.response?.data?.error?.toString()
        Toast.show(error ? error : "Something Went wrong", Toast.SHORT)
    }

}

export const getUserProfile = async ({ navigation, dispatch }) => {


    try {

        const resp = await getProfileData({ navigation })

        if (resp?.status == 200) {

            dispatch(setUserProfile(resp?.data))

        }

        return resp

    } catch (error) {
        console.log(error, "error")
    }

}

export const updateUserProfile = async ({ navigation, dispatch, data }) => {


    try {

        const formData = new FormData()

        formData.append("first_name", data?.first_name)
        formData.append("last_name", data?.last_name)

        if (data?.new_password != '' && data?.confirm_password != '') {
            formData.append("password", data?.new_password)
        }

        if (data?.image !== '') {

            formData.append("avatar", {
                uri: data?.image?.assets[0].uri,
                type: data?.image?.assets[0].type,
                name: data?.image?.assets[0].fileName,
            })

        }

        const resp = await userProfileUpdate({ navigation, user: formData })

        if (resp?.status == 200) {

            const userP = await get_data('@user_data')
            userP.first_name = resp?.data?.first_name
            userP.last_name = resp?.data?.last_name
            userP.avatar_url = resp?.data?.avatar_url
            await save_data('@user_data', userP)
            dispatch(setUserData(userP))
            Toast.show('User Updated Successfully', Toast.SHORT)
        } else {
            Toast.show('Unable to update user', Toast.SHORT)
        }
        navigation?.goBack()

    } catch (error) {
        console.log(error, "error")
    }

}