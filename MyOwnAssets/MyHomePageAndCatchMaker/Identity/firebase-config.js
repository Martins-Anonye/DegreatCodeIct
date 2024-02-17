
// The following code is from  firebase project //CDN Configuration
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-analytics.js";
import { } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-SERVICE.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAC0m9Mw4eesl5NoGj_GYmom83pp61bwXk",
    authDomain: "degreatcode-ict-ltd.firebaseapp.com",
    projectId: "degreatcode-ict-ltd",
    storageBucket: "degreatcode-ict-ltd.appspot.com",
    messagingSenderId: "977515281508",
    appId: "1:977515281508:web:e5af58f433b2f3ede6b371",
    measurementId: "G-R08274K20K"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const storage = app.storage();//getStorage(app);
module.exports = {
    storage,
}; 