import { db } from "@/firebase/client";
import { userDatabase } from "@/utils/User/GetUser";
import { doc, updateDoc } from "firebase/firestore";

async function prevNotification(id) {
  return userDatabase(id, "notifications");
}
export async function Notifier(userId, title, message, action, reference) {
  try {
    const prev = await prevNotification(userId);
    const DocRef = doc(db, "notifications", userId);
    await updateDoc(DocRef, {
      id: userId,
      notifications: [
        {
          id: new Date().getTime(),
          title,
          message,
          reference: reference || null,
          action: action ? { ...action } : {},
          dateCreated: new Date().toISOString(),
        },
        ...prev,
      ],
    });
  } catch (err) {
    return err?.message;
  }
}
