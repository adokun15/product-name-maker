"use client";

import AiActivity from "@/components/AiActivity";
import { useUser } from "@/hook/useUser";
import { Suspense } from "react";
import LoaderText from "./LoaderText";

export default function AiDashboard() {
  const user = useUser();

  const { uid } = user.cUser;

  return (
    <main className="my-8">
      <h2 className="text-2xl font-medium mb-4">Ai Activity</h2>
      <Suspense fallback={<LoaderText clr="text-white" />}>
        <AiActivity id={uid} />
      </Suspense>
    </main>
  );
}
