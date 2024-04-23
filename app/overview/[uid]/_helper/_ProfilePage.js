"use client";
import Image from "next/image";
import defaultImage from "../../../../public/illustrations/illustration-Home(1).png";
import { useAuth } from "@/utils/Provider/AuthProvider";
import { userDatabase } from "@/utils/User/GetUser";
import ServerErrorPage from "@/components/ServerErrorPage";
import Button from "@/UI/Button";
import { useEffect, useState } from "react";
import LoaderText from "./LoaderText";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const user = useAuth();

  if (user.loading) return <LoaderText clr="text-orange-600" />;

  if (!user.currentUser) return null;

  if (!user?.currentUser?.uid) {
    return <ServerErrorPage message="Unauthorized access" status={401} />;
  }
  const [userDb, setStates] = useState({ token: null });

  useEffect(() => {
    const userDb = async () => {
      const data = await userDatabase(user?.currentUser?.uid);
      setStates({ token: data?.token });
    };
    userDb();
  }, []);

  if (!userDb?.token) {
    return <ServerErrorPage message="Something went wrong" status={500} />;
  }

  const { photoURL, displayName, email } = user.currentUser;
  return (
    <>
      <div className="relative mt-10 w-[90%] md:w-3/5 my-9 m-auto">
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
          </article>
          <label className="font-bold">Name</label>
          <input
            className="w-3/5 bg-slate-200 rounded-[0.4rem] outline-orange-600 focus:bg-white 
text-black py-[5px] px-[3px]  min-h-16 transition placeholder:text-slate-600"
            type="text"
            placeholder={displayName || "No name"}
            disabled
          />
          <label className="font-bold">Email</label>
          <input
            className="w-3/5 bg-slate-200 rounded-[0.4rem] outline-orange-600 focus:bg-white 
text-black py-[5px] px-[3px] min-h-16 transition placeholder:text-slate-600"
            type="email"
            placeholder={email || "no email"}
            disabled
          />
          <label className="font-bold">Token</label>
          <input
            className="w-3/5 bg-slate-200 rounded-[0.4rem] outline-orange-600 focus:bg-white 
text-black py-[5px] px-[3px] min-h-16 transition placeholder:text-slate-600"
            type="email"
            placeholder={userDb?.token || 0}
            disabled
          />
        </div>
      </div>
    </>
  );
}
