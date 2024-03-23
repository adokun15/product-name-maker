import { NextResponse } from "next/server";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getApp } from "firebase/app";
import { app } from "./utils/firebase";
export async function middleware(request) {
  const otherApp = getApp();
  const auth = getAuth();

  let currentUser = null;
  onAuthStateChanged(auth, (user) => (currentUser = user));

  if (!currentUser && request.nextUrl.pathname.startsWith("/overview")) {
    // return NextResponse.redirect(new URL("/auth", request.url));
  }
  //Log User Out
  if (request.nextUrl.pathname.startsWith("/logout")) {
    //Logout user here

    return NextResponse.redirect(new URL("/", request.url));
  }

  //Check if User is Authenticated
}
export const config = {
  matcher: ["/overview/:path*", "/logout"],
};
