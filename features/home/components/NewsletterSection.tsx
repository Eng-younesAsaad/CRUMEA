"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/context/ToastContext";
import { Mail, CheckCircle2 } from "lucide-react";

export function NewsletterSection(): React.ReactElement {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { success } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail) return;

    success(`Bienvenue! We've sent a 10% welcome treat to ${cleanEmail}`);
    setIsSubmitted(true);
    setEmail("");
  };

  return (
    <section
      className="py-16 sm:py-20 bg-card border-b border-border/80"
      aria-labelledby="newsletter-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-espresso via-cocoa to-espresso text-cream shadow-2xl border border-gold/30">
          <div className="text-center max-w-xl mx-auto space-y-3 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-bold tracking-[0.2em] uppercase select-none">
              <Mail className="w-3.5 h-3.5" />
              <span>STAY IN THE LOOP</span>
            </div>

            <h2
              id="newsletter-title"
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-cream"
            >
              Fresh news from our ovens.
            </h2>

            <p className="text-xs sm:text-sm text-cream/75 leading-relaxed font-light">
              Subscribe for seasonal flavor launches, secret weekend batches,
              and complimentary delivery on your first order.
            </p>
          </div>

          {isSubmitted ? (
            <div className="flex items-center justify-center gap-2.5 p-4 rounded-xl bg-emerald-800/20 border border-emerald-600/40 text-cream text-sm text-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-300" />
              <span>
                Thank you for subscribing! Check your inbox for your 10% welcome
                gift.
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-end sm:items-center gap-3 max-w-md mx-auto"
            >
              <div className="w-full space-y-1">
                <Label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </Label>
                <Input
                  id="newsletter-email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 bg-white/10 border-white/20 text-cream placeholder:text-cream/40 focus-visible:ring-gold focus-visible:border-gold"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full sm:w-auto h-11 px-6 bg-gold hover:bg-gold-hover text-espresso font-bold text-xs tracking-wider uppercase shrink-0 shadow-md"
              >
                Subscribe
              </Button>
            </form>
          )}

          <p className="text-[11px] text-cream/50 text-center mt-4 font-light">
            No spam, ever. Unsubscribe at any time with a single click.
          </p>
        </div>
      </div>
    </section>
  );
}
