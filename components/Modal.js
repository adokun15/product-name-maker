"use client";
import React, { useState } from "react";
import WhiteCard from "./whiteCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

const WhiteBackGround = ({ children, routerBack, removeCard }) => {
  return (
    <WhiteCard
      cls={`absolute bg-white z-[1200] h-fit w-3/5 left-[20%] py-5 top-[5%] my-[1rem] `}
    >
      <button onClick={routerBack} className="font-medium">
        <FontAwesomeIcon icon={faX} className="text-black" />
      </button>
      {children}
    </WhiteCard>
  );
};
const NonwhiteBackGround = ({ children, routerBack }) => {
  return (
    <WhiteCard
      cls={`absolute z-[1200] h-fit w-3/5 left-[20%] py-5 top-[5%] my-[1rem] `}
    >
      <button onClick={routerBack} className="font-medium">
        <FontAwesomeIcon icon={faX} className={"text-white"} />
      </button>
      {children}
    </WhiteCard>
  );
};

const Modal = ({ children, removeCard }) => {
  const router = useRouter();

  const routerBack = () => {
    router.back();
  };

  return (
    <>
      <div
        onClick={routerBack}
        className="fixed z-[1190] h-[100vh] bg-[rgba(0,0,0,0.5)]  top-0 w-full"
      ></div>
      {removeCard && (
        <NonwhiteBackGround routerBack={routerBack}>
          {children}
        </NonwhiteBackGround>
      )}
      {!removeCard && (
        <WhiteBackGround routerBack={routerBack}>{children}</WhiteBackGround>
      )}
    </>
  );
};

export default Modal;
