import { userDatabase } from "@/utils/User/GetUser";
import React from "react";

async function GetUserFunc(id) {
  try {
    const user = await userDatabase(id);
    return user;
  } catch (err) {
    if (err.message.includes("client is offline")) {
      return { error: true, errorMesage: "No Internet Connection" };
    } else {
      return { error: true, errorMesage: err.message };
    }
  }
}

export default async function SideDashboard({ uid }) {
  const user = await GetUserFunc(uid);

  if (!user) return <p className="text-white">Something is wrong</p>;
  if (user && user?.error)
    return <p className="text-white">{user.errorMesage}</p>;

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
