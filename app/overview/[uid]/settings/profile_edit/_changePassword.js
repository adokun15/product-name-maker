"use client";

import WhiteCard from "@/components/whiteCard";
import Button from "@/UI/Button";
import { Updateuser } from "../../../../../actions/SettingsActions";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/Provider/AuthProvider";
import LoaderText from "../../_helper/LoaderText";

export default function ChangePassword({ uid }) {
  const auth = useAuth();

  if (!auth.currentUser) return null;

  const router = useRouter();
  const [ui, setUiMessage] = useState({
    loading: false,
    message: "",
  });

  const passwordRef1 = useRef();
  const passwordRef2 = useRef();

  async function HandlePasswordChange(e) {
    e.preventDefault();

    let newPassordString = passwordRef1.current;
    let confirmPassordString = passwordRef2.current;

    setUiMessage(() => {
      return { loading: true };
    });

    if (!newPassordString.value || !confirmPassordString.value) {
      setUiMessage((prev) => {
        return { message: "Input space is Empty", loading: false };
      });
      return;
    }
    if (confirmPassordString.value !== newPassordString.value) {
      setUiMessage(() => {
        return { message: "Passwords does not match!", loading: false };
      });
      return;
    }

    try {
      const password_update = await Updateuser(uid, {
        password: newPassordString.value,
      });

      if (password_update?.error) {
        setUiMessage(() => {
          return { message: password_update?.message, loading: false };
        });
      }

      setUiMessage(() => {
        return { message: password_update?.message, loading: false };
      });

      newPassordString.value = "";
      confirmPassordString.value = "";
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
        className="ml-10  text-slate-500"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />{" "}
        <span> Settings</span>
      </button>
      <WhiteCard cls="md:w-[45%] w-[70%] m-auto rounded">
        <h1 className="text-2xl text-orange-600 font-bold">
          Change Your Password
        </h1>
        <form onSubmit={HandlePasswordChange} className="my-5 *:block *:mt-4">
          {ui.message && <p>{ui.message}</p>}
          <input
            className="bg-slate-200 outline-slate-400 rounded py-3 w-full px-1"
            type="password"
            required
            placeholder="Enter new password"
            ref={passwordRef1}
          />
          <input
            className="bg-slate-200 outline-slate-400 rounded py-3 w-full px-1"
            placeholder="Confirm new password"
            type="password"
            required
            ref={passwordRef2}
          />
          <Button disabled={ui.loading}>
            {ui.loading ? <LoaderText clr="text-white" /> : "Submit"}
          </Button>
        </form>
      </WhiteCard>
    </>
  );
}
