"use client";
import Image from "next/image";
import LogoImg from "../public/icons/icons8-pen-32.png";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/utils/Provider/AuthProvider";
import { useModal } from "@/utils/Provider/ModalProvider";

export function NavLink() {
  const pathname = usePathname();
  const router = useRouter();

  const user = useAuth();

  return (
    <div className="flex gap-6 items-center">
      <>
        <Link
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
              router.push("/auth");
            }}
          >
            Get Started
          </button>
        ) : (
          <button
            className="filled_large_btn_black"
            onClick={() => {
              router.push(`/overview/${user?.currentUser.uid}`);
            }}
          >
            Dashboard
          </button>
        )}
      </>
    </div>
  );
}

export default function NavBar() {
  const { toggleHomeModal } = useModal();

  return (
    <nav className="flex top-0 justify-between fixed w-full bg-[rgba(255,255,255,0.94)] z-[100] items-center md:px-[4rem] px-8 md:py-6 py-3">
      <Link href="/">
        <div className="flex items-center">
          <Image
            height={39}
            className="rounded-[50%] "
            width={39}
            src={LogoImg}
            alt="Logo"
          />
          <p className="text-2xl">Namify</p>
        </div>
      </Link>
      <div className="md:block hidden">
        <NavLink />
      </div>

      <button className="md:hidden block" onClick={toggleHomeModal}>
        <FontAwesomeIcon className="text-2xl" icon={faBars} />
      </button>
    </nav>
  );
}
