import { PAYSTACK_API_URL } from "@/lib/constant";

export async function ReactivateSubscription({ emailToken, subcriptionCode }) {
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

    const reactivateSubscription = await fetch(
      `${PAYSTACK_API_URL}/subscription/enable`,
      option
    );

    if (!reactivateSubscription.ok) {
      console.log("Paystack_Subsscription ERROR:", reactivateSubscription);
    }

    const data = await reactivateSubscription.json();
    //hopefully returns a url
    return data;
  } catch (err) {
    console.log(err);
  }
}
