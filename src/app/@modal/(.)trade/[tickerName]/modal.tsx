"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { RiCloseLine } from "react-icons/ri";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      document.body.style.overflow = "hidden";
    }
  }, []);

  function onDismiss() {
    document.body.style.overflow = "visible";
    router.back();
  }

  return createPortal(
    <div className={cn("modal-backdrop", "min-h-screen")}>
      <dialog
        ref={dialogRef}
        className={cn("modal", "dark:bg-neutral-900")}
        onClose={onDismiss}
      >
        {children}
        <button
          onClick={onDismiss}
          className={cn(
            "close-button",
            "bg-transparent dark:hover:bg-neutral-600 dark:bg-slate-800 rounded-full",
          )}
        >
          <RiCloseLine />
        </button>
      </dialog>
    </div>,
    document.getElementById("modal-root")!,
  );
}
