"use client";
import React from "react";
import { useAuth } from "@/utils/Provider/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import SidebarLink from "./SideBarLinks";
import { useModal } from "@/utils/Provider/ModalProvider";

const ModalOverview = () => {
  const auth = useAuth();

  if (!auth.currentUser) return null;

  const { uid } = auth.currentUser;
  const { overviewModal, toggleOverViewModal } = useModal();
  return (
    <>
      {overviewModal && (
        <>
          <div
            onClick={toggleOverViewModal}
            className="fixed md:hidden h-[100vh] bg-[rgba(0,0,0,0.3)] backdrop-blur-lg  top-0 w-full"
          ></div>
          <div className="fixed md:hidden top-0 h-full  left-[0%] flex gap-x-8  z-[1195] text-white  ">
            <div className="overflow-scroll bg-orange-500 h-[100%]  px-[2rem]">
              <SidebarLink uid={uid} />
            </div>
            <button
              onClick={toggleOverViewModal}
              className="relative items-start mr-2"
            >
              <FontAwesomeIcon className="text-2xl" icon={faX} />
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default ModalOverview;
