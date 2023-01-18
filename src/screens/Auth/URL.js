import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native'
import SimpleToast from "react-native-simple-toast";
import { useDispatch } from "react-redux";
import { setServer } from "../../redux/MainSlice";
import Store from "../../redux/Store";
import Color from "../../theme/color";
import { get_data, save_data } from "../../utilies/AsyncStorage/AsyncStorage";

const URL = ({ navigation }) => {

    const servers = [{
        url: 'https://dashboard.brightersroom.com',
        id: 'ua84-lmWjP-A34rTnTpOvQRWlGOHT5pmU2ubUOqJfJs',
        secret: 'ziHhvKDuW948Un3Dx1xX4VNOaBcUVgJH9Na94Ni8oPI'
    },
    {
        url: 'http://192.168.100.236:3000',
        id: 'OivMBO_Qv8cqDMMeKWlYn_XQwKxpZrhuJKAdvY3Ix3w',
        secret: 'xFgVvrll9vwxnDQC71DUPzBs-qT58_-AKm27dOiKXC8'
    }]

    const dispatch = useDispatch()
    const [url, setUrl] = useState('')
    const [clientId, setClientId] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [serverList, setServerList] = useState(servers)

    const checkUrl = async () => {

        const server = await get_data('baseURL')

        if (server !== null) {

            dispatch(setServer(JSON.parse(server)))
            setTimeout(() => {
                navigation.replace('splash')
            }, 500);
        }

    }

    const saveURL = async () => {

        if (url != '') {

            let obj = {
                url: url,
                id: clientId,
                secret: clientSecret
            }
            
            setServer(obj)
            await save_data('baseURL', JSON.stringify(obj))
            
            setTimeout(() => {
                navigation.replace('splash')
            }, 1000);

        } else {
            SimpleToast.show("Provide base url", SimpleToast.SHORT, SimpleToast.BOTTOM)
        }

    }

    const setParameters = (item) => {

        setClientId(item.id)
        setClientSecret(item.secret)
        setUrl(item.url)

    }

    useEffect(() => {
        checkUrl()
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Please Provide BASE URL</Text>
            <TextInput
                value={url}
                onChangeText={(t) => setUrl(t)}
                style={styles.textInput}
                placeholder="Base Url"
            />
            <TextInput
                value={clientId}
                onChangeText={(t) => setClientId(t)}
                style={styles.textInput}
                placeholder="Client ID"
            />
            <TextInput
                value={clientSecret}
                onChangeText={(t) => setClientSecret(t)}
                style={styles.textInput}
                placeholder="Client Secret"
            />
            <TouchableOpacity onPress={saveURL} style={styles.btn}>
                <Text style={styles.btnText}>Submit</Text>
            </TouchableOpacity>

            <FlatList
                data={serverList}
                style={{ flexGrow: 0, maxHeight: 300, marginTop: 20 }}
                renderItem={({ index, item }) => (
                    <TouchableOpacity onPress={setParameters.bind(this, item)} style={styles.list}>
                        <Text style={styles.listItem}>{item.url}</Text>
                    </TouchableOpacity>
                )}
            />

        </View>
    )

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center'
    },
    heading: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '10%'
    },
    textInput: {
        backgroundColor: 'white',
        width: '80%',
        alignSelf: 'center',
        elevation: 2,
        borderRadius: 10,
        paddingLeft: 10,
        marginBottom: 10,
        color:'black'
    },
    btn: {
        width: '30%',
        backgroundColor: Color.themeColorOne,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: '10%',
        elevation: 2
    },
    btnText: {
        color: 'white',
        paddingVertical: 10,
        fontSize: 12,
        fontWeight: 'bold'
    },
    list: {
        backgroundColor: 'white',
        elevation: 2,
        width: '60%',
        alignSelf: 'center',
        marginBottom: 5,
    },
    listItem: {
        color: 'black',
        fontSize: 12,
        textAlign: 'center',
        paddingVertical: 10

    }

})

export default URL;