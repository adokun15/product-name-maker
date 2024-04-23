"use client";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/firebase/client";
import { UpdateUserName, UpdateUserProfile } from "../User/UpdateUser";
import { useRouter } from "next/navigation";
import { InitializeDb } from "../User/InitializeDb";
export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [currentUser, setUser] = useState(null);
  const [authloading, setAuthLoading] = useState(true);

  const router = useRouter();

  const SignInGoogle = async () => {
    return new Promise((resolve, reject) => {
      if (!auth) {
        reject("Something went wrong while trying to sign in");
        return;
      }
      signInWithPopup(auth, new GoogleAuthProvider())
        .then(async (userCred) => {
          if (!userCred) return;

          //Initialize DB
          // await InitializeDb(userCred.user.uid)

          await fetch("/api/login", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${await userCred.user.getIdToken()}`,
            },
          }).then((res) => {
            if (res.status === 200) {
              //Get Uid
              resolve(`${userCred.user.uid}`);
            }
          });
        })
        .catch((err) => {
          reject(err?.code || err?.message);
        });
    });
  };

  //SignOut!
  const SignOut = async () => {
    if (!auth) {
      return "Something went wrong while signing out";
    }

    //clear cookies server
    await fetch("/api/signOut", {
      method: "POST",
    });

    await signOut(auth);
    router.push("/");
  };

  const signUpEmail = async (emailStr, password, username) => {
    return new Promise((resolve, reject) => {
      if (!auth) {
        reject("Something went wrong while signing in");
        return;
      }
      createUserWithEmailAndPassword(auth, emailStr, password)
        .then(async (userCred) => {
          //createExpirationCookies(userCred.stsTokenManger?.expires)
          if (!userCred) return;

          //Create DisplayName
          if (username) {
            await UpdateUserName(username);
          } else {
            await UpdateUserName(emailStr.split("@")[0]);
          }

          //Initialize DB
          await InitializeDb(userCred.user.uid);

          await fetch("/api/login", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${await userCred.user.getIdToken()}`,
            },
          }).then((res) => {
            if (res.status === 200) {
              //Get Uid
              resolve(`${userCred.user.uid}`);
            }
          });
        })
        .catch((err) => {
          reject(`${err.code || err.message}`);
        });
    });
  };

  const signInEmail = (emailStr, password) => {
    return new Promise((resolve, reject) => {
      if (!auth) {
        reject("Something went wrong while signing in");
        return;
      }

      signInWithEmailAndPassword(auth, emailStr, password)
        .then(async (userCred) => {
          //createExpirationCookies(userCred.stsTokenManger?.expires)
          if (!userCred) return;

          await fetch("/api/login", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${await userCred.user.getIdToken()}`,
            },
          }).then((res) => {
            if (res.status === 200) {
              resolve(`${userCred.user.uid}`);
            }
          });
        })
        .catch((err) => {
          reject(err.code || err?.message);
        });
    });
  };

  useEffect(() => {
    setAuthLoading(true);

    if (!auth) {
      setAuthLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setUser(null);
        setAuthLoading(false);
      }
      if (user) {
        setAuthLoading(false);
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, []);
  //reject(err?.message);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        SignInGoogle,
        SignOut,
        signUpEmail,
        signInEmail,
        loading: authloading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
