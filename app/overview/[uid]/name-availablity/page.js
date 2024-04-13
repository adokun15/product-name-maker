"use client";
import React, { useEffect, useState } from "react";

import WhiteCard from "@/components/whiteCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { IsPro } from "@/lib/BoolFunctions";
import { useAuth } from "@/utils/Provider/AuthProvider";
import LoaderText from "../_helper/LoaderText";
const TradeMarkCheck = () => {
  const auth = useAuth();

  if (auth?.loading) return <LoaderText clr="text-orange-700" />;

  if (!auth?.currentUser) return null;

  const { uid } = auth.currentUser;

  const [tradeMarkInput, setTradeMarkInput] = useState("");
  const [result, setResult] = useState(null);
  const [isPro, setPro] = useState(false);

  const [ui, setUi] = useState({
    loading: false,
    inputError: "",
    AiError: "",
  });

  useEffect(() => {
    const pro_acc = async () => {
      const ispro = await IsPro(uid);
      if (!ispro?.error) {
        setPro({ error: ispro?.error, message: ispro?.message });
      } else {
        setPro(ispro);
      }
    };
    pro_acc();
  }, []);

  async function handleSubmit(ev) {
    ev.preventDefault();
    setUi(() => {
      return { loading: true };
    });

    if (tradeMarkInput === "") {
      setUi(() => {
        return { inputError: "Empty Input" };
      });
      return;
    }

    try {
      const promptRequest = await fetch("/api/namify/trademarkCheck", {
        method: "POST",
        body: JSON.stringify({ prompt: tradeMarkInput }),
      });

      if (!promptRequest.ok) {
        throw new Error("Something Went Wrong");
      }
      const data = await promptRequest.json();

      setUi(() => {
        return { loading: false };
      });
      setResult(data);
    } catch (err) {
      setUi(() => {
        return { loading: false };
      });
      setUi(() => {
        return { AiError: err?.message };
      });
    }
  }
  return (
    <div>
      <h1 className="md:text-5xl text-3xl mb-6 text-orange-700 ml-4">
        TradeMark Check
      </h1>
      <form className="*:block ml-5" onSubmit={handleSubmit}>
        <p className="text-red-600"> {ui.inputError ? ui.inputError : ""}</p>
        <p className="text-red-600"> {ui.AiError ? ui.AiError : ""}</p>
        <input
          value={tradeMarkInput}
          onChange={(e) => setTradeMarkInput(e.target.value)}
          type="text"
          placeholder="Enter your Enterprise Name"
          className="w-3/5 bg-slate-200 rounded-[0.4rem] outline-orange-600 focus:bg-white 
         text-black py-1 px-2 min-h-16 transition"
        />

        <button
          disabled={!isPro || isPro?.error}
          className="mt-5 px-4 disabled:opacity-70 bg-orange-600 py-1 rounded text-white"
        >
          {ui.loading ? "verifying..." : "Verify"}
        </button>
      </form>
      {(!isPro || !isPro?.error) && (
        <WhiteCard cls="mt-5 md:w-3/5 m-auto w-[89%]">
          <header className="font-bold text-xl capitalize mb-4">
            {isPro?.error
              ? "Something went Wrong"
              : "You do not have a Pro Account"}
          </header>
          <p className="font-medium">
            <FontAwesomeIcon icon={faRobot} />
            <span>
              :
              {isPro?.error
                ? isPro?.message
                : "Subcribe to Pro Plan to enjoy this feature"}
            </span>
          </p>
        </WhiteCard>
      )}
      {result?.message && isPro && (
        <WhiteCard cls="mt-5">
          <header className="font-bold text-xl capitalize mb-4">
            Namify Verification AI
          </header>
          <p className="font-medium">
            <FontAwesomeIcon icon={faRobot} />
            <span> : {result?.message}</span>
          </p>
        </WhiteCard>
      )}
    </div>
  );
};

export default TradeMarkCheck;
