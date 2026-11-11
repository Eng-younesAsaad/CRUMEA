import React from "react";
import { Sparkles, Award, ShieldCheck } from "lucide-react";

export function ProductAssuranceBadges(): React.ReactElement {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
      <div className="p-3.5 rounded-xl border border-border bg-card/60 flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 text-gold shrink-0 mt-0.5" />
        <div className="text-xs">
          <p className="font-semibold text-foreground">Baked at Dawn</p>
          <p className="text-[11px] text-muted-foreground font-light">
            Shipped same day
          </p>
        </div>
      </div>
      <div className="p-3.5 rounded-xl border border-border bg-card/60 flex items-start gap-2.5">
        <Award className="w-4 h-4 text-gold shrink-0 mt-0.5" />
        <div className="text-xs">
          <p className="font-semibold text-foreground">Pure Provenance</p>
          <p className="text-[11px] text-muted-foreground font-light">
            Normandy butter
          </p>
        </div>
      </div>
      <div className="p-3.5 rounded-xl border border-border bg-card/60 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-gold shrink-0 mt-0.5" />
        <div className="text-xs">
          <p className="font-semibold text-foreground">Fresh Delivery</p>
          <p className="text-[11px] text-muted-foreground font-light">
            Guaranteed safe
          </p>
        </div>
      </div>
    </div>
  );
}
