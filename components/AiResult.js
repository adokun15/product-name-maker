import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import WhiteCard from "./whiteCard";

const AiResult = ({ result, error, ai = null }) => {
  const updateError =
    error?.includes(`unavailable`) ||
    error?.includes(`connection error.`) ||
    error?.toLowerCase()?.includes(`failed to fetch`)
      ? "No Internet Connection"
      : error;

  if (!error && !result?.message) {
    return null;
  }

  return (
    <div className="md:w-fit w-[90%] mx-auto md:mx-0 my-5 px-3 rounded  ">
      <WhiteCard>
        <header className="font-bold text-xl capitalize mb-4">
          {error ? "Something went wrong" : "AI Response"}
        </header>
        {error && !result?.message && (
          <p className="font-medium">
            <FontAwesomeIcon icon={faRobot} />
            <span> : {updateError}</span>
          </p>
        )}
        {result?.message && (
          <>
            <p
              className={`font-medium ${
                ai?.theme
                  ? `text-${ai?.theme?.ai_font_size}xl ${ai?.theme?.ai_font_style} ${ai?.theme?.ai_theme_color} `
                  : ""
              } `}
            >
              <FontAwesomeIcon icon={faRobot} />
              <span>
                {" "}
                {ai?.name || "Namify"} : {result?.message}
              </span>
            </p>
          </>
        )}
      </WhiteCard>
    </div>
  );
};

export default AiResult;
