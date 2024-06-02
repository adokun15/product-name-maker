// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDQ-BujL_73qLnmIz7WGiHtlHd2FNt20Vw",
  authDomain: "productvent.web.app",
  //authDomain: "sddx2cf.localto.net/auth",
  projectId: "productvent",
  storageBucket: "productvent.appspot.com",
  messagingSenderId: "181583605094",
  appId: "1:181583605094:web:b83788f359154e2344eca7",
  measurementId: "G-TQKX8PQ2C6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
