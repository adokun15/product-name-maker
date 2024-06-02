import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/client";
import { getApp } from "firebase/app";
import { app } from "@/firebase/client";
export async function SetUpdb(id, data, path = "users") {
  getApp();
  try {
    await setDoc(doc(db, path, id), { ...data }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      throw new Error(
        JSON.stringify(
          { message: errorMessage || errorCode },
          { status: err?.status || 500 }
        )
      );
    });
  } catch (err) {
    throw new Error(JSON.stringify(err, { status: err?.status || 500 }));
  }
}

export async function GetCustomerCode(emqil) {}
