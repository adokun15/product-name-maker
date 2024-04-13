"use server";

import { customInitApp } from "@/firebase/server";
import { UpdateCustomer } from "@/utils/Subcription/UpdatePayStackCustomer";
import { userDatabase } from "@/utils/User/GetUser";
import { UpdateUserDatabase } from "@/utils/User/UpdateUser";
import { auth } from "firebase-admin";
import { updateProfile } from "firebase/auth";

export async function Updateuser(uid, data) {
  customInitApp();
  // Firebase and payStack
  //data: { email, name, customerCode}
  if (!uid) {
    return { error: true, message: "unauthorized access", status: 401 };
  }

  try {
    const CustomerCode = data.customer_code;

    if (!data.email || !data.name)
      return { error: true, message: "Invalid Request!", status: 500 };

    if (data.email) {
      const firebase_update = await auth().updateUser(uid, {
        email: data?.email,
      });

      if (!CustomerCode) {
        await UpdateCustomer({ email: data.email }, CustomerCode);
      }

      console.log(firebase_update);

      return firebase_update;
    }

    if (data?.name) {
      const firebase_update = await auth().updateUser(uid, {
        displayName: data?.name,
      });
      if (!CustomerCode) {
        await UpdateCustomer({ email: data?.name }, CustomerCode);
      }
      console.log(firebase_update);
      return firebase_update;
    }

    if (data?.password) {
      const firebase_update = await auth().updateUser(uid, {
        password: data?.password,
      });

      console.log(firebase_update);
      return firebase_update;
    }
  } catch (err) {
    return { error: true, message: err?.message, status: 500 };
  }
}

export async function UpdateAi(uid, settings, data) {
  //data: name;(string)
  //data: color(purple, cyan ), size:{8,16,32}, font(italic, more-bold, bold)
  //setting: name, theme
  if (!uid) {
    return { error: true, message: "unauthorized access", status: 401 };
  }

  try {
    if (settings === "name" && data && uid) {
      const update_ai = await UpdateUserDatabase(uid, "users", {
        ai_name: data.name,
      });
      console.log("SuccessFully Updated Ai Name", update_ai);
    }

    if (settings === "theme" && data && uid) {
      const update_ai = await UpdateUserDatabase(uid, "users", {
        ai_theme: { ...data },
      });
      console.log("SuccessFully Updated Ai Theme", update_ai);
    }

    return { message: "Invalid Request", status: 500, error: true };
  } catch (err) {
    return { error: true, message: err?.message, status: 500 };
  }
}
