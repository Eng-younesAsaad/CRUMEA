import React from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export interface StoryVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StoryVideoModal({
  isOpen,
  onClose,
}: StoryVideoModalProps): React.ReactElement {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="The Art of Slow Baking — CRUMÉA Atelier"
      description="A glimpse into our Parisian baking heritage and 36-hour proofing ritual."
      size="lg"
      footer={
        <Button variant="primary" size="sm" onClick={onClose}>
          Close Story
        </Button>
      }
    >
      <div className="space-y-6 py-2">
        <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-border bg-espresso flex flex-col items-center justify-center text-center p-6 text-cream">
          <div className="w-16 h-16 rounded-full bg-gold/20 border border-gold text-gold flex items-center justify-center mb-3">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold mb-2">
            “Good baking asks for nothing less than full presence.”
          </h3>
          <p className="text-xs sm:text-sm text-cream/80 font-light max-w-md">
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
              36-hour cold proofing in cedar wood cabinets for depth of flavor.
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
  );
}
