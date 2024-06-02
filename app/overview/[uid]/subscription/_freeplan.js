"use client";

import WhiteCard from "@/components/whiteCard";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoaderText from "../_helper/LoaderText";
import { useAuth } from "@/utils/Provider/AuthProvider";
import Button from "@/UI/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ServerButton } from "@/UI/ServerButton";
import { ChargeCustomer } from "@/utils/Subcription/charge";
import { ConfirmCustomerCharge } from "@/utils/Subcription/ConfirmCharge";
import { useModal } from "@/utils/Provider/ModalProvider";

export function SubcribePage({
  add_card,
  error,
  payment_method,
  email,
  uid,
  loading,
}) {
  //payment authorization code from paystack
  const { auth_code } = payment_method;

  if (!auth_code) {
    return (
      <WhiteCard cls="w-4/5 my-4">
        <h1>
          You have not add any payment method. Kindly Click the button below to
          add your Card
        </h1>
        <Button onClick={add_card}>
          {loading ? <LoaderText clr="text-white" /> : "Add Payment method"}
        </Button>
      </WhiteCard>
    );
  }

  //Set Response State
  const [subscription_state, setState] = useState(null);

  const [isPending, setPending] = useState(null);
  //Run SerVER fUNCTION

  const { toggleModalInfo } = useModal();

  const triggerSubscription = async () => {
    //Charge_Status, message,
    try {
      setPending(true);
      const data = await ChargeCustomer(email, auth_code, uid);
      //parse JSON

      if (data?.error) {
        toggleModalInfo({
          isOpened: true,
          header: "Something went wrong ",
          message: data?.message,
        });
        setPending(false);
      }

      setPending(false);
      setState({ ...data });
    } catch (err) {
      //Charge_Error
      setPending(false);
      toggleModalInfo({
        isOpened: true,
        header: "Something went wrong ",
        message: err?.message,
      });
    }
  };

  const handleConfirmationCharge = async (type, info) => {
    try {
      //togglemodal == loading
      toggleModalInfo({
        header: "Subscription process loading...",
        message: "loading...",
      });

      //Trigger charge
      const confirm_charge = await ConfirmCustomerCharge(type, info, email);

      //togglemodal == success
      toggleModalInfo({
        header: "Subscription process completed",
        message: `${confirm_charge?.message}. N${confirm_charge?.amount} has been deducted from your Card. `,
      });
    } catch (err) {
      //togglemodal == failed
      toggleModalInfo({
        header: "Subscription process Failed",
        message: err?.message,
      });
    }
  };

  //binded function server
  const sendOTP = async (e) => {
    e.preventDefault();

    //Get Form data from "<ModalInfo/>"
    const data = new FormData();

    //Get value from Form
    const number = data.get("OTP Number");

    if (!number) return;
    await handleConfirmationCharge("send_otp", {
      otp: number,
      reference: subscription_state?.reference,
    });
  };

  const sendBirthday = async (e) => {
    e.preventDefault();
    const data = new FormData();
    const Year = data.get("OTP Number");
    const month = data.get("OTP Number");
    const day = data.get("OTP Number");

    if (!Year || !month || !day) return;

    await handleConfirmationCharge("send_birthday", {
      birthday: `${Year}-${month}-${day}`,
      reference: subscription_state?.reference,
    });
  };
  const sendAddress = async (e) => {
    e.preventDefault();
    const data = new FormData();
    const residentialAddress = data.get("House Address");
    const state = data.get("State");
    const city = data.get("City");
    const zipCode = data.get("Zip Code");

    if (!residentialAddress || !state || !city || !zipCode) return;
    await handleConfirmationCharge("send_address", {
      address: residentialAddress,
      city,
      state,
      zip_code: zipCode,
      reference: subscription_state?.reference,
    });
  };
  const sendPhone = async (e) => {
    e.preventDefault();

    const data = new FormData();
    const phone_number = data.get("Phone");

    await handleConfirmationCharge("send_phone", {
      phone: phone_number,
      reference: subscription_state?.reference,
    });
  };

  useEffect(() => {
    if (subscription_state?.status === "send_otp") {
      toggleModalInfo({
        header: "OTP request",
        message: subscription_state?.message,
        formCred: [{ name: "OTP Number", type: "number", maxLength: 8 }],
        action: sendOTP,
      });
    }
    if (subscription_state?.status === "send_pin") {
      toggleModalInfo({
        header: "Pin request",
        message: subscription_state?.message,
        formCred: [{ name: "Phone Number", type: "number", maxLength: 10 }],
        action: sendPin,
      });
    }

    if (subscription_state?.status === "send_phone") {
      toggleModalInfo({
        header: "Phone Number request",
        message: subscription_state?.message,
        formCred: [{ name: "Phone", type: "number", maxLength: 11 }],
        action: sendPhone,
      });
    }

    if (subscription_state?.status === "success") {
      //Notify User
      toggleModalInfo({
        isOpened: true,
        header: "Your Subscription has been created",
        message: subscription_state?.message,
      });
    }

    if (subscription_state?.status === "send_birthday") {
      toggleModalInfo({
        isOpened: true,
        formCred: [
          { name: "Year", type: "number", maxLength: 4 },
          { name: "Month", type: "number", maxLength: 2 },
          { name: "Day", type: "number", maxLength: 2 },
        ],
        message: subscription_state?.message || null,
        header: "Send your Birthday Info",
        action: sendBirthday,
      });
    }

    if (subscription_state?.status === "send_address") {
      toggleModalInfo({
        header: "Send your Complete Address",
        action: sendAddress,
        formCred: [
          { name: "House Address", type: "text", maxLength: 50 },
          { name: "City", type: "text", maxLength: 20 },
          { name: "State", type: "text", maxLength: 20 },
          { name: "Zip Code", type: "number", maxLength: 10 },
        ],
        message: subscription_state?.message,
      });
    }
  }, [subscription_state]);

  //IMPORT SERVER bUTTON
  return (
    <WhiteCard cls="w-4/5 my-4">
      <h1 className="text-3xl font-bold mb-3 text-orange-400">Subscriptions</h1>

      <h3 className=" ml-3 font-semibold text-slate-900  italic">
        Your Card detail is not stored on our server. It just securely passed to
        your bank for validation to charge you.
      </h3>
      {!error && (
        <p className="opacity-[0.7] my-3">
          Now you are eligible to subcribe for Namify pro Plan:
          <ul>
            <li>Unlimited Tokens for a month</li>
            <li>Free accessiblity to TradeMark checks</li>
            <li>Get more Ai suggestions</li>
          </ul>
        </p>
      )}
      {error && <p>{error}</p>}

      <ServerButton
        className="px-4 mx-5 py-1 text-white"
        onClick={triggerSubscription}
      >
        {isPending ? <LoaderText clr="text-white" /> : "subscribe"}
      </ServerButton>
    </WhiteCard>
  );
}

