//A: 5216-1933-7897-0603

import WhiteCard from "@/components/whiteCard";

//A: 5450-0237-0203-7043
export default function FreePlan() {
  return (
    <>
      <p className="ml-4 font-semibold">You on a free plan</p>
      <WhiteCard cls="w-4/5 m-auto my-4">
        <p className="opacity-[0.7] text-center text-slate-900  italic">
          You have no active subscription
        </p>
      </WhiteCard>
    </>
  );
}
