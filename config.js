import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import {getDatabase} from 'firebase/database';
import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

  apiKey: "AIzaSyA_2Eim7BGjiXObXtIvBVtYiPm73NYMV6s",

  authDomain: "bar-appp.firebaseapp.com",

  databaseURL: "https://bar-appp-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "bar-appp",

  storageBucket: "bar-appp.appspot.com",

  messagingSenderId: "379154477376",

  appId: "1:379154477376:web:90b4dd04d0fbed21b34aa5",

  measurementId: "G-CWPCGGTVEM"

};
if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}
const auth = getAuth();
const db = getDatabase();
export{db};
export{firebase};
export{auth};

