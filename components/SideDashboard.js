import { IsPro } from "@/lib/BoolFunctions";
import { userDatabase } from "@/utils/User/GetUser";
import React from "react";

export default async function SideDashboard({ uid }) {
  const isPro = await IsPro(uid);
  const user = await userDatabase(uid);

  if (!user || user?.error || !isPro || isPro?.error) {
    <div>
      <p className="font-bold text-xl text-center">
        {user?.message || "Something went wrong"}
      </p>
    </div>;
  }

  return (
    <div className="text-white *:mb-3">
      <article>
        <h1 className="font-bold">Token Left</h1>
        <p>
          {user?.token <= 0
            ? 0
            : user?.token || user?.token === "UNLIMITED"
            ? user?.token
            : "..."}
        </p>
      </article>
      <article>
        <h1 className="font-bold">Plans</h1>
        <p>{isPro && !isPro?.error ? "Pro Plan" : "You are on a free Plan"}</p>
      </article>
    </div>
  );
}
