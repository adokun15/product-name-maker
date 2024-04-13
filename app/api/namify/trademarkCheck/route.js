import { TradeMarkNameValidator } from "@/utils/OpenAi/nameValidityCheck";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    //check and validate token
    if (!prompt || prompt === "") {
      return new NextResponse("Prompt texts is Emoty!", { status: 500 });
    }

    const data = await TradeMarkNameValidator(prompt);

    if (!data) {
      throw new Response({ message: "Something went wrong" }, { status: 500 });
    }

    //return result
    return new NextResponse(JSON.stringify({ ...data }));
  } catch (err) {
    throw new Error(err?.message);
  }
}
