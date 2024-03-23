import Card from "@/components/Card";
import { faNairaSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ProPlanPage from "../_helper/ProPlanPage";

const UpgradePage = () => {
  return (
    <>
      <h1 className="my-[2rem] text-3xl font-bold text-center">
        Upgrade to Pro Plan
      </h1>
      <ProPlanPage />;
    </>
  );
};

export default UpgradePage;
