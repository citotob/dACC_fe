import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDX76RV-xa2dcuW3Utuc-J39Hh3NItdy18",
    authDomain: "testapp-dd2d5.firebaseapp.com",
    databaseURL: "https://testapp-dd2d5.firebaseio.com",
    projectId: "testapp-dd2d5",
    storageBucket: "testapp-dd2d5.appspot.com",
    messagingSenderId: "483815342758",
    appId: "1:483815342758:web:e014e806d135a0fc98aa67"
};

firebase.initializeApp(firebaseConfig);

export default firebase