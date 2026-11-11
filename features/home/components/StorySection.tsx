"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Play, Sparkles, Award } from "lucide-react";
import { StoryVideoModal } from "./StoryVideoModal";

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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Narrative Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89B68]/15 border border-[#C89B68]/30 text-gold text-xs font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>Our Heritage</span>
              </div>

              <div className="space-y-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
                  OUR STORY
                </p>
                <h2
                  id="story-title"
                  className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground leading-[1.15]"
                >
                  Made with passion.
                  <br />
                  <span className="italic">Baked to perfection.</span>
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                <p>
                  At CRUMÉA, every pastry begins with respect for time. We
                  source single-origin unbleached wheat from Normandy stone
                  mills and churn churned butter fresh from Brittany dairy
                  pastures.
                </p>
                <p>
                  Our sourdough starters and laminated brioche doughs undergo a
                  slow 36-hour cold fermentation in cedar proofing cabinets,
                  developing a distinctive deep, caramelized complexity that
                  modern commercial bakeries simply cannot replicate.
                </p>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <Button asChild variant="outline" size="lg">
                  <Link href="/about">Discover Our Craft</Link>
                </Button>
              </div>
            </div>

            {/* Right Column: Visual Showcase */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-border/60">
                <Image
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80"
                  alt="CRUMÉA head baker shaping artisan pastries"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Video Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
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

      <StoryVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </>
  );
}
