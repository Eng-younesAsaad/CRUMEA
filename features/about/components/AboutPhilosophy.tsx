import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Wheat, Timer, HeartHandshake } from "lucide-react";

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

export function AboutPhilosophy(): React.ReactElement {
  return (
    <section
      aria-labelledby="philosophy-title"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-oat/40 dark:bg-cocoa/40"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-gold">
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
                className="relative border-gold/30 bg-card/90 backdrop-blur-sm p-8 flex flex-col justify-between hover:border-gold transition-all duration-300 group shadow-sm hover:shadow-md"
              >
                <CardContent className="p-0 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-3xl font-light text-gold/60 group-hover:text-gold transition-colors">
                      {pillar.number}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center text-gold">
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
  );
}
