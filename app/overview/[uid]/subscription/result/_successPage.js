"use client";
import WhiteCard from "@/components/whiteCard";
import Button from "@/UI/Button";
import { useAuth } from "@/utils/Provider/AuthProvider";
import { redirect, useRouter } from "next/navigation";
import { ToDateString } from "@/lib/dateHelper";
export const SuccessTransactionPage = ({ payment }) => {
  const auth = useAuth();

  if (!auth.currentUser) return null;
  const router = useRouter();
  return (
    <WhiteCard cLassName="md:w-[70%] w-[90%] m-auto">
      <h1 className="font-bold text-xl">Your Card has been Accepted.</h1>
      <p className="italic opacity-80">
        {payment?.result}. You have been debited {+payment?.amount / 100}. Time
        of transaction {ToDateString(payment?.paid_at)}
      </p>
      <Button
        className="mt-6"
        onClick={() => {
          router.push(`/overview/${auth?.currentUser?.uid}/subscription`);
        }}
      >
        Start Subcription
      </Button>
    </WhiteCard>
  );
};
