import AuthForm from "@/components/AuthForm";
import NavBar from "@/components/NavBar";
import React from "react";
import Image from "next/image";

import AuthImage from "../../public/illustrations/undraw_sign_up_n6im.svg";
import Spacer from "@/components/spacer";
const AuthBody = () => {
  return (
    <>
      <NavBar />
      <Spacer />
      <div className="flex px-[6rem] mb-[5rem]">
        <AuthForm />
        <Image alt="" height="700" width="550" src={AuthImage} />
      </div>
      <p className="text-center">Powered by Firebase</p>
    </>
  );
};

export default AuthBody;
