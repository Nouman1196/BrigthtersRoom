import {
  LoginManager,
  AccessToken,
} from "react-native-fbsdk-next";
import Toast from "react-native-simple-toast";

export const onFaceBookLogout = async () => {
  LoginManager.logOut();
}

export const onFacebookButtonPress = async () => {
  let error = false;
  let response;
  const result = await LoginManager.logInWithPermissions(["email", "public_profile"]);

  if (result.isCancelled) {
    Toast.show("User Cancelled the Login Process", Toast.LONG);
    error = true;
    response = "";
    return { error, response };
  }
  const data = await AccessToken.getCurrentAccessToken();
  error = false;
  response = data

  return { error, response }
};

