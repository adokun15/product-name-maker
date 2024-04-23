"use client";
import WhiteCard from "./whiteCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "@/UI/Button";
import { useState } from "react";
import ErrorMessage from "./ErrorMessages";
import { ManageSubscription } from "@/utils/Subcription/UpdateSubCard";
import { useRouter } from "next/navigation";

export default function NotificationList({ notifications, id }) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();
  //action: type, name
  //reference.
  const actionControl = async (type, code, ref) => {
    if (type === "manage_url") {
      setButtonLoading(true);
      await ManageSubscription(code)
        .then((res) => {
          if (typeof window !== "undefined") {
            window.location.href = res.url;
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
      router.push(`/overview/${id}/subcription/result?reference=${ref}`);
    }
  };

  return (
    <>
      {error && <ErrorMessage message={error} />}
      {notifications.length === 0 && <p>No Notification YET</p>}
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
                      notification.action?.code
                    )
                  }
                >
                  {notification.action?.name}
                </Button>
              )}
              <div className="flex justify-between pr-4 pb-4">
                <div>
                  <p>sent on:{notification?.dateCreated}</p>
                  {notification?.reference && (
                    <p>ref: {notification?.reference}</p>
                  )}
                </div>
                <button>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </WhiteCard>
          ))}
      </ul>
    </>
  );
}
