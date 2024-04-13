"use server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function NameGenerator(prompt, isPro = null) {
  const pro_assistant = `
  You are name Generating Service. You give suggestive names from input. And you are more 
  interactive with your response. but your response should be short sentence
  `;

  const assistant = `
  You are name Generating Service. You give suggestive names from input.  
  `;
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: isPro ? pro_assistant : assistant,
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
