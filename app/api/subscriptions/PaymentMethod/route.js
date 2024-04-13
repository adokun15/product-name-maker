import { PAYSTACK_API_KEY, PAYSTACK_API_URL } from "@/lib/constant";

export async function POST(req) {
  const { email, userId } = await req.json();

  if (!email || !userId) {
    return new Response("Unauthorized Access", { status: 401 });
  }
  try {
    const authorization_url = await fetch(
      `${PAYSTACK_API_URL}/transaction/initialize`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PAYSTACK_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount: 100 * 100,
          callback_url: `http://localhost:3000/${userId}/subscription/result`,
          channels: ["card"],
          metadata: JSON.stringify({ userId }),
        }),
      }
    );

    const url_link = await authorization_url.json();

    if (!url_link.status) {
      return new Response(url_link.message, { status: 500 });
    }

    return new Response(
      JSON.stringify({
        ref: url_link.data.reference,
        url: url_link.data.authorization_url,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.log("initialize Error: ", err);
    throw new Error(err?.message || err?.code);
  }
}
