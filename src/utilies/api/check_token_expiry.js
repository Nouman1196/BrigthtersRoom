import { save_data, get_data } from "../../utilies/AsyncStorage/AsyncStorage";
import { TokenRefresh, TokenStatus } from '../../utilies/api/apiController'
import { Cred } from '../../constants/DoorKeeper';



export const check_expiry = async (navigation) => {

    let error_status = true
    let user_data = await get_data('@user_data')
    if (user_data !== null && user_data !== "") {
        try {
            let resp = await TokenStatus(navigation)

            if (resp.status == 200) {

                error_status = false

            } else {

                let params = {
                    client_id: Cred.clientId,
                    client_secret: Cred.clientSecret,
                    refresh_token: user_data.refresh_token,
                    grant_type: 'refresh_token'
                }

                const tokenResult = await TokenRefresh(navigation, params)

                if (tokenResult.status == 200) {

                    user_data.access_token = tokenResult.data.access_token
                    user_data.expires_in = tokenResult.data.expires_in
                    user_data.refresh_token = tokenResult.data.refresh_token
                    user_data.created_at = tokenResult.data.created_at
                    await save_data('@user_data', user_data)
                    error_status = false

                } else {

                    error_status = true

                }


            }

        } catch (error) {
            console.log(error, "error");
        }
    }
    return {
        error: error_status
    }

}