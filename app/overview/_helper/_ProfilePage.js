"use client";
import Image from "next/image";
import Link from "next/link";
import defaultImage from "../../../public/illustrations/illustration-Home(1).png";
import { useUser } from "@/hook/useUser";

export default function ProfilePage() {
  const user = useUser();
  const { photoURL, displayName, email } = user.cUser;
  return (
    <div className="relative mt-10 w-3/5 my-9 m-auto">
      <div className="bg-orange-600 absolute -bottom-5 -right-5 w-[10rem] h-[10rem]"></div>
      <div className="bg-orange-600 absolute -left-5 -top-5 w-[10rem] h-[10rem]"></div>
      <div className=" *:block pl-10 py-6 min-h-[14rem] relative z-40 shadow-md w-full bg-slate-100">
        <article>
          <Image
            className="block m-auto rounded-[50%]"
            width="150"
            height="150"
            src={photoURL || defaultImage}
            alt="Profile Image"
          />
          <Link
            href="/someModal"
            className="text-center block my-3 underline font-[500] text-blue-900"
          >
            Edit Profile pic
          </Link>
        </article>

        <label className="font-bold">Name</label>
        <input
          className="w-3/5 bg-slate-200 rounded-[0.4rem] outline-orange-600 focus:bg-white 
text-black py-[5px] px-[3px]  min-h-16 transition placeholder:text-slate-600"
          type="text"
          placeholder={displayName || "No name"}
          disabled
        />
        <Link
          href="/someModal"
          className=" block my-3 underline font-[500] text-blue-900"
        >
          Edit Name
        </Link>
        <label className="font-bold">Email</label>
        <input
          className="w-3/5 bg-slate-200 rounded-[0.4rem] outline-orange-600 focus:bg-white 
text-black py-[5px] px-[3px] min-h-16 transition placeholder:text-slate-600"
          type="email"
          placeholder={email || "no email"}
          disabled
        />
        <Link
          href="/someModal"
          className="block my-3 underline font-[500] text-blue-900"
        >
          Edit Email
        </Link>
      </div>
    </div>
  );
}
