import { getAuth } from "firebase/auth";
import { app } from "@/utils/firebase";
import WhiteCard from "./whiteCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
export default function SettingPage() {
  // const auth = getAuth();
  //const user = auth.currentUser;

  //console.log(user);
  //if (!user) return null;

  return (
    <article>
      <WhiteCard cls="w-[72%] m-auto ">
        <h1 className="font-bold text-2xl mb-2">Profile</h1>

        <div className="my-4 justify-between pr-5 items-center flex">
          <div>
            <h3 className="font-medium text-xl">Email</h3>
            <p className="ml-3 opacity-70">amosdaniel@2005</p>
          </div>
          <button className="bg-orange-600 py-1 px-4 text-white ">
            change Email
          </button>
        </div>
        <div className="my-4 justify-between pr-5 items-center flex">
          <div>
            <h3 className="font-medium text-xl">Update Password</h3>
            <p className="ml-3 opacity-70">Change your password</p>
          </div>
          <button className="bg-orange-600 py-1 px-4 text-white ">
            Update password
          </button>
        </div>
        <div className="my-4 justify-between pr-5 items-center flex">
          <div>
            <h3 className="font-medium text-xl capitalize">
              verify your Account
            </h3>
            <p className="ml-3 opacity-70">
              Verify your email to be legible for a Pro Account
            </p>
          </div>
          <button className="bg-orange-600 py-1 px-4 text-white ">
            Verify
          </button>
        </div>
      </WhiteCard>

      <WhiteCard cls="w-[72%] m-auto my-5">
        <h1 className="font-bold text-2xl ">Ai Settings</h1>

        <div className="my-4 justify-between pr-5 items-center flex">
          <div>
            <h3 className="font-medium text-xl capitalize">
              Ai response Themes
            </h3>
            <p className="ml-3 opacity-70">
              Change your AI responses text(fonts, color, size)
            </p>
          </div>

          <button className="text-gray-600 text-xl">
            <FontAwesomeIcon icon={faArrowRightLong} />
          </button>
        </div>
        <div className="my-4 justify-between pr-5 items-center flex">
          <div>
            <h3 className="font-medium text-xl capitalize">AI Name</h3>
            <p className="ml-3 opacity-70">Give your AI a Name</p>
          </div>

          <button className="text-gray-600 text-xl">
            <FontAwesomeIcon icon={faArrowRightLong} />
          </button>
        </div>
      </WhiteCard>

      <WhiteCard cls="w-[72%] m-auto my-5">
        <h1 className="font-bold text-2xl ">Subscriptions</h1>

        <div className="my-4 justify-between pr-5 items-center flex">
          <div>
            <h3 className="font-medium text-xl capitalize">Change Card</h3>
            <p className="ml-3 opacity-70">Change expired or faulty Card</p>
          </div>

          <button className="text-gray-600 text-xl">
            <FontAwesomeIcon icon={faArrowRightLong} />
          </button>
        </div>

        <div className="my-4 justify-between pr-5 items-center flex">
          <div>
            <h3 className="font-medium text-xl capitalize">
              Cancel Subscription
            </h3>
            <p className="ml-3 opacity-70">End your recurring Subscription</p>
          </div>

          <button className="text-gray-600 text-xl">
            <FontAwesomeIcon icon={faArrowRightLong} />
          </button>
        </div>

        <div className="my-4 justify-between pr-5 items-center flex">
          <div>
            <h3 className="font-medium text-xl capitalize">
              Renew Subscription
            </h3>
            <p className="ml-3 opacity-70">Renew your inactive Subscription</p>
          </div>

          <button className="text-gray-600 text-xl">
            <FontAwesomeIcon icon={faArrowRightLong} />
          </button>
        </div>
      </WhiteCard>
    </article>
  );
}
