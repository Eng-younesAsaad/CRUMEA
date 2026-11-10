import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Clock,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  HeartHandshake,
  Wheat,
  Timer,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Story & Heritage | CRUMÉA Luxury Artisan Bakery",
  description:
    "Discover the heritage, philosophy, and artisan craftsmanship behind CRUMÉA. Stone-milled Normandy grains, 36-hour slow fermentation, and hand-finished French pastries.",
};

const PILLARS = [
  {
    number: "01",
    title: "Pure Provenance",
    icon: Wheat,
    description:
      "We believe exceptional pastry begins long before the oven door is opened. We source organic, single-origin flour from stone mills in Normandy, churned mountain butter from Brittany, and Madagascar Bourbon vanilla pods. No preservatives, no shortcuts, ever.",
  },
  {
    number: "02",
    title: "Slow Fermentation",
    icon: Timer,
    description:
      "Our sourdough cultures and brioche doughs rest for up to 36 hours in temperature-monitored cedar proofing cabinets. This patient journey unlocks nuanced aromatics, irresistible caramelized crusts, and delicate airy textures.",
  },
  {
    number: "03",
    title: "Hand-Finished Artistry",
    icon: HeartHandshake,
    description:
      "Every single madeleine shell is individually turned, every cookie dough ball is portioned by hand, and every decorative glaze is brushed fresh each sunrise. Baking is our love letter to mindful, luxurious living.",
  },
] as const;

export default function AboutPage(): React.ReactElement {
  return (
    <main className="min-h-screen bg-background">
      {/* 1. Hero Banner */}
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
            CRUMÉA began with a single copper whisk and an unyielding devotion
            to old-world French baking techniques. We honor time, craftsmanship,
            and the pure joy of sharing warm baked delicacies with loved ones.
          </p>
        </div>
      </section>

      {/* 2. Philosophy Columns */}
      <section
        aria-labelledby="philosophy-title"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F3ECE1]/40 dark:bg-[#1f150f]/60"
      >
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C89B68]">
              The Three Pillars
            </p>
            <h2
              id="philosophy-title"
              className="font-serif text-3xl sm:text-4xl text-foreground font-normal"
            >
              How We Craft Perfection
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Card
                  key={pillar.number}
                  className="relative border-[#C89B68]/30 bg-card/90 backdrop-blur-sm p-8 flex flex-col justify-between hover:border-[#C89B68] transition-all duration-300 group shadow-sm hover:shadow-md"
                >
                  <CardContent className="p-0 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-3xl font-light text-[#C89B68]/60 group-hover:text-[#C89B68] transition-colors">
                        {pillar.number}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-[#C89B68]/15 flex items-center justify-center text-[#C89B68]">
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-foreground font-normal">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {pillar.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Baker's Manifesto / Pledge */}
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
              &ldquo;Good baking asks for nothing less than full
              presence.&rdquo;
            </h2>
            <cite className="block text-sm sm:text-base font-sans not-italic text-[#C89B68] tracking-wide pt-2">
              &mdash; Chef H&eacute;l&egrave;ne Beauchamp, Founder &amp; Head
              P&acirc;tissi&egrave;re
            </cite>
          </blockquote>
          <div className="pt-4 flex justify-center">
            <Button asChild variant="primary" size="lg">
              <Link href="/shop" className="inline-flex items-center gap-2">
                Experience Our Baked Delights
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 4. Atelier & Hours */}
      <section
        aria-labelledby="atelier-title"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-background"
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C89B68]">
                  Visit Our Flagship Atelier
                </p>
                <h2
                  id="atelier-title"
                  className="font-serif text-3xl sm:text-4xl text-foreground font-normal"
                >
                  The Parisian Kitchen &amp; Tasting Room
                </h2>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Step inside our scent-filled kitchen on Rue de Saint-Honoré.
                Watch our pâtissiers shape warm brioche, taste single-origin
                ganache, and take home still-warm sourdough loaves.
              </p>
              <div className="space-y-3 pt-2 text-sm text-foreground">
                <div className="flex items-start gap-3">
                  <MapPin
                    className="w-4 h-4 text-[#C89B68] flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>
                    42 Rue de Saint-Honor&eacute;, 75001 Paris, France
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone
                    className="w-4 h-4 text-[#C89B68] flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span>+33 1 42 68 90 00</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail
                    className="w-4 h-4 text-[#C89B68] flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span>bonjour@crumea-bakery.com</span>
                </div>
              </div>
            </div>

            <Card className="border-[#C89B68]/30 bg-card p-6 sm:p-8 shadow-sm">
              <CardContent className="p-0 space-y-6">
                <div className="flex items-center gap-2 pb-3 border-b border-border/50">
                  <Clock
                    className="w-5 h-5 text-[#C89B68]"
                    aria-hidden="true"
                  />
                  <h3 className="font-serif text-xl text-foreground font-normal">
                    Baking &amp; Atelier Hours
                  </h3>
                </div>

                <ul className="space-y-4 text-sm">
                  <li className="flex justify-between items-center py-2 border-b border-border/30">
                    <span className="font-medium text-foreground">
                      Tuesday &ndash; Friday
                    </span>
                    <span className="text-muted-foreground">
                      7:00 AM &ndash; 6:30 PM
                    </span>
                  </li>
                  <li className="flex justify-between items-center py-2 border-b border-border/30">
                    <span className="font-medium text-foreground">
                      Saturday &ndash; Sunday
                    </span>
                    <span className="text-muted-foreground">
                      8:00 AM &ndash; 5:00 PM
                    </span>
                  </li>
                  <li className="flex justify-between items-center py-2">
                    <span className="font-medium text-foreground">Monday</span>
                    <Badge variant="outline" className="text-xs">
                      Closed for Deep Conditioning
                    </Badge>
                  </li>
                </ul>

                <div className="p-3 bg-[#C89B68]/10 rounded-lg border border-[#C89B68]/20 text-xs text-muted-foreground flex items-center gap-2">
                  <Sparkles
                    className="w-4 h-4 text-[#C89B68] flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span>
                    Fresh morning bakes hit the display cases promptly at 7:15
                    AM every opening day.
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
