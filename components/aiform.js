"use client";
import { useState } from "react";
import { userDatabase } from "@/utils/User/GetUser";
import { useAuth } from "@/utils/Provider/AuthProvider";
import { useModal } from "@/utils/Provider/ModalProvider";
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

  //Get input State
  const [promptTitle, setPromptTitle] = useState("");
  const [promptDesc, setPromptDesc] = useState("");
  const [qty, setQty] = useState(1);

  //modal
  const { toggleModalInfo } = useModal();
  async function callUser() {
    try {
      //console.log(uid);
      if (!uid) return;
      setLoading(true);
      const getUser = await userDatabase(uid, "users");
      setLoading(false);
      setError("");
      return { ...getUser };
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

    const { token: token_left, ai_name, ai_theme } = await callUser();

    const prompt = `This is for a ${title.prompt}. I want ${
      qty ? qty : 1
    } suggestion${
      qty && qty > 1 ? "s" : ""
    } about ${promptTitle}. ${promptDesc}`;
    //post request

    if (!token_left || token_left <= 0 || token_left === "EXPIRED") {
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

    setLoading(true);

    await fetch("/api/namify/ai", {
      method: "POST",
      body: JSON.stringify({
        prompt,
        userId: uid,
        service: title.prompt,
        token_left,
      }),
    })
      .then((res) => {
        if (res.status === 400) {
          props.ErrorHandler("Bad Input Request!");
          return;
        }

        if (res?.status === 403) {
          props.ErrorHandler("Free Trial Ended. Token Has been Exhausted!");
          return;
        }
        if (res?.status === 500) {
          props.ErrorHandler("Could not Complete AI request");
          return;
        }
        if (res?.status === 529) {
          props.ErrorHandler("Maximum Token Exceeded!");
          return;
        }

        return res.json();
      })
      .then((data) => {
        //result
        props.resultHandler(data);

        //ai
        if (ai_theme || ai_name) {
          props.AI({ name: ai_name, theme: ai_theme });
        }
      })
      .catch((err) => {
        setError(() => {
          return {
            isError: true,
            errorMessage: err?.message || "Something went wrong!",
          };
        });
        props.ErrorHandler(err?.message || "Could not complete AI request");
      })
      .finally(() => {
        setLoading(false);
        setError("");
      });
  }

  return (
    <>
      <form
        className="*:block *:my-3 py-4 m-auto md:mx-0 md:w-[100%] w-[90%] "
        onSubmit={handleSubmit}
      >
        <p className="text-red-600 mb-3 md:text-start text-center italic text-xl">
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
          {loading ? "AI is thinking..." : "Generate"}
        </button>
      </form>
    </>
  );
};
