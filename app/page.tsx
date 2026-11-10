import React, { Suspense } from "react";
import Link from "next/link";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoryStrip } from "@/components/home/CategoryStrip";
import { StorySection } from "@/components/home/StorySection";
import { GiftingSection } from "@/components/home/GiftingSection";
import { IngredientsSection } from "@/components/home/IngredientsSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { ProductGrid } from "@/features/products/components/ProductGrid";
import { ProductSkeletonGrid } from "@/features/products/components/ProductSkeletonGrid";
import { getProducts } from "@/features/products/products.api";
import { type Product } from "@/features/products/products.types";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

async function FeaturedTreatsSection(): Promise<React.ReactElement> {
  let products: Product[] = [];
  try {
    products = await getProducts("normal");
  } catch (error) {
    console.error("Failed to load featured products for home page:", error);
    products = [];
  }

  const featured = products.slice(0, 4);

  return (
    <section
      className="py-16 sm:py-20 bg-background border-b border-border/80"
      aria-labelledby="featured-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold mb-1">
              CHEF&apos;S MORNING SELECTION
            </p>
            <h2
              id="featured-title"
              className="font-serif text-3xl sm:text-4xl font-normal text-foreground"
            >
              Featured Artisan Treats
            </h2>
          </div>

          <Button
            asChild
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider hover:border-gold hover:text-gold"
          >
            <Link href="/shop">
              <span>View Full Tray ({products.length || "All"})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>

        <ProductGrid products={featured} />

        <div className="mt-8 text-center sm:hidden">
          <Button asChild variant="outline" size="sm" className="w-full">
            <Link href="/shop">View Full Tray →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function HomePage(): React.ReactElement {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Category Strip */}
      <CategoryStrip />

      {/* 3. Featured Treats (Server Component with Suspense) */}
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

      {/* 4. Story Section with Interactive Craft Video Modal */}
      <StorySection />

      {/* 5. Gifting Section */}
      <GiftingSection />

      {/* 6. Four Ingredient Pillars */}
      <IngredientsSection />

      {/* 7. Verified Reviews */}
      <ReviewsSection />

      {/* 8. Newsletter Signup */}
      <NewsletterSection />
    </div>
  );
}
