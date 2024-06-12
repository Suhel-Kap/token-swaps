import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="my-16 flex flex-col items-center justify-center">
      <h2 className="text-2xl">
        {"Uh oh! We couldn't find the page you were looking for."}
      </h2>
      <Link href="/">
        <Button className="mb-2">Go Home</Button>
      </Link>
    </div>
  );
}
