import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function TradeMarkNameValidator(prompt) {
  const assistant =
    "You are a TradeMark Name checking Service. You will validate if the name given already in use and give accurate result in a short sentence.";

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: assistant,
        },
        { role: "user", content: prompt },
      ],
      model: "gpt-3.5-turbo",
    });

    return {
      message: completion.choices[0].message.content,
      created: completion.created,
      chatId: completion.id,
      usage: {
        totalToken: completion.usage.total_tokens,
        completionToken: completion.usage.completion_tokens,
        promptToken: completion.usage.prompt_tokens,
      },
    };
  } catch (err) {
    return { message: err?.message, error: true };
  }
}
