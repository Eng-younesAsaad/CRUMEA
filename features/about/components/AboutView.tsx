import React from "react";
import { AboutHero } from "./AboutHero";
import { AboutPhilosophy } from "./AboutPhilosophy";
import { AboutManifesto } from "./AboutManifesto";
import { AboutAtelier } from "./AboutAtelier";

export function AboutView(): React.ReactElement {
  return (
    <main className="min-h-screen bg-background">
      <AboutHero />
      <AboutPhilosophy />
      <AboutManifesto />
      <AboutAtelier />
    </main>
  );
}
