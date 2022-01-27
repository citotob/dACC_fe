import { url } from "./Config";
import instance from "axios";
const axios = instance.create();

// const Put = (path, params) => {
// 	// console.log("-->", params);
// 	const promise = new Promise((resolve, reject) => {
// 		axios.put(`${url}/${path}/`, params).then(
// 			(res) => {
// 				resolve(res);
// 			},
// 			(err) => {
// 				reject(err);
// 			}
// 		);
// 	});
// 	return promise;
// };

const Put = (path, params) => {
	// console.log("-->", params);
	const promise = new Promise((resolve, reject) => {
		axios
			.put(`${url}/${path}/`, params, {
				headers: {
					Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
					"Access-Control-Allow-Origin": "*",
				},
			})
			.then(
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
