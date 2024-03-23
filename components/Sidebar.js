"use client";
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
  faStore,
  faToolbox,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "@/hook/useUser";

const Sidebar = () => {
  const user = useUser();
  const { uid } = user.cUser;

  const pathname = usePathname();

  return (
    <div
      className="from-orange-400 relative h-fit overflow-scroll bg-gradient-to-br to-orange-600 z-[40] w-full col-end-1 
    row-span-10 px-8 text-white "
    >
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
            href="/overview"
            className={`${pathname === "/overview" ? "font-bold" : ""} block`}
          >
            <p className="block">
              <FontAwesomeIcon className="mr-4" icon={faHouse} />
              DashBoard
            </p>
          </Link>

          <Link
            href="/overview/name-availablity"
            className={`${
              pathname === "/overview/name-availablity" ? "font-bold" : ""
            } text-start my-5`}
          >
            <p className="block">
              <FontAwesomeIcon className="mr-4" icon={faBinoculars} />
              Name Availability Checker
            </p>
          </Link>
        </div>

        <div className="mb-6">
          <Categorized
            header="User Tools"
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
            href={`/overview/subscription?id=${uid}`}
            className={`${
              pathname === `/overview/subscription?id=${uid}` ? "font-bold" : ""
            } text-start my-5`}
          >
            <p className="block">
              <FontAwesomeIcon className="mr-4" icon={faMoneyCheck} />
              Subscription
            </p>
          </Link>
          <Link
            href="/overview/t&c"
            className={`${
              pathname === "/overview/t&c" ? "font-bold" : ""
            } text-start my-5`}
          >
            {" "}
            <p className="block">
              <FontAwesomeIcon className="mr-4" icon={faHandshake} />
              Terms and Conditions
            </p>{" "}
          </Link>
          <Link
            href="/overview/settings"
            className={`${
              pathname === "/overview/settings" ? "font-bold" : ""
            } text-start my-5 capitalize`}
          >
            {" "}
            <p className="block">
              <FontAwesomeIcon className="mr-4" icon={faToolbox} />
              settings
            </p>{" "}
          </Link>
        </div>
      </div>

      <button
        className="filled_small_btn_orange"
        onClick={() => router.push("/overview/upgrade")}
      >
        Upgrade to Pro
      </button>
    </div>
  );
};

export default Sidebar;

/*
@ Favorites and Shortlist: Allow users to save their favorite name suggestions or create a shortlist for easy reference and comparison.

Naming History: Keep a record of past naming sessions and suggestions for users to revisit or continue working on later.

Guided Wizard: Implement a step-by-step wizard that guides users through the naming process, ensuring they cover essential aspects and criteria.

Collaboration Tools: Enable users to invite team members or stakeholders to collaborate within the dashboard, share feedback, and collectively decide on names.

Progress Tracking: Show progress indicators or milestones to give users a sense of advancement in the naming process.

Name Availability Checker: Provide a tool to quickly check domain availability and social media handles for selected names directly from the dashboard.

Naming Brief Creation: Allow users to create and save naming briefs specifying requirements, preferences, and target audience details for future reference.

User Profiles: Enable users to create profiles where they can manage multiple naming projects, preferences, and settings.

AI Suggestions Filter: Offer filtering options based on criteria like tone (fun, professional), length, language, or industry relevance to narrow down suggestions.

Educational Resources: Provide tutorials, articles, or FAQs within the dashboard to assist users in understanding naming strategies and best practices.

Export and Share: Allow users to export their naming suggestions or share them via email or social media directly from the dashboard.

Customization Options: Enable users to customize the dashboard layout, theme, or display preferences based on their preferences.

Real-time Collaboration: Implement real-time editing and commenting features, allowing multiple users to work on naming projects simultaneously.

Community Engagement: Integrate a community forum or space within the dashboard where users can seek advice, share experiences, or ask for naming suggestions.

Analytics and Insights: Provide data analytics or insights on naming trends, popularity, or success rates of different types of names.


*/
