
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Platform } from 'react-native';
import Toast from 'react-native-simple-toast';

GoogleSignin.configure({
    //   scopes: ['email'],
    webClientId: '800178618045-dgak7rh9thiof7886kru34rgb47nfoi2.apps.googleusercontent.com',
    iosClientId:'800178618045-scdr1oc5v00e4mf7iql2rfijv2keoshk.apps.googleusercontent.com'

});



const onGoogleButtonPress = async () => {

    let accessTokenNew = '';

    try {
        let error = false
        // Get the users ID token
        const response = await GoogleSignin.signIn()
            .then((data) => {

                // console.log("TEST " + JSON.stringify(data));

                const currentUser = GoogleSignin.getTokens().then((res) => {
                    // console.log(res.accessToken); //<-------Get accessToken
                    accessTokenNew = res.accessToken

                });

                return currentUser

            })
        

        // // Create a Google credential with the token
        // const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // // Sign-in the user with the credential
        // let response = await auth().signInWithCredential(googleCredential)

        error = false
        return { error:error, response:accessTokenNew }

    } catch (e) {
        if (Platform.OS == 'ios') {
            Toast.show(e.userInfo.NSLocalizedDescription, Toast.LONG)
        } else {
            Toast.show(e.message, Toast.LONG)
        }
        let response = ""
        error = true
        return { error, response }
    }
}
  
export default onGoogleButtonPress