export default function FreePlan({ payment_method }) {
  const { currentUser, loading } = useAuth();
  if (loading) return <LoaderText clr="text-white" />;

  if (!currentUser) return null;

  const { emailVerified, uid } = currentUser;

  const [buttonLoading, setButtonLoading] = useState(false);
  const [initializeError, setInitializeError] = useState(false);

  //invoke paystack
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
    } catch (err) {
      setButtonLoading(false);
      setInitializeError(err?.message);
    }
  };

  const freelist = [
    "100 tokens for AI generation",
    "Customize AI response",
    "Find Unique Domain Name",
    "Maximum word length of atleast 20",
  ];

  const router = useRouter();

  return (
    <>
      <section className="block md:flex gap-x-4 w-full px-5">
        {!emailVerified && payment_method && (
          <WhiteCard cls="w-4/5  my-4">
            <h1 className="text-3xl font-bold mb-3 text-orange-400">
              Subcription
            </h1>
            <p className="ml-4 mb-4 font-semibold">Something is not right</p>
            <Button
              onClick={() => {
                router.push(`/overview/${uid}/subscription`);
              }}
            >
              Reload Page
            </Button>
          </WhiteCard>
        )}

        {emailVerified && payment_method && (
          <SubcribePage
            error={initializeError}
            uid={currentUser?.uid}
            add_card={InvokePayStackInitialize}
            payment_method={payment_method}
            loading={buttonLoading}
            email={currentUser?.email}
          />
        )}

        <WhiteCard cls="w-4/5  my-4">
          <h1 className="text-3xl font-bold mb-3 text-orange-400">Plan</h1>
          <p className="ml-4 font-semibold">You on a free plan</p>
          <ul>
            {freelist.map((list) => (
              <li key={list} className="mb-3">
                <FontAwesomeIcon className="mr-3" icon={faCircleCheck} />
                <span>{list}</span>
              </li>
            ))}
          </ul>
        </WhiteCard>
      </section>
    </>
  );
}
