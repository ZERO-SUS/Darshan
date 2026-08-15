import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAf_GMagoSfJNSJGnf9Ijtb1n-kLtmyohQ",
  authDomain: "portfolio-e3.firebaseapp.com",
  projectId: "portfolio-e3",
  storageBucket: "portfolio-e3.firebasestorage.app",
  messagingSenderId: "1013448223501",
  appId: "1:1013448223501:web:c509d0323f404d82dede44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Storage (for images)
export const storage = getStorage(app);

// Initialize Auth
export const auth = getAuth(app);

export default app;
