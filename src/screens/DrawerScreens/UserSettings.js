import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native'
import { useDispatch } from "react-redux";
import Color from "../../theme/color";
import Theme from "../../theme/theme";
import { getUserProfile, logoutFunction } from "../../utilies/api/apiCalls";
import { logoutApple } from "../../utilies/appleSignup/appleSignup";


const UserSettings = ({
    navigation
}) => {

    const dispatch = useDispatch()

    const goToProfile = () => {

            getUserProfile({ navigation: navigation, dispatch })
                .then(() => {
                    navigation.navigate('EditProfile')
                })
    }

    const deleteAccount = () => {
        logoutFunction({
            dispatch,
            navigation,
            heading:"Delete Profile",
            title:"Are you sure you want to delete Account",
            message:"Profile Deleted Successfully",
            deleteUser:true
        })
    }

    return (
        <View style={styles.container}>

            <TouchableOpacity
                onPress={goToProfile}
                style={styles.btn}
            >
                <Text style={styles.btnText}>User Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn}
                onPress={deleteAccount}
            >
                <Text style={styles.btnText}>Delete User Account</Text>
            </TouchableOpacity>

        </View>
    )

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn: {
        borderColor: Color.headerColor,
        borderWidth: 2,
        width: '80%',
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,

    },
    btnText: {
        fontFamily: 'Gilroy-ExtraBold',
        color: 'black',
        fontSize: 16
    }

})

export default UserSettings