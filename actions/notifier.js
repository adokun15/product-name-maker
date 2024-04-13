import { db } from "@/utils/firebase";
import { userDatabase } from "@/utils/User/GetUser";
import { doc, updateDoc } from "firebase/firestore";

async function prevNotification(id) {
  return userDatabase(id, "notifications");
}

export async function Notifier(userId, title, message) {
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
          dateCreated: new Date().toISOString(),
        },
        ...prev,
      ],
    });
  } catch (err) {
    console.log(err);
  }
}
