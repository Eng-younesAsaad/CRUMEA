import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Phone, Mail, Sparkles } from "lucide-react";

export function AboutAtelier(): React.ReactElement {
  return (
    <section
      aria-labelledby="atelier-title"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-background"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-gold">
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
              Step inside our scent-filled kitchen on Rue de Saint-Honoré. Watch
              our pâtissiers shape warm brioche, taste single-origin ganache,
              and take home still-warm sourdough loaves.
            </p>
            <div className="space-y-3 pt-2 text-sm text-foreground">
              <div className="flex items-start gap-3">
                <MapPin
                  className="w-4 h-4 text-gold flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>42 Rue de Saint-Honor&eacute;, 75001 Paris, France</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone
                  className="w-4 h-4 text-gold flex-shrink-0"
                  aria-hidden="true"
                />
                <span>+33 1 42 68 90 00</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail
                  className="w-4 h-4 text-gold flex-shrink-0"
                  aria-hidden="true"
                />
                <span>bonjour@crumea-bakery.com</span>
              </div>
            </div>
          </div>

          <Card className="border-gold/30 bg-card p-6 sm:p-8 shadow-sm">
            <CardContent className="p-0 space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-border/50">
                <Clock className="w-5 h-5 text-gold" aria-hidden="true" />
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

              <div className="p-3 bg-gold/10 rounded-lg border border-gold/20 text-xs text-muted-foreground flex items-center gap-2">
                <Sparkles
                  className="w-4 h-4 text-gold flex-shrink-0"
                  aria-hidden="true"
                />
                <span>
                  Fresh morning bakes hit the display cases promptly at 7:15 AM
                  every opening day.
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
