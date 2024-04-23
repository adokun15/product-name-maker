import Image from "next/image";
import LogoImg from "../public/icons/icons8-pen-30.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Categorized } from "./CategorizedSideBar";
import {
  faBinoculars,
  faHandshake,
  faHouse,
  faMoneyCheck,
  faToolbox,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SidebarLink({ uid }) {
  const pathname = usePathname();

  return (
    <>
      <section className="py-8 border-b-2 border-solid border-white">
        <Link href="/">
          <div className="flex items-center gap-3 ">
            <Image
              height={30}
              className="rounded-[50%] "
              width={30}
              src={LogoImg}
              unoptimized
              alt="Logo"
            />
            <p className="text-2xl font-bold">Namify</p>
          </div>
        </Link>
      </section>

      <div className="list-none text-start leading-[3.9rem] text-xl  my-2">
        <div className="mb-6 *:inline">
          <Link
            href={`/overview/${uid}`}
            className={`${pathname === `/${uid}` ? "font-bold" : ""} block`}
          >
            <p className="block text-[0.9rem] md:text-[1.3rem]">
              <FontAwesomeIcon className="mr-4" icon={faHouse} />
              DashBoard
            </p>
          </Link>

          <Link
            href={`/overview/${uid}/name-availablity`}
            className={`${
              pathname === `/${uid}/name-availablity` ? "font-bold" : ""
            } text-start my-5`}
          >
            <p className="block text-[0.9rem] md:text-[1.3rem]">
              <FontAwesomeIcon className="mr-4" icon={faBinoculars} />
              Name Availability Checker
            </p>
          </Link>
        </div>

        <div className="mb-6">
          <Categorized
            uid={uid}
            contents={[
              {
                redirectLink: "product-naming",
                name: "AI generated Product Name",
              },
              { redirectLink: "brand-naming", name: "Brand Name" },
              { redirectLink: "startup-naming", name: "Startup Name" },
              {
                redirectLink: "domain-naming",
                name: "AI generated Domain Name",
              },
              {
                redirectLink: "character-naming",
                name: "AI generated Character Name",
              },
            ]}
          />
        </div>

        <div className="mb-6 *:block">
          <Link
            href={`/overview/${uid}/subscription`}
            className={`${
              pathname === `/${uid}/subscription` ? "font-bold" : ""
            } text-start my-5`}
          >
            <p className="block text-[0.9rem] md:text-[1.3rem]">
              <FontAwesomeIcon className="mr-4" icon={faMoneyCheck} />
              Subscription
            </p>
          </Link>
          <Link
            href={`/overview/${uid}/t&c`}
            className={`${
              pathname === `/${uid}/t&c` ? "font-bold" : ""
            } text-start my-5`}
          >
            {" "}
            <p className="block text-[0.9rem] md:text-[1.3rem]">
              <FontAwesomeIcon className="mr-4" icon={faHandshake} />
              Terms and Conditions
            </p>{" "}
          </Link>
          <Link
            href={`/overview/${uid}/settings`}
            className={`${
              pathname === `/${uid}/settings` ? "font-bold" : ""
            } text-start my-5 capitalize`}
          >
            {" "}
            <p className="block text-[0.9rem] md:text-[1.3rem]">
              <FontAwesomeIcon className="mr-4" icon={faToolbox} />
              settings
            </p>{" "}
          </Link>
        </div>
      </div>
    </>
  );
}
