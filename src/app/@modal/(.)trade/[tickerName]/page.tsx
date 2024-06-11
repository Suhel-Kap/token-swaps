import { Suspense } from "react";
import { Modal } from "./modal";
import { SwapToken } from "@/components/SwapToken";
import { Skeleton } from "@/components/ui/skeleton";
import { TOKEN_PAIRS } from "@/lib/constants";
import { PageProps } from "@/lib/types";

export default function SwapModal({ params: { tickerName } }: PageProps) {
  const token = TOKEN_PAIRS.find((pair) => pair.tickerName === tickerName);

  return (
    <Modal>
      <Suspense fallback={<Skeleton className="w-[385px]" />}>
        <SwapToken
          className="border-none shadow-none dark:bg-slate-900"
          initialTokenIn={token!}
          isModal={true}
        />
      </Suspense>
    </Modal>
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
