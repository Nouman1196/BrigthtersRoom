import React from 'react'
import { View, Text } from 'react-native'
import Video from 'react-native-video'

const Mp3Sound = ({ selectedItem, enableUrdu, langIndex, playing, setSelectedItem, setItemModal, setrunningVoice, setplaying,noModal }) => {



    return (
        <>
            {(((selectedItem.audio !== undefined && (enableUrdu ? langIndex > 0 : true)) || (selectedItem.audioUrdu !== undefined && (enableUrdu ? langIndex == 1 : true))) && selectedItem !== '') &&
                <Video
                    audioOnly={true}
                    paused={playing}
                    onEnd={() => { setplaying(false); setrunningVoice(-1); setItemModal(false); noModal && setSelectedItem('') }}
                    source={(langIndex > 0 && selectedItem?.audioUrdu) ? selectedItem?.audioUrdu : (selectedItem?.audio)}
                />
            }
        </>
    )

}

export default Mp3Sound;