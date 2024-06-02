import Card from "@/components/Card";
import HomeModal from "@/components/ModalHome";
import NavBar from "@/components/NavBar";
import NewsLetter from "@/components/NewsLetter";
import Spacer from "@/components/spacer";
import WhiteCard from "@/components/whiteCard";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Pricing = () => {
  const freelist = [
    "100 tokens for AI generation",
    "Customize AI response",
    "Find Unique Domain Name",
    "Sign In with Google Oauth",
    "Discover your Start up Business Name",
  ];
  const paidlist = [
    "Unlimited tokens for a month",
    "Get more AI Suggestions",
    "Use TradeMark AI for Name Validity",
  ];

  return (
    <>
      <HomeModal />
      <NavBar />
      <Spacer />
      <div className="mb-6">
        <h1 className="text-center font-bold text-orange-500 text-2xl">
          Plans & Pricing
        </h1>
        <p className="text-center text-5xl text-orange-400 my-[3rem]">
          Plans that best suit your business requirements
        </p>

        <div className="md:flex block w-[82%] gap-[4rem] m-auto">
          <WhiteCard cls="bg-white mb-4 w-[100%] m-auto ">
            <h1 className="text-4xl font-bold text-orange-600">Free Plan</h1>
            <p className="italic opacity-75 text-[17px] my-8">
              Enjoy all the free service for one week which includes:
            </p>
            <ul>
              {freelist.map((list) => (
                <li key={list} className="mb-3">
                  <FontAwesomeIcon className="mr-3" icon={faCircleCheck} />
                  <span>{list}</span>
                </li>
              ))}
            </ul>
          </WhiteCard>
          <WhiteCard cls="bg-white mb-4 w-[100%] m-auto ">
            <h1 className="text-4xl font-bold text-orange-600">Pro Plan</h1>

            <p className="italic opacity-75 text-[17px] my-8">
              Subscribe for a Pro Plan at N2900/month and get:
            </p>
            <ul>
              {paidlist.map((list) => (
                <li key={list} className="mb-3">
                  <FontAwesomeIcon className="mr-3" icon={faCircleCheck} />
                  <span>{list}</span>
                </li>
              ))}
            </ul>
          </WhiteCard>
        </div>
      </div>
      <NewsLetter />
    </>
  );
};

export default Pricing;
