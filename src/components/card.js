import React from 'react';
import { StyleSheet, View } from 'react-native';
import Theme from '../theme/theme';

export default function Card(props) {
    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                {props.children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        // width:"90%",
        borderRadius: 10,
        elevation: 3,
        flex: 1,
        backgroundColor: '#fff',
        ...Theme.IOSShadow
    },
    cardContent: {
        marginHorizontal: 10,
        marginVertical: 10,
    }

})