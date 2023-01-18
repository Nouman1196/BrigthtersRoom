import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import Color from "../theme/color";
import Theme from "../theme/theme";
import Entypo from 'react-native-vector-icons/Entypo'
import { useDispatch } from "react-redux";
import { setTopBanner } from "../redux/MainSlice";


const BannerTop = () => {

    const navigation = useNavigation()
    const dispatch = useDispatch()

    return (
        <SafeAreaView style={{backgroundColor:Color.headerColor}}>
            <View style={styles.container}>
            <Text style={styles.text}>Login with Brighter Room to keep records of your progress</Text>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.navigate('Sign_up_instruction')}
                style={styles.Btn}
            >
                <Text style={styles.btnText}>Login Now</Text>
            </TouchableOpacity>
            <Entypo onPress={()=>{dispatch(setTopBanner(false))}} name="cross" color="white" size={14} style={styles.cross} />
        </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        height: 55,
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#00549A"
    },
    text: {
        width: '65%',
        color: "white",
        fontFamily: 'Gilroy-Light',
        fontSize: 12,
        textAlign: 'center',
        marginRight: 10
    },
    Btn: {
        backgroundColor: 'gold',
        elevation: 4,
        ...Theme.IOSShadow,
        borderRadius: 10,
        padding: 8,
        borderColor: 'gold',
        borderWidth: 1,
    },
    btnText: {
        color: Color.themeColorTwo,
        fontFamily: 'Gilroy-ExtraBold',
        fontSize: 12,
    },
    cross:{
        marginRight:-15,
        marginTop:-15,
        marginLeft:10
    }
})

export default BannerTop;