import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

export function HeroSection(): React.ReactElement {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-espresso via-cocoa to-espresso-deep text-cream py-16 sm:py-24 lg:py-28 border-b border-gold/20"
      aria-labelledby="hero-title"
    >
      <div
        className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 rounded-full bg-gold/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-gold/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-bold tracking-[0.2em] uppercase select-none">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FRESH FROM THE OVEN</span>
            </div>

            <h1
              id="hero-title"
              className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal leading-[1.08] tracking-[-0.02em] text-cream"
            >
              BAKED TO MAKE YOU SMILE.
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-cream/80 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
              Golden edges, soft centers and irresistible little moments —
              freshly baked every dawn with Normandy butter and Bourbon vanilla
              for every sweet craving.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Button
                asChild
                variant="primary"
                size="lg"
                className="w-full sm:w-auto bg-gold hover:bg-gold-hover text-espresso font-bold text-xs tracking-[0.14em] uppercase px-8 py-3.5 shadow-warm-lg"
              >
                <Link href="/shop" className="flex items-center gap-2">
                  <span>Shop the Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="ghost"
                size="lg"
                className="w-full sm:w-auto bg-transparent border border-gold/50 text-cream hover:bg-gold/15 hover:text-cream font-semibold text-xs tracking-[0.14em] uppercase px-8 py-3.5 transition-colors"
              >
                <Link href="/about">Discover Cruméa</Link>
              </Button>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-cream/65 font-light">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span>100% French Normandy Butter</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span>Baked Fresh Every Morning</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span>Free Delivery Over $50</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Cookie Presentation */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-72 sm:w-96 lg:w-[420px] aspect-square">
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-gold/30 to-transparent blur-2xl transform scale-105"
                aria-hidden="true"
              />

              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-gold/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                <Image
                  src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80"
                  alt="Warm, freshly baked artisan chocolate chip cookie"
                  fill
                  priority
                  sizes="(max-width: 640px) 288px, (max-width: 1024px) 384px, 420px"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-espresso/90 backdrop-blur-md border border-gold/40 text-cream px-4 py-1.5 rounded-full shadow-xl flex items-center gap-2 whitespace-nowrap text-xs font-serif italic">
                <span className="text-gold font-bold">★</span>
                <span>Signature Dark Chocolate &amp; Sea Salt Cookie</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
