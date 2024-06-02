import { userDatabase } from "@/utils/User/GetUser";

export async function IsPro(uid) {
  try {
    const { subscription } = await userDatabase(uid, "subscriptions");

    if (!subscription)
      return {
        error: true,
        message: "An Unknown Error has Ocurred!",
      };

    const { next_payment_date, sub_code } = subscription;

    if (!next_payment_date || !sub_code) {
      return {
        message: "Subscription is not currently not Active",
        error: true,
      };
    }

    const paymentDate = new Date(next_payment_date);
    //check time
    return paymentDate.getTime() > Date.now() ? sub_code : null;
  } catch (err) {
    throw new Error(err?.message || "Something went wrong");
  }
}

export async function SubcriptionData(uid) {
  try {
    const { subscription } = await userDatabase(uid, "subscriptions");
    if (!subscription) return null;
    const { next_payment_date } = subscription;

    if (!next_payment_date || !subscription) {
      return {
        message: "Subscription is not currently not Active",
        error: true,
      };
    }

    return subscription ? { ...subscription } : null;
  } catch (error) {
    throw new Error(err?.message || "Something went wrong");
  }
}

export async function checkPaymentMethod(uid, ref = null) {
  //Check refererences

  if (ref && uid) {
    try {
      const response = await fetch(
        `${process.env.HOST}/api/subscriptions/verify_transaction?query=${ref}_${uid}`,
        { method: "GET" }
      );

      if (!response.ok) {
        return { message: "Something went wrong", error: true };
      }

      const data = await response.json();
      return { ...data };
    } catch (err) {
      return { message: err?.message, error: true };
    }
  }

  if (!ref && uid) {
    try {
      const { payment_method } = await userDatabase(uid, "subscriptions");

      if (!payment_method) {
        return false;
      }

      return payment_method?.auth_code ? payment_method : false;
    } catch (err) {
      return { message: err?.message, error: true };
    }
  }

  return null;
}
