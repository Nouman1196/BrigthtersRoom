import Toast from 'react-native-simple-toast';
import { Logout } from "../AsyncStorage/AsyncStorage";
import { get_data } from "../AsyncStorage/AsyncStorage";

const ApiStatus = async (error, navigation) => {
    let token = await get_data("token");
    if (error?.response?.status == 401) {
        if (error.response.data.error == true) {
            Toast.show(error?.response?.data?.message, Toast.SHORT)
        } else {
            if (token) {
                Logout(navigation)
            }
        }
    }
    else {
        Toast.show(error?.message ? error?.message : "Something Went wrong", Toast.SHORT)
    }
}

export { ApiStatus }