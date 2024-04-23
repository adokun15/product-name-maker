"use client";

import WhiteCard from "./whiteCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import LoaderText from "@/app/overview/[uid]/_helper/LoaderText";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/Provider/AuthProvider";
export default function SettingPage() {
  //hooks(user, navigation)
  const auth = useAuth();

  if (!auth.currentUser) return null;

  const user = auth.currentUser;
  const router = useRouter();

  let initUrl = `/overview/${user?.uid}/settings`;
  return (
    <article>
      <WhiteCard cls="md:w-[72%] w-[95%] m-auto ">
        <h1 className="font-bold text-2xl mb-2">Profile</h1>

        <div className="my-4 justify-between pr-5 items-center flex">
          <div>
            <h3 className="font-medium text-xl">UserName</h3>
            <p className="md:ml-3 opacity-70">{user?.displayName}</p>
          </div>

          <button
            className="text-gray-600 text-xl"
            onClick={() => {
              router.push(`${initUrl}/profile_edit?edit=username`);
            }}
          >
            <FontAwesomeIcon icon={faArrowRightLong} />
          </button>
        </div>
        <div className="my-4 justify-between pr-5 items-center flex">
          <div>
            <h3 className="font-medium text-xl">Email</h3>
            <p className="md:ml-3 opacity-70">{user?.email}</p>
          </div>
          <button
            className="text-gray-600 text-xl"
            onClick={() => {
              router.push(`${initUrl}/profile_edit?edit=email`);
            }}
          >
            <FontAwesomeIcon icon={faArrowRightLong} />
          </button>
        </div>
        <div className="my-4 justify-between pr-5 items-center flex">
          <div>
            <h3 className="font-medium text-xl">Update Password</h3>
            <p className="md:ml-3 opacity-70">Change your password</p>
          </div>
          <button
            className="text-gray-600 text-xl"
            onClick={() => {
              router.push(`${initUrl}/profile_edit?edit=password`);
            }}
          >
            <FontAwesomeIcon icon={faArrowRightLong} />
          </button>
        </div>
        {!user.emailVerified && (
          <div className="my-4 justify-between pr-5 items-center flex">
            <div>
              <h3 className="font-medium text-xl capitalize">
                verify your Account
              </h3>
              <p className="md:ml-3 opacity-70">
                Verify your email to be legible for a Pro Account
              </p>
            </div>

            <button
              className="text-gray-600 text-xl"
              onClick={() => {
                router.push(`${initUrl}/profile_edit?edit=verify_email`);
              }}
            >
              <FontAwesomeIcon icon={faArrowRightLong} />
            </button>
          </div>
        )}
      </WhiteCard>

      <WhiteCard cls="md:w-[72%] w-[95%] my-5 m-auto ">
        <h1 className="font-bold text-2xl ">Ai Settings</h1>

        <div className="my-4 justify-between pr-5 items-center flex">
          <div>
            <h3 className="font-medium text-xl capitalize">
              Ai response Themes
            </h3>
            <p className="md:ml-3 opacity-70">
              Change your AI responses text(fonts, color, size)
            </p>
          </div>

          <button
            className="text-gray-600 text-xl"
            onClick={() => {
              router.push(`${initUrl}/ai_edit?edit=theme`);
            }}
          >
            <FontAwesomeIcon icon={faArrowRightLong} />
          </button>
        </div>
        <div className="my-4 justify-between pr-5 items-center flex">
          <div>
            <h3 className="font-medium text-xl capitalize">AI Name</h3>
            <p className="md:ml-3 opacity-70">Give your AI a Name</p>
          </div>

          <button
            className="text-gray-600 text-xl"
            onClick={() => {
              router.push(`${initUrl}/ai_edit?edit=name`);
            }}
          >
            <FontAwesomeIcon icon={faArrowRightLong} />
          </button>
        </div>
      </WhiteCard>
    </article>
  );
}

/*
 
*/
