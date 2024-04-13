"use client";

import WhiteCard from "@/components/whiteCard";
import Button from "@/UI/Button";
import { useRef } from "react";
import { Updateuser } from "../../../../../actions/SettingsActions";

export default function ChangePassword({ uid }) {
  const [ui, setErrorMessage] = useState({
    loading: false,
    error: "",
    success: "",
  });

  const passwordRef1 = useRef();
  const passwordRef2 = useRef();

  async function HandlePasswordChange(e) {
    e.preventDefault();
    let newPassordString = passwordRef1.current;
    let confirmPassordString = passwordRef2.current;

    if (!newPassordString.value || !confirmPassordString.value) {
      setErrorMessage((prev) => {
        return { error: "Input space is Empty", ...prev };
      });
      return;
    }
    if (confirmPassordString.value !== emailString.value) {
      setErrorMessage((prev) => {
        return { error: "Passwords does not match!", ...prev };
      });
      return;
    }

    try {
      const email_update = await Updateuser(uid, {
        password: newPassordString.value,
      });
      console.log(email_update);

      newPassordString.value = "";
      confirmPassordString.value = "";
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <WhiteCard cls="md:w-[45%] w-[70%] m-auto rounded">
      <h1 className="text-2xl text-orange-600 font-bold">
        Change Your Password
      </h1>
      <form onSubmit={HandlePasswordChange} className="my-5">
        <input type="password" required ref={passwordRef1} />
        <input type="password" required ref={passwordRef2} />
        <Button>Subnmit</Button>
      </form>
    </WhiteCard>
  );
}
