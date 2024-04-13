"use server";
import { getApp } from "firebase/app";
import { getDoc, doc } from "firebase/firestore";
import { app, db } from "@/firebase/client";

export async function userDatabase(id, path = "users") {
  if (!id) {
    return { error: true, message: "unauthorized access!", status: 401 };
  }

  try {
    const docRef = doc(db, path, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { error: false, ...docSnap.data() };
    }
    if (!docSnap.exists()) {
      return {
        error: true,
        message: `No ${path === "users" ? "user" : path} created yet`,
        status: 403,
      };
    }
  } catch (err) {
    if (err?.code === "unavailable") {
      return { error: true, message: "No Internet Connection ", status: 502 };
    }
    return { error: true, message: err?.message, status: 500 };
  }
}
