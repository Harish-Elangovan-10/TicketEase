// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATK0uDDw3aMDr9cJQy6mrRtHgwMgHbvi8",
  authDomain: "museumpass-firebase.firebaseapp.com",
  projectId: "museumpass-firebase",
  storageBucket: "museumpass-firebase.firebasestorage.app",
  messagingSenderId: "719984639345",
  appId: "1:719984639345:web:a12c40dfec3a5b7b670ad0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);