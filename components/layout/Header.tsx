"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { CartButton } from "@/features/cart/components/CartButton";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Menu, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";

function HeaderNav(): React.ReactElement {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  const navLinks = [
    { href: "/", label: "HOME", active: pathname === "/" },
    {
      href: "/shop",
      label: "SHOP",
      active: pathname === "/shop" && !currentCategory,
    },
    {
      href: "/shop?category=Cookies",
      label: "COOKIES",
      active: pathname === "/shop" && currentCategory === "Cookies",
    },
    {
      href: "/shop?category=Biscuits",
      label: "BISCUITS",
      active: pathname === "/shop" && currentCategory === "Biscuits",
    },
    {
      href: "/shop?category=Pastries",
      label: "BAKERY",
      active: pathname === "/shop" && currentCategory === "Pastries",
    },
    { href: "/about", label: "OUR STORY", active: pathname === "/about" },
  ];

  return (
    <nav
      className="hidden lg:flex items-center space-x-7"
      aria-label="Main Navigation"
    >
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "text-xs font-semibold tracking-[0.16em] uppercase transition-colors hover:text-[#C89B68] py-1 select-none",
            link.active ? "text-[#C89B68]" : "text-[#FAF6F0]/80"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

function HeaderNavFallback(): React.ReactElement {
  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/shop", label: "SHOP" },
    { href: "/shop?category=Cookies", label: "COOKIES" },
    { href: "/shop?category=Biscuits", label: "BISCUITS" },
    { href: "/shop?category=Pastries", label: "BAKERY" },
    { href: "/about", label: "OUR STORY" },
  ];

  return (
    <nav
      className="hidden lg:flex items-center space-x-7"
      aria-label="Main Navigation"
    >
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-xs font-semibold tracking-[0.16em] uppercase transition-colors hover:text-[#C89B68] py-1 select-none text-[#FAF6F0]/80"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

export function Header(): React.ReactElement {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mobileNavLinks = [
    { href: "/", label: "HOME" },
    { href: "/shop", label: "SHOP" },
    { href: "/shop?category=Cookies", label: "COOKIES" },
    { href: "/shop?category=Biscuits", label: "BISCUITS" },
    { href: "/shop?category=Pastries", label: "BAKERY" },
    { href: "/about", label: "OUR STORY" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#1A110B] text-[#FAF6F0] border-b border-[#C89B68]/20 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Mobile menu trigger */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-lg text-[#FAF6F0] hover:text-[#C89B68] hover:bg-white/5 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Brand Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            className="group flex flex-col items-start select-none py-1"
          >
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.14em] font-normal uppercase text-[#FAF6F0] group-hover:text-[#C89B68] transition-colors leading-none">
              CRUMÉA
            </span>
            <span className="text-[9px] tracking-[0.25em] uppercase text-[#C89B68] font-bold mt-1">
              BAKED TO MAKE YOU SMILE
            </span>
          </Link>
        </div>

        {/* Center Desktop Navigation wrapped in Suspense for useSearchParams */}
        <Suspense fallback={<HeaderNavFallback />}>
          <HeaderNav />
        </Suspense>

        {/* Right Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Search link */}
          <Link
            href="/shop"
            aria-label="Search all products"
            className="p-2 rounded-full text-[#FAF6F0]/80 hover:text-[#C89B68] transition-colors"
          >
            <Search className="w-4 h-4" />
          </Link>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Cart Button */}
          <CartButton />

          {/* Solid Gold Order Now Button */}
          <Button
            asChild
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex bg-[#C89B68] hover:bg-[#B88956] text-[#1A110B] font-bold text-xs tracking-wider uppercase px-4 py-2 rounded shadow-sm select-none"
          >
            <Link href="/shop">ORDER NOW</Link>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#C89B68]/20 bg-[#241710] px-4 pt-3 pb-6 space-y-2">
          {mobileNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-md text-xs font-bold tracking-[0.15em] uppercase text-[#FAF6F0]/85 hover:bg-white/5 hover:text-[#C89B68] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-white/10">
            <Button
              asChild
              variant="primary"
              className="w-full justify-center bg-[#C89B68] text-[#1A110B] font-bold text-xs tracking-wider uppercase"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link href="/shop">ORDER NOW</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
