import dotENV from 'dotenv';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider}  from "firebase/auth"



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_api_key,
  authDomain: "screen-blitz-8f14a.firebaseapp.com",
  projectId: "screen-blitz-8f14a",
  storageBucket: "screen-blitz-8f14a.appspot.com",
  messagingSenderId: "529092853861",
  appId: "1:529092853861:web:3dc84ca31392aa6e84068c",
  measurementId: "G-BTMHJ2WK1S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider()

export {auth,googleProvider}