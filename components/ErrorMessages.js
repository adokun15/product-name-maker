import { useEffect, useState } from "react";

export default function ErrorMessage({ message }) {
  const [error_type, setErrorType] = useState("");

  useEffect(() => {
    if (
      message === "unavailable" ||
      message === "auth/network-request-failed"
    ) {
      setErrorType("You have bad Internet Connection");
    }

    if (message === "auth/popup-cancelled") {
      setErrorType("Google Pop-up was Cancelled!");
    }

    if (message === "auth/invalid-credential") {
      setErrorType("Invalid Input Credentials");
    }
    if (message === "auth/email-already-in-use") {
      setErrorType("Email already in used. Log in");
    }
  }, [message]);

  return (
    <>
      {(error_type || message) && (
        <p className="bg-red-300 px-2 py-3 my-3 text-red-600 capitalize font-bold text-[0.9rem] border-solid border-red-700 rounded border-1">
          {error_type ||
            message?.split("/")[1] ||
            message ||
            message?.message.split("/")[1] ||
            "Something went wrong"}
        </p>
      )}
    </>
  );
}
