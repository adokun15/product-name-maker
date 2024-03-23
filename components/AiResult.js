import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import WhiteCard from "./whiteCard";

const AiResult = ({ result, error }) => {
  const updateError = error.message.includes("client is offline")
    ? "No Internet Connection"
    : error.message;

  if (!error && !result?.message) {
    return null;
  }

  return (
    <div className="w-[30%] my-5 px-3 rounded  ">
      <WhiteCard>
        <header className="font-bold text-xl capitalize mb-4">
          {error ? "Something went wrong" : "Namify AI"}
        </header>
        {error && (
          <p className="font-medium">
            <FontAwesomeIcon icon={faRobot} />
            <span> : {updateError}</span>
          </p>
        )}
        {result?.message && (
          <>
            <p className="font-medium">
              <FontAwesomeIcon icon={faRobot} />
              <span> : {result?.message}</span>
            </p>
            <div className="flex gap-1">
              {/*
            <form>
            <select>
                <option>French</option>
                <option>Spanish</option>
                <option>Portuguese</option>
              </select>

              </form>
              <button className="mt-5 w-full">Translate</button>
        */}{" "}
            </div>
          </>
        )}
      </WhiteCard>
    </div>
  );
};

export default AiResult;
