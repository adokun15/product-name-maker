"use client";

//import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

/*import { getAuth } from "firebase/auth";
import { app } from "@/utils/firebase";
*/
import { SignInWithGoogle } from "@/utils/Auth/SignInWithGoogle";
export const AuthContext = createContext({});

export default async function AuthProvider({ children }) {
  const [currentUser, setUser] = useState(null);

  //  const auth = getAuth();

  //LoginWith Google!

  const SignInGoogle = async () => {
    try {
      const result = await SignInWithGoogle();

      console.log(result);

      setUser(result ? result : null);
    } catch (err) {
      console.log(err);
      //return new Response(err);
    }
  };

  //SignOut!
  //const SignOut = () => {};

  useEffect(() => {
    /*const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({ message: "User Logged out!!" });
      }
    });

    return () => unsubscribe();
*/
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, SignInGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}
