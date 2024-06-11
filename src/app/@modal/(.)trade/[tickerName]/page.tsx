import { Suspense } from "react";
import { Modal } from "./modal";
import { SwapToken } from "@/components/SwapToken";
import { Skeleton } from "@/components/ui/skeleton";
import { TOKEN_PAIRS } from "@/lib/constants";

export default function SwapModal({
  params: { tickerName },
}: {
  params: { tickerName: string };
}) {
  const token = TOKEN_PAIRS.find((pair) => pair.tickerName === tickerName);

  return (
    <Modal>
      <Suspense fallback={<Skeleton className="w-[385px]" />}>
        <SwapToken
          className="border-none shadow-none dark:bg-slate-900"
          initialTokenIn={token!}
        />
      </Suspense>
    </Modal>
  );
}
