import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function POST(request) {
  const options = {
    name: "session_firebase_user",
    value: "",
    maxAge: -1,
  };

  cookies().set(options);

  return NextResponse.json({}, { status: 200 });
}
