import { SignOut } from "@/utils/Auth/SignOut";

export async function POST(req) {
  try {
    const data = await SignOut();
    return new Response(JSON.stringify({ ...data }));
  } catch (err) {
    return new Response(err);
  }
}
