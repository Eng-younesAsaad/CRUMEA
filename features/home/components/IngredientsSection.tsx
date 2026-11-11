import React from "react";
import { Wheat, Sun, Leaf, Heart } from "lucide-react";

export function IngredientsSection(): React.ReactElement {
  const pillars = [
    {
      icon: Wheat,
      title: "Premium Ingredients",
      detail:
        "Stone-milled Normandy flour, churned Brittany butter, and Bourbon vanilla.",
    },
    {
      icon: Sun,
      title: "Made Daily Fresh",
      detail:
        "Baked before dawn every single morning so every batch arrives warm and fragrant.",
    },
    {
      icon: Leaf,
      title: "No Preservatives",
      detail:
        "100% natural, honest craftsmanship without artificial additives or flavorings.",
    },
    {
      icon: Heart,
      title: "Baked with Love",
      detail:
        "Master pâtissiers hand-shaping and slow-proofing each tray with dedicated passion.",
    },
  ];

  return (
    <section
      className="py-16 sm:py-20 bg-background border-b border-border/80"
      aria-labelledby="ingredients-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
            QUALITY YOU CAN TASTE
          </p>
          <h2
            id="ingredients-title"
            className="font-serif text-3xl sm:text-4xl font-normal text-foreground"
          >
            Simple ingredients. Extraordinary taste.
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
            We source solely from artisanal family farms and ethical producers
            committed to pure quality.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-6 rounded-2xl border border-border/80 bg-card hover:border-gold/60 hover:shadow-warm transition-all duration-300 text-center space-y-3 group"
              >
                <div className="w-14 h-14 rounded-full bg-gold/15 text-gold flex items-center justify-center mx-auto group-hover:bg-gold group-hover:text-espresso transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-foreground">
                  {pillar.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-light">
                  {pillar.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
