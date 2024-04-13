import { cert, getApps, initializeApp } from "firebase-admin/app";
import servicekey from "./serverKey.json";
//import {initializeApp }
const firebaseAdminConfig = {
  credential: cert(servicekey),
};

export function customInitApp() {
  if (getApps().length <= 0) {
    initializeApp(firebaseAdminConfig);
  }
}
