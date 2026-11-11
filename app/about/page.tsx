import React from "react";
import type { Metadata } from "next";
import { AboutView } from "@/features/about/components/AboutView";

export const metadata: Metadata = {
  title: "Our Story & Heritage | CRUMÉA Luxury Artisan Bakery",
  description:
    "Discover the heritage, philosophy, and artisan craftsmanship behind CRUMÉA. Stone-milled Normandy grains, 36-hour slow fermentation, and hand-finished French pastries.",
};

export default function AboutPage(): React.ReactElement {
  return <AboutView />;
}
