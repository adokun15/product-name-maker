import { isWithinTokenLimit } from "gpt-tokenizer";

import { userDatabase } from "@/utils/User/GetUser";
import { UpdateUserAiCount } from "@/utils/User/UpdateUser";
import { NextResponse } from "next/server";

export async function DecreaseAiLimit(userId, token_used) {
  if (!userId) {
    return;
  }

  const { token } = await userDatabase(userId);

  if (!token || token === "EXPIRED") {
    return new NextResponse({ message: "Invalid Token " }, { status: 503 });
  }

  if (token === "UNLIMITED") return;

  //reduce
  if (token_used >= token) {
    await UpdateUserAiCount(userId, 0);
  }

  if (token) {
    const newCountValue = token - token_used;
    await UpdateUserAiCount(userId, newCountValue);
  } else {
    await UpdateUserAiCount(userId, 100);
  }
}

export async function TokenExceeded(text, tokenLeft) {
  // Check if text is within the token limit
  // returns false if the limit is exceeded, otherwise returns the actual number of tokens (truthy value)
  const withinTokenLimit = isWithinTokenLimit(text, tokenLeft);

  //if (token === "UNLIMITED") return true;

  return withinTokenLimit;
}
export async function AiLimitReached(userId) {
  if (!userId) {
    return false;
  }

  const { token } = await userDatabase(userId);

  if (token === "UNLIMITED") return false;

  if (userId || token < 1 || token === "EXPIRED") {
    return true;
  } else {
    return false;
  }
}
