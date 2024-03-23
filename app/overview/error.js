"use client";

import { useState, useEffect } from "react";

export default function Error({ error, reset }) {
  const [definedError, setError] = useState(null);
  useEffect(() => {
    // Log the error to an error reporting service
    setError(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{definedError?.message || "we dont know what is wromg"}</p>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
