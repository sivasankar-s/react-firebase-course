import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: "AIzaSyBueCCilZOBJtaRBmBAf1rJBN8dKS6eQEs",
  authDomain: "fir-tut-3e182.firebaseapp.com",
  projectId: "fir-tut-3e182",
  storageBucket: "fir-tut-3e182.appspot.com",
  messagingSenderId: "796084443429",
  appId: "1:796084443429:web:cac5c3ba4480f720c2a2cc",
  measurementId: "G-592T0DJ38J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
