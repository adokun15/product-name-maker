"use client";
import { usePathname } from "next/navigation";
import LoaderPage from "./_helper/loaderPage";
import LoaderText from "./_helper/LoaderText";
import OverViewLoader from "@/components/OverViewLoader";
export default function Loader() {
  const pathname = usePathname();

  return <LoaderText clr="text-orange-700" />;
}
