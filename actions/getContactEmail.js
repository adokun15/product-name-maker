import { addDoc, collection } from "firebase/firestore";
import { Resend } from "resend";

export async function GetContactEmail(username, email, message) {
  if (!email || !username || !message) {
    return { error: true, message: "Invalid Credentials" };
  }

  try {
    //npm i resend

    const resend = new Resend("re_RJdwTz5K_BsnGJZFvFZFEa1eXALJTjLGD");

    await resend.emails.send({
      from: email,
      to: "contact.danielamos@gmail.com",
      subject: `${username} with the email ${email} has send a message to you.`,
      body: `<p>${message}</p>`,
    });
    await addDoc(collection(db, "contact_emails", email), {
      email,
      username,
      message,
    });

    return {
      error: false,
      message: "Thank you for contacting Namify.co.",
    };
  } catch (e) {
    console.log(e);
    return { error: true, message: e?.message };
  }
}
