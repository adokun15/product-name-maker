"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import SidebarLink from "./SideBarLinks";
import { useModal } from "@/utils/Provider/ModalProvider";

const ModalOverview = () => {
  const { overviewModal, toggleOverViewModal } = useModal();

  return (
    <>
      {overviewModal && (
        <>
          <div
            onClick={toggleOverViewModal}
            className="fixed md:hidden h-[100vh] bg-[rgba(0,0,0,0.3)]  top-0 w-full"
          ></div>
          <div className="absolute md:hidden top-0 h-[100vh] overflow-scroll left-[0%] flex gap-x-8  z-[1195] text-white  ">
            <div className="bg-orange-500 px-[2rem]">
              <SidebarLink />
            </div>
            <button
              onClick={toggleOverViewModal}
              className="relative items-start"
            >
              <FontAwesomeIcon className="text-3xl" icon={faX} />
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default ModalOverview;
