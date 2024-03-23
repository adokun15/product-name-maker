import { userDatabase } from "@/utils/User/GetUser";
import FreePlan from "./_freeplan";
import PaidPlan from "./_paidplan";
import ProPlanPage from "../_helper/ProPlanPage";
export const dynamic = "force-dynamic";
export default async function Subscription({ searchParams }) {
  const user = await userDatabase(searchParams.id);

  const isOnPaidPlan = user.subscriptions.length !== 0 && user.token === 0;

  return (
    <div className="leading-[2rem] px-4">
      <h1 className="text-5xl mb-6 text-orange-700 ml-4">Subscription</h1>

      {isOnPaidPlan ? <PaidPlan user={user} /> : <FreePlan />}

      <section>
        <h3 className="font-semibold ml-4 mb-4">
          {" "}
          Subscription plans Available
        </h3>
        <ProPlanPage />
      </section>
      {/*<button
        onClick={() =>
          router.push(`subscription/initiatePlan?id=${user.userId}`)
        }
        className="filled_small_btn_orange my-6 h-fit"
      >
        Manage Subscription
      </button>*/}
    </div>
  );
}
