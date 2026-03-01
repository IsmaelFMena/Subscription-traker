// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLekatD8k_SlLaOw3ExJ-FAhcrOxZjg-U",
  authDomain: "subscription-traker-8b8b5.firebaseapp.com",
  projectId: "subscription-traker-8b8b5",
  storageBucket: "subscription-traker-8b8b5.firebasestorage.app",
  messagingSenderId: "323058916191",
  appId: "1:323058916191:web:bf5cbf6c1f6810824e74ea",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
