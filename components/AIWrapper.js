"use client";
import React, { useState } from "react";
import AiResult from "./AiResult";
import { AiPrompt } from "./aiform";

const AIWrapper = ({ Headertitle, formData }) => {
  const [result, setResult] = useState("");
  const [error, setError] = useState(null);

  const [ai, setAi] = useState(null);

  const resultHandler = (res) => {
    setResult(() => res);
    setError(() => "AI Response");
  };

  const AIHandler = (data) => {
    setAi({ name: data?.name, theme: data.theme });
  };
  const ErrorHandler = (err) => {
    setError(() => err);
  };

  return (
    <>
      <h1 className="text-5xl mb-4 text-orange-700 ml-4">{Headertitle}</h1>
      <div className=" md:flex block m-auto w-[95%]  ">
        <div className="md:hidden block">
          <AiResult result={result} error={error} ai={ai} />
        </div>
        <AiPrompt
          formData={formData}
          resultHandler={resultHandler}
          AI={AIHandler}
          ErrorHandler={ErrorHandler}
        />
        <div className="md:block hidden">
          <AiResult ai={ai} result={result} error={error} />
        </div>
      </div>
    </>
  );
};

export default AIWrapper;
