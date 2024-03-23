import { PAYSTACK_API_URL } from "@/lib/constant";

export async function FetchSubscription({ customerCode }) {
  try {
    const option = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_API_KEY}`,
        "Content-Type": "application/json",
      },
    };

    const fetchSubscription = await fetch(
      `${PAYSTACK_API_URL}/subscription/${customerCode}`,
      option
    );

    if (!fetchSubscription.ok) {
      console.log("Paystack_Subsscription ERROR:", fetchSubscription);
    }

    const data = await fetchSubscription.json();
    //hopefully returns a url
    return data;
  } catch (err) {
    console.log(err);
  }
}
