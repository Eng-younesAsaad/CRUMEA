import React from "react";
import Link from "next/link";

const SHOP_LINKS = [
  { href: "/shop", label: "All Products" },
  { href: "/shop?category=Cookies", label: "Cookies" },
  { href: "/shop?category=Biscuits", label: "Biscuits" },
  { href: "/shop?category=Brownies", label: "Brownies" },
  { href: "/shop?category=Pastries", label: "Pastries" },
  { href: "/shop?category=Cakes", label: "Cakes" },
  { href: "/shop?category=Gift%20Boxes", label: "Gift Boxes" },
];

const COMPANY_LINKS = [
  { href: "/about", label: "Our Story" },
  { href: "/about", label: "Ingredients & Sourcing" },
  { href: "/about", label: "The Atelier" },
  { href: "/about", label: "Sustainability" },
];

const CARE_LINKS = [
  { href: "/checkout", label: "Shipping & Delivery" },
  { href: "/about", label: "FAQ & Allergens" },
  { href: "/about", label: "Contact Concierge" },
];

export function Footer(): React.ReactElement {
  return (
    <footer className="bg-espresso text-cream py-14 sm:py-16 border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 items-start">
          {/* Logo & Slogan Column */}
          <div className="lg:col-span-3 space-y-2">
            <Link href="/" className="inline-block select-none py-1">
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.14em] uppercase font-normal text-cream block">
                CRUMÉA
              </span>
              <span className="text-[9px] tracking-[0.25em] uppercase text-gold font-bold block mt-1">
                BAKED TO MAKE YOU SMILE.
              </span>
            </Link>
            <p className="text-xs text-cream/65 leading-relaxed pt-2 max-w-xs font-light">
              Handcrafted in small batches with French Normandy flour, Brittany
              churned butter, and single-origin chocolate.
            </p>
          </div>

          {/* SHOP Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
              SHOP
            </h4>
            <ul className="space-y-2.5 text-xs text-cream/70 font-light">
              {SHOP_LINKS.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
              COMPANY
            </h4>
            <ul className="space-y-2.5 text-xs text-cream/70 font-light">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CUSTOMER CARE Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
              CUSTOMER CARE
            </h4>
            <ul className="space-y-2.5 text-xs text-cream/70 font-light">
              {CARE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-cream/50">
          <p>
            © {new Date().getFullYear()} CRUMÉA Luxury Bakery. All rights
            reserved.
          </p>
          <p className="mt-2 sm:mt-0 font-serif italic text-gold/90">
            Artisanal perfection in every single bite.
          </p>
        </div>
      </div>
    </footer>
  );
}
