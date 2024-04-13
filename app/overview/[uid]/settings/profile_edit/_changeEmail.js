"use client";

import WhiteCard from "@/components/whiteCard";
import Button from "@/UI/Button";
import { useRef } from "react";
import { Updateuser } from "../../../../../actions/SettingsActions";

export default function ChangeEmail({ uid }) {
  const [ui, setErrorMessage] = useState({
    loading: false,
    error: "",
    success: "",
  });

  const emailRef = useRef();

  async function HandleEmailChange(e) {
    e.preventDefault();
    let emailString = emailRef.current.value;

    if (!emailString || emailString === "") {
      setErrorMessage((prev) => {
        return { error: "Input space is Empty", ...prev };
      });
      return;
    }

    try {
      const email_update = await Updateuser(uid, { email: emailString });
      console.log(email_update);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <WhiteCard cls="md:w-[45%] w-[70%] m-auto rounded">
      <h1 className="text-2xl text-orange-600 font-bold">Change Your Email</h1>
      <form onSubmit={HandleEmailChange} className="my-5">
        <input type="email" required ref={emailRef} />
        <Button>Subnmit</Button>
      </form>
    </WhiteCard>
  );
}
