import { rootPathDev } from './Config';

const notifPost = (path, username, isSubscribed) => {
    const promise = new Promise((resolve, reject) => {
        fetch(`${rootPathDev}/${path}`, {
            method: "POST",
            body: JSON.stringify({
                "user": username
            })
        }).then(res => {
            if (isSubscribed) {
                resolve(res);
            }
        }, (err) => {
            reject(err);
        })
    })
    return promise;
}

const loginPost = (path, requestOptions) => {
    const promise = new Promise((resolve, reject) => {
        fetch(`${rootPathDev}/${path}`, requestOptions)
            .then(res => {
                resolve(res)
            }, (err) => {
                reject(err)
            })
    })

    return promise;
}

const forgotPost = (path, requestOptions) => {
    const promise = new Promise((resolve, reject) => {
        fetch(`${rootPathDev}/${path}`, requestOptions)
            .then(res => {
                resolve(res)
            }, (err) => {
                reject(err)
            })
    })

    return promise;
}

const resetPost = (path, requestOptions) => {
    const promise = new Promise((resolve, reject) => {
        fetch(`${rootPathDev}/${path}`, requestOptions)
            .then(res => {
                resolve(res)
            }, (err) => {
                reject(err)
            })
    })

    return promise;
}

const Post = {
    notifPost,
    loginPost,
    forgotPost,
    resetPost
}

export default Post;