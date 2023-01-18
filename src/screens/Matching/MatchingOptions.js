import React, { useState, useEffect } from 'react'
import { View, Text, StatusBar, ImageBackground, SafeAreaView, FlatList, StyleSheet } from 'react-native'
import { HomeBtn } from '../../components/HomeButton'
import Theme from '../../theme/theme'
import Color from '../../theme/color'
import { ItemAndSOundBg,MatchLettersPGEg,MatchPicturesPGEg, MatchPGAnimals, MatchPGNumAnimals, MatchPGBirds, MatchPGToys, MatchPGVegetables, MatchPGFruits, MatchPGNumBirds, MatchPGNumFruits, MatchPGNumToys, MatchPGNumVegetables } from '../../assets/svgIcons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ItemSoundBG from '../../components/ItemSoundBG'


const MatchingOptions = ({ navigation, route }) => {

    const { data } = route.params;

    const [ListData, setListData] = useState([])

    let PGEnglishMatchingData = [
        {
            title: 'Match Letters',
            Image: MatchLettersPGEg,
            data: {
                "Assets": [
                    {
                        titleimg: require('../../assets/PGBirdPigeon.png'),
                        title: "Pigeon",
                        img: require('../../assets/PGBirdPigeon.png')
                    },
                    {
                        titleimg: require('../../assets/PGBirdPigeon.png'),
                        title: "Duck",
                        img: require('../../assets/PGBIrdDuck.png')
                    },
                    {
                        titleimg: require('../../assets/PGBirdPigeon.png'),
                        title: "Owl",
                        img: require('../../assets/PGBirdOwl.png')
                    },
                    {
                        titleimg: require('../../assets/PGBirdPigeon.png'),
                        title: "Penguin",
                        img: require('../../assets/PGBirdPenguin.png')
                    },
                    {
                        titleimg: require('../../assets/PGBirdPigeon.png'),
                        title: "Ostrich",
                        img: require('../../assets/PGBirdOstrich.png')
                    },
                    {
                        titleimg: require('../../assets/PGBirdPigeon.png'),
                        title: "Parrot",
                        img: require('../../assets/PGBirdParrot.png')
                    },
                    {
                        titleimg: require('../../assets/PGBirdPigeon.png'),
                        title: "Hen",
                        img: require('../../assets/PGBirdHen.png')
                    },
                    {
                        titleimg: require('../../assets/PGBirdPigeon.png'),
                        title: "Crow",
                        img: require('../../assets/PGBirdCrow.png')
                    }
                ]

            },
        },
        {
            title: 'Match Pictures',
            Image: MatchPicturesPGEg,
            data: {
                "Assets": [
                    {
                        title: "Train",
                        img: require('../../assets/PGMatching/PGNumMatchToys/1.png')
                    },
                    {
                        title: "Drums",
                        img: require('../../assets/PGMatching/PGNumMatchToys/2.png')
                    },
                    {
                        title: "Aeroplanes",
                        img: require('../../assets/PGMatching/PGNumMatchToys/3.png')
                    },
                    {
                        title: "Cars",
                        img: require('../../assets/PGMatching/PGNumMatchToys/4.png')
                    },
                    {
                        title: "Footballs",
                        img: require('../../assets/PGMatching/PGNumMatchToys/5.png')
                    },
                    {
                        title: "Helicopters",
                        img: require('../../assets/PGMatching/PGNumMatchToys/6.png')
                    },
                    {
                        title: "Robots",
                        img: require('../../assets/PGMatching/PGNumMatchToys/7.png')
                    },
                    {
                        title: "Ships",
                        img: require('../../assets/PGMatching/PGNumMatchToys/8.png')
                    }
                ]

            },
        }
    ]

    let PGMatchingData = [
        {
            title: 'Match Animals',
            Image: MatchPGAnimals,
            data: {
                "Assets": [
                    {
                        title: "Camel",
                        img: require('../../assets/PGAnimalCamel.png')
                    },
                    {
                        title: "Monkey",
                        img: require('../../assets/PGAnimalMonkey.png')
                    },
                    {
                        title: "Elephant",
                        img: require('../../assets/PGAnimalElephant.png')
                    },
                    {
                        title: "Horse",
                        img: require('../../assets/PGAnimalHorse.png')
                    },
                    {
                        title: "Dog",
                        img: require('../../assets/PGAnimalDog.png')
                    },
                    {
                        title: "Lion",
                        img: require('../../assets/PGAnimalLion.png')
                    },
                    {
                        title: "Cat",
                        img: require('../../assets/PGAnimalCat.png')
                    },
                    {
                        title: "Goat",
                        img: require('../../assets/PGAnimalGoat.png')
                    }
                ]

            },
        },
        {
            title: 'Match Birds',
            Image: MatchPGBirds,
            data: {
                "Assets": [
                    {
                        title: "Pigeon",
                        img: require('../../assets/PGBirdPigeon.png')
                    },
                    {
                        title: "Duck",
                        img: require('../../assets/PGBIrdDuck.png')
                    },
                    {
                        title: "Owl",
                        img: require('../../assets/PGBirdOwl.png')
                    },
                    {
                        title: "Penguin",
                        img: require('../../assets/PGBirdPenguin.png')
                    },
                    {
                        title: "Ostrich",
                        img: require('../../assets/PGBirdOstrich.png')
                    },
                    {
                        title: "Parrot",
                        img: require('../../assets/PGBirdParrot.png')
                    },
                    {
                        title: "Hen",
                        img: require('../../assets/PGBirdHen.png')
                    },
                    {
                        title: "Crow",
                        img: require('../../assets/PGBirdCrow.png')
                    }
                ]

            },
        },
        {
            title: 'Match Toys',
            Image: MatchPGToys,
            data: {
                "Assets": [
                    {
                        title: "Train",
                        img: require('../../assets/PGMatching/PGNumMatchToys/1.png')
                    },
                    {
                        title: "Drums",
                        img: require('../../assets/PGMatching/PGNumMatchToys/2.png')
                    },
                    {
                        title: "Aeroplanes",
                        img: require('../../assets/PGMatching/PGNumMatchToys/3.png')
                    },
                    {
                        title: "Cars",
                        img: require('../../assets/PGMatching/PGNumMatchToys/4.png')
                    },
                    {
                        title: "Footballs",
                        img: require('../../assets/PGMatching/PGNumMatchToys/5.png')
                    },
                    {
                        title: "Helicopters",
                        img: require('../../assets/PGMatching/PGNumMatchToys/6.png')
                    },
                    {
                        title: "Robots",
                        img: require('../../assets/PGMatching/PGNumMatchToys/7.png')
                    },
                    {
                        title: "Ships",
                        img: require('../../assets/PGMatching/PGNumMatchToys/8.png')
                    }
                ]

            },
        },
        {
            title: 'Match Vegetables',
            Image: MatchPGVegetables,
            data: {
                "Assets": [
                    {
                        title: "Cabbage",
                        img: require('../../assets/VegetableCabbage.png')
                    },
                    {
                        title: "Carrot",
                        img: require('../../assets/VegetableCarrot.png')
                    },
                    {
                        title: "Onion",
                        img: require('../../assets/VegetableOnion.png')
                    },
                    {
                        title: "Corn",
                        img: require('../../assets/VegetableCorn.png')
                    },
                    {
                        title: "Tomato",
                        img: require('../../assets/VegetableTomato.png')
                    },
                    {
                        title: "Lemon",
                        img: require('../../assets/VegetableLemon.png')
                    },
                    {
                        title: "Brinjal",
                        img: require('../../assets/VegetableBrinjal.png')
                    },
                    {
                        title: "Peas",
                        img: require('../../assets/VegetablePeas.png')
                    }
                ]

            },
        },
        {
            title: 'Match Fruits',
            Image: MatchPGFruits,
            data: {
                "Assets": [
                    {
                        title: "Apple",
                        img: require('../../assets/FruitsApple.png')
                    },
                    {
                        title: "Strawberry",
                        img: require('../../assets/FruitsStrawberry.png')
                    },
                    {
                        title: "Mango",
                        img: require('../../assets/FruitsMango.png')
                    },
                    {
                        title: "Orange",
                        img: require('../../assets/FruitsOrange.png')
                    },
                    {
                        title: "Peach",
                        img: require('../../assets/FruitsPeach.png')
                    },
                    {
                        title: "Pomegranate",
                        img: require('../../assets/FruitsPomegranate.png')
                    },
                    {
                        title: "Grapes",
                        img: require('../../assets/FruitsGrapes.png')
                    },
                    {
                        title: "Banana",
                        img: require('../../assets/FruitsBanana.png')
                    }
                ]

            },
        }
    ]

    let PGHaroofMatchingData = [
        {
            title: 'جانوروں سے ملائیں',
            Image: MatchPGAnimals,
            data: {
                "Assets": [
                    {
                        title: "ا",
                        img: require('../../assets/PGAnimalCamel.png')
                    },
                    {
                        title: "ب",
                        img: require('../../assets/PGAnimalMonkey.png')
                    },
                    {
                        title: "ه",
                        img: require('../../assets/PGAnimalElephant.png')
                    },
                    {
                        title: "گ",
                        img: require('../../assets/PGAnimalHorse.png')
                    },
                    {
                        title: "ک",
                        img: require('../../assets/PGAnimalDog.png')
                    },
                    {
                        title: "ش",
                        img: require('../../assets/PGAnimalLion.png')
                    },
                    {
                        title: "پ",
                        img: require('../../assets/PGAnimalPanda.png')
                    },
                    {
                        title: "چ",
                        img: require('../../assets/PGAnimalTiger.png')
                    }
                ]

            },
        },
        {
            title: 'پرندوں سے ملائیں',
            Image: MatchPGBirds,
            data: {
                "Assets": [
                    {
                        title: "ک",
                        img: require('../../assets/PGBirdPigeon.png')
                    },
                    {
                        title: "ب",
                        img: require('../../assets/PGBIrdDuck.png')
                    },
                    {
                        title: "ا",
                        img: require('../../assets/PGBirdOwl.png')
                    },
                    {
                        title: "پ",
                        img: require('../../assets/PGBirdPenguin.png')
                    },
                    {
                        title: "ش",
                        img: require('../../assets/PGBirdOstrich.png')
                    },
                    {
                        title: "ط",
                        img: require('../../assets/PGBirdParrot.png')
                    },
                    {
                        title: "م",
                        img: require('../../assets/PGBirdHen.png')
                    }
                ]

            },
        },
        {
            title: 'کھلونے ملائیں',
            Image: MatchPGToys,
            data: {
                "Assets": [
                    {
                        title: "Bicycle",
                        img: require('../../assets/PGBirdPigeon.png')
                    },
                    {
                        title: "Robot",
                        img: require('../../assets/PGBIrdDuck.png')
                    },
                    {
                        title: "Aeroplane",
                        img: require('../../assets/PGBirdOwl.png')
                    },
                    {
                        title: "Car",
                        img: require('../../assets/PGBirdPenguin.png')
                    },
                    {
                        title: "Ship",
                        img: require('../../assets/PGBirdOstrich.png')
                    },
                    {
                        title: "Train",
                        img: require('../../assets/PGBirdParrot.png')
                    },
                    {
                        title: "Helicopter",
                        img: require('../../assets/PGBirdHen.png')
                    },
                    {
                        title: "Drum",
                        img: require('../../assets/PGBirdCrow.png')
                    }
                ]

            },
        },
        {
            title: 'سبزیوں سے ملائیں',
            Image: MatchPGVegetables,
            data: {
                "Assets": [
                    {
                        title: "ب",
                        img: require('../../assets/VegetableCabbage.png')
                    },
                    {
                        title: "گ",
                        img: require('../../assets/VegetableCarrot.png')
                    },
                    {
                        title: "پ",
                        img: require('../../assets/VegetableOnion.png')
                    },
                    {
                        title: "چ",
                        img: require('../../assets/VegetableCorn.png')
                    },
                    {
                        title: "ٹ",
                        img: require('../../assets/VegetableTomato.png')
                    },
                    {
                        title: "ل",
                        img: require('../../assets/VegetableLemon.png')
                    },
                    {
                        title: "م",
                        img: require('../../assets/VegetablePeas.png')
                    }
                ]

            },
        },
        {
            title: 'پھل ملائیں',
            Image: MatchPGFruits,
            data: {
                "Assets": [
                    {
                        title: "س",
                        img: require('../../assets/FruitsApple.png')
                    },
                    {
                        title: "ا",
                        img: require('../../assets/FruitsStrawberry.png')
                    },
                    {
                        title: "آ",
                        img: require('../../assets/FruitsMango.png')
                    },
                    {
                        title: "م",
                        img: require('../../assets/FruitsOrange.png')
                    },
                    {
                        title: "ت",
                        img: require('../../assets/FruitsWatermelon.png')
                    },
                    {
                        title: "پ",
                        img: require('../../assets/FruitsPineApple.png')
                    },
                    {
                        title: "ک",
                        img: require('../../assets/FruitsBanana.png')
                    }
                ]

            },
        }
    ]

    let PGNumbersMatchingData = [
        {
            title: 'Match Animals',
            Image: MatchPGNumAnimals,
            data: {
                "Assets": [
                    {
                        title: "1",
                        img: require('../../assets/PGMatching/PGNumberMatchAnimal/PGNumMatchAnimalLion.png')
                    },
                    {
                        title: "2",
                        img: require('../../assets/PGMatching/PGNumberMatchAnimal/PGNumMatchAnimalHorse.png')
                    },
                    {
                        title: "3",
                        img: require('../../assets/PGMatching/PGNumberMatchAnimal/PGNumMatchAnimalDog.png')
                    },
                    {
                        title: "4",
                        img: require('../../assets/PGMatching/PGNumberMatchAnimal/PGNumMatchAnimalElephant.png')
                    },
                    {
                        title: "5",
                        img: require('../../assets/PGMatching/PGNumberMatchAnimal/PGNumMatchAnimalGoat.png')
                    },
                    {
                        title: "6",
                        img: require('../../assets/PGMatching/PGNumberMatchAnimal/PGNumMatchAnimalCat.png')
                    },
                    {
                        title: "7",
                        img: require('../../assets/PGMatching/PGNumberMatchAnimal/PGNumMatchAnimalCamel.png')
                    },
                    {
                        title: "8",
                        img: require('../../assets/PGMatching/PGNumberMatchAnimal/PGNumMatchAnimalMonkey.png')
                    }
                ]

            },
        },
        {
            title: 'Match Birds',
            Image: MatchPGNumBirds,
            data: {
                "Assets": [
                    {
                        title: "1",
                        img: require('../../assets/PGMatching/PGNumMatchBirds/1.png')
                    },
                    {
                        title: "2",
                        img: require('../../assets/PGMatching/PGNumMatchBirds/2.png')
                    },
                    {
                        title: "3",
                        img: require('../../assets/PGMatching/PGNumMatchBirds/3.png')
                    },
                    {
                        title: "4",
                        img: require('../../assets/PGMatching/PGNumMatchBirds/4.png')
                    },
                    {
                        title: "5",
                        img: require('../../assets/PGMatching/PGNumMatchBirds/5.png')
                    },
                    {
                        title: "6",
                        img: require('../../assets/PGMatching/PGNumMatchBirds/6.png')
                    },
                    {
                        title: "7",
                        img: require('../../assets/PGMatching/PGNumMatchBirds/7.png')
                    },
                    {
                        title: "8",
                        img: require('../../assets/PGMatching/PGNumMatchBirds/8.png')
                    }
                ]

            },
        },
        {
            title: 'Match Toys',
            Image: MatchPGNumToys,
            data: {
                "Assets": [
                    {
                        title: "1",
                        img: require('../../assets/PGMatching/PGNumMatchToys/1.png')
                    },
                    {
                        title: "2",
                        img: require('../../assets/PGMatching/PGNumMatchToys/2.png')
                    },
                    {
                        title: "3",
                        img: require('../../assets/PGMatching/PGNumMatchToys/3.png')
                    },
                    {
                        title: "4",
                        img: require('../../assets/PGMatching/PGNumMatchToys/4.png')
                    },
                    {
                        title: "5",
                        img: require('../../assets/PGMatching/PGNumMatchToys/5.png')
                    },
                    {
                        title: "6",
                        img: require('../../assets/PGMatching/PGNumMatchToys/6.png')
                    },
                    {
                        title: "7",
                        img: require('../../assets/PGMatching/PGNumMatchToys/7.png')
                    },
                    {
                        title: "8",
                        img: require('../../assets/PGMatching/PGNumMatchToys/8.png')
                    }
                ]

            },
        },
        {
            title: 'Match Vegetables',
            Image: MatchPGNumVegetables,
            data: {
                "Assets": [
                    {
                        title: "1",
                        img: require('../../assets/PGMatching/PGNumMatchVeg/1.png')
                    },
                    {
                        title: "2",
                        img: require('../../assets/PGMatching/PGNumMatchVeg/2.png')
                    },
                    {
                        title: "3",
                        img: require('../../assets/PGMatching/PGNumMatchVeg/3.png')
                    },
                    {
                        title: "4",
                        img: require('../../assets/PGMatching/PGNumMatchVeg/4.png')
                    },
                    {
                        title: "5",
                        img: require('../../assets/PGMatching/PGNumMatchVeg/5.png')
                    },
                    {
                        title: "6",
                        img: require('../../assets/PGMatching/PGNumMatchVeg/6.png')
                    },
                    {
                        title: "7",
                        img: require('../../assets/PGMatching/PGNumMatchVeg/7.png')
                    },
                    {
                        title: "8",
                        img: require('../../assets/PGMatching/PGNumMatchVeg/8.png')
                    }
                ]

            },
        },
        {
            title: 'Match Fruits',
            Image: MatchPGNumFruits,
            data: {
                "Assets": [
                    {
                        title: "1",
                        img: require('../../assets/PGMatching/PGNumMatchFruits/1.png')
                    },
                    {
                        title: "2",
                        img: require('../../assets/PGMatching/PGNumMatchFruits/2.png')
                    },
                    {
                        title: "3",
                        img: require('../../assets/PGMatching/PGNumMatchFruits/3.png')
                    },
                    {
                        title: "4",
                        img: require('../../assets/PGMatching/PGNumMatchFruits/4.png')
                    },
                    {
                        title: "5",
                        img: require('../../assets/PGMatching/PGNumMatchFruits/5.png')
                    },
                    {
                        title: "6",
                        img: require('../../assets/PGMatching/PGNumMatchFruits/6.png')
                    },
                    {
                        title: "7",
                        img: require('../../assets/PGMatching/PGNumMatchFruits/7.png')
                    },
                    {
                        title: "8",
                        img: require('../../assets/PGMatching/PGNumMatchFruits/8.png')
                    }
                ]

            },
        }
    ]

    const handleData = () => {

        if (data == 'PGMatching') {
            setListData(PGMatchingData)
        } else if (data == 'PGNumMatching') {
            setListData(PGNumbersMatchingData)
        } else if (data == 'PGHaroofMatching') {
            setListData(PGHaroofMatchingData)
        } else if (data == 'PGEnglishMatching') {
            setListData(PGEnglishMatchingData)
        } 

    }

    useEffect(() => {

        handleData()

    }, [])

    const RenderMainList = ({ index, item }) => (
        <HomeBtn activeOpacity={1} onPress={() => { 
        navigation.navigate('Matching', { title: item.title, data: item.data }) }} text={item.title} containerStyle={styles.homeBtnContainer} >
            <item.Image Color={item.imageColor} style={styles.imageSizes} />
            <Text style={[styles.homeBtnText]}>{item?.title}</Text>
        </HomeBtn>
    )

    return (
        <SafeAreaView style={Theme.whiteContainer}>
            <StatusBar backgroundColor={Color.headerColor} />
            <ItemSoundBG>
                <FlatList
                    style={{flexGrow:0}}
                    contentContainerStyle={Theme.centerItem}
                    data={ListData}
                    renderItem={RenderMainList}
                />
            </ItemSoundBG>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    imageSizes: { width: wp('40%'), height: wp('28%'), marginBottom: wp('5%') },
    homeBtnContainer: [Theme.HomeButton1, { margin: 20, alignItems: 'center', height: wp('50%'), width: wp('60%') }],
    homeBtnText: [Theme.HomeButton2Txt, { fontSize: wp('4%') }]
})



export default MatchingOptions;