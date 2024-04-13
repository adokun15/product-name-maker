import { NameGenerator } from "@/utils/OpenAi/NameGenerator";
import { NextResponse } from "next/server";
import {
  AiLimitReached,
  DecreaseAiLimit,
  TokenExceeded,
} from "@/lib/api-limits";
import { UpdateUserHistory } from "@/utils/User/UpdateUser";

export async function POST(req) {
  try {
    const { prompt, service, userId, token_left } = await req.json();
    //Get Current User From FireBase Auth,

    if (!userId) {
      return new Response("Unauthorized Access", { status: 401 });
    }

    //Check If user is on Free Trial
    const freeTrial = await AiLimitReached(userId);

    if (!freeTrial) {
      return new Response("Your Free Trial has ended!", { status: 403 });
    }

    //check user Input value
    if (!prompt) {
      return new NextResponse("Prompt texts is Empty!", { status: 500 });
    }

    //Calculate Token
    const CheckExceeded = await TokenExceeded(prompt, token_left);

    //console.log(CheckExceeded);
    if (!CheckExceeded) {
      return new Response(
        "Your remaining token is not enough to complete the request",
        { status: 403 }
      );
    }

    const data = await NameGenerator(prompt);

    if (!data || data?.error) {
      console.log(data?.message);
      throw new Error("Could not Complete AI request!");
    }

    //const tokenUsed = data.usage.totalToken;
    const tokenUsed = data.usage.promptToken;

    //Increase Ai Limit
    await DecreaseAiLimit(userId, tokenUsed);

    // return result
    // update: HISTORY
    const date = new Date();
    const nowDate = date.toISOString();

    await UpdateUserHistory(userId, {
      dateCreated: nowDate,
      result: data.message,
      historyId: data.chatId,
      service,
      usage: data.usage,
    });
    // console.log(data);
    return new Response(JSON.stringify({ ...data }));
  } catch (err) {
    console.log(err);
    throw new Error(err?.message);
  }
}
