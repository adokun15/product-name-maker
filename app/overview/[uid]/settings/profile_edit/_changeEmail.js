"use client";

import WhiteCard from "@/components/whiteCard";
import Button from "@/UI/Button";
import { useRef, useState } from "react";
import { Updateuser } from "../../../../../actions/SettingsActions";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/utils/Provider/AuthProvider";
import LoaderText from "../../_helper/LoaderText";

export default function ChangeEmail({ uid }) {
  const auth = useAuth();

  if (!auth.currentUser) return null;
  const emailRef = useRef();

  const [ui, setUiMessage] = useState({
    loading: false,
    message: "",
  });

  const router = useRouter();

  async function HandleEmailChange(e) {
    e.preventDefault();
    let emailString = emailRef.current.value;

    setUiMessage(() => {
      return { loading: true };
    });

    if (!emailString || emailString === "") {
      setUiMessage(() => {
        return { message: "Input space is Empty", loading: false };
      });

      return;
    }

    try {
      const email_update = await Updateuser(uid, { email: emailString });

      if (email_update?.error) {
        setUiMessage(() => {
          return { message: email_update?.message, loading: false };
        });
      }

      setUiMessage(() => {
        return { message: email_update?.message, loading: false };
      });
    } catch (e) {
      setUiMessage(() => {
        return { message: e?.message, loading: false };
      });
    } finally {
      setUiMessage((p) => {
        return { loading: true, ...p };
      });
      router.refresh();
    }
  }

  return (
    <>
      <button
        onClick={() =>
          router.push(`/overview/${auth.currentUser?.uid}/settings`)
        }
        className="ml-10 text-slate-500"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        <span> Settings</span>
      </button>

      <WhiteCard cls="md:w-[45%] w-[70%] m-auto rounded">
        <h1 className="text-2xl text-orange-600 font-bold">
          Change Your Email
        </h1>
        {ui.message ? (
          <p className="my-3">{ui.message}</p>
        ) : (
          <p className="font-bold my-3">
            Current email: {auth?.currentUser?.email}
          </p>
        )}
        <form onSubmit={HandleEmailChange} className="my-5">
          <input
            className="bg-slate-200 mb-4 outline-slate-400 rounded py-3 w-full px-1"
            type="email"
            required
            placeholder="Enter your new Email"
            ref={emailRef}
          />
          <Button disabled={ui.loading}>
            {ui.loading ? <LoaderText clr="text-white" /> : "Submit"}
          </Button>
        </form>
      </WhiteCard>
    </>
  );
}
