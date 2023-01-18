import React from 'react'
import { View } from 'react-native'

export default Practice = () => {

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'red' }}></View>
        <View style={{ flex: 1, backgroundColor: 'orange' }}></View>
      </View>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'yellow' }}></View>
        <View style={{ flex: 1, backgroundColor: 'green' }}></View>
      </View>
    </View>
  )

}