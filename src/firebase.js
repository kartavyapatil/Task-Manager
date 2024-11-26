// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwlapn7kKuMtbL2YCtEitQUovPmI_TTew",
  authDomain: "task-manager-b1188.firebaseapp.com",
  projectId: "task-manager-b1188",
  storageBucket: "task-manager-b1188.firebasestorage.app",
  messagingSenderId: "848382000570",
  appId: "1:848382000570:web:dfb2d7125ad80094357183",
  measurementId: "G-N55QZGET2F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);  