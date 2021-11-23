import { rootPathDev } from "./Config";
import instance from "axios";
const axios = instance.create();

const Get = (path, params, bool) => {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
    };
    let getAxios;
    switch (bool) {
        case true:

        getAxios = axios.get(`${rootPathDev}/${path}/${params}`);
        break;
        case false:
        getAxios = axios.get(`${rootPathDev}/${path}`);
        break;
        default:
        break;
    }
    const promise = new Promise((resolve, reject) => {
        getAxios.then(
        res => {
            resolve(res);
        },
        err => {
            reject(err);
        }
        );
    });
    return promise;
};

export default Get;
