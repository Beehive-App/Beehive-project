// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmdsrwMG3E9BNzCF1JrbWh2a78afTn-1s",
  authDomain: "beehive-app-2eaa7.firebaseapp.com",
  projectId: "beehive-app-2eaa7",
  storageBucket: "beehive-app-2eaa7.appspot.com",
  messagingSenderId: "563846158577",
  appId: "1:563846158577:web:22b75c250a153d2777b150",
  measurementId: "G-47X6FBTQ83"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(FirebaseApp);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirestoreDB  = getFirestore( FirebaseApp ); 