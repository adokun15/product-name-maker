"use client";
import Image from "next/image";
import someIcon from "../public/illustrations/illustration-Home(1).png";
import myImageLoader from "@/lib/ImageLoader";
import { useAuth } from "@/utils/Provider/AuthProvider";
import LoaderText from "@/app/overview/[uid]/_helper/LoaderText";

export default function TopDashBoard({ children }) {
  const auth = useAuth();

  if (auth.loading) return <LoaderText clr="text-orange-600" />;

  if (!auth.currentUser) return null;

  const { photoURL, displayName, email } = auth.currentUser;

  return (
    <>
      <h2 className="text-2xl font-medium">Profile</h2>

      <div className=" from-orange-500 bg-gradient-to-br md:w-4/5 px-3 py-2 rounded  to-orange-400 ">
        <div className="col-span-2">
          <Image
            className="block m-auto rounded-[50%]"
            unoptimized
            loader={myImageLoader}
            height="100"
            width="100"
            src={photoURL ? photoURL : someIcon}
            alt="PROFILE image"
          />
        </div>
        <div className="text-white w-full *:mb-3 ">
          <article>
            <h1 className="font-bold">Name</h1>
            <p>{displayName ? displayName : "...."}</p>
          </article>
          <article>
            <h1 className="font-bold">Email</h1>
            <p>{email ? email : "...."}</p>
          </article>
        </div>
        {children}
      </div>
    </>
  );
}
