import { NameValidator } from "@/utils/OpenAi/nameValidityCheck";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt, userId } = await req.json();

    const freeTrial = await CheckAiLimit(userId);

    //check subsc
    if (freeTrial) {
      return new NextResponse("You Don't have Access To this Service!", {
        status: 403,
      });
    }

    //check and validate token
    if (!prompt) {
      return new NextResponse("Prompt texts is Emoty!", { status: 500 });
    }

    const data = await NameValidator(prompt);

    //return result
    return new Response(JSON.stringify({ ...data }));
  } catch (err) {
    console.log(err);
  }
}
