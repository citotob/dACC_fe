import { url } from "./Config";
import instance from "axios";
const axios = instance.create();

const Post = (path, params) => {
	// console.log("-->", params);
	const promise = new Promise((resolve, reject) => {
		axios
			.post(`${url}/${path}/`, params, {
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

export default Post;
