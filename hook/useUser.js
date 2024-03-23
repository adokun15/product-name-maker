import { getApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/utils/firebase";
import { useEffect, useState } from "react";
import { userDatabase } from "@/utils/User/GetUser";
export const useUser = () => {
  const auth = getAuth();
  const apps = getApp();

  const [{ error, loading, cUser }, setUser] = useState({
    error: false,
    loading: false,
    cUser: {},
  });

  useEffect(() => {
    setUser(() => {
      return { cUser: {}, error: false, loading: true };
    });
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(() => {
          const temp = {
            displayName: user.providerData[0].displayName,
            photoURL: user.providerData[0].photoURL,
            email: user.email,
            uid: user.uid,
          };

          return { cUser: { ...temp }, loading: false, error: false };
        });
      } else {
        setUser(() => {
          return { cUser: {}, error: true, loading: false };
        });
      }
    });
  }, []);

  return { cUser, error, loading };
};
