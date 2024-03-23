"use client";
import { useState, useEffect } from "react";
import { useUser } from "@/hook/useUser";
import { userDatabase } from "@/utils/User/GetUser";

export const AiPrompt = (props) => {
  //gET currently Logged USER
  const user = useUser();
  const { uid } = user.cUser;

  //PASSED down props from parent
  const { title, description } = props.formData;

  //set up Loading/error UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ isError: false, errorMessage: "" });

  //Store Token State
  //const [token_left, setToken] = useState(0);

  //Get input State
  const [promptTitle, setPromptTitle] = useState("");
  const [promptDesc, setPromptDesc] = useState("");
  const [qty, setQty] = useState("");

  async function callUser() {
    try {
      //console.log(uid);
      if (!uid) return;
      setLoading(true);
      const getUser = await userDatabase(uid, "users");
      //console.log(getUser);
      //setToken(getUser?.token);
      setLoading(false);
      return getUser.token;
    } catch (err) {
      setLoading(false);
      props.ErrorHandler(err);
    }
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    const token_left = await callUser();
    //const wordsplit = promptDesc.split(" ");

    //    console.log(wordsplit);
    //  if (title.prompt === "" || promptTitle === "" || promptDesc === "") return;
    //if (wordsplit.length > 25) return;

    const prompt = `This is for a ${title.prompt}. I want ${
      qty ? qty : 1
    } suggestion${
      qty && qty > 1 ? "s" : ""
    } about ${promptTitle}. ${promptDesc}`;
    //post request

    if (!token_left) return;

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

      // console.log(token_left);
      props.resultHandler(data);
    } catch (err) {
      setLoading(false);
      setError(() => {
        return { isError: true, errorMessage: err };
      });

      props.ErrorHandler(err);
    }
  }

  return (
    <form className="*:block *:my-3 py-4 w-[70%] " onSubmit={handleSubmit}>
      <label>{title.name}</label>
      <input
        value={promptTitle}
        onChange={(e) => setPromptTitle(e.target.value)}
        className="w-3/5 bg-slate-200 rounded-[0.4rem] outline-orange-600 focus:bg-white 
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
        className="w-3/5 bg-slate-200 rounded-[0.4rem] outline-orange-600 focus:bg-white 
  text-black py-1 px-2 min-h-16 transition"
        placeholder="Quantities to generate(max 5)"
      />
      <label>{description.name}</label>
      <textarea
        value={promptDesc}
        onChange={(e) => setPromptDesc(() => e.target.value)}
        className="w-3/5 min-h-[8rem] bg-slate-200 rounded-[0.4rem] outline-orange-600 focus:bg-white 
    text-black py-[4px] px-[8px]  transition"
        placeholder={`${description.placeholder} Max-word-length-20.`}
      ></textarea>

      <button
        className=" bg-orange-600  px-5 py-2 rounded text-white w-3/5 disabled:opacity-90 disabled:bg-orange-500"
        disabled={loading}
      >
        {loading ? "Namify is thinking..." : "Generate"}
      </button>
    </form>
  );
};
