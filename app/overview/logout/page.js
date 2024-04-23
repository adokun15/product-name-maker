"use client";
import { useAuth } from "@/utils/Provider/AuthProvider";

import { useEffect } from "react";
export default function LogoutPage() {
  const auth = useAuth();

  useEffect(() => {
    const logout = async () => await auth.SignOut();
    logout();
  }, []);
  return (
    <>
      <p className="text-3xl text-center mt-[2.9rem]">Logging Out...</p>
    </>
  );
}
