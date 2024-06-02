import { auth } from "firebase-admin";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

import { customInitApp } from "@/firebase/server";

customInitApp();
export async function POST(req, res) {
  const authorization = headers().get("Authorization");

  if (authorization?.startsWith("Bearer ")) {
    const idToken = authorization.split("Bearer ")[1];

    const decodedToken = await auth().verifyIdToken(idToken);

    if (decodedToken) {
      //One hour
      const expiration_time = 24 * 60 * 60 * 1000;

      const sessionCookies = await auth().createSessionCookie(idToken, {
        expiresIn: expiration_time,
      });

      const option = {
        name: "session_firebase_user",
        value: sessionCookies,
        maxAge: expiration_time,
        httpOnly: true,
        secure: true,
      };

      //Set Cookie Whenever Logging in
      cookies().set(option);
    }

    return NextResponse.json({}, { status: 200 });
  }
}

export async function GET() {
  const session = cookies().get("session_firebase_user")?.value || "";

  if (!session) {
    return NextResponse.json({ isLoggedIn: false });
  }

  const decodedClaims = await auth().verifySessionCookie(session, true);

  if (!decodedClaims) {
    return NextResponse.json({ isLoggedIn: false }, { status: 401 });
  }
  return NextResponse.json({ isLoggedIn: true }, { status: 200 });
}
