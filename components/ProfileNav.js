"use client";
import Image from "next/image";
import { useUser } from "@/hook/useUser";
import myImageLoader from "@/lib/ImageLoader";
import { UseModal } from "@/hook/useModal";
import ModalDropDown from "./ModalCard";

const ProfileNav = () => {
  const person = useUser();
  const { modal, triggerOpenModal } = UseModal();
  const user = person.cUser;

  return (
    <>
      <div className="col-start-1 row-span-1 col-end-6  flex  justify-end pr-6 py-6 items-center">
        <article className="flex gap-1 items-center pr-[1rem]">
          <div
            onClick={triggerOpenModal}
            className={` hover:cursor-pointer rounded-[50%] ${
              !user?.photoURL ? "" : " border-4 border-solid border-orange-600"
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
      {modal && <ModalDropDown />}
    </>
  );
};

export default ProfileNav;
