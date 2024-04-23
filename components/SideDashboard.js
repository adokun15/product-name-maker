import { IsPro } from "@/lib/BoolFunctions";
import { userDatabase } from "@/utils/User/GetUser";
import React from "react";

async function GetUserFunc(id) {
  try {
    return user;
  } catch (err) {
    return { error: err?.message };
  }
}

export default async function SideDashboard({ uid }) {
  const user = await userDatabase(uid);
  const isPro = await IsPro(uid);

  if (user.error) {
    <div>
      <p className="font-bold text-xl text-center">{user?.message}</p>
    </div>;
  }

  return (
    <div className="text-white *:mb-3">
      <article>
        <h1 className="font-bold">Token Left</h1>
        <p>{user?.token || "..."}</p>
      </article>
      <article>
        <h1 className="font-bold">Plans</h1>
        <p>{isPro ? "Pro Plan" : "Free Plan"}</p>
      </article>
    </div>
  );
}
