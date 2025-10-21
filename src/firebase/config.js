// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiROTzgd26gOEEoWra2ADKTviv753cx5Q",
  authDomain: "yass-drc.firebaseapp.com",
  projectId: "yass-drc",
  storageBucket: "yass-drc.firebasestorage.app",
  messagingSenderId: "946442540515",
  appId: "1:946442540515:web:d1b303868ab315e185bcd6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
