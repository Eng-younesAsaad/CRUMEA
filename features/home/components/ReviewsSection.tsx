import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, CheckCircle } from "lucide-react";

export function ReviewsSection(): React.ReactElement {
  const reviews = [
    {
      author: "Ayesha R.",
      location: "Paris, France",
      quote:
        "The cookies are hands down the best I have ever had. So soft, decadent, and delightfully fresh! The sea salt balance is pure culinary genius.",
      item: "Signature Chocolate Sea Salt Cookie",
    },
    {
      author: "Hamza K.",
      location: "London, UK",
      quote:
        "Beautiful gold-embossed packaging, intoxicating bakery aroma the second you unbox, and sublime texture. Highly recommended for milestone gifting!",
      item: "Luxury Pâtisserie Gift Box",
    },
    {
      author: "Sara M.",
      location: "Geneva, Switzerland",
      quote:
        "Cruméa never disappoints. My absolute go-to for family weekend gatherings and celebration desserts. Truly Parisian haute boulangerie quality.",
      item: "Almond Butter Croissant Tray",
    },
  ];

  return (
    <section
      className="py-16 sm:py-20 bg-oat/60 dark:bg-espresso border-b border-border/80"
      aria-labelledby="reviews-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
            LOVED BY THOUSANDS
          </p>
          <h2
            id="reviews-title"
            className="font-serif text-3xl sm:text-4xl font-normal text-foreground"
          >
            Real smiles. Real reviews.
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
            Read authentic words from patrons enjoying our daily morning bakes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((rev) => (
            <Card
              key={rev.author}
              className="p-6 border-border/80 hover:border-gold/60 hover:shadow-warm transition-all duration-300 flex flex-col justify-between"
            >
              <CardContent className="p-0 space-y-4">
                <div
                  className="flex items-center gap-1 text-gold"
                  aria-label="5 out of 5 stars"
                >
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-gold" />
                  ))}
                </div>

                <blockquote className="text-sm text-foreground/90 leading-relaxed font-light italic">
                  &ldquo;{rev.quote}&rdquo;
                </blockquote>
              </CardContent>

              <div className="pt-4 border-t border-border/60 mt-4 flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-foreground">
                    <span>{rev.author}</span>
                    <CheckCircle
                      className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400"
                      aria-label="Verified Customer"
                    />
                  </div>
                  <span className="text-[11px] text-muted-foreground font-light">
                    {rev.location}
                  </span>
                </div>
                <span className="text-[10px] text-gold font-semibold uppercase tracking-wider text-right max-w-[130px] truncate">
                  {rev.item}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
