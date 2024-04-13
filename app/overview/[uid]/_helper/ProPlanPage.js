"use client";
import Image from "next/image";
import SubcribeImg from "../../../../public/illustrations/undraw_subscribe_vspl.svg";
import WhiteCard from "@/components/whiteCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faNairaSign } from "@fortawesome/free-solid-svg-icons";
import { userDatabase } from "@/utils/User/GetUser";
import { useState } from "react";
import LoaderText from "./LoaderText";

export function LargerScreenImage() {
  return (
    <figure className="w-1/2 py-4 md:block hidden">
      <Image src={SubcribeImg} width={400} height={500} alt="subcribe img" />
    </figure>
  );
}
export function SmallerScreenImage() {
  <figure className="w-[80%] py-4 md:hidden ">
    <Image src={SubcribeImg} width={400} height={500} alt="subcribe img" />
  </figure>;
}
export default function ProPlanPage({ id }) {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const ActivateSubscriptionToPaymentGateWay = async () => {
    //link to gateway
    if (!id) return;
    try {
      setIsLoading(true);
      const { email } = await userDatabase(id);

      const get_url = await fetch(`/api/subscriptions/PaymentMethod`, {
        method: "POST",
        body: JSON.stringify({ email, userId: id }),
      });

      const url = await get_url.json();

      setIsLoading(false);
      if (typeof window !== "undefined") {
        window.location.href = url.url;
      }
    } catch (err) {
      setIsLoading(false);
      if (err?.message === "unavailable") {
        setError("You are Offline");
      } else {
        setError(err?.message);
      }
    }
  };
  return (
    <WhiteCard cls="md:flex block bg-white relative py-6 border-2 border-dashed w-[87%] border-orange-500 h-fit m-auto">
      <SmallerScreenImage />
      <article className="lg:w-1/2 w-full">
        <h1 className="font-medium">Namify Pro Plan</h1>
        <div className="my-[1.4rem]">
          <p className="text-xl mb-5 font-serif">
            More Features await. Sign up for a Pro Plan to get all this and
            more:
          </p>
          <ul className="ml-5  text-[14px]">
            <li className="flex gap-4 items-center">
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-orange-600"
              />

              <span>Unlimited Token Access For a Month</span>
            </li>
            <li className="flex gap-4 items-center">
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-orange-600"
              />

              <span>Get Results up to 5 different language</span>
            </li>
            <li className="flex gap-4 items-center">
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-orange-600"
              />
              <span>Get more AI Suggestions </span>{" "}
            </li>
            <li className="italic">and many more...</li>
          </ul>
        </div>
        <p className="text-red-800 opacity-80">{error ? error : ""}</p>
        <button
          onClick={ActivateSubscriptionToPaymentGateWay}
          className="font-semibold capitalize bg-orange-600 text-white px-4 my-3 py-2"
        >
          {isLoading ? <LoaderText clr="text-white" /> : "start now"}
        </button>
        <p className="opacity-[0.8] text-[16px] font-semibold">
          <span className="mr-1">Starting at</span>
          <span className="text-[20px]">
            <FontAwesomeIcon icon={faNairaSign} />
            2900
          </span>{" "}
          per month. Cancel anytime.
        </p>
      </article>
      <LargerScreenImage />
    </WhiteCard>
  );
}
