import { PAYSTACK_API_URL } from "@/lib/constant";

export async function DeactivateSubscription({ emailToken, subcriptionCode }) {
  try {
    const option = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: subcriptionCode,
        token: emailToken,
      }),
    };

    const deactivateSubscription = await fetch(
      `${PAYSTACK_API_URL}/subscription/disable`,
      option
    );

    if (!deactivateSubscription.ok) {
      console.log("Paystack_Subsscription ERROR:", deactivateSubscription);
    }

    const data = await deactivateSubscription.json();
    //hopefully returns a url
    return data;
  } catch (err) {
    console.log(err);
  }
}
