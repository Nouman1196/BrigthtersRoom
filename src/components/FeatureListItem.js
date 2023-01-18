import React from 'react'
import { View, Text, FlatList, StyleSheet,Image } from 'react-native'
import Color from '../theme/color'
import Feather from 'react-native-vector-icons/Feather';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const FeatureListItem = ({ data, color, iconSize }) => {



    return (
        <View style={{flex:1,flexDirection:'row',marginTop:hp('1.8%')}}>
            <View style={{alignItems:'center',justifyContent:'center',height:iconSize,width:iconSize,backgroundColor:color,borderRadius:100,marginRight:wp('3%')}}>
                <Image resizeMode='contain' style={{width:iconSize,height:iconSize/1.8}} source={data.img ? data.img : require('../assets/remoteaccess.png')} />
            </View>
            {/* <Feather name='home' color={color === 'white' ? 'black' : 'white'} size={22} style={{textAlignVertical:'center',textAlign:'center',height:iconSize,width:iconSize,backgroundColor:color,borderRadius:100,marginRight:wp('3%')}} /> */}
            <View style={{flex:1}}>
            <Text style={{fontFamily:'Lato-Bold',fontSize:15,color:color}}>{data.heading}</Text>
            <Text numberOfLines={2} style={{fontFamily:'Lato-Regular',fontSize:12,color:color,marginTop:hp('0.8%'),width:'95%',marginBottom:'0.5%'}}>{data.title}</Text>
            </View>
        </View>
    )

};

const styles = StyleSheet.create({

});

export default FeatureListItem;