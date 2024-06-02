import OpenAI from "openai";
import { NextResponse } from "next/server";
import {
  AiLimitReached,
  DecreaseAiLimit,
  TokenExceeded,
} from "@/lib/api-limits";
import { UpdateUserHistory } from "@/utils/User/UpdateUser";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const pro_assistant = process.env.OPENAI_API_ASSISTANT_PRO;
    const assistant = process.env.OPENAI_API_ASSISTANT;

    //Get Current User From FireBase Auth,
    const { prompt, service, userId, token_left } = await req.json();

    const ispro = token_left === "UNLIMITED";

    if (!userId) {
      return new NextResponse({
        message: "Unauthorized Access",
        status: 401,
      });
    }

    //Check If user is on Free Trial
    const freeTrial = await AiLimitReached(userId);

    if (freeTrial) {
      return new NextResponse("Your token has been exhausted", { status: 403 });
    }

    //check user Input value
    if (!prompt) {
      return new NextResponse("Prompt texts is Empty!", { status: 400 });
    }

    //Calculate Token
    //    const CheckExceeded = await TokenExceeded(prompt, token_left);

    ////  if (!CheckExceeded) {
    //    return new NextResponse(
    //   "Your remaining token is not enough to complete the request",
    //   { status: 529 }
    // );
    //    }

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: ispro ? pro_assistant : assistant,
        },
        { role: "user", content: prompt },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.6,
    });

    //const tokenUsed = data.usage.totalToken;

    //You stop here
    const tokenUsed = completion.usage.prompt_tokens;

    //Increase Ai Limit
    await DecreaseAiLimit(userId, tokenUsed);

    // update: HISTORY
    const date = new Date();
    const nowDate = date.toISOString();

    //history update
    await UpdateUserHistory(userId, {
      dateCreated: nowDate,
      result: completion.choices[0].message.content,
      historyId: completion.id,
      service,
      usage: {
        totalToken: completion.usage.total_tokens,
        completionToken: completion.usage.completion_tokens,
        promptToken: completion.usage.prompt_tokens,
      },
    });

    return new NextResponse(
      JSON.stringify({
        message: completion.choices[0].message.content,
        created: completion.created,
        chatId: completion.id,
        usage: {
          totalToken: completion.usage.total_tokens,
          completionToken: completion.usage.completion_tokens,
          promptToken: completion.usage.prompt_tokens,
        },
      }),
      { status: 200 }
    );
  } catch (err) {
    return new NextResponse(JSON.stringify(err?.message), { status: 500 });
  }
}
