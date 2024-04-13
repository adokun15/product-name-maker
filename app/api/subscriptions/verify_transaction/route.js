/*
 abandoned	 The customer has not completed the transaction.
failed	     The transaction failed. For more information on why, refer to the message/gateway response.
ongoing	    The customer is currently trying to carry out an action to complete the transaction. This can get returned when we're waiting on the customer to enter an otp or to make a transfer (for a pay with transfer transaction).
pending	     The transaction is currently in progress.
processing   Same as pending, but for direct debit transactions.
queued	     The transaction has been queued to be processed later. Only possible on bulk charge transactions.
reversed	 The transaction was reversed. This could mean the transaction was refunded, or a chargeback was successfully logged for this transaction.
success	
 */

import { FREE_TOKEN, PAYSTACK_API_KEY, PAYSTACK_API_URL } from "@/lib/constant";
import { headers } from "@/next.config";
import { UpdateUserDatabase } from "@/utils/User/UpdateUser";

export async function GET(request) {
  const p = request.nextUrl.searchParams;
  const refwithUid = p.get("query");
  const [ref, uid] = refwithUid?.split("_");

  if (!ref || !uid) {
    return new Response("Unauthorized accesss!", { status: 401 });
  }

  try {
    const verificationResponse = await fetch(
      `${PAYSTACK_API_URL}/transaction/verify/${ref}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${PAYSTACK_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const response = await verificationResponse.json();

    if (!response.status) {
      console.log(response);
      return new Response(response.message, { status: 500 });
    }

    //notifier

    const data = {
      reference: response.data.reference,
      expiring_month: response.data?.authorization.exp_month,
      expiring_year: response.data?.authorization.exp_year,
      brand: response.data?.authorization.brand,
      reuseable: response.data?.authorization?.reusable,
      last4: response.data?.authorization.last4,
      bank: response.data?.authorization.bank,
      auth_code: response.data?.authorization.authorization_code,
      signature: response.data?.authorization.signature,
    };

    await UpdateUserDatabase(uid, "subscriptions", {
      payment_method: data,
      customer_info: {
        customer_code: response.data.customer.customer_code,
        customer_email: response.data?.customer.email,
      },
    });

    //fREE TOKEN: if auths is only one;
    //if(auth.length === 1){}
    await UpdateUserDatabase(uid, "users", {
      token: FREE_TOKEN * 2,
    });

    return new Response(
      JSON.stringify({
        status: response.data?.status,
        amount: response.data.amount,
        result: response.data.gateway_response,
        paid_at: response.data.paid_at,
      }),
      { status: 200 }
    );
  } catch (err) {
    throw new Error(err?.message || err?.code);
  }
}
