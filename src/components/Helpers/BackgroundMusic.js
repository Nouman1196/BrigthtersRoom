import { Platform } from "react-native";
import Sound from "react-native-sound";
import ding from '../../assets/Sounds/nav_sound.wav'


export const BackgroundMusic = (stop) => {

    var whoosh2 = new Sound(ding, (error) => {
        if (error) {
            console.log('failed to load the sound', error);
        } else {


                return whoosh2.play((success) => {
                    if (success) {
                        
                    } else {
                        console.log('playback failed due to audio decoding errors');
                    }
                });
                


        }
    });

    return whoosh2

}