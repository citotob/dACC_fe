// const CACHE_NAME = "version-1";
// const urlsToCache = ["index.html", "offline.html"];

// const self = this;

// // Install SW
// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       console.log("Opened cache");

//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// // Listen for requests
// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then(() => {
//       return fetch(event.request).catch(() => caches.match("offline.html"));
//     })
//   );
// });

// // Activate the SW
// self.addEventListener("activate", (event) => {
//   const cacheWhitelist = [];
//   cacheWhitelist.push(CACHE_NAME);

//   event.waitUntil(
//     caches.keys().then((cacheNames) =>
//       Promise.all(
//         cacheNames.map((cacheName) => {
//           if (!cacheWhitelist.includes(cacheName)) {
//             return caches.delete(cacheName);
//           }
//         })
//       )
//     )
//   );
// });

// ====================================================   SW baru dibawah ini =====================================
// import { url } from "../../../services/Config";
// const url = "https://smaslab-api.devlabs.id";

// var CACHE_NAME = "version-2";
// var urlsToCache = ["index.html", `${url}/survey/getpenugasan/count/`];

// self.addEventListener("install", function (event) {
//   // Perform install steps
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function (cache) {
//       console.log("Opened cache");
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// self.addEventListener("fetch", function (event) {
//   event.respondWith(
//     caches.match(event.request).then(function (response) {
//       // Cache hit - return response
//       if (response) {
//         return response;
//       }

//       return fetch(event.request)
//         .then(function (response) {
//           // Check if we received a valid response
//           if (
//             !response ||
//             response.status !== 200 ||
//             response.type !== "basic"
//           ) {
//             return response;
//           }
//           var responseToCache = response.clone();

//           caches.open(CACHE_NAME).then(function (cache) {
//             cache.put(event.request, responseToCache);
//           });

//           return response;
//         })
//         .catch(function () {
//           return caches.match("/offline.html");
//         });
//     })
//   );
// });

// self.addEventListener("activate", function (event) {
//   var cacheAllowlist = CACHE_NAME;

//   event.waitUntil(
//     caches.keys().then(function (cacheNames) {
//       return Promise.all(
//         cacheNames.map(function (cacheName) {
//           if (cacheAllowlist.indexOf(cacheName) === -1) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });
