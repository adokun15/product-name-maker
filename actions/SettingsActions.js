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

    if (data.email) {
      await auth().updateUser(uid, {
        email: data?.email,
      });

      if (CustomerCode) {
        await UpdateCustomer({ email: data.email }, CustomerCode);
      }

      return { message: "Profile Email udated!" };
    }

    if (data?.name) {
      await auth().updateUser(uid, {
        displayName: data?.name,
      });

      if (CustomerCode) {
        await UpdateCustomer({ first_name: data?.name }, CustomerCode);
      }
      return { message: `Username Has Been Updated to ${data.name}` };
    }

    if (data?.password) {
      await auth().updateUser(uid, {
        password: data?.password,
      });

      return { message: `Password Has Been Updated!` };
    }

    return { error: true, message: "Invalid Request!", status: 500 };
  } catch (err) {
    if (err?.message?.includes("failed to fetch")) {
      throw new Error("No Internet Connection");
    } else {
      throw new Error(err?.message);
    }
  }
}

export async function UpdateAi(uid, settings, data) {
  if (!uid) {
    return { error: true, message: "unauthorized access", status: 401 };
  }
  async function timeout(t = 1) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(`Request took too long! `);
      }, t * 1000);
    });
  }

  try {
    if (settings === "name" && data && uid) {
      await Promise.race([
        timeout(10),
        UpdateUserDatabase(uid, "users", {
          ai_name: data.name,
        }),
      ]).catch((e) => {
        throw new Error(e?.message || e || "SOMETHING WENT WRONG");
      });
      return { message: "SuccessFully Updated AI Name" };
    }

    if (settings === "theme" && data && uid) {
      await Promise.race([
        timeout(10),
        UpdateUserDatabase(uid, "users", {
          ai_theme: { ...data },
        }),
      ]).catch((e) => {
        throw new Error(e?.message || e || "SOMETHING WENT WRONG");
      });

      return { message: "SuccessFully Updated AI Theme" };
    }

    return { message: "Invalid Request", status: 500, error: true };
  } catch (err) {
    return { error: true, message: err?.message, status: 500 };
  }
}
