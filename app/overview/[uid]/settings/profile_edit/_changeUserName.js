"use client";

import WhiteCard from "@/components/whiteCard";
import Button from "@/UI/Button";
import { useEffect, useRef, useState } from "react";
import { Updateuser } from "../../../../../actions/SettingsActions";
import { useAuth } from "@/utils/Provider/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import LoaderText from "../../_helper/LoaderText";

export default function ChangeUserName({ uid, customer_code }) {
  const auth = useAuth();

  if (!auth.currentUser) return null;

  const [ui, setUiMessage] = useState({
    loading: false,
    message: "",
  });

  const nameRef = useRef();

  const router = useRouter();
  async function HandleNameChange(e) {
    e.preventDefault();

    setUiMessage(() => {
      return { loading: true };
    });

    let nameString = nameRef.current.value;

    if (!nameString || nameString === "") {
      setUiMessage(() => {
        return { message: "Input space is Empty", loading: false };
      });
      return;
    }

    try {
      const name_update = await Updateuser(uid, {
        name: nameString,
        customer_code,
      });

      if (name_update?.error) {
        setUiMessage(() => {
          return { message: name_update?.message, loading: false };
        });
      }

      setUiMessage(() => {
        return { message: name_update?.message, loading: false };
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
        className="ml-10  text-slate-500"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />{" "}
        <span> Settings</span>
      </button>

      <WhiteCard cls="md:w-[45%] my-5 w-[70%] m-auto rounded">
        <h1 className="text-2xl text-orange-600 font-bold">
          Change Your UserName
        </h1>
        <form onSubmit={HandleNameChange} className="*:block *:mt-2 my-5">
          {ui.message ? (
            <p>{ui.message}</p>
          ) : (
            <p className="font-bold">
              Current UserName:{" "}
              <span className="font-mono text-xl">
                {auth.currentUser?.displayName || "..."}
              </span>
            </p>
          )}
          <input
            className="bg-slate-200 outline-slate-400 rounded py-3 w-full px-1"
            placeholder="Enter Your New UserName"
            ref={nameRef}
          />
          <Button disabled={ui.loading}>
            {ui.loading ? <LoaderText clr="text-white" /> : "Submit"}
          </Button>
        </form>
      </WhiteCard>
    </>
  );
}
