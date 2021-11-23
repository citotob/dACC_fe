import { url } from "./Config";
import instance from "axios";
const axios = instance.create();

const Put = (path, params) => {
	// console.log("-->", params);
	const promise = new Promise((resolve, reject) => {
		axios.put(`${url}/${path}/`, params).then(
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

export default Put;
