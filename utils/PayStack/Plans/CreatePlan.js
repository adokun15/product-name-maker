import {
  PAYSTACK_API_URL,
  PAYSTACK_PLAN_INTERVAL,
  PAYSTACK_PLAN_NAME,
} from "@/lib/constant";

export async function CreatePlan({ amount }) {
  //emailtoken, customerCode, subscriptionCode, status
  try {
    const option = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: PAYSTACK_PLAN_NAME,
        interval: PAYSTACK_PLAN_INTERVAL,
        amount: amount,
      }),
    };

    const createPlan = await fetch(`${PAYSTACK_API_URL}/plan`, option);

    if (!createPlan.ok) {
      console.log("Paystack_plan ERROR:", createPlan);
    }

    const data = await createPlan.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}
