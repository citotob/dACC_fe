import { url } from "./Config";
import instance from "axios";
const axios = instance.create();

const Get = (path, params, bool) => {
	let getAxios;
	switch (bool) {
		case true:
			getAxios = axios.get(`${url}/${path}/${params}`, {
				headers: {
					Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
					"Access-Control-Allow-Origin": "*",
				},
			});
			break;
		case false:
			getAxios = axios.get(`${url}/${path}`, {
				headers: {
					Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
					"Access-Control-Allow-Origin": "*",
				},
			});
			break;
		default:
			break;
	}
	const promise = new Promise((resolve, reject) => {
		getAxios.then(
			(res) => {
				resolve(res);
			},
			(err) => {
				reject(err);
			}
		);
	});
	return promise;
};

export default Get;
