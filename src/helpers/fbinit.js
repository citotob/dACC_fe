import firebase from "firebase/app";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_APIKEY,
	authDomain: process.env.REACT_APP_AUTHDOMAIN,
	databaseURL: process.env.REACT_APP_DBURL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSENGER,
	appId: process.env.REACT_APP_APP_ID,
	measurementId: process.env.REACT_APP_MES_ID,
};
firebase.initializeApp(firebaseConfig);
export default firebase;
