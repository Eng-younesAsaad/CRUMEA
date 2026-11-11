import React, { Suspense } from "react";
import { HeroSection } from "@/features/home/components/HeroSection";
import { CategoryStrip } from "@/features/home/components/CategoryStrip";
import { FeaturedTreatsSection } from "@/features/home/components/FeaturedTreatsSection";
import { StorySection } from "@/features/home/components/StorySection";
import { GiftingSection } from "@/features/home/components/GiftingSection";
import { IngredientsSection } from "@/features/home/components/IngredientsSection";
import { ReviewsSection } from "@/features/home/components/ReviewsSection";
import { NewsletterSection } from "@/features/home/components/NewsletterSection";
import { ProductSkeletonGrid } from "@/features/products/components/ProductSkeletonGrid";

export default function HomePage(): React.ReactElement {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <CategoryStrip />
      <Suspense
        fallback={
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="mb-10 space-y-2">
              <div className="h-4 w-32 bg-secondary/60 rounded animate-pulse" />
              <div className="h-8 w-64 bg-secondary/60 rounded animate-pulse" />
            </div>
            <ProductSkeletonGrid count={4} />
          </div>
        }
      >
        <FeaturedTreatsSection />
      </Suspense>
      <StorySection />
      <GiftingSection />
      <IngredientsSection />
      <ReviewsSection />
      <NewsletterSection />
    </div>
  );
}
