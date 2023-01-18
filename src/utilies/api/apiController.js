import { post_request, get_request, put_request, delete_request } from "./requests";

export const SignUpApi = async (user, navigation, params) => {
    const data = await post_request({ target: "/api/v1/user/users", body: user, navigation: navigation, params: params });
    return data;
}

export const LoginApi = async (user, navigation, params) => {
    const data = await post_request({ target: "/oauth/token", body: user, navigation: navigation, params: params });
    return data;
}

export const SocialLogin = async ({ user, navigation, params }) => {
    const data = await post_request({ target: "/oauth/token", body: user, navigation: navigation, params: params });
    return data;
}

export const TokenRefresh = async (navigation, params) => {
    const data = await post_request({ target: "/oauth/token", navigation: navigation, params: params });
    return data;
}

export const TokenStatus = async (navigation) => {
    const data = await get_request({ target: "/oauth/token/info", navigation: navigation, expiry_not_required: true });
    return data;
}

export const GradesApi = async (navigation) => {
    const data = await get_request({ target: "/api/v1/grades", navigation: navigation });
    return data;
}

export const SubjectsApi = async (navigation, gradeID) => {
    const data = await get_request({ target: `/api/v1/grades/${gradeID}`, navigation: navigation });
    return data;
}

export const LessonsApi = async (navigation, subjectID) => {
    const data = await get_request({ target: `/api/v1/subjects/${subjectID}`, navigation: navigation });
    return data;
}

export const LecturesApi = async (navigation, lessonID) => {
    const data = await get_request({ target: `/api/v1/lessons/${lessonID}`, navigation: navigation });
    return data;
}

export const ProgressUpdate = async (user, navigation, params) => {
    const data = await put_request({ target: "/api/v1/grades/content_completed", body: user, navigation: navigation, params: params });
    return data;
}

export const getProfileData = async ({navigation}) => {
    const data = await get_request({ target: `/api/v1/user/users/student_information`, navigation: navigation });
    return data;
}

export const userProfileUpdate = async ({user, navigation, params}) => {
    const data = await put_request({ target: "/api/v1/user/users/update_users_info", body: user, navigation: navigation, params: params,formData:true });
    return data;
}

export const deleteUserAccount = async ({user, navigation, params}) => {
    const data = await delete_request({ target: "/api/v1/user/users/delete_account", body: user, navigation: navigation, params: params });
    return data;
}





