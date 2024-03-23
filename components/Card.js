import React from "react";

const Card = ({ children, className }) => {
  return (
    <div
      className={`shadowed lg:m-auto bg-white rounded px-5 py-4 lg:w-[45%] ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
