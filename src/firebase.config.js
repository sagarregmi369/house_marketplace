// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"


// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCGf0OKqCM_-lw1U_RIdyfNbGMlCGapQMs",
  authDomain: "house-marketplace-92f62.firebaseapp.com",
  projectId: "house-marketplace-92f62",
  storageBucket: "house-marketplace-92f62.appspot.com",
  messagingSenderId: "881237701645",
  appId: "1:881237701645:web:a5e06eedb9e7677cfd5144",
  measurementId: "G-Y1XVPDDDGG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db= getFirestore();