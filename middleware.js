import { NextResponse } from "next/server";

export async function middleware(request) {
  const session = request.cookies.get("session_firebase_user");

  if (!session) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  const responseApi = await fetch("/api/login", {
    method: "GET",
    headers: {
      Cookie: `session=${session?.value}`,
    },
  });

  if (responseApi.status !== 200) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/overview:path*"],
};
