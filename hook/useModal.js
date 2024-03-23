"use client";
import { useState } from "react";
export const UseModal = () => {
  const [isOpened, setIsOpened] = useState(false);

  const triggermodal = () => {
    setIsOpened((prev) => !prev);
  };
  const closemodal = () => {
    setIsOpened(false);
  };

  const openmodal = () => {
    setIsOpened(true);
  };
  console.log(isOpened);
  return {
    triggermodal,
    triggerOpenModal: openmodal,
    triggerCloseModal: closemodal,
    modal: isOpened,
  };
};
