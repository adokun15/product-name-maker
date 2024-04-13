"use client";
import { SendEmailVerification } from "@/utils/User/VerifyUser";
import WhiteCard from "./whiteCard";
import { useState } from "react";
import { useAuth } from "@/utils/Provider/AuthProvider";
import LoaderText from "@/app/overview/[uid]/_helper/LoaderText";

export default function VerifyEmail() {
  //verify on firebase
  const [{ success, error, loading }, setStates] = useState({
    success: "",
    error: "",
    loading: false,
  });

  const person = useAuth();

  if (person.loading) return <LoaderText />;

  if (!person.currentUser) return null;
  const { emailVerified, email } = person.currentUser;

  const verifyUser = async () => {
    if (!person.currentUser) return;

    try {
      setStates(() => {
        return { loading: true };
      });

      const verificationRes = await SendEmailVerification(person.currentUser);
      const verification = await verificationRes.json();
      setStates(() => {
        return { success: verification };
      });
    } catch (err) {
      setStates(() => {
        return { error: err?.message };
      });
    }
  };

  return (
    <>
      {!emailVerified && (
        <div>
          <h2 className="text-2xl font-medium mb-3">Email Verification</h2>
          <WhiteCard cls="bg-orange-500 text-white">
            <h2 className="font-bold text-xl mb-5">
              {error
                ? "Something Went Wrong"
                : `Your email ${email} is yet to be verify`}
            </h2>
            <p>
              {success && !error ? (
                success
              ) : error && !success ? (
                <span className="italic">{error}</span>
              ) : (
                "Click the button to get a verification link sent to your email"
              )}
            </p>
            {!success && (
              <button
                onClick={verifyUser}
                disabled={loading}
                className="bg-white p-2 px-4 text-orange-700 font-medium my-3 hover:bg-slate-300 transition"
              >
                {loading ? "loading..." : "Verify"}
              </button>
            )}
          </WhiteCard>
        </div>
      )}
    </>
  );
}
