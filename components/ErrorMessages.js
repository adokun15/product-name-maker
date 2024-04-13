import { useState } from "react";

export default function ErrorMessage({ message }) {
  const [error_type, setErrorType] = useState();

  switch (message) {
    case "unavailable":
      setErrorType("You have bad Internet Connect");
      break;

    case "auth/popup-cancelled":
      setErrorType("Google Pop-up was Cancelled!");
      break;

    case "auth/user-not-found":
      setErrorType("Invalid Input Credentials");
      break;
  }

  return (
    <p className="bg-red-300 border-solid border-red-700 rounded border-1">
      {error_type}
    </p>
  );
}
