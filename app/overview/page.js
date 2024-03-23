"use client";
import ProjectHistory from "@/components/ProjectHistory";
import TopDashBoard from "@/components/TopDashBoard";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import AiDashboard from "./_helper/AiDashboard";
import VerifyEmail from "@/components/VerifyEmail";

const DashBoard = () => {
  return (
    <div className="px-6">
      <h1 className="text-3xl mb-8 text-orange-700">DashBoard</h1>

      <TopDashBoard />
      <AiDashboard></AiDashboard>
      <VerifyEmail />
    </div>
  );
};

export default DashBoard;
