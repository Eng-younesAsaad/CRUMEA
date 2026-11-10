"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Play, Sparkles, Award } from "lucide-react";

export function StorySection(): React.ReactElement {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <>
      <section
        id="story"
        className="py-16 sm:py-24 bg-[#F3ECE1] dark:bg-[#221711] border-b border-border/80"
        aria-labelledby="story-title"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Story Editorial */}
            <div className="lg:col-span-6 space-y-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
                OUR STORY
              </p>

              <h2
                id="story-title"
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground leading-[1.15]"
              >
                Made with passion. Baked to perfection.
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed font-light">
                <p>
                  At Cruméa, every treat is crafted with the finest ingredients
                  and a whole lot of love. From our oven to your heart — this is
                  more than baking, it is pure happiness shared one crumb at a
                  time.
                </p>
                <p>
                  We believe true artisan luxury lives in patient craftsmanship:
                  stone-milled flour from Normandy, 36-hour sourdough and pastry
                  proofing, churned Brittany butter, and single-origin chocolate
                  beans sourced directly from family plantations.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-foreground/30 hover:border-gold hover:text-gold text-xs font-bold tracking-wider uppercase px-7 py-3"
                >
                  <Link href="/about">Discover Our Story</Link>
                </Button>

                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(true)}
                  aria-label="Watch our baking story video"
                  className="inline-flex items-center gap-2.5 text-xs font-bold tracking-wider uppercase text-foreground hover:text-gold transition-colors p-2"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gold/20 text-gold border border-gold/40">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </span>
                  <span>Watch the Craft (2 min)</span>
                </button>
              </div>
            </div>

            {/* Right Column: Full-Height Bakery Photography with Interactive Badge */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-2xl overflow-hidden shadow-warm-lg border border-border">
                <Image
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80"
                  alt="Artisan baker dusting organic flour over handmade pastry dough in Paris atelier"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />

                {/* Overlay Play Action Button */}
                <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setIsVideoModalOpen(true)}
                    aria-label="Play our atelier story"
                    className="group relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FAF6F0]/90 hover:bg-[#C89B68] text-[#1A110B] shadow-2xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-gold/50"
                  >
                    <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-1" />
                    <span className="sr-only">Play Video</span>
                  </button>
                </div>

                {/* Floating Craft Badge */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#1A110B]/85 backdrop-blur-md border border-white/10 text-[#FAF6F0] p-3 rounded-xl shadow-lg flex items-center gap-3">
                  <Award className="w-5 h-5 text-gold shrink-0" />
                  <div className="text-xs">
                    <p className="font-serif font-bold text-sm text-[#FAF6F0]">
                      Artisanal Heritage Since 1924
                    </p>
                    <p className="text-[#FAF6F0]/70 font-light text-[11px]">
                      42 Rue de Saint-Honoré, Paris
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Craft Story Modal */}
      <Modal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title="The Art of Slow Baking — CRUMÉA Atelier"
        description="A glimpse into our Parisian baking heritage and 36-hour proofing ritual."
        size="lg"
        footer={
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsVideoModalOpen(false)}
          >
            Close Story
          </Button>
        }
      >
        <div className="space-y-6 py-2">
          {/* Visual Showcase */}
          <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-border bg-[#1A110B] flex flex-col items-center justify-center text-center p-6 text-[#FAF6F0]">
            <div className="w-16 h-16 rounded-full bg-[#C89B68]/20 border border-[#C89B68] text-[#C89B68] flex items-center justify-center mb-3">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold mb-2">
              “Good baking asks for nothing less than full presence.”
            </h3>
            <p className="text-xs sm:text-sm text-[#FAF6F0]/80 font-light max-w-md">
              — Chef Hélène Beauchamp, Head Pâtissier at CRUMÉA Atelier
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl border border-border bg-secondary/30 space-y-1">
              <span className="font-bold text-gold uppercase tracking-wider block">
                01. The Flour
              </span>
              <p className="text-muted-foreground leading-relaxed">
                Unbleached T55 wheat grain stone-ground in Normandy windmills.
              </p>
            </div>
            <div className="p-3.5 rounded-xl border border-border bg-secondary/30 space-y-1">
              <span className="font-bold text-gold uppercase tracking-wider block">
                02. Slow Proofing
              </span>
              <p className="text-muted-foreground leading-relaxed">
                36-hour cold proofing in cedar wood cabinets for depth of
                flavor.
              </p>
            </div>
            <div className="p-3.5 rounded-xl border border-border bg-secondary/30 space-y-1">
              <span className="font-bold text-gold uppercase tracking-wider block">
                03. Hand Finished
              </span>
              <p className="text-muted-foreground leading-relaxed">
                Each cookie and madeleine is individually shaped and baked at
                dawn.
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
