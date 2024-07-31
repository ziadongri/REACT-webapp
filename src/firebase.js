import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
// import {getFirestore} from "firebase/firestore";

import { getFirestore, doc, getDoc } from "firebase/firestore"; // Import doc and getDoc here

import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCm1jOXZRsdgCwJWcn3MVAP3mPI504q49I",
  authDomain: "non-teaching-form.firebaseapp.com",
  projectId: "non-teaching-form",
  storageBucket: "non-teaching-form.appspot.com",
  messagingSenderId: "903056242053",
  appId: "1:903056242053:web:598918a0b6ea16c63440ec",
  measurementId: "G-P6BEW99ZXJ"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const db = getFirestore();
export const storage = getStorage();

export { doc, getDoc };