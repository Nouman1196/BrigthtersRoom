import { baseURL } from "./instance"
import axios from "axios";
import { get_data } from "../AsyncStorage/AsyncStorage";
import { ApiStatus } from "./ApiValidation";
import { check_expiry } from "./check_token_expiry";

const put_request = async ({ target, body, params, navigation, formData }) => {

    try {
        let userData = await get_data("@user_data");

        let header = { Authorization: "Bearer " + userData?.access_token }

        if (formData != undefined)
            header["Content-type"] = 'multipart/form-data'

        const instance = axios.create({
            baseURL: baseURL,
            params: params,
            // timeout: 1000,
            headers: header,
        });

        const response = await instance.put(target, body)
            .catch((error) => {

                // ApiStatus(error, navigation)
                return error
            }
            )
        return response



    } catch (e) {
        // ApiStatus(e, navigation)
        console.log(e);
        return 'Error'
    }
}

const post_request = async ({ target, body, params, navigation }) => {

    try {
        let userData = await get_data("@user_data");
        const instance = axios.create({
            baseURL: baseURL,
            params: params,
            // timeout: 1000,
            headers: { Authorization: "Bearer " + userData?.access_token },
        });

        const response = await instance.post(target, body)
            .catch((error) => {
                console.log(JSON.stringify(error));
                // ApiStatus(error, navigation)
                return error
            }
            )
        return response



    } catch (e) {
        // ApiStatus(e, navigation)
        console.log(JSON.stringify(e));

        return 'Error'
    }
}



const get_request = async ({ target, body, navigation, expiry_not_required }) => {

    try {

        let userData = await get_data("@user_data");

        const instance = axios.create({
            baseURL: baseURL,
            // timeout: 1000,
            headers: { Authorization: "Bearer " + userData?.access_token },
        });

        const response = await instance.get(target, body)
            .catch((e) => {
                !expiry_not_required && check_expiry(navigation)
                return e
            }
            )
        return response
    } catch (error) {
        // ApiStatus(error, navigation)
        return error
    }
}

const delete_request = async ({ target, body, navigation }) => {

    try {

        let userData = await get_data("@user_data");

        const instance = axios.create({
            baseURL: baseURL,
            // timeout: 1000,
            headers: { Authorization: "Bearer " + userData?.access_token },
        });

        const response = await instance.delete(target,body)
            .catch((e) => {
                // check_expiry(navigation)
                return e
            }
            )
        return response
    } catch (error) {
        // ApiStatus(error, navigation)
        return error
    }
}



export { post_request, get_request, put_request, delete_request }
