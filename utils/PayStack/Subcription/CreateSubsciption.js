import { PAYSTACK_API_URL } from "@/lib/constant";

export async function CreateSubscription({ customerCode, planCode }) {
  try {
    const option = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ customer: customerCode, plan: planCode }),
    };

    const createSubscription = await fetch(
      `${PAYSTACK_API_URL}/subscription`,
      option
    );

    if (!createSubscription.ok) {
      console.log("Paystack_customer ERROR:", createSubscription);
    }

    const data = await createSubscription.json();
    //hopefully returns a url
    return data;
  } catch (err) {
    console.log(err);
  }
}
