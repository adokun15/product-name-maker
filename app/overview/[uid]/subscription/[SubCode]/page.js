import ServerErrorPage from "@/components/ServerErrorPage";
//import { FetchSubscription } from "@/utils/Subcription/GetSubcription";
import { Link } from "next/link";
import WhiteCard from "@/components/whiteCard";
import { ToDateString } from "@/lib/dateHelper";
import { userDatabase } from "@/utils/User/GetUser";
import { IsPro } from "@/lib/BoolFunctions";
import { UpdateUserDatabase } from "@/utils/User/UpdateUser";

export default async function ManageSubscription({ params }) {
  const subscription = await userDatabase(params.uid, "subscriptions");
  const ispro = await IsPro(params.uid);

  if (subscription.error && subscription.status === 403) {
    <div>
      <h1 className="text-5xl mb-6 text-orange-700 ml-4">Subcription</h1>
      <p className="font-bold text-xl text-center">{subscription?.message}</p>
    </div>;
  }

  if (subscription.error) {
    return (
      <ServerErrorPage
        status={subscription?.status || 500}
        message={subscription?.message || "something went wrong!"}
      />
    );
  }

  if (
    !subscription?.subscription?.sub_code ||
    subscription?.subscription?.sub_code !== params.SubCode
  ) {
    return (
      <ServerErrorPage
        status="401"
        message="Unauthorized Access to Subscription Page"
      />
    );
  }

  //change to Expire
  if (!ispro) {
    await UpdateUserDatabase(params.uid, "subscription", {
      subscription: { active: "Expired" },
    });
  }

  return (
    <>
      {subscription?.subscription?.next_payment_date && (
        <section>
          <h1 className="text-center mx-4 text-orange-600 text-3xl mb-5 font-bold">
            Subscription (NAMIFY PRO PLAN){" "}
            <span className="italic">
              #{subscription?.subscription?.sub_id}
            </span>
          </h1>
          <article className="*mb-5 md:grid gap-4 px-6 grid-cols-2 block">
            <WhiteCard>
              <p className="text-[2.2rem] font-bold"> Status</p>
              <p>{subscription?.subscription?.status.toUpperCase()}</p>
            </WhiteCard>
            <WhiteCard>
              <p className="text-[2.2rem] font-bold">Interval</p>
              <p>Monthly</p>
            </WhiteCard>
            <WhiteCard>
              <p className="text-[2.2rem] font-bold">Amount </p>
              <p>N{subscription?.subscription?.amount}</p>
            </WhiteCard>
            <WhiteCard>
              <p className="text-[2.2rem] font-bold">Subscribed on</p>
              <p className="opacity-90 text-xl">
                {ToDateString(subscription?.subscription?.createdAt)}
              </p>
            </WhiteCard>
            <WhiteCard>
              <p className="text-[2.2rem] font-bold">Subscription Renews on</p>
              <p className="opacity-90 text-xl">
                {ToDateString(subscription?.subscription?.next_payment_date)}
              </p>
            </WhiteCard>
          </article>
        </section>
      )}
      {!subscription?.subscription?.next_payment_date && (
        <p className="text-center text-red-600 ">Something went Wrong</p>
      )}
    </>
  );
}
