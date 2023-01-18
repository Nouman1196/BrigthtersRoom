import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import Color from '../../theme/color';
import Theme from '../../theme/theme'
import SuccessErrorSeq from '../../components/SuccessErrorSeq';

export default ReArrange = ({ option }) => {


    const [alphabets, setalphabets] = useState([])
    const [requiredIndex, setRequiredOndex] = useState(-1)
    const [successError, setSuccessError] = useState('')
    const [backUpArray, setBackupArray] = useState([])
    const [totalFix, setTotalFix] = useState(0)
    const [startScreen, setStartScreen] = useState(false)
    const [totalCount, settotalCount] = useState(-1)

    const randomIntFromInterval = (min, max) => { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }


    const checkAnswer = (item, index) => {

        let gotBackup = [...backUpArray]
        let found = false
        let orignal = [...alphabets]


        if (gotBackup[requiredIndex].item == item.item) {

            let temp = { "fix": orignal[requiredIndex].fix, "item": orignal[requiredIndex].item };
            orignal[requiredIndex].fix = true
            orignal[requiredIndex].item = orignal[index].item
            orignal[index].fix = temp.fix
            orignal[index].item = temp.item
            found = true
            setTotalFix(totalFix + 1)
            successError != 26 && setSuccessError(false)
            setalphabets([...orignal])
        }

        if (!found) {
            successError != 26 && setSuccessError(true)
        }

        setTimeout(() => {
            setSuccessError('')
        }, 1700);

    }


    const swapTheElements = () => {

        let changeAble = alphabets.map((single) => ({ "fix": single.fix ? single.fix : false, item: single.item }))

        let BackupAlphabets = [
            {
                item: 'A',
                fix: true
            },
            {
                item: 'B',
            },
            {
                item: 'C',
            },
            {
                item: 'D',
            },
            {
                item: 'E',
            },
            {
                item: 'F',
            },
            {
                item: 'G',
            },
            {
                item: 'H',
            },
            {
                item: 'I',
            },
            {
                item: 'J',
            },
            {
                item: 'K',
            },
            {
                item: 'L',
            },
            {
                item: 'M',
            },
            {
                item: 'N',
            },
            {
                item: 'O',
            },
            {
                item: 'P',
            },
            {
                item: 'Q',
            },
            {
                item: 'R',
            },
            {
                item: 'S',
            },
            {
                item: 'T',
            },
            {
                item: 'U',
            },
            {
                item: 'V',
            },
            {
                item: 'W',
            },
            {
                item: 'X',
            },
            {
                item: 'Y',
            },
            {
                item: 'Z',
                fix: true
            }
        ]

        let BackupNumbers = [
            {
                item: '1',
                fix: true
            },
            {
                item: '2',
            },
            {
                item: '3',
            },
            {
                item: '4',
            },
            {
                item: '5',
            },
            {
                item: '6',
            },
            {
                item: '7',
            },
            {
                item: '8',
            },
            {
                item: '9',
            },
            {
                item: '10',
            },
            {
                item: '11',
            },
            {
                item: '12',
            },
            {
                item: '13',
            },
            {
                item: '14',
            },
            {
                item: '15',
            },
            {
                item: '16',
            },
            {
                item: '17',
            },
            {
                item: '18',
            },
            {
                item: '19',
            },
            {
                item: '20',
            },
            {
                item: '21',
            },
            {
                item: '22',
            },
            {
                item: '23',
            },
            {
                item: '24',
            },
            {
                item: '25',
            },
            {
                item: '26',
                fix: true
            }
        ]

        backUpArray.length == 0 && setBackupArray(option == 'ReArrangeAlphabets' ? BackupAlphabets : option == 'ReArrangeNumbers' ? BackupNumbers : null)

        let runningCheck = 0;

        for (let index = 1; index < changeAble.length - 1; index++) {

            for (let jindex = index + 1; jindex < changeAble.length - 1; jindex++) {

                let num = randomIntFromInterval(65, 90) - 65

                if (changeAble[index].fix == false && changeAble[num].fix == false) {

                    let temp = changeAble[index]
                    changeAble[index] = changeAble[num]
                    changeAble[num] = temp
                    runningCheck++;
                    break;

                }

            }

        }

        setalphabets([...changeAble])

    }

    const generateOutput = () => {


        let BackupAlphabets = [
            {
                item: 'A',
                fix: true
            },
            {
                item: 'B',
            },
            {
                item: 'C',
            },
            {
                item: 'D',
            },
            {
                item: 'E',
            },
            {
                item: 'F',
            },
            {
                item: 'G',
            },
            {
                item: 'H',
            },
            {
                item: 'I',
            },
            {
                item: 'J',
            },
            {
                item: 'K',
            },
            {
                item: 'L',
            },
            {
                item: 'M',
            },
            {
                item: 'N',
            },
            {
                item: 'O',
            },
            {
                item: 'P',
            },
            {
                item: 'Q',
            },
            {
                item: 'R',
            },
            {
                item: 'S',
            },
            {
                item: 'T',
            },
            {
                item: 'U',
            },
            {
                item: 'V',
            },
            {
                item: 'W',
            },
            {
                item: 'X',
            },
            {
                item: 'Y',
            },
            {
                item: 'Z',
                fix: true
            }
        ]

        let BackupNumbers = [
            {
                item: '1',
                fix: true
            },
            {
                item: '2',
            },
            {
                item: '3',
            },
            {
                item: '4',
            },
            {
                item: '5',
            },
            {
                item: '6',
            },
            {
                item: '7',
            },
            {
                item: '8',
            },
            {
                item: '9',
            },
            {
                item: '10',
            },
            {
                item: '11',
            },
            {
                item: '12',
            },
            {
                item: '13',
            },
            {
                item: '14',
            },
            {
                item: '15',
            },
            {
                item: '16',
            },
            {
                item: '17',
            },
            {
                item: '18',
            },
            {
                item: '19',
            },
            {
                item: '20',
            },
            {
                item: '21',
            },
            {
                item: '22',
            },
            {
                item: '23',
            },
            {
                item: '24',
            },
            {
                item: '25',
            },
            {
                item: '26',
                fix: true
            }
        ]

        let array = (option == 'ReArrangeAlphabets' ? BackupAlphabets : option == 'ReArrangeNumbers' ? BackupNumbers : null)


        let amtFIx = 2

        for (let index = 1; index < 8; index++) {

            for (let index = 1; index < array.length - 1; index++) {

                let num = randomIntFromInterval(65, 90) - 65

                if (array[num].fix != true && array[num - 1].fix != true && array[num + 1].fix != true) {
                    array[num].fix = true
                    amtFIx = amtFIx + 1;
                    break;
                }

            }

        }

        setTotalFix(amtFIx)
        setalphabets([...array])

    }


    const findMissingIndex = () => {
        let array = [...alphabets]
        let abTotal = totalFix

        for (let index = 0; index < array.length; index++) {

            if (array[index].fix == false) {

                if (array[index].item === (option == 'ReArrangeAlphabets' ? String.fromCharCode(65 + index) : option == 'ReArrangeNumbers' ? (index + 1).toString() : null)) {

                    array[index].fix = true
                    checkError = true
                    abTotal = abTotal + 1

                } else {

                    setRequiredOndex(index)
                    break;

                }
            }

        }

        setTotalFix(abTotal)


    }

    useEffect(() => {

        if (startScreen) {
            generateOutput()
            setBackupArray([])
        }

    }, [startScreen])

    useEffect(() => {

        if (alphabets?.length != 0 && backUpArray?.length == 0) {
            swapTheElements()
        }

        if (alphabets?.length != 0) {
            findMissingIndex()
        }

    }, [alphabets])

    useEffect(() => {

        if (totalFix == totalCount) {
            setSuccessError('done')
        }
    }, [totalFix])


    useEffect(() => {

        if (option == 'ReArrangeAlphabets') {
            settotalCount(26)
        }
        else if (option == 'ReArrangeNumbers') {
            settotalCount(26)
        }

        setStartScreen(true)

    }, [])


    return (
        <View style={{ flex: 1 }}>


            {successError !== '' &&
                <SuccessErrorSeq successError={successError} />
            }

            <FlatList
                contentContainerStyle={{ flex: 1, ...Theme.centerItem }}
                numColumns={4}
                showsHorizontalScrollIndicator={true}
                data={alphabets}
                renderItem={({ item, index }) => (
                    <Text onPress={checkAnswer.bind(this, item, index)} style={[Theme.missingAlphabetText, item.fix && { backgroundColor: '#A0F500' }, requiredIndex == index && { borderColor: Color.themeColorOne, borderWidth: 2 }]}>
                        {!item.hide ? item.item : '-'}
                    </Text>
                )}
            />

        </View>
    )

}


const styles = StyleSheet.create({
    singleText: { ...Theme.missingAlphabetText, fontSize: 30 }
})