// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3w18rC3AL2kNHpkeZR-cl3kyPt-5CKSo",
  authDomain: "coulinary-courier.firebaseapp.com",
  projectId: "coulinary-courier",
  storageBucket: "coulinary-courier.appspot.com",
  messagingSenderId: "257825604682",
  appId: "1:257825604682:web:c2650699cb9806345392b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;


// praveenrocksrocks69@gmail.com