import { userDatabase } from "@/utils/User/GetUser";
import FreePlan from "./_freeplan";
import PaidPlan from "./_paidplan";
import { IsPro, checkPaymentMethod } from "@/lib/BoolFunctions";
import ServerErrorPage from "@/components/ServerErrorPage";
export const dynamic = "force-dynamic";

export default async function Subscription({ params }) {
  const isPro = await IsPro(params?.uid);
  //Checks Database for payment method only
  const payment_method = await checkPaymentMethod(params.uid);

  if (payment_method?.error || !payment_method) {
    return <ServerErrorPage status="500" message={payment_method?.message} />;
  }

  if (isPro?.error) {
    return <ServerErrorPage status="500" message={isPro?.message} />;
  }

  return (
    <div className="leading-[2rem] relative">
      <h1 className="text-5xl mb-6 text-orange-700 ml-4">Subscription</h1>

      {/*client component*/}
      {(!isPro || !payment_method) && (
        <FreePlan payment_method={payment_method} />
      )}

      {/*Server component*/}
      {isPro && payment_method?.reference && (
        <PaidPlan
          payment_method={payment_method}
          id={params.uid}
          sub_code={isPro}
        />
      )}
    </div>
  );
}
