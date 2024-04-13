"use client";
import React from "react";
import WhiteCard from "./whiteCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const Modal = () => {
  const { toggleHomeModal } = useModal();

  return (
    <>
      <div
        onClick={toggleHomeModal}
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
        <li>Home </li>
        <li>feature</li>
        <li>plans</li>
      </WhiteCard>
    </>
  );
};

export default Modal;
