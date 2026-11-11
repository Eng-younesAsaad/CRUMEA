import React from "react";
import { Badge } from "@/components/ui/badge";

export function AboutHero(): React.ReactElement {
  return (
    <section
      aria-labelledby="about-hero-title"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1A110B] via-[#231710] to-[#1A110B] text-[#FAF6F0] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#C89B68_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
      <div className="relative max-w-4xl mx-auto text-center space-y-6">
        <Badge
          variant="gold"
          className="px-3.5 py-1 text-xs uppercase tracking-[0.2em]"
        >
          Our Heritage &amp; Philosophy
        </Badge>
        <h1
          id="about-hero-title"
          className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#FAF6F0]"
        >
          Born from Flour, Fire &amp; Patience
        </h1>
        <p className="text-base sm:text-lg text-[#F3ECE1]/85 max-w-2xl mx-auto leading-relaxed">
          CRUMÉA began with a single copper whisk and an unyielding devotion to
          old-world French baking techniques. We honor time, craftsmanship, and
          the pure joy of sharing warm baked delicacies with loved ones.
        </p>
      </div>
    </section>
  );
}
