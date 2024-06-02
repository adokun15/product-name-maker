"use client";
import { SendEmailVerification } from "@/utils/User/VerifyUser";
import WhiteCard from "./whiteCard";
import { useState } from "react";
import { useAuth } from "@/utils/Provider/AuthProvider";
import LoaderText from "@/app/overview/[uid]/_helper/LoaderText";
import ErrorMessage from "./ErrorMessages";

export default function VerifyEmail() {
  const person = useAuth();

  if (person.loading) return <LoaderText />;

  if (!person.currentUser) return null;

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { emailVerified } = person.currentUser;

  const verifyUser = async () => {
    if (!person.currentUser) {
      setMessage("Unauthorized access");
      return;
    }

    try {
      setLoading(true);
      const verification = await SendEmailVerification(person.currentUser);
      setLoading(false);
      setMessage(verification?.message);
    } catch (err) {
      setLoading(false);
      setMessage(err?.message);
    }
  };

  const processMessage = (mes = "") => {
    if (mes.includes("auth")) {
      return mes.split("auth/")[1].split("-").join(" ");
    } else {
      return mes;
    }
  };
  return (
    <>
      {!emailVerified && (
        <div>
          <h2 className="text-2xl font-medium mb-3">Email Verification</h2>
          <WhiteCard cls="bg-orange-500 text-white">
            <h2 className="font-bold text-xl mb-5"></h2>
            <p className="capitalize">
              {message
                ? processMessage(message)
                : "Click the button to get a verification link sent to your email"}
            </p>

            <button
              onClick={verifyUser}
              disabled={loading}
              className="bg-white p-2 px-4 text-orange-700 font-medium my-3 hover:bg-slate-300 transition"
            >
              {loading ? <LoaderText clr="text-orange-700" /> : "verify"}
            </button>
          </WhiteCard>
        </div>
      )}
    </>
  );
}
