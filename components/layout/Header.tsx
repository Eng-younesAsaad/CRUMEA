"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CartButton } from "@/features/cart/components/CartButton";
import { ThemeToggle } from "./ThemeToggle";
import { HeaderNav } from "./HeaderNav";
import { MobileNavDrawer } from "./MobileNavDrawer";
import { Button } from "@/components/ui/button";
import { Menu, X, Search } from "lucide-react";

export function Header(): React.ReactElement {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-espresso text-cream border-b border-gold/20 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Mobile menu trigger */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-lg text-cream hover:text-gold hover:bg-white/5 transition-colors"
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
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.14em] font-normal uppercase text-cream group-hover:text-gold transition-colors leading-none">
              CRUMÉA
            </span>
            <span className="text-[9px] tracking-[0.25em] uppercase text-gold font-bold mt-1">
              BAKED TO MAKE YOU SMILE
            </span>
          </Link>
        </div>

        {/* Center Desktop Navigation */}
        <HeaderNav />

        {/* Right Action Icons & Button */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Link
            href="/shop"
            aria-label="Search all products"
            className="p-2 rounded-full text-cream/80 hover:text-gold transition-colors"
          >
            <Search className="w-4 h-4" />
          </Link>

          <ThemeToggle />

          <CartButton />

          <Button
            asChild
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex bg-gold hover:bg-gold-hover text-espresso font-bold text-xs tracking-wider uppercase px-4 py-2 rounded shadow-sm select-none"
          >
            <Link href="/shop">ORDER NOW</Link>
          </Button>
        </div>
      </div>

      <MobileNavDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}
