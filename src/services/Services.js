import http from "./httpService";
import config from "./config.json";
import axios from "axios";

export const getToken = async () => {
    const token = await localStorage.getItem("token");
    console.log(token)
    return `Bearer ${token}`

}

// registerUser
export const registerUser = data => {
    return http.post(
        `${config.webapi}/api/test/register`,
        JSON.stringify(data)
    );
};

// loginUser
export const loginUser = user => {
    return http.post(
        `${config.webapi}/api/test/login`,
        JSON.stringify(user)
    );
};

// logoutUser
export const logoutUser = async ()=> {
    return http.post(
        `${config.webapi}/api/user/logout`,
        {headers: {'Authorization':  axios.defaults.headers.common['Authorization'] = await getToken()}}
    );
};

//updateUserInfo
export const updateUserInfo = async (data) => {
    return http.patch(
        `${config.webapi}/api/user/profile`,
        (data),
        {headers: {'Authorization': axios.defaults.headers.common['Authorization'] = await getToken()}}
    );
}

//authorize
export const authorize = async () => {
    return http.get(
        `${config.webapi}/api/user/authorize`,
        {headers: {'Authorization': await getToken()}} // USER TOKEN => User Toekn from Local Storage for Auth
    );
}

