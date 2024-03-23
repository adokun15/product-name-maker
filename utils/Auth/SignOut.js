import { signOut } from "firebase/auth";
import { app, auth } from "../firebase";
export async function SignOut() {
  // const auth = getAuth();
  try {
    await signOut(auth);

    return { message: "User Logged out!", status: 200 };
  } catch (error) {
    // An error happened.
    const errorCode = error.code;
    const errorMessage = error.message;
    return new Error({ message: errorMessage || errorCode }, { status: 500 });
  }
}
