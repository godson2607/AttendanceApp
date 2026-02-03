import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAzlN3aD4bjXb1UPxpSHTj9hnXUOE-GC7c",
    authDomain: "attendanceapp-1febe.firebaseapp.com",
    projectId: "attendanceapp-1febe",
    storageBucket: "attendanceapp-1febe.firebasestorage.app",
    messagingSenderId: "126361595587",
    appId: "1:126361595587:web:a2d769c2a95122cde5bc76",
    measurementId: "G-GEQBZSVBBC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth (Web uses browser persistence by default)
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db };
