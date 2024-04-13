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

  if (user.error) {
    <div>
      <p className="font-bold text-xl text-center">{user?.message}</p>
    </div>;
  }

  return (
    <div className="text-white">
      <article>
        <h1 className="font-bold">Token Left</h1>
        <p>{user?.token || "..."}</p>
      </article>
      <article>
        <h1 className="font-bold">Plans</h1>
        <p>{user?.subscriptions?.length > 0 ? "Pro Plan" : "Free Plan"}</p>
      </article>
    </div>
  );
}
