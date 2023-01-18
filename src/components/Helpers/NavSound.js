import { Platform } from "react-native";
import Sound from "react-native-sound";
import ding from '../../assets/Sounds/nav_sound.wav'


export const NavSound = () => {

    var whoosh = new Sound(ding, (error) => {
        if (error) {
            console.log('failed to load the sound', error);
        } else {
            whoosh.play(); // have to put the call to play() in the onload callback
        }
    });

}