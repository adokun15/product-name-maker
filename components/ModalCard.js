"use client";

import { UseModal } from "@/hook/useModal";
import WhiteCard from "./whiteCard";

export default function ModalDropDown({}) {
  const { triggerCloseModal } = UseModal();
  //trigger close modal if mouse leaves

  return (
    <>
      <WhiteCard cls="left-[85%] top-[4rem] w-[14%] z-[1000] absolute bg-white">
        <p className="">hi</p>
      </WhiteCard>
    </>
  );
}
