"use client";
import WhiteCard from "@/components/whiteCard";
import Button from "@/UI/Button";
import { useAuth } from "@/utils/Provider/AuthProvider";

export const FailedTransactionPage = ({ message }) => {
  const auth = useAuth();
  return (
    <WhiteCard>
      <h1>Your Transaction was not Succeesful.</h1>
      <p>{message}</p>
      <Button
        onClick={() => {
          router.push(`/overview/${auth?.currentUser?.uid}/subcription`);
        }}
      >
        Go to Subcription
      </Button>
    </WhiteCard>
  );
};
