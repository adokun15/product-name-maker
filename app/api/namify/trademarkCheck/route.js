import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const assistant = process.env.OPENAI_API_ASSISTANT_TRADEMARK;

    //check and validate token
    if (!prompt || prompt === "") {
      return new NextResponse("Prompt texts is Emoty!", { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: assistant,
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      model: "gpt-3.5-turbo",
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
      })
    );
  } catch (err) {
    return new NextResponse(JSON.stringify(err?.message), { status: 500 });
  }
}
