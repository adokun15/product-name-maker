import { FREE_TOKEN, PAYSTACK_API_KEY, PAYSTACK_API_URL } from "@/lib/constant";
import { SetUpdb } from "@/utils/User/SetupDb";

export async function CreateCustomer({ email: emailLink, name, userId }) {
  //emailtoken, customerCode, subscriptionCode, status

  try {
    const option = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailLink,
        first_name: name,
        metadata: { userId },
      }),
    };
    //Create Customer on paystack
    const createCustomerData = await fetch(
      `${PAYSTACK_API_URL}/customer`,
      option
    );

    if (!createCustomerData.ok) {
      console.log("Paystack_customer ERROR:", createCustomerData);
    }
    const data = await createCustomerData.json();

    const {
      customer_code: customerCode,
      createdAt: dateCreated,
      email,
      integration,
      id: customerId,
      subscriptions,
      authorizations,
    } = data.data;
    console.log(data);

    const tempData = {
      customerCode,
      dateCreated,
      email,
      integration,
      token: FREE_TOKEN,
      customerId,
      userId: data.data.metadata.userId,
      subscriptions,
      authorizations,
    };

    await SetUpdb(userId, tempData);
  } catch (err) {
    console.log(err);
  }
}
