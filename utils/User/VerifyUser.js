"use server";
import { NextResponse } from "next/server";
import { getApp } from "firebase/app";
import {
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";

import { app } from "@/firebase/client";

export async function SendEmailVerification(user) {
  const apps = getApp();
  if (!user) {
    return { success: false, message: "Unauthorized Access!" };
  }
  try {
    await sendEmailVerification(user);

    return {
      success: true,
      message: "Email Verification Link Sent Successfully!",
    };
  } catch (err) {
    if (err?.code === "unavailable") {
      return { success: false, message: "You currently offline" };
    }
    return { success: false, message: err?.code || err?.message };
  }
}

export async function SendPasswordResetEmail(email) {
  const auth = getAuth();
  const apps = getApp();
  if (!email) {
    return new NextResponse("Unauthorized access", {
      status: 401,
    });
  }
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      message: `Your Password Reset Link Has Been Sent to ${email}`,
      success: true,
    };
  } catch (error) {
    if (err?.code === "unavailable") {
      return { success: false, message: "You currently offline" };
    }
    return { success: false, message: err?.code || err?.message };
  }
}
