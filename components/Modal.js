"use client";
import React from "react";
import WhiteCard from "./whiteCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faX } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

const Modal = ({ children, removeCard }) => {
  const backExit = useRouter();

  const cancelModal = () => {
    backExit.back();
  };
  return (
    <>
      <div
        onClick={cancelModal}
        className="fixed z-[1190] h-[100vh] bg-[rgba(0,0,0,0.5)]  top-0 w-full"
      ></div>

      <WhiteCard
        cls={`absolute ${
          removeCard ? "" : "bg-white"
        } z-[1200] h-fit w-3/5 left-[20%] py-5 top-[5%] my-[1rem] `}
      >
        <button onClick={cancelModal} className="font-medium">
          <FontAwesomeIcon
            icon={faX}
            className={`${removeCard ? "text-white" : "text-black"}`}
          />
        </button>
        {children}
      </WhiteCard>
    </>
  );
};

export default Modal;
