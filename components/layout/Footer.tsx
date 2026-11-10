import React from "react";
import Link from "next/link";

export function Footer(): React.ReactElement {
  return (
    <footer className="bg-[#1A110B] text-[#FAF6F0] py-14 sm:py-16 border-t border-[#C89B68]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 items-start">
          {/* Logo & Slogan Column */}
          <div className="lg:col-span-3 space-y-2">
            <Link href="/" className="inline-block select-none py-1">
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.14em] uppercase font-normal text-[#FAF6F0] block">
                CRUMÉA
              </span>
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#C89B68] font-bold block mt-1">
                BAKED TO MAKE YOU SMILE.
              </span>
            </Link>
            <p className="text-xs text-[#FAF6F0]/65 leading-relaxed pt-2 max-w-xs font-light">
              Handcrafted in small batches with French Normandy flour, Brittany
              churned butter, and single-origin chocolate.
            </p>
          </div>

          {/* Column 1: SHOP */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#C89B68]">
              SHOP
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF6F0]/70 font-light">
              <li>
                <Link
                  href="/shop"
                  className="hover:text-[#C89B68] transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=Cookies"
                  className="hover:text-[#C89B68] transition-colors"
                >
                  Cookies
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=Biscuits"
                  className="hover:text-[#C89B68] transition-colors"
                >
                  Biscuits
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=Brownies"
                  className="hover:text-[#C89B68] transition-colors"
                >
                  Brownies
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=Pastries"
                  className="hover:text-[#C89B68] transition-colors"
                >
                  Pastries
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=Cakes"
                  className="hover:text-[#C89B68] transition-colors"
                >
                  Cakes
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=Gift%20Boxes"
                  className="hover:text-[#C89B68] transition-colors"
                >
                  Gift Boxes
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: COMPANY */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#C89B68]">
              COMPANY
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF6F0]/70 font-light">
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#C89B68] transition-colors"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#C89B68] transition-colors"
                >
                  Ingredients &amp; Sourcing
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#C89B68] transition-colors"
                >
                  The Atelier
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#C89B68] transition-colors"
                >
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: CUSTOMER CARE */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#C89B68]">
              CUSTOMER CARE
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF6F0]/70 font-light">
              <li>
                <Link
                  href="/checkout"
                  className="hover:text-[#C89B68] transition-colors"
                >
                  Shipping &amp; Delivery
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#C89B68] transition-colors"
                >
                  FAQ &amp; Allergens
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#C89B68] transition-colors"
                >
                  Contact Concierge
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF6F0]/50">
          <p>© {new Date().getFullYear()} CRUMÉA Luxury Bakery. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 font-serif italic text-[#C89B68]/90">
            Artisanal perfection in every single bite.
          </p>
        </div>
      </div>
    </footer>
  );
}
