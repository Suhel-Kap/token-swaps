"use client";

import { ErrorComponent } from "@/components/ErrorHandler";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return <ErrorComponent error={error} reset={reset} />;
}
