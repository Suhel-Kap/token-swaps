"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "../ui/separator";

export const ErrorComponent = ({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) => {
  return (
    <div className="my-16 flex flex-col items-center justify-center">
      <h2 className="text-2xl">{error.message}</h2>
      <p className="text-gray-500 my-2 mb-4">
        Try refreshing the page or check your internet connection.
      </p>
      <Button
        onClick={() => {
          window.location.reload();
        }}
        className="mb-2"
      >
        Refresh Page
      </Button>
      <Separator className="w-1/4 my-3" />
      <Button variant={"secondary"} onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
};
