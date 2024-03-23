"use client";
import { usePathname } from "next/navigation";
import LoaderPage from "./_helper/loaderPage";
import LoaderText from "./_helper/LoaderText";
import OverViewLoader from "@/components/OverViewLoader";
export default function Loader() {
  const pathname = usePathname();

  if (pathname === "/overview") return <OverViewLoader />;
  return <LoaderPage message="loading" />;
}
