"use client";
import WhiteCard from "./whiteCard";
import Button from "@/UI/Button";
import { useState } from "react";
import ErrorMessage from "./ErrorMessages";
import { ManageSubscription } from "@/utils/Subcription/UpdateSubCard";
import { useRouter } from "next/navigation";
import LoaderText from "@/app/overview/[uid]/_helper/LoaderText";
import { ToDateString } from "@/lib/dateHelper";

export default function NotificationList({ notifications, id }) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();

  const actionControl = async (type, code, ref) => {
    if (type === "manage_url") {
      setButtonLoading(true);
      await ManageSubscription(code)
        .then((link) => {
          if (typeof window !== "undefined") {
            window.location.href = link;
          }
        })
        .catch((err) => {
          setError(err?.message);
        })
        .finally(() => {
          setButtonLoading(false);
        });
    }
    if (type === "verify_transaction") {
      router.push(`/overview/${id}/subscription/result?reference=${ref}`);
    }
  };

  return (
    <>
      <div className="w-4/5 m-auto my-5">
        {error && <ErrorMessage message={error} />}
      </div>
      {notifications.length === 0 && (
        <p className="text-center mt-5 text-xl"> No Notifications YET</p>
      )}
      <ul className="my-4">
        {notifications.length >= 1 &&
          notifications?.map((notification) => (
            <WhiteCard
              cls="w-[65%] my-6 pb-0 min-h-[2rem] m-auto"
              key={notification.id}
            >
              <h1 className="font-bold text-2xl mb-1">{notification?.title}</h1>
              <p className="italic opacity-65 my-4">{notification.message}</p>
              {notification?.action?.type && (
                <Button
                  onClick={() =>
                    actionControl(
                      notification.action?.type,
                      notification.action?.code,
                      notification?.reference
                    )
                  }
                >
                  {buttonLoading ? (
                    <LoaderText clr="text-white" />
                  ) : (
                    notification.action?.name
                  )}
                </Button>
              )}
              <div className="flex justify-between pr-4 pb-4">
                <div className="flex opacity-75 text-slate-800 gap-4 ">
                  <p>Sent on : {ToDateString(notification?.dateCreated)}</p>
                  {notification?.reference && (
                    <p>ref: {notification?.reference}</p>
                  )}
                </div>
              </div>
            </WhiteCard>
          ))}
      </ul>
    </>
  );
}
