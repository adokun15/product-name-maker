import { PAYSTACK_API_URL } from "@/lib/constant";

export async function GetCustomer({ email }) {
  try {
    const option = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_API_KEY}`,
        "Content-Type": "application/json",
      },
    };

    const fetchCustomerData = await fetch(
      `${PAYSTACK_API_URL}/customer/${email}`,
      option
    );

    if (!fetchCustomerData.ok) {
      console.log("Paystack_customer ERROR:", fetchCustomerData);
    }

    const data = await fetchCustomerData.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}
