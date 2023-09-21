// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnGIFujxUQWNd2vXayUTesQ0HwxDDZzfM",
  authDomain: "behind-b80e2.firebaseapp.com",
  projectId: "behind-b80e2",
  storageBucket: "behind-b80e2.appspot.com",
  messagingSenderId: "367516239735",
  appId: "1:367516239735:web:5b1c5680e0614f8b3f0372",
  measurementId: "G-DGFMEW8VTJ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
