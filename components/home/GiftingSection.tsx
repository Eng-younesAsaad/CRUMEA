import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Gift, ArrowRight } from "lucide-react";

export function GiftingSection(): React.ReactElement {
  return (
    <section
      className="py-16 sm:py-20 bg-[#241710] text-[#FAF6F0] border-b border-[#C89B68]/20 overflow-hidden relative"
      aria-labelledby="gifting-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89B68]/15 border border-[#C89B68]/30 text-[#C89B68] text-xs font-bold tracking-[0.2em] uppercase select-none">
              <Gift className="w-3.5 h-3.5" />
              <span>BOXED WITH LOVE</span>
            </div>

            <h2
              id="gifting-title"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15] text-[#FAF6F0]"
            >
              Perfect for gifting. Perfect for sharing.
            </h2>

            <p className="text-sm sm:text-base text-[#FAF6F0]/80 leading-relaxed font-light max-w-xl mx-auto lg:mx-0">
              Whether celebrating a milestone, expressing heartfelt gratitude, or
              sending a sweet surprise across town — our luxury gold-embossed gift
              boxes deliver unforgettable bakery moments right to their doorstep.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button
                asChild
                variant="primary"
                size="lg"
                className="bg-[#C89B68] hover:bg-[#B88956] text-[#1A110B] font-bold text-xs tracking-[0.14em] uppercase px-8 py-3.5 shadow-warm-lg"
              >
                <Link
                  href="/shop?category=Gift%20Boxes"
                  className="flex items-center gap-2"
                >
                  <span>Explore Gift Boxes</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Visual */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl border border-[#C89B68]/30">
              <Image
                src="https://images.unsplash.com/photo-1548848221-0c2e497ed557?auto=format&fit=crop&w=700&q=80"
                alt="Luxury CRUMÉA artisan gift box tied with ribbon and filled with gourmet cookies"
                fill
                sizes="(max-width: 1024px) 100vw, 450px"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
