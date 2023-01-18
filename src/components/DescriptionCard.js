import React from "react";
import { View, Text, StyleSheet } from 'react-native'
import Theme from "../theme/theme";
import AntDesign from 'react-native-vector-icons/AntDesign'

const DescriptionCard = ({sentence}) => {

    return (
        <View style={styles.CardContainer}>

            <Text style={styles.text} numberOfLines={3}>{sentence}</Text>
            <View style={styles.PlayButton}>
                <AntDesign name="play" color={'white'} size={26} />
            </View>

        </View>
    )

}


const styles = StyleSheet.create({
    text: {
        width: '70%',
        textAlign: 'center',
        marginHorizontal: 12,
        marginVertical: 12,
        fontFamily: 'Gilroy-Light',
        color: 'black',
        
    },
    CardContainer: {
        flexDirection: 'row',
        elevation: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        marginHorizontal: '4%',
        marginBottom:30,
        ...Theme.IOSShadow
    },
    PlayButton: {
        flex: 1,
        backgroundColor: '#FC4C64',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center',
        ...Theme.IOSShadow
    }
})


export default DescriptionCard;