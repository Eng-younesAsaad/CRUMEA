"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({
  className,
}: {
  className?: string;
}): React.ReactElement {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? theme === "dark" : false;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className={cn(
        "relative flex items-center justify-center w-9 h-9 rounded-full border border-[#C89B68]/30 hover:border-[#C89B68] text-[#FAF6F0] hover:text-[#C89B68] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B68]",
        className
      )}
    >
      {mounted && isDark ? (
        <Sun className="w-4 h-4 text-[#C89B68] transition-transform duration-200" />
      ) : (
        <Moon className="w-4 h-4 text-[#FAF6F0] transition-transform duration-200" />
      )}
    </button>
  );
}
