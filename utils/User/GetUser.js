import { getApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { app, db } from "../firebase";
import { NextResponse } from "next/server";

export async function userDatabase(id, path = "users") {
  if (!id) return null;

  try {
    const docRef = doc(db, path, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { ...docSnap.data() };
    }
    if (!docSnap.exists()) {
      throw new Error(`This User document is Not Available`, {
        status: 404,
      });
    }
  } catch (err) {
    // console.log(err);
    throw new Error(err, { status: err?.status || 500 });
  }
}

export async function GetUser() {
  try {
    const otherApp = getApp();
    const auth = getAuth();

    let cUser = null;

    onAuthStateChanged(auth, (user) => {
      cUser = user;
    });

    //const otherDb = await userDatabase();

    //if (!otherDb) return null;
    //const { email, displayName, emailVerified, uid, photoURL } = otherDb;

    return cUser;
  } catch (err) {
    throw new Error({ message: err.code || err.message }, { status: 500 });
  }
}
