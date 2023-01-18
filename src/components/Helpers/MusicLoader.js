import React from "react";
import { Modal, View, StyleSheet, ActivityIndicator } from 'react-native'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { useSelector } from "react-redux";
import Color from "../../theme/color";
import Theme from "../../theme/theme";

const MusicLoader = () => {

    const loading = useSelector(state => state.main.musicLoader)

    return (
        <Modal visible={loading} transparent={true}>
            <View style={styles.mainView}>
                <ActivityIndicator style={{ position: 'absolute' }} color={Color.headerColor} size={20} />
                {/* <Fontisto name="applemusic" size={18} color={Color.headerColor} /> */}
            </View>
        </Modal>
    )

}

const styles = StyleSheet.create({

    mainView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

})

export default MusicLoader;