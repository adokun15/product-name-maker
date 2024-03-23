import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getApp } from "firebase/app";
import { NextResponse } from "next/server";
import { app } from "../firebase";
export async function SetUpdb(id, data, path = "users") {
  const apps = getApp();

  console.log(data);
  try {
    await setDoc(doc(db, path, id), { ...data }).catch((error) => {
      conosle.log("ERROR FROM SETDB", error);
      const errorCode = error.code;
      const errorMessage = error.message;
      return NextResponse.json(
        { message: errorMessage || errorCode },
        { status: 500 }
      );
    });
  } catch (err) {
    throw new Response({ message: err.code || err.message }, { status: 500 });
  }
}
