// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDQ-BujL_73qLnmIz7WGiHtlHd2FNt20Vw",
  authDomain: "productvent.firebaseapp.com",
  projectId: "productvent",
  storageBucket: "productvent.appspot.com",
  messagingSenderId: "181583605094",
  appId: "1:181583605094:web:b83788f359154e2344eca7",
  measurementId: "G-TQKX8PQ2C6",
};

export const app =
  getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
export { auth, db, provider };
