"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "HOME" },
  { href: "/shop", label: "SHOP" },
  { href: "/shop?category=Cookies", label: "COOKIES" },
  { href: "/shop?category=Biscuits", label: "BISCUITS" },
  { href: "/shop?category=Pastries", label: "BAKERY" },
  { href: "/about", label: "OUR STORY" },
] as const;

function ActiveNavLinks(): React.ReactElement {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  return (
    <nav
      className="hidden lg:flex items-center space-x-7"
      aria-label="Main Navigation"
    >
      {NAV_ITEMS.map((link) => {
        const isShopRoot =
          link.href === "/shop" && pathname === "/shop" && !currentCategory;
        const isCategory =
          link.href.includes("category=") &&
          pathname === "/shop" &&
          link.href.includes(`category=${currentCategory ?? ""}`);
        const isExact = link.href === pathname;
        const isActive =
          isShopRoot ||
          isCategory ||
          (link.href !== "/shop" &&
            !link.href.includes("category=") &&
            isExact);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "text-xs font-semibold tracking-[0.16em] uppercase transition-colors hover:text-gold py-1 select-none",
              isActive ? "text-gold" : "text-cream/80"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

function NavFallback(): React.ReactElement {
  return (
    <nav
      className="hidden lg:flex items-center space-x-7"
      aria-label="Main Navigation"
    >
      {NAV_ITEMS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-xs font-semibold tracking-[0.16em] uppercase transition-colors hover:text-gold py-1 select-none text-cream/80"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

export function HeaderNav(): React.ReactElement {
  return (
    <Suspense fallback={<NavFallback />}>
      <ActiveNavLinks />
    </Suspense>
  );
}
