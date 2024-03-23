import { PAYSTACK_API_URL } from "@/lib/constant";

export async function UpdateCustomer({ updateObj, customerCode }) {
  try {
    const option = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateObj),
    };

    const createCustomerData = await fetch(
      `${PAYSTACK_API_URL}/customer/${customerCode}`,
      option
    );

    if (!createCustomerData.ok) {
      console.log("Paystack_customer ERROR:", createCustomerData);
    }

    const data = await createCustomerData.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}
