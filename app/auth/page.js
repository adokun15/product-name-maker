"use client";
import AuthForm from "@/components/AuthForm";
import NavBar from "@/components/NavBar";
import React, { useEffect } from "react";
import Image from "next/image";

import AuthImage from "../../public/illustrations/undraw_sign_up_n6im.svg";
import Spacer from "@/components/spacer";
import { getRedirectResult } from "firebase/auth";
import { auth } from "@/firebase/client";
import { useRouter } from "next/navigation";

const AuthBody = () => {
  const router = useRouter();

  useEffect(() => {
    getRedirectResult(auth)
      .then(async (userCred) => {
        if (!userCred) return;

        fetch("/api/login", {
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
      .catch((err) => {
        throw new Error(err?.message || "Something went wrong");
      });
  }, []);
  return (
    <>
      <NavBar />
      <Spacer />
      <div className="md:flex block  md:px-[6rem] mb-[5rem]">
        <AuthForm />
        <Image
          alt=""
          className="md:block hidden"
          height="700"
          width="550"
          src={AuthImage}
        />
      </div>
      <p className="text-center">Powered by Firebase</p>
    </>
  );
};

export default AuthBody;
