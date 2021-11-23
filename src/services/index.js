import Post from "./Post";
import Get from "./Get";

// POST
const postNotif = (username, isSubscribed) => Post.notifPost('user/getnotif/', username, isSubscribed)
const postLogin = (requestOptions) => Post.loginPost('user/login/', requestOptions)
const postForgot = (requestOptions) => Post.forgotPost('user/forgotpassword/', requestOptions)
const postReset = (requestOptions) => Post.resetPost('user/resetpassword/', requestOptions)

// GET
const getCheckToken = (token) => Get("user/check_token", token, true)

const API = {
    //Post
    postNotif,
    postLogin,
    postForgot,
    postReset,

    //Get
    getCheckToken,
}

export default API;