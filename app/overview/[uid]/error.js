"use client";

import ServerErrorPage from "@/components/ServerErrorPage";
import { useState, useEffect } from "react";

export default function Error({ error, reset }) {
  const [definedError, setError] = useState(null);
  useEffect(() => {
    // Log the error to an error reporting service
    setError(error);
  }, [error]);

  if (definedError?.message === "unavailable") {
    return (
      <ServerErrorPage
        message="You have a slow internet Connection"
        status={502}
        onRefresh={reset}
      />
    );
  }
  return <ServerErrorPage message={definedError?.message} onRefresh={reset} />;
}
