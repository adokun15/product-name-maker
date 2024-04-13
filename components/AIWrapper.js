"use client";
import React, { useState } from "react";
import AiResult from "./AiResult";
import { AiPrompt } from "./aiform";

const AIWrapper = ({ Headertitle, formData }) => {
  const [result, setResult] = useState("");
  const [error, setError] = useState(null);

  const resultHandler = (res) => {
    setResult(() => res);
  };

  const ErrorHandler = (err) => {
    setError(() => err);
  };

  return (
    <>
      <h1 className="text-5xl mb-4 text-orange-700 ml-4">{Headertitle}</h1>
      <div className=" md:flex block m-auto w-[95%]  ">
        <div className="md:hidden block">
          <AiResult result={result} error={error} />
        </div>
        <AiPrompt
          formData={formData}
          resultHandler={resultHandler}
          ErrorHandler={ErrorHandler}
        />
        <div className="md:block hidden">
          <AiResult result={result} error={error} />
        </div>
      </div>
    </>
  );
};

export default AIWrapper;
