import { PAYSTACK_API_URL } from "@/lib/constant";

export async function UpdateCustomer({ subcriptionCode }) {
  try {
    const option = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_API_KEY}`,
        "Content-Type": "application/json",
      },
    };

    const sendSubcriptionUpdate = await fetch(
      `${PAYSTACK_API_URL}/subscription/${subcriptionCode}/manage/email`,
      option
    );

    if (!sendSubcriptionUpdate.ok) {
      console.log("Paystack_customer ERROR:", sendSubcriptionUpdate);
    }

    const data = await sendSubcriptionUpdate.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}
