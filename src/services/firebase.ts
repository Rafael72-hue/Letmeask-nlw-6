import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBsUhaj2WwPw2JOt8gt6rjQKSfegFZHRY8",
    authDomain: "letmeask-a57c2.firebaseapp.com",
    databaseURL: "https://letmeask-a57c2-default-rtdb.firebaseio.com",
    projectId: "letmeask-a57c2",
    storageBucket: "letmeask-a57c2.appspot.com",
    messagingSenderId: "962061411533",
    appId: "1:962061411533:web:266d76eeca006f7330f584"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database};