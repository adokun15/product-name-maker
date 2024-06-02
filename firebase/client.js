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
/*
const firebaseConfig = {
  apiKey: "AIzaSyA4nahOSAM-RhAJVkeTQu0-NWC3UQ9CZ9E",
  authDomain: "namifyai.firebaseapp.com",
  projectId: "namifyai",
  storageBucket: "namifyai.appspot.com",
  messagingSenderId: "574581105838",
  appId: "1:574581105838:web:edcc847bfda72d66d1f93f",
};
*/
export const app =
  getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
export { auth, db, provider };
