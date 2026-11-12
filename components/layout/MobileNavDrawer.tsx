import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const MOBILE_LINKS = [
  { href: "/", label: "HOME" },
  { href: "/shop", label: "SHOP" },
  { href: "/shop?category=Cookies", label: "COOKIES" },
  { href: "/shop?category=Biscuits", label: "BISCUITS" },
  { href: "/shop?category=Pastries", label: "BAKERY" },
  { href: "/about", label: "OUR STORY" },
] as const;

export interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNavDrawer({
  isOpen,
  onClose,
}: MobileNavDrawerProps): React.ReactElement | null {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden border-t border-gold/20 bg-cocoa px-4 pt-3 pb-6 space-y-2">
      {MOBILE_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onClose}
          className="block px-3 py-2.5 rounded-md text-xs font-bold tracking-[0.15em] uppercase text-cream/85 hover:bg-white/5 hover:text-gold transition-colors"
        >
          {link.label}
        </Link>
      ))}
      <div className="pt-3 border-t border-white/10">
        <Button
          asChild
          variant="primary"
          className="w-full justify-center bg-gold text-espresso font-bold text-xs tracking-wider uppercase"
          onClick={onClose}
        >
          <Link href="/shop">ORDER NOW</Link>
        </Button>
      </div>
    </div>
  );
}
