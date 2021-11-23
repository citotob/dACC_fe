importScripts('https://www.gstatic.com/firebasejs/7.8.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.8.0/firebase-messaging.js');

const firebaseConfig = {
    messagingSenderId: "483815342758"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true,
        })
        .then((windowClients) => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
            let matchingClient = null;

            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                if (windowClient.url === urlToOpen) {
                    matchingClient = windowClient;
                    break;
                }
            }

            if (matchingClient) {
                return matchingClient.focus();
            } else {
                // eslint-disable-next-line no-undef
                return clients.openWindow(urlToOpen);
            }
        })
        .then(() => {
            // Customize notification here
            const notificationTitle = 'Notification Service';
            const notificationOptions = {
                body: 'you have some new notifications.',
                icon: '/firebase-logo.png'
            };
            return self.registration.showNotification(notificationTitle,
                notificationOptions);
        });
    return promiseChain;
});
self.addEventListener("notificationclick", function (event) {
    console.log(event);
});