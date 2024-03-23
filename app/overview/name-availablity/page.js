"use client";
import React, { useState } from "react";

const TradeMarkCheck = () => {
  const [tradeMarkInput, setTradeMarkInput] = useState("");
  const [result, setResult] = useState(null);

  async function handleSubmit(ev) {
    ev.preventDefault();

    try {
      const promptRequest = await fetch("/api/namify/trademarkCheck", {
        method: "POST",
        body: JSON.stringify({ prompt: tradeMarkInput }),
      });

      const data = await promptRequest.json();
      setResult(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1 className="text-5xl mb-6 text-orange-700 ml-4">TradeMark Check</h1>
      <form className="*:block ml-5" onSubmit={handleSubmit}>
        <input
          value={tradeMarkInput}
          onChange={(e) => setTradeMarkInput(e.target.value)}
          type="text"
          placeholder="Enter your Enterprise Name"
          autoComplete={false}
          className="w-3/5 bg-slate-200 rounded-[0.4rem] outline-orange-600 focus:bg-white 
         text-black py-1 px-2 min-h-16 transition"
        />

        <button className="mt-5 px-4 bg-orange-600 py-1 rounded text-white">
          {" "}
          Verify
        </button>
      </form>
      {result?.message && <p>{result.message}</p>}
    </div>
  );
};

export default TradeMarkCheck;
