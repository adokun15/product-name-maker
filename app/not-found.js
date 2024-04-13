"use client";

import ServerErrorPage from "@/components/ServerErrorPage";

export default function NotFound() {
  return <ServerErrorPage status={404} message="This Page is not found" />;
}
