import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function AboutManifesto(): React.ReactElement {
  return (
    <section
      aria-labelledby="manifesto-title"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1A110B] via-[#241710] to-[#120B07] text-[#FAF6F0] relative overflow-hidden"
    >
      <div className="relative max-w-3xl mx-auto text-center space-y-8">
        <p className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C89B68]">
          The CRUMÉA Pledge
        </p>
        <blockquote className="space-y-4">
          <h2
            id="manifesto-title"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal italic text-[#FAF6F0] leading-snug"
          >
            &ldquo;Good baking asks for nothing less than full presence.&rdquo;
          </h2>
          <cite className="block text-sm sm:text-base font-sans not-italic text-[#C89B68] tracking-wide pt-2">
            &mdash; Chef H&eacute;l&egrave;ne Beauchamp, Founder &amp; Head
            P&acirc;tissi&egrave;re
          </cite>
        </blockquote>
        <div className="pt-4 flex justify-center">
          <Button asChild variant="primary" size="lg">
            <Link href="/shop" className="inline-flex items-center gap-2">
              <span>Experience Our Baked Delights</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
