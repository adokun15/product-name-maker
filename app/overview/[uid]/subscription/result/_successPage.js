"use client";
import WhiteCard from "@/components/whiteCard";
import Button from "@/UI/Button";
import { useAuth } from "@/utils/Provider/AuthProvider";
import { redirect, useRouter } from "next/navigation";

export const SuccessTransactionPage = ({ payment }) => {
  const auth = useAuth();
  const router = useRouter();
  return (
    <WhiteCard>
      <h1>Your Card has been Accepted.</h1>
      <p>
        {payment?.result}. You have been debited {payment?.amount}. Time of
        transaction {payment?.paid_at}
      </p>
      <Button
        onClick={() => {
          router.push(`/overview/${auth?.currentUser?.uid}/subscription`);
        }}
      >
        Start Subcription
      </Button>
    </WhiteCard>
  );
};
