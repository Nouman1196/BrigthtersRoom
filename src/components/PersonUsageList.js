import React from "react";
import { View, Text, FlatList } from 'react-native'
import FeatureList from "./FeatureList";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const PersonUsageList = ({ data, style }) => {


    return (
        <>
        <Text style={{textAlign:'center',color:'white',fontSize:25,fontFamily:'Lato-Bold',marginTop:'4%'}}>Why Use Brighter's Room?</Text>
        <FlatList
            horizontal
            data={data}
            style={style}
            renderItem={({ index, item }) => (
                <View style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.9)', padding: 10, marginHorizontal: 15, borderRadius: 8, width: wp('92%'), paddingBottom: '3%' }}>
                    <Text style={{ color: '#241049', fontFamily: 'Lato-Black', fontSize: 20}}>{item.title}</Text>
                    <FeatureList style={{marginTop:5}}  data={item.data} colorSel={'#241049'} iconSize={36} hideHeader />
                </View>

            )}

        />
        </>
    )

};

export default PersonUsageList;
