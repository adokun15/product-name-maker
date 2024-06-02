"use client";
import { useState } from "react";
import WhiteCard from "@/components/whiteCard";
import { SendEmailVerification } from "@/utils/User/VerifyUser";
import { useAuth } from "@/utils/Provider/AuthProvider";
import LoaderText from "../_helper/LoaderText";
import Button from "@/UI/Button";
export default function OtherOption() {
  const auth = useAuth();

  if (auth.loading) return <LoaderText clr="text-orange-700" />;

  if (!auth.currentUser) return null;

  const { emailVerified, uid, email } = auth.currentUser;

  //loading ui
  const [buttonLoading, setButtonLoading] = useState(false);

  //Error
  const [initializError, setInitializeError] = useState(false);
  const [verificationError, setVerificationError] = useState(false);

  const [verificationData, setVerificationData] = useState(null);

  const InvokePayStackInitialize = async () => {
    if (!email || !uid) return;
    try {
      setButtonLoading(true);
      const get_url = await fetch(`/api/subscriptions/PaymentMethod`, {
        method: "POST",
        body: JSON.stringify({ email, userId: uid }),
      });

      const url = await get_url.json();
      setButtonLoading(false);

      if (typeof window !== "undefined") {
        window.location.href = url.url;
      }
    } catch (e) {
      setButtonLoading(false);

      setInitializeError("Something went wrong");
    }
  };

  function Verification(user) {
    const modifiedAction = async () => {
      setButtonLoading(true);
      await SendEmailVerification(user)
        .then((data) => {
          if (!data.success) {
            setVerificationError(data?.message);
          }
          setVerificationData(data);
        })
        .catch((err) => {
          setVerificationError(err?.message);
        })
        .finally(() => {
          setButtonLoading(false);
        });
    };
    return (
      <WhiteCard cls="w-4/5 my-4 m-auto">
        <h1 className="text-3xl font-bold mb-3 text-orange-400">
          Subscriptions
        </h1>
        <h3 className=" ml-3 font-semibold text-slate-900  italic">
          You have not start any subscription yet
        </h3>
        <p className="opacity-[0.7] my-3">
          {!verificationData.success
            ? "You cannot subscribe to Pro plan unless your Email has been Verified"
            : verificationData.message}

          {verificationError ? verificationError : ""}
        </p>
        <Button onClick={modifiedAction} className="px-4 mx-5 py-1">
          {buttonLoading ? <LoaderText clr="text-white" /> : "Verify Email"}
        </Button>
      </WhiteCard>
    );
  }

  function PaymentMethodNotAdded() {
    return (
      <WhiteCard cls="w-4/5 my-4 m-auto">
        <h1 className="text-3xl font-bold mb-3 text-orange-400">
          Payment Method
        </h1>
        <h3 className=" ml-3 font-semibold text-slate-900  italic">
          You have not added any payment method yet
        </h3>
        <p className="opacity-[0.7] my-3">
          {initializError
            ? initializError
            : "Get additional 200 token, When you add your Card. "}
        </p>
        <Button onClick={InvokePayStackInitialize} className="px-4 mx-5 py-1">
          {buttonLoading ? <LoaderText clr="text-white" /> : "Start now"}
        </Button>
      </WhiteCard>
    );
  }

  return (
    <>
      {!emailVerified && <Verification user={auth.currentUser} />}

      {emailVerified && <PaymentMethodNotAdded />}
    </>
  );
}
