"use client";

import WhiteCard from "@/components/whiteCard";
import Button from "@/UI/Button";
import { useRef, useState } from "react";
import { Updateuser } from "../../../../../actions/SettingsActions";

export default function ChangeUserName({ uid }) {
  const [ui, setErrorMessage] = useState({
    loading: false,
    error: "",
    success: "",
  });

  const nameRef = useRef();

  async function HandleNameChange(e) {
    e.preventDefault();

    let nameString = nameRef.current.value;

    if (!nameString || nameString === "") {
      setErrorMessage((prev) => {
        return { error: "Input space is Empty", ...prev };
      });
      return;
    }

    try {
      const name_update = await Updateuser(uid, { name: nameString });
      console.log(email_update);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <WhiteCard cls="md:w-[45%] w-[70%] m-auto rounded">
      <h1 className="text-2xl text-orange-600 font-bold">
        Change Your UserName
      </h1>
      <form onSubmit={HandleNameChange} className="my-5">
        <input type="email" required ref={nameRef} />
        <Button>Subnmit</Button>
      </form>
    </WhiteCard>
  );
}
