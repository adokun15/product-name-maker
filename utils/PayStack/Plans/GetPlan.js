export async function GetPlan({ planCode }) {
  //emailtoken, customerCode, subscriptionCode, status
  try {
    const option = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_API_KEY}`,
        "Content-Type": "application/json",
      },
    };

    const getPlan = await fetch(`${PAYSTACK_API_URL}/plan/${planCode}`, option);

    if (!getPlan.ok) {
      console.log("Paystack_plan ERROR:", getPlan);
    }

    const data = await getPlan.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}
