import { getApp } from "firebase/app";
import { app } from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export async function SignInWithEmailAndPassWord(emailStr, password) {
  //app();
  const otherapp = getApp();
  const auth = getAuth();

  try {
    const userCred = await signInWithEmailAndPassword(auth, emailStr, password);

    const { uid, email, emailVerified, createdAt, providerData } =
      userCred.user;
    const user = {
      userId: uid,
      userEmail: email,
      userCreationDate: createdAt,
      profileImage: providerData[0].photoURL,
      username: providerData[0].displayName,
      emailIsVerified: emailVerified,
    };

    localStorage.setItem("NamifyUser", JSON.stringify(user));
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return new Error({ message: errorMessage || errorCode }, { status: 500 });
  }
  //  return { email, password };
}
