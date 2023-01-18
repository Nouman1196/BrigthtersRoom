import React, { useState, useEffect } from 'react'
import { Text, View, FlatList, StyleSheet } from 'react-native';
import Theme from '../../theme/theme'
import SuccessErrorSeq from '../../components/SuccessErrorSeq';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default MissingAlphabet2 = ({ lang, data }) => {


    const [finalAlphabet, setFinalAlphabet] = useState([])
    const [missingAlphabets, setMissingAlphabets] = useState([])
    const [successError, setSuccessError] = useState('')
    const [wrongAns, setWrongAns] = useState(9)

    const randomIntFromInterval = (min, max) => { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }


    function shuffle(array, secondArray) {
        let rand = Math.random() - 0.5;
        array.sort(() => rand);
        secondArray && secondArray.sort(() => rand)
    }


    const checkAnswer = (selAlpha, indexRec) => {

        let finalAlphabetArray = finalAlphabet
        let array = finalAlphabet[indexRec]
        let found = false
        let wrongAnsA = wrongAns

        for (let index = 0; index < array.length; index++) {

            if (array[index].hide == true) {

                if (array[index].item === selAlpha.item) {
                    found = true
                    finalAlphabetArray[indexRec][index].hide = false
                    wrongAnsA -= 1
                    if (wrongAnsA == 0) {
                        setSuccessError('done')
                    } else {
                        setSuccessError(false)
                    }
                    setWrongAns(wrongAnsA)
                }

            }

        }

        if (!found) {
            setSuccessError(true)
        }

        setTimeout(() => {
            setSuccessError('')
        }, 1700);

    }


    const generateOutput = () => {

        // Missing Alphabet //

        let Missed = [];

        for (let index = 0; index < data.length; index++) {

            let row = data[index]

            for (let indexj = 0; indexj < row.length; indexj++) {

                if (row[indexj]?.option) {
                    Missed.push(row[indexj]?.option)
                    break;
                }

            }

        }

        setMissingAlphabets([...Missed])

    }

    useEffect(() => {
        generateOutput()
    }, [])

    return (
        <View style={{ flex: 1 }}>

            {successError !== '' &&
                <SuccessErrorSeq successError={successError} />
            }

            <View style={{ flex: 1, flexDirection: 'row' }}>
                <FlatList
                    contentContainerStyle={{ alignItems: 'center' }}
                    style={{ flex: 1, alignSelf: 'center' }}
                    showsHorizontalScrollIndicator={true}
                    data={data}
                    renderItem={({ item, index }) => (
                        <View key={index} style={{ flexDirection: 'row' }}>
                            {
                                item.map((item) => (
                                    <View style={styles.LeftBox}>
                                        <Text key={Math.random()} style={Theme.missingAlphabetText}>
                                            {!item?.option ? item.content.title : '-'}
                                        </Text>
                                    </View>
                                ))
                            }
                        </View>
                    )}
                />

                <FlatList
                    contentContainerStyle={{ alignItems: 'center' }}
                    style={{ flex: 1, alignSelf: 'center', }}
                    data={missingAlphabets}
                    renderItem={({ index, item }) => (
                        <View key={index} style={{ flexDirection: 'row' }}>
                            {item?.map((single) => <Text key={Math.random()} onPress={checkAnswer.bind(this, single, index)} style={{ ...styles.change, ...styles.singleText }} >{single?.title}</Text>)}
                        </View>
                    )}
                />

            </View>

        </View>
    )

}


const styles = StyleSheet.create({
    change: { ...Theme.missingAlphabetText, width: 46, height: 46, fontSize: 23, marginBottom: '5%' },
    textContainer: { textAlign: 'center', marginBottom: '5%', },
    singleText: { borderWidth: 0 },
    LeftBox:{
        ...Theme.SequenceBox,
        width:wp('8%'),
        height:wp('8%'),
    }
})