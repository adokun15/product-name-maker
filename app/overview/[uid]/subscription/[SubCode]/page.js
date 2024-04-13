import ServerErrorPage from "@/components/ServerErrorPage";
import { FetchSubscription } from "@/utils/Subcription/GetSubcription";
import { Link } from "next/link";
import WhiteCard from "@/components/whiteCard";
import { ToDateString } from "@/lib/dateHelper";

export default async function ManageSubscription({ params }) {
  const sub_code = params.SubCode;
  const uid = params.uid;

  const subscriptionRes = await FetchSubscription(uid);

  if (subscriptionRes?.sub_code !== sub_code) {
    return (
      <ServerErrorPage
        status="401"
        message="Unauthorized Access to Subscription Page"
      />
    );
  }

  if (subscriptionRes?.error) {
    return (
      <ServerErrorPage
        status={subscriptionRes?.status}
        message={subscriptionRes?.message}
      />
    );
  }

  const subscription = subscriptionRes;

  return (
    <section>
      <h1 className="text-orange-600 text-3xl mb-5 font-bold">
        Subscription (NAMIFY PRO PLAN)
      </h1>
      <article className="md:grid gap-4 px-6 grid-cols-2 block">
        <WhiteCard>
          <p className="text-[2.2rem] font-bold"> Status</p>
          <p>{subscription?.status.toUpperCase()}</p>
        </WhiteCard>
        <WhiteCard>
          <p className="text-[2.2rem] font-bold">Token </p>
          <p>UNLIMITED</p>
        </WhiteCard>
        <WhiteCard>
          <p className="text-[2.2rem] font-bold">Interval</p>
          <p>Monthly</p>
        </WhiteCard>
        <WhiteCard>
          <p className="text-[2.2rem] font-bold">Amount </p>
          <p>N{subscription?.amount}</p>
        </WhiteCard>
        <WhiteCard>
          <p className="text-[2.2rem] font-bold">Subscribed on</p>
          <p className="opacity-90 text-xl">
            {ToDateString(subscription?.createdAt)}
          </p>
        </WhiteCard>
        <WhiteCard>
          <p className="text-[2.2rem] font-bold">Subscription Renews on</p>
          <p className="opacity-90 text-xl">
            {ToDateString(subscription?.next_payment_date)}
          </p>
        </WhiteCard>
      </article>
      <Link href="..">Go back</Link>
    </section>
  );
}
