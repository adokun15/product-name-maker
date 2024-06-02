import FreePlan from "./_freeplan";
import PaidPlan from "./_paidplan";
import ServerErrorPage from "@/components/ServerErrorPage";
import { IsPro, checkPaymentMethod } from "@/lib/BoolFunctions";
import OtherOption from "./_otherOption";

export default async function Subscription({ params }) {
  async function timeout(t = 1) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(`Request took too long! `);
      }, t * 1000);
    });
  }

  try {
    const payment_method = await Promise.race([
      timeout(10),
      checkPaymentMethod(params.uid),
    ]);
    const isPro = await Promise.race([timeout(10), IsPro(params?.uid)]);


    if (payment_method?.error) {
      return <ServerErrorPage status="500" message={payment_method?.message} />;
    }

    if (isPro?.error) {
      return <ServerErrorPage status="500" message={isPro?.message} />;
    }

    return (
      <div className="leading-[2rem] relative">
        <h1 className="text-5xl mb-6 text-orange-700 ml-4">Subscription</h1>

        {!isPro && payment_method && (
          <FreePlan payment_method={payment_method} />
        )}

        {isPro && payment_method?.reference && (
          <PaidPlan
            payment_method={payment_method}
            id={params.uid}
            sub_code={isPro}
          />
        )}

        {(!payment_method || !isPro) && <OtherOption />}
      </div>
    );
  } catch (error) {
    return (
      <ServerErrorPage
        status={500}
        message={error || error?.message || "Something went wrong"}
      />
    );
  }
}
