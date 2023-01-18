import React from "react"
import { Platform } from "react-native";
import Sound from "react-native-sound";
import { setMusicLoading } from "../../redux/MainSlice";
import Store from "../../redux/Store";
import { baseURL } from "../../utilies/api/instance";

export const SoundCache = async (sounds) => {

    Store.dispatch(setMusicLoading(true))

    const promisifiedSounds = sounds.map((sound) => {

        if (sound?.item_sound_url != null) {

            return new Promise((res, rej) => {
                const currentSound = new Sound(baseURL + sound?.item_sound_url, Platform.OS == 'ios' ? "" : Sound.MAIN_BUNDLE, (error) => {
                    if (error) {
                        console.info('failed to load the sound ', error);
                        rej(error);
                    }

                    currentSound.setVolume(1);

                    res(currentSound);
                });
            });

        }

    });

    const data = await Promise.all(promisifiedSounds);

    Store.dispatch(setMusicLoading(false))

    return data;
}