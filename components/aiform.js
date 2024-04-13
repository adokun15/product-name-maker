"use client";
import { useState } from "react";
import { userDatabase } from "@/utils/User/GetUser";
import { useAuth } from "@/utils/Provider/AuthProvider";
import { useModal } from "@/utils/Provider/ModalProvider";
import { headers } from "@/next.config";

export const AiPrompt = (props) => {
  //gET currently Logged USER
  const user = useAuth();

  if (!user.currentUser) return null;

  const { uid } = user.currentUser;

  //PASSED down props from parent
  const { title, description } = props.formData;

  //set up Loading/error UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //Store Token State
  //const [token_left, setToken] = useState(0);

  //Get input State
  const [promptTitle, setPromptTitle] = useState("");
  const [promptDesc, setPromptDesc] = useState("");
  const [qty, setQty] = useState(1);

  const { toggleModalInfo } = useModal();

  async function callUser() {
    try {
      //console.log(uid);
      if (!uid) return;
      setLoading(true);
      const getUser = await userDatabase(uid, "users");
      setLoading(false);
      return getUser.token;
      setError("");
    } catch (err) {
      setLoading(false);
      setError("");

      props.ErrorHandler(err);
    }
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    const wordsplit = promptDesc.split(" ");

    if (promptTitle === "" || promptDesc === "") {
      setError("Input is Empty");
      return;
    }

    if (wordsplit.length > 15) {
      setError("Descriptions length is greater than 15 words. Reduce it!");
      return;
    }
    if (+qty > 5) {
      setError("Quantity has passed its maximum");
      return;
    }

    if (+qty < 1) {
      setError("Invalid Quantity value ");
      return;
    }

    const token_left = await callUser();

    const prompt = `This is for a ${title.prompt}. I want ${
      qty ? qty : 1
    } suggestion${
      qty && qty > 1 ? "s" : ""
    } about ${promptTitle}. ${promptDesc}`;
    //post request

    if (!token_left || token_left <= 0 || token_left == "EXPIRED") {
      toggleModalInfo({
        isOpened: true,
        message: `${
          token_left == "EXPIRED"
            ? "Your Token is Expired. Renew your Subscription"
            : token_left <= 0
            ? "You have exhaust your token"
            : "Something went wrong"
        }`,
        header: "Token Usage",
      });
      return;
    }

    try {
      setLoading(true);
      const promptRequest = await fetch("/api/namify/ai", {
        method: "POST",
        body: JSON.stringify({
          prompt,
          userId: uid,
          service: title.prompt,
          token_left,
        }),
      });

      const data = await promptRequest.json();

      setLoading(false);

      setError("");
      // console.log(token_left);
      props.resultHandler(data);
    } catch (err) {
      setLoading(false);
      setError(() => {
        return { isError: true, errorMessage: err?.message };
      });
      setError("");
      console.log(err);
      props.ErrorHandler(err?.message);
    }
  }

  return (
    <>
      <form
        className="*:block *:my-3 py-4 m-auto md:mx-0 md:w-[70%] w-[90%] "
        onSubmit={handleSubmit}
      >
        <p className="text-red-600 mb-3 md:text-start text-center font-bold text-xl">
          {error ? error : ""}
        </p>{" "}
        <label>{title.name}</label>
        <input
          value={promptTitle}
          onChange={(e) => setPromptTitle(e.target.value)}
          className="md:w-3/5 w-full bg-slate-200 rounded-[0.4rem] outline-orange-600 focus:bg-white 
  text-black py-1 px-2 min-h-16 transition"
          placeholder={title.placeholder}
        />
        <label>Quantity</label>
        <input
          value={qty}
          onChange={(e) => {
            setQty(e.target.value);
          }}
          minLength={1}
          maxLength={5}
          type="number"
          className="md:w-3/5 w-full bg-slate-200 rounded-[0.4rem] outline-orange-600 focus:bg-white 
  text-black py-1 px-2 min-h-16 transition"
          placeholder="Quantities to generate(max 5) optional"
        />
        <label>{description.name}</label>
        <textarea
          value={promptDesc}
          onChange={(e) => setPromptDesc(() => e.target.value)}
          className="md:w-3/5 w-full min-h-[8rem] bg-slate-200 rounded-[0.4rem] outline-orange-600 focus:bg-white 
    text-black py-[4px] px-[8px]  transition"
          placeholder={`${description.placeholder} Max-word-length-20.`}
        ></textarea>
        <button
          className=" bg-orange-600  px-5 py-2 rounded text-white md:w-3/5 w-full disabled:opacity-90 disabled:bg-orange-500"
          disabled={loading}
        >
          {loading ? "Namify is thinking..." : "Generate"}
        </button>
      </form>
    </>
  );
};
