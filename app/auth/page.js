"use client";
import AuthForm from "@/components/AuthForm";
import NavBar from "@/components/NavBar";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import AuthImage from "../../public/illustrations/undraw_sign_up_n6im.svg";
import Spacer from "@/components/spacer";
import { getRedirectResult } from "firebase/auth";
import { auth } from "@/firebase/client";
import { useRouter } from "next/navigation";
import HomeModal from "@/components/ModalHome";

const AuthBody = () => {
  const router = useRouter();

  const [redirectError, setRedirectError] = useState("");

  useEffect(() => {
    getRedirectResult(auth)
      .then(async (userCred) => {
        if (!userCred) return;

        //Initialize DB
        if (
          userCred?.user?.metadata?.creationTime ===
          userCred?.user?.metadata?.lastSignInTime
        ) {
          await InitializeDb(userCred?.user?.uid);
        }

        await fetch("/api/login", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${await userCred.user.getIdToken()}`,
          },
        }).then((res) => {
          if (res.status === 200) {
            //Get Uid
            router.push(`/overview/${userCred.user.uid}`);
          }
        });
      })
      .catch((error) => {
        setRedirectError(error?.message || error?.code);
      });
  }, []);
  return (
    <>
      <HomeModal />
      <NavBar />
      <Spacer />
      <div className="md:flex block  md:px-[6rem] mb-[5rem]">
        <AuthForm redirect_error={redirectError} />

        <div className="w-[50%]">
          <Image
            alt=""
            className="md:block hidden"
            height="700"
            width="550"
            src={AuthImage}
          />
        </div>
      </div>
      <p className="text-center">Powered by Firebase</p>
    </>
  );
};

export default AuthBody;
