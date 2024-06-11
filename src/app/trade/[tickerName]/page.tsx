import { SwapToken } from "@/components/SwapToken";
import { Skeleton } from "@/components/ui/skeleton";
import { TOKEN_PAIRS } from "@/lib/constants";
import { PageProps } from "@/lib/types";
import { Suspense } from "react";

export default function Trade({ params }: PageProps) {
  const token = TOKEN_PAIRS.find(
    (pair) => pair.tickerName === params.tickerName,
  );

  return (
    <div className="my-16 flex items-center justify-center">
      <Suspense fallback={<Skeleton className="w-[385px]" />}>
        <SwapToken initialTokenIn={token!} />
      </Suspense>
    </div>
  );
}

export function generateMetadata({ params }: PageProps) {
  const token = TOKEN_PAIRS.find(
    (pair) => pair.tickerName === params.tickerName,
  );
  return {
    title: `Trade ${token?.displayName}`,
    description: `Trade ${token?.displayName}`,
  };
}
