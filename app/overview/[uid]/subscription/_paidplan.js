"use client";

import ServerErrorPage from "@/components/ServerErrorPage";
import Button from "@/UI/Button";
import { ManageSubscription } from "@/utils/Subcription/UpdateSubCard";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function PaidPlan({ id, sub_code }) {
  const [error_message, setErrorMessage] = useState("");

  const router = useRouter();

  const viewSub = () => {
    console.log(id, sub_code);
    if (!id || !sub_code) return;

    router.push(`/overview/${id}/subscription/${sub_code}`);
  };

  const reloadPage = () => {
    router.refresh();
  };

  const ManageSub = async () => {
    const subLink = await ManageSubscription();

    console.log(subLink);

    if (subLink?.error) {
      setErrorMessage(subLink?.message);
    }

    const { url } = subLink;

    alert(url);
    if (typeof window !== "undefined") {
      window.location.href = url;
    }
  };

  if (!sub_code) {
    return <ServerErrorPage status={500} message="No active Subscription" />;
  }

  if (error_message) {
    return (
      <ServerErrorPage
        status={500}
        onRefresh={reloadPage}
        message={error_message}
      />
    );
  }

  return (
    <div className="leading-[3rem] px-4">
      <h1 className="text-2xl font-bold">You on a Pro plan</h1>

      <div className="flex gap-x-6">
        <Button onClick={viewSub} className="font-bold my-6 text-white">
          View Subscription
        </Button>
        <Button onClick={ManageSub} className="font-bold my-6 text-white">
          Manage Subscription
        </Button>
      </div>
    </div>
  );
}
