"use client";

import WhiteCard from "./whiteCard";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/Provider/AuthProvider";
import { useModal } from "@/utils/Provider/ModalProvider";
import { useEffect } from "react";
import { IsPro } from "@/lib/BoolFunctions";

export default function ModalDropDown({ ispro }) {
  const user = useAuth();
  if (!user.currentUser) return null;

  const { toggleDropDownModal, dropDownModal } = useModal();
  const { uid } = user.currentUser;

  const router = useRouter();

  const redirectButton = (url) => {
    router.push(`/overview/${uid}/${url}`);
    toggleDropDownModal();
  };

  const logout = async () => {
    //Log out from FIREBASE
    try {
      await user.SignOut();
    } catch (E) {
      console.log(E);
      alert("Could not sign Out");
    }
  };
  return (
    <>
      {dropDownModal && (
        <WhiteCard cls="*:block *:mb-4 left-[55%]  w-[38%]  md:left-[78%] top-[4rem] md:w-[21%] z-[1000] absolute bg-white">
          <button onClick={() => redirectButton("profile")}>
            Edit Profile
          </button>
          <button onClick={() => redirectButton("notification")}>
            Notifications
          </button>
          <button onClick={() => redirectButton("history")}>
            View History
          </button>
          <button onClick={logout}>Logout</button>
          {!ispro && (
            <button
              className="bg-orange-500 text-white font-medium md:px-4 px-3 rounded py-1"
              onClick={() => redirectButton("upgrade")}
            >
              Upgrade to Pro
            </button>
          )}
        </WhiteCard>
      )}
    </>
  );
}
