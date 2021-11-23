import { url } from "./Config";
import instance from "axios";
const axios = instance.create();

const Post = (path, params) => {
  // console.log("-->", params);
  const promise = new Promise((resolve, reject) => {
    axios.post(`${url}/${path}/`, params).then(
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

// console.log('--->', params)
//     const promise = new Promise((resolve, reject) => {
//         axios.post(`${url}/${path}/`, params).then(res => {
//             resolve(res)
//         }, (err) => {
//             reject(err)
//         })
//     })
//     return promise;

// const registerPost = (path, requestOptions) =>{
//     const promise = new Promise((resolve, reject) =>{
//         fetch(`${rootPathDev}/${path}`, requestOptions)
//             .then(res => {
//                 resolve(res)
//             }, (err) => {
//                 reject(err)
//             })
//     })

//     return promise;
// }
