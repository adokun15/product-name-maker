"use client";
import WhiteCard from "@/components/whiteCard";
import Button from "@/UI/Button";
import { useAuth } from "@/utils/Provider/AuthProvider";
import { useRouter } from "next/navigation";

export const FailedTransactionPage = ({ message }) => {
  const auth = useAuth();
  if (!auth.currentUser) return null;

  const router = useRouter();
  return (
    <WhiteCard cLassName="md:w-[70%] w-[90%] m-auto">
      <h1 className="font-bold text-xl">
        Your Transaction was not Succeesful.
      </h1>
      <p className="italic opacity-80">{message}</p>
      <Button
        className="mt-6"
        onClick={() => {
          router.push(`/overview/${auth?.currentUser?.uid}/subscription`);
        }}
      >
        Go to Subcription
      </Button>
    </WhiteCard>
  );
};
