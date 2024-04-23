"use client";
import Image from "next/image";
import myImageLoader from "@/lib/ImageLoader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/utils/Provider/AuthProvider";
import ModalOverview from "./ModalOverview";
import { useModal } from "@/utils/Provider/ModalProvider";
import ModalDropDown from "./dropdownModal";
import { useEffect, useState } from "react";
import { IsPro } from "@/lib/BoolFunctions";

const ProfileNav = () => {
  const person = useAuth();
  const [pro_acc, setPro] = useState(false);
  const user = person.currentUser;
  const { toggleOverViewModal, toggleDropDownModal } = useModal();

  useEffect(() => {
    const fetchPro = async () => {
      try {
        const ispro = await IsPro(user?.uid);
        setPro(ispro);
      } catch (e) {
        setPro(null);
      }
    };
    fetchPro();
  });
  return (
    <>
      <ModalOverview />
      <div className="col-start-1 px-10 row-span-1 col-end-6  flex  md:justify-end justify-between pr-6 py-6 bg-[rgba(255,255,255,0.94)] md:bg-none items-center">
        <button className="md:hidden text-3xl" onClick={toggleOverViewModal}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <article className="flex gap-1 items-center pr-[1rem]">
          <div
            onClick={toggleDropDownModal}
            className={` hover:cursor-pointer rounded-[50%] ${
              !user?.photoURL
                ? `px-4 py-2 ${
                    !user?.displayName
                      ? "bg-transparent"
                      : "border-4 border-solid  border-orange-600"
                  }`
                : `${
                    !user?.displayName
                      ? "bg-transparent"
                      : "border-orange-600 border-4 border-solid "
                  }`
            }`}
          >
            {user?.photoURL ? (
              <Image
                className="block  rounded-[50%]"
                height="40"
                unoptimized
                loader={myImageLoader}
                width="40"
                src={user.photoURL ? user.photoURL : ""}
                alt="PRO"
              />
            ) : (
              <p>{user?.displayName?.split("")[0].toUpperCase()}</p>
            )}
          </div>
        </article>
      </div>
      <ModalDropDown ispro={pro_acc} />
    </>
  );
};

export default ProfileNav;
