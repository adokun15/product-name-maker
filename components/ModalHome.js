"use client";
import React from "react";
import WhiteCard from "./whiteCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/utils/Provider/AuthProvider";
import { usePathname, useRouter } from "next/navigation";
import { useModal } from "@/utils/Provider/ModalProvider";
import Link from "next/link";

const HomeModal = () => {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuth();

  const { homeModal, toggleHomeModal } = useModal();

  return (
    <>
      {homeModal && (
        <>
          <div
            onClick={toggleHomeModal}
            className="fixed z-[1190] h-[100vh] bg-[rgba(0,0,0,0.5)] top-0 w-full backdrop-blur-lg"
          ></div>
          <WhiteCard
            cls={`fixed z-[1200] h-fit w-[90%] left-[5%] py-5 top-[0%] my-[1rem] bg-white m-auto `}
          >
            <div>
              <button
                onClick={toggleHomeModal}
                className="font-medium text-end block w-full"
              >
                <FontAwesomeIcon icon={faX} />
              </button>
              <ul className="*:block *:text-xl *:mb-4">
                <Link
                  onClick={toggleHomeModal}
                  href="/"
                  className={`${
                    pathname === "/"
                      ? "font-bold text-orange-400 transition-all duration-[0.4s]"
                      : ""
                  } `}
                >
                  Home
                </Link>
                <Link
                  onClick={toggleHomeModal}
                  href="/features"
                  className={`${
                    pathname === "/features"
                      ? "font-bold text-orange-400 transition-all duration-[0.4s]"
                      : ""
                  } `}
                >
                  {" "}
                  Features
                </Link>
                <Link
                  onClick={toggleHomeModal}
                  href="/pricing"
                  className={`${
                    pathname === "/pricing"
                      ? "font-bold text-orange-400 transition-all duration-[0.4s]"
                      : ""
                  } `}
                >
                  {" "}
                  Pricing
                </Link>
                {!user.currentUser?.uid ? (
                  <button
                    className="filled_large_btn_black"
                    onClick={() => {
                      toggleHomeModal();
                      router.push("/auth");
                    }}
                  >
                    Get Started
                  </button>
                ) : (
                  <button
                    className="filled_large_btn_black"
                    onClick={() => {
                      toggleHomeModal();
                      router.push(`/overview/${user?.currentUser.uid}`);
                    }}
                  >
                    Dashboard
                  </button>
                )}
              </ul>
            </div>
          </WhiteCard>
        </>
      )}
    </>
  );
};

export default HomeModal;
