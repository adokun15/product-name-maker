"use client";

import HomeModal from "@/components/ModalHome";
import ServerErrorPage from "@/components/ServerErrorPage";

export default function NotFound() {
  return (
    <>
      <HomeModal />
      <ServerErrorPage status={404} message="This Page is not found" />;
    </>
  );
}
