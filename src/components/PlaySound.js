import React from 'react'
import Video from 'react-native-video';


const PlaySound = ({ playing, setplaying, sound_source,setrunningVoice, setSelectedItem,selectedItem,ImageOnly }) => {

    return (
        <>
            {sound_source &&
                <Video
                audioOnly={true}
                playing={playing}
                onEnd={() => { setplaying(!playing); setrunningVoice(-1); ImageOnly && setSelectedItem('') }}
                // onEnd={() => { setplaying(true); setrunningVoice(-1); ImageOnly && setSelectedItem('') }}
                source={(langIndex > 0 && selectedItem?.audioUrdu) ? selectedItem?.audioUrdu : (selectedItem?.audio)}
            />
            }
        </>

    )

};

export default PlaySound;