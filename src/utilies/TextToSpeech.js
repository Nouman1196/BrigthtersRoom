import React, { useState, useEffect } from 'react';
import { NativeEventEmitter, NativeModules, Platform } from 'react-native';
import Tts from 'react-native-tts';
import Sound from 'react-native-sound';
import { get_data, save_data } from './AsyncStorage/AsyncStorage';

const TextToSpeech = ({ text, lang, setFinish, setError, sound }) => {


  const setErrorFunc = async () => {

    const soundError = await get_data('soundError')

    if (soundError == null) {
      await save_data('soundError', true)
    }

  }

  // if (Platform.OS === 'ios') {

  //   const ee = new NativeEventEmitter(NativeModules.TextToSpeech);
  //   ee.addListener('tts-start', () => { });
  //   ee.addListener('tts-finish', () => { });
  //   ee.addListener('tts-cancel', () => { });
  //   ee.addListener('tts-cancel', () => { });

  // }


  if (lang) {
    Tts.setDefaultLanguage(lang === 'urdu' ? 'ur-IE' : 'en-IE')
      .catch((error) => { console.log(error); setError && setError(true) })
  }


  try {

    Tts.getInitStatus().then(() => {

      text && Tts.speak(text)

    }, async (err) => {

      if (err.code === 'no_engine') {

        Tts.requestInstallEngine()
          .catch((error) => {
            console.log(error);
            setErrorFunc()
          })

      }

    })

  } catch (error) {
    console.log(error);
  }





}

export default TextToSpeech;