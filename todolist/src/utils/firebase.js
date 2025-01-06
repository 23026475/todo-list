// Import required functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import Auth
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { GoogleAuthProvider } from "firebase/auth";

const googleProvider = new GoogleAuthProvider();


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYjROrHg_7_ngryETx8FON2G6hsCSk2Cc",
  authDomain: "todo-list-f675a.firebaseapp.com",
  projectId: "todo-list-f675a",
  storageBucket: "todo-list-f675a.firebaseapp.com",
  messagingSenderId: "295552958540",
  appId: "1:295552958540:web:0c1ce7c6a2ffa4fac7b4e9",
  measurementId: "G-751WQ39YM9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app); // Export Auth
const db = getFirestore(app); // Export Firestore

export { app, auth, db, analytics, googleProvider };
