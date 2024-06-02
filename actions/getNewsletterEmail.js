"use server";
import { db } from "@/firebase/client";
import { addDoc, collection } from "firebase/firestore";
import { Resend } from "resend";

export async function GetNewsletterEmail(email) {
  // Resend Info

  if (!email) {
    return { error: true, message: "Invalid Email" };
  }

  try {
    //const resend = new Resend("re_M9e6hC5m_GPw8DuHLjt6hFPoqqETaqNnx");
    const resend = new Resend("re_RJdwTz5K_BsnGJZFvFZFEa1eXALJTjLGD");

    await resend.emails.send({
      from: email,
      to: ["contact.danielamos@gmail.com"],
      subject: "A new Email has been Submitted for Newsletter",
      body: `<b>${email} has been added to your Newsletter</b>`,
    });
    await addDoc(collection(db, "newsletter_emails"), { email });

    return {
      error: false,
      message: "Thank you for submitting your email for AI name suggestions.",
    };
  } catch (e) {
    console.log(e);
    return { error: true, message: e?.message };
  }
}
