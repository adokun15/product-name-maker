import { getApp } from "firebase/app";
import { app } from "../firebase";
import {
  GoogleAuthProvider,
  getAuth,
  getRedirectResult,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";

export async function SignInWithGoogle() {
  const otherapp = getApp();
  const auth = getAuth();
  try {
    const Googleprovider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, Googleprovider);

    // const result = await getRedirectResult(auth);
    if (result) {
      const user = result.user;
      const credential = provider.credentialFromResult(auth, result);
      const token = credential.accessToken;
    }
    const operationType = result.operationType;

    return new Response(JSON.stringify({ ...result }));
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return new Error({ message: errorMessage || errorCode }, { status: 500 });
  }
}
