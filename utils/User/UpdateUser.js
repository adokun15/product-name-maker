import { getApp } from "firebase/app";
import { getAuth, updateProfile, updateEmail } from "firebase/auth";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { userDatabase } from "./GetUser";

export async function UpdateUserAiCount(id, value) {
  await updateDoc(doc(db, "users", id), { token: value }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    return new Error({ message: errorMessage || errorCode }, { status: 500 });
  });
}

export async function LoadUserHistory(id) {
  const history = await userDatabase(id, "history");
  return history;
}

export async function UpdateUserHistory(id, value) {
  const userHistory = await LoadUserHistory(id);

  const prevHistory = userHistory.history;

  if (!prevHistory) {
    await setDoc(doc(db, "history", id), { ...value });
  }

  await updateDoc(doc(db, "history", id), {
    history: [value, ...prevHistory],
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    return new Error({ message: errorMessage || errorCode }, { status: 500 });
  });
}

export async function UpdateUserProfile(username, id, data) {
  const app = getApp();
  const auth = getAuth();

  await updateProfile(auth.currentUser, {
    displayName: username,
    // photoURL: "https://example.com/jane-q-user/profile.jpg",
  })
    .then(() => {
      return "Username has been Updated!";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return new Error({ message: errorMessage || errorCode }, { status: 500 });
    });
}

export async function UpdateUserEmail() {
  const auth = getAuth();
  updateEmail(auth.currentUser, "user@example.com")
    .then(() => {
      // Email updated!
      // ...
    })
    .catch((error) => {
      // An error occurred
      // ...
    });
}

export async function UpdateUserPassWord() {
  const auth = getAuth();

  const user = auth.currentUser;
  const newPassword = getASecureRandomPassword();

  updatePassword(user, newPassword)
    .then(() => {
      // Update successful.
    })
    .catch((error) => {
      // An error ocurred
      // ...
    });
}
