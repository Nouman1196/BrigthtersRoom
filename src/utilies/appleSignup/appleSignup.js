import { appleAuth } from '@invertase/react-native-apple-authentication';
import axios from 'axios';
import Toast from 'react-native-simple-toast';

export const onPressAppleLogin = async () => {
    let error = false
    try {
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });

        if (!appleAuthRequestResponse.identityToken) {
            throw 'Apple Sign-In failed - no identify token returned';
        }

        error = false;

        return { error, response: appleAuthRequestResponse };
    } catch (e) {
        if (e.message == 'The operation couldn’t be completed. (com.apple.AuthenticationServices.AuthorizationError error 1001.)') {
            Toast.show("Login Request Cancelled", Toast.LONG)
        } else {
            Toast.show(e.message, Toast.LONG)
        }
        let response = ""
        error = true
        return { error, response };
    }

}