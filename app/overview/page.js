"use client";

import { useAuth } from "@/utils/Provider/AuthProvider";
import LoaderPage from "./[uid]/_helper/loaderPage";
import { useRouter } from "next/navigation";

export default function Overview() {
  const user = useAuth();
  const router = useRouter();

  if (user.loading) return <LoaderPage message="redirecting..." />;

  const { currentUser, loading } = user;

  if (currentUser?.uid) {
    router.push(`/overview/${currentUser?.uid}`);
  } else {
    router.push(`/overview/logout`);
  }
  return <></>;
}
