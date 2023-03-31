// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAsbnxN4gjV1oJtIaG0-HPgzTIVaGvRIQ8",
    authDomain: "moveo-app-e6048.firebaseapp.com",
    projectId: "moveo-app-e6048",
    storageBucket: "moveo-app-e6048.appspot.com",
    messagingSenderId: "697901824588",
    appId: "1:697901824588:web:f0b91ba3176a44129e92e9",
    measurementId: "G-LMMW5JW0WV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);