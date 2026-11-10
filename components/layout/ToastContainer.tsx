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
                "bg-[#FAF6F0] dark:bg-[#1E140E] border-[#C89B68] text-[#1A110B] dark:text-[#FAF6F0]",
              isError &&
                "bg-[#FFEBEE] dark:bg-[#2D1414] border-[#C62828] text-[#C62828] dark:text-[#FFCDD2]",
              !isSuccess &&
                !isError &&
                "bg-[#E3F2FD] dark:bg-[#132B45] border-[#1565C0] text-[#1565C0] dark:text-[#BBDEFB]"
            )}
          >
            <div className="shrink-0 mt-0.5">
              {isSuccess && (
                <CheckCircle2 className="w-5 h-5 text-[#2E7D32] dark:text-[#C89B68]" />
              )}
              {isError && <AlertCircle className="w-5 h-5 text-[#C62828]" />}
              {!isSuccess && !isError && (
                <Info className="w-5 h-5 text-[#1565C0]" />
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

