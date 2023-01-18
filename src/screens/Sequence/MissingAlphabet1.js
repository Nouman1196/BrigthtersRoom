import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import Color from '../../theme/color';
import Theme from '../../theme/theme';
import SuccessErrorSeq from '../../components/SuccessErrorSeq';
import { ProgressUpdate } from '../../utilies/api/apiController';

export default MissingAlphabet1 = ({ data, lang, parent_ID, navigation }) => {

    const [alphabets, setalphabets] = useState(data)

    const [missingAlphabets, setMissingAlphabets] = useState([])
    const [requiredIndex, setRequiredOndex] = useState(-1)
    const [successError, setSuccessError] = useState('')
    const [startScreen, setStartScreen] = useState(false)

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    const findMissingAlphabets = () => {

        let alphabet = [...alphabets]

        let result = alphabet.filter((single) => (single.status == "hide"))

        shuffle(result)
        shuffle(result)

        setMissingAlphabets(result.reverse())

    }

    const checkAnswer = (selAlpha) => {

        let array = alphabets
        let found = false

        for (let index = 0; index <= requiredIndex; index++) {

            if (array[index].title === selAlpha) {
                array[index].status = "show"
                setalphabets([...array])
                found = true
                missingAlphabets.length !== 0 && setSuccessError(false)
                break;
            }

        }

        if (!found) {
            setSuccessError(true)
        }

        setTimeout(() => {
            setSuccessError('')
        }, 1700);

    }


    const findMissingIndex = () => {

        let array = [...alphabets]

        if (lang && lang == 'urdu') {

            let found = false
            let firstCount = Math.ceil(alphabets.length / 3)

            for (let index = 0; firstCount > 0; index = index + 3, firstCount--) {

                let j = array[index + 2] != undefined ? index + 2 : index + 1

                for (; j >= index; j--) {

                    if (array[j].status == 'hide') {
                        found = true
                        setRequiredOndex(j)
                        break;
                    }

                }

                if (found)
                    break;

            }

        } else {

            for (let index = 0; index < array.length; index++) {

                if (array[index].status == 'hide') {
                    setRequiredOndex(index)
                    break;
                }

            }

        }


    }

    useEffect(() => {

        if (alphabets.length != 0) {
            findMissingIndex()
            findMissingAlphabets()
        }

    }, [alphabets])

    useEffect(() => {

        setStartScreen(true)

    }, [])


    useEffect(() => {

        if (missingAlphabets.length == 0 && requiredIndex != -1) {

            ProgressUpdate({
                lesson_id: parent_ID,
                content_type: "lesson"
            }, navigation)
                .then((resp) => {
                })
                .catch((err) => {
                    console.log(err, "err")
                })

            setRequiredOndex(-1)
            setSuccessError('done')
            setTimeout(() => {
                setSuccessError('')
            }, 1700);

        }

    }, [missingAlphabets])

    return (
        <View style={{ flex: 1 }}>

            <FlatList
                contentContainerStyle={{ alignItems: 'center' }}
                style={{ flexGrow: 0, marginTop: '8%' }}
                data={missingAlphabets}
                numColumns={5}
                renderItem={({ index, item }) => (
                    <TouchableOpacity style={styles.TextBox} onPress={checkAnswer.bind(this, item.title)}>
                        <Text style={Theme.missingAlphabetText} key={item.title}>{item.title}</Text>
                    </TouchableOpacity>
                )}
            />


            {successError !== '' &&
                <SuccessErrorSeq successError={successError} />
            }

            <View style={Theme.Ycenter}>


                <FlatList
                    contentContainerStyle={{ alignItems: 'center' }}
                    style={{ flexGrow: 0 }}
                    numColumns={3}
                    data={alphabets}
                    renderItem={({ item, index }) => (
                        <View style={[styles.BorderBox, requiredIndex == index && { backgroundColor: Color.themeColorOne }]}>
                            <Text style={[Theme.missingAlphabetText, item.hide && { backgroundColor: '#FF2176' }, requiredIndex == index && { color: 'white' }]}>
                                {item.status !== "hide" ? item.title : '-'}
                            </Text>
                        </View>
                    )}
                />


            </View>


        </View>
    )

}


const styles = StyleSheet.create({
    textContainer: { textAlign: 'center', marginBottom: '5%', },
    TextBox: {
        ...Theme.SequenceBox,

    },
    BorderBox: {
        ...Theme.SequenceBox,
        marginHorizontal: 10
    }
})