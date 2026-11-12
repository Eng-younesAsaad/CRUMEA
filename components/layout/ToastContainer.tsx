"use client";

import React from "react";
import { useToast } from "@/lib/context/ToastContext";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function ToastContainer(): React.ReactElement | null {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === "success";
        const isError = toast.type === "error";

        return (
          <div
            key={toast.id}
            role="status"
            aria-live="polite"
            className={cn(
              "pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-warm-lg border transition-all duration-300 transform translate-y-0",
              isSuccess &&
                "bg-cream dark:bg-card border-gold text-espresso dark:text-cream",
              isError &&
                "bg-destructive/15 dark:bg-destructive/20 border-destructive text-destructive dark:text-red-300",
              !isSuccess &&
                !isError &&
                "bg-sky-50 dark:bg-sky-950/50 border-sky-600 text-sky-700 dark:text-sky-300"
            )}
          >
            <div className="shrink-0 mt-0.5">
              {isSuccess && (
                <CheckCircle2 className="w-5 h-5 text-emerald-700 dark:text-gold" />
              )}
              {isError && <AlertCircle className="w-5 h-5 text-destructive" />}
              {!isSuccess && !isError && (
                <Info className="w-5 h-5 text-sky-600" />
              )}
            </div>

            <div className="flex-1 text-sm font-medium leading-relaxed">
              {toast.message}
            </div>

            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="shrink-0 p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4 opacity-70 hover:opacity-100" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
