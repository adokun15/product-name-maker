"use client";
import Image from "next/image";
import someIcon from "../public/illustrations/illustration-Home(1).png";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import { useUser } from "@/hook/useUser";
import myImageLoader from "@/lib/ImageLoader";
import SideDashboard from "./SideDashboard";
import { Suspense } from "react";
import LoaderPage from "@/app/overview/_helper/loaderPage";
import LoaderText from "@/app/overview/_helper/LoaderText";
export default function TopDashBoard() {
  const router = useRouter();
  const user = useUser();
  const { photoURL, displayName, email, uid } = user.cUser;

  if (user.loading) return <LoaderPage />;

  if (user.error) throw Error("Unauthorized Access", { status: 403 });
  return (
    <>
      <h2 className="text-2xl font-medium">Profile</h2>

      <div className="rounded bg-gradient-to-r gap-x-[4rem] flex p-5 shadow from-orange-500 to-orange-400 w-4/5">
        <div>
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

        <div className="text-white">
          <article>
            <h1 className="font-bold">Name</h1>
            <p>{displayName ? displayName : "...."}</p>
          </article>
          <article>
            <h1 className="font-bold">Email</h1>
            <p>{email ? email : "...."}</p>
          </article>
        </div>
        <Suspense fallback={<LoaderText />}>
          <SideDashboard uid={uid} />
        </Suspense>
      </div>
      {/*     <div className="my-4 flex gap-4">
        <button
          onClick={() => router.push(`/overview/profile?id=${uid}`)}
          className="filled_small_btn_orange bg-orange-300"
        >
          Edit Profile
        </button>
        <button
          onClick={() => router.push(`/overview/history?id=${uid}`)}
          className="filled_small_btn_orange bg-orange-300"
        >
          Check History
        </button>
      </div>*/}
    </>
  );
}